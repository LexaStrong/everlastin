/**
 * EVERLASTING FADOO COMPANY LIMITED - MAIN JAVASCRIPT
 * Interactive controls, accessible dialogs/drawers, live service search & filtering,
 * client-side form validation, and honest network submission state handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper: Trap keyboard Tab focus inside an active modal or drawer
  function trapFocus(container, e) {
    const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(container.querySelectorAll(focusableSelectors)).filter(
      el => !el.hasAttribute('hidden') && el.offsetParent !== null
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // 1. Floating Glass Navbar scroll effect (Referenced from Benny Homes)
  const siteNavbar = document.getElementById('siteNavbar');
  if (siteNavbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteNavbar.classList.add('scrolled');
      } else {
        siteNavbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Fullscreen Mobile Navigation Toggle with ARIA & Keyboard Support
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');

  function setMobileNavOpen(isOpen, restoreFocus = false) {
    if (!hamburgerBtn || !mobileNav) return;
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileNav.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    if (isOpen) {
      const firstLink = mobileNav.querySelector('a, button');
      if (firstLink) setTimeout(() => firstLink.focus(), 50);
    } else if (restoreFocus) {
      hamburgerBtn.focus();
    }
  }

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('active');
      setMobileNavOpen(isOpen, !isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
          setMobileNavOpen(false, false);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (!mobileNav.classList.contains('active')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileNavOpen(false, true);
      } else if (e.key === 'Tab') {
        trapFocus(mobileNav, e);
      }
    });
  }

  // 3. Active Nav Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (targetNav && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        targetNav.classList.add('active');
      }
    });
  }, { passive: true });

  // 4. Counter Animation for Dark Stats (Respects prefers-reduced-motion)
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      if (prefersReducedMotion) {
        counter.innerText = target;
        return;
      }
      let count = 0;
      const speed = Math.max(target / 35, 0.5);

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    if (prefersReducedMotion) {
      countUp();
      animated = true;
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            countUp();
            animated = true;
          }
        });
      }, { threshold: 0.3 });

      observer.observe(statsSection);
    }
  }

  // 5. Service Category Filter Tabs & Progressive "View More" (Desktop: 6 initial | Mobile: 3 initial + 2 per click)
  const filterBtns = Array.from(document.querySelectorAll('.filter-tab-btn'));
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const servicesStatusLive = document.getElementById('servicesStatusLive');
  const viewMoreWrap = document.getElementById('servicesViewMoreWrap');
  const viewMoreBtn = document.getElementById('viewMoreServicesBtn');
  const viewMoreText = document.getElementById('viewMoreServicesText');

  const INITIAL_DESKTOP_SERVICES = 6;
  const DESKTOP_SERVICES_STEP = 6;
  const INITIAL_MOBILE_SERVICES = 3;
  const MOBILE_SERVICES_STEP = 2;

  let currentFilter = 'all';
  let isMobileViewport = window.innerWidth <= 768;
  let visibleLimit = isMobileViewport ? INITIAL_MOBILE_SERVICES : INITIAL_DESKTOP_SERVICES;

  function getStepSize() {
    return window.innerWidth <= 768 ? MOBILE_SERVICES_STEP : DESKTOP_SERVICES_STEP;
  }

  function getInitialLimit() {
    return window.innerWidth <= 768 ? INITIAL_MOBILE_SERVICES : INITIAL_DESKTOP_SERVICES;
  }

  function renderServices() {
    const matchingCards = [];

    serviceCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const categoryMatches = (currentFilter === 'all' || category === currentFilter);

      if (categoryMatches) {
        matchingCards.push(card);
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
        card.classList.remove('service-hidden', 'mobile-service-hidden');
      }
    });

    matchingCards.forEach((card, index) => {
      if (index < visibleLimit) {
        card.classList.remove('service-hidden', 'mobile-service-hidden');
      } else {
        card.classList.add('service-hidden', 'mobile-service-hidden');
      }
    });

    const displayedCount = Math.min(visibleLimit, matchingCards.length);
    if (servicesStatusLive) {
      servicesStatusLive.textContent = `Showing ${displayedCount} of ${matchingCards.length} waterproofing services.`;
    }

    if (viewMoreWrap) {
      const remaining = matchingCards.length - visibleLimit;
      if (remaining > 0) {
        viewMoreWrap.classList.remove('all-shown');
        if (viewMoreText) {
          const nextBatch = Math.min(getStepSize(), remaining);
          viewMoreText.textContent = `View More Services (+${nextBatch})`;
        }
      } else {
        viewMoreWrap.classList.add('all-shown');
      }
    }
  }

  function setActiveCategoryTab(selectedBtn) {
    filterBtns.forEach(btn => {
      const isSelected = btn === selectedBtn;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
    currentFilter = selectedBtn.getAttribute('data-filter') || 'all';
    visibleLimit = getInitialLimit();
    renderServices();
  }

  filterBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => setActiveCategoryTab(btn));

    // Keyboard arrow navigation across filter tabs
    btn.addEventListener('keydown', (e) => {
      let targetIdx = null;
      if (e.key === 'ArrowRight') {
        targetIdx = (idx + 1) % filterBtns.length;
      } else if (e.key === 'ArrowLeft') {
        targetIdx = (idx - 1 + filterBtns.length) % filterBtns.length;
      } else if (e.key === 'Home') {
        targetIdx = 0;
      } else if (e.key === 'End') {
        targetIdx = filterBtns.length - 1;
      }
      if (targetIdx !== null) {
        e.preventDefault();
        filterBtns[targetIdx].focus();
        setActiveCategoryTab(filterBtns[targetIdx]);
      }
    });
  });

  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      visibleLimit += getStepSize();
      renderServices();
    });
  }

  window.addEventListener('resize', () => {
    const nowMobile = window.innerWidth <= 768;
    if (nowMobile !== isMobileViewport) {
      isMobileViewport = nowMobile;
      visibleLimit = getInitialLimit();
      renderServices();
    }
  }, { passive: true });

  renderServices();

  // Pre-select service in the Contact Form when clicking "Request Service Quote" on any service card
  const serviceNeededSelect = document.getElementById('serviceNeeded');
  document.querySelectorAll('.service-inquire-link').forEach(link => {
    link.addEventListener('click', () => {
      const card = link.closest('.service-card');
      const titleEl = card ? card.querySelector('h3') : null;
      if (!titleEl || !serviceNeededSelect) return;
      const serviceTitle = titleEl.textContent.trim();
      const matchingOption = Array.from(serviceNeededSelect.options).find(
        opt => opt.value && (
          opt.value.toLowerCase() === serviceTitle.toLowerCase() ||
          serviceTitle.toLowerCase().includes(opt.value.toLowerCase()) ||
          opt.value.toLowerCase().includes(serviceTitle.toLowerCase())
        )
      );
      if (matchingOption) {
        serviceNeededSelect.value = matchingOption.value;
        serviceNeededSelect.dispatchEvent(new Event('change'));
      }
    });
  });

  // 6. Interactive Estimate Calculator with Input Validation
  const calcService = document.getElementById('calcService');
  const calcArea = document.getElementById('calcArea');
  const calcAreaError = document.getElementById('calcAreaError');
  const calcProperty = document.getElementById('calcProperty');
  const calcUrgency = document.getElementById('calcUrgency');
  const recServiceTitle = document.getElementById('recServiceTitle');
  const recServiceDesc = document.getElementById('recServiceDesc');
  const sendWhatsAppQuoteBtn = document.getElementById('sendWhatsAppQuoteBtn');

  const serviceSpecs = {
    'Roof Waterproofing': 'High-tensile elastomeric & bituminous membrane system with UV-reflective solar topcoat.',
    'Basement Waterproofing': 'Dual-layer internal hydrostatic pressure tanking and subterranean chemical crystallization.',
    'Foundation Protection': 'Damp-Proof Course (DPC) injection and exterior heavy-duty bituminous tanking barrier.',
    'Concrete Waterproofing': 'Deep-penetrating crystalline matrix waterproofing that seals capillary voids and micro-cracks.',
    'Balcony Waterproofing': 'Flexible under-tile polyurethane liquid membrane engineered for structural movement joints.',
    'Water Tank Sealing': 'Non-toxic, potable-certified chemical polymer lining safe for continuous water storage.',
    'Retaining Wall': 'Earth-retaining geotextile membrane barrier and high-capacity dimpled drainage board.',
    'Leakage Repairs': 'High-pressure polyurethane injection grouting halting active rushing water in minutes.',
    'Terrace Waterproofing': 'Weatherproof, pedestrian-grade seamless liquid screed with thermal expansion resilience.',
    'Swimming Pool': 'Two-component flexible cementitious and epoxy waterproofing resisting chlorine and constant head pressure.',
    'Epoxy Flooring': 'Self-leveling heavy-duty industrial and residential high-gloss epoxy flooring system.'
  };

  function validateCalcArea() {
    if (!calcArea) return true;
    const rawVal = calcArea.value.trim();
    const numVal = Number(rawVal);
    if (!rawVal || Number.isNaN(numVal) || numVal < 10 || numVal > 10000) {
      if (calcAreaError) {
        calcAreaError.textContent = 'Please enter a valid area between 10 and 10,000 m².';
        calcAreaError.hidden = false;
      }
      calcArea.classList.add('input-invalid');
      calcArea.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (calcAreaError) {
      calcAreaError.textContent = '';
      calcAreaError.hidden = true;
    }
    calcArea.classList.remove('input-invalid');
    calcArea.setAttribute('aria-invalid', 'false');
    return true;
  }

  function updateRecommendation() {
    if (!calcService || !recServiceTitle || !recServiceDesc) return;
    const selectedService = calcService.value;
    const isValidArea = validateCalcArea();
    const area = (calcArea && isValidArea) ? calcArea.value : 100;
    const desc = serviceSpecs[selectedService] || 'Custom engineered waterproof barrier system.';

    recServiceTitle.textContent = `${selectedService} Custom Specification`;
    recServiceDesc.textContent = `${desc} Configured for ${area} m² coverage.`;
  }

  if (calcService) {
    calcService.addEventListener('change', updateRecommendation);
  }
  if (calcArea) {
    calcArea.addEventListener('input', updateRecommendation);
  }

  if (sendWhatsAppQuoteBtn) {
    sendWhatsAppQuoteBtn.addEventListener('click', () => {
      if (!validateCalcArea()) {
        if (calcArea) calcArea.focus();
        return;
      }
      const service = calcService ? calcService.value : 'Waterproofing';
      const area = calcArea ? calcArea.value : '100';
      const prop = calcProperty ? calcProperty.value : 'Residential';
      const urgency = calcUrgency ? calcUrgency.value : 'Standard';

      const msg = encodeURIComponent(
        `Hello Everlasting Fadoo Company Limited,\n\nI would like to make an enquiry regarding your waterproofing services:\n• Service Required: ${service}\n• Estimated Area: ${area} m²\n• Property Type: ${prop}\n• Urgency: ${urgency}\n\nPlease let me know your availability for an inspection and quotation.`
      );

      window.open(`https://wa.me/233204513321?text=${msg}`, '_blank', 'noopener,noreferrer');
    });
  }

  // 7. Site Inspection Request Form — Validation & Honest Submission States
  const contactForm = document.getElementById('contactForm');
  const formErrorBanner = document.getElementById('formErrorBanner');
  const formErrorBannerText = document.getElementById('formErrorBannerText');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const formFallbackBox = document.getElementById('formFallbackBox');
  const fallbackMailtoLink = document.getElementById('fallbackMailtoLink');
  const fallbackWhatsAppLink = document.getElementById('fallbackWhatsAppLink');
  const retryFormBtn = document.getElementById('retryFormBtn');

  const fieldValidators = {
    clientName: {
      input: document.getElementById('clientName'),
      error: document.getElementById('clientNameError'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your full name or company name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters long.';
        return '';
      }
    },
    clientPhone: {
      input: document.getElementById('clientPhone'),
      error: document.getElementById('clientPhoneError'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter a phone or WhatsApp number.';
        const digits = val.replace(/\D/g, '');
        if (digits.length < 9 || digits.length > 15) {
          return 'Please enter a valid 9 to 15 digit phone number (e.g. 055 774 6582).';
        }
        return '';
      }
    },
    clientEmail: {
      input: document.getElementById('clientEmail'),
      error: document.getElementById('clientEmailError'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(val.trim())) {
          return 'Please enter a valid email address (e.g. name@domain.com).';
        }
        return '';
      }
    },
    serviceNeeded: {
      input: document.getElementById('serviceNeeded'),
      error: document.getElementById('serviceNeededError'),
      validate: (val) => {
        if (!val.trim()) return 'Please select the waterproofing service you need.';
        return '';
      }
    },
    siteLocation: {
      input: document.getElementById('siteLocation'),
      error: document.getElementById('siteLocationError'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter the project site location.';
        if (val.trim().length < 2) return 'Please provide a specific neighborhood or city.';
        return '';
      }
    }
  };

  function validateSingleField(key) {
    const field = fieldValidators[key];
    if (!field || !field.input) return true;
    const message = field.validate(field.input.value);
    if (field.error) {
      field.error.textContent = message;
      field.error.hidden = !message;
    }
    if (message) {
      field.input.classList.add('input-invalid');
      field.input.setAttribute('aria-invalid', 'true');
      return false;
    }
    field.input.classList.remove('input-invalid');
    field.input.setAttribute('aria-invalid', 'false');
    return true;
  }

  Object.keys(fieldValidators).forEach(key => {
    const field = fieldValidators[key];
    if (!field.input) return;
    field.input.addEventListener('blur', () => validateSingleField(key));
    field.input.addEventListener('input', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') {
        validateSingleField(key);
      }
      if (formErrorBanner && !formErrorBanner.hidden) {
        const allValid = Object.keys(fieldValidators).every(k => !fieldValidators[k].validate(fieldValidators[k].input.value));
        if (allValid) formErrorBanner.hidden = true;
      }
    });
    field.input.addEventListener('change', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') {
        validateSingleField(key);
      }
    });
  });

  if (retryFormBtn && contactForm && formFallbackBox) {
    retryFormBtn.addEventListener('click', () => {
      formFallbackBox.hidden = true;
      contactForm.style.display = 'flex';
      const submitBtn = document.getElementById('submitInspectionBtn');
      if (submitBtn) submitBtn.focus();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let firstInvalidInput = null;
      Object.keys(fieldValidators).forEach(key => {
        const valid = validateSingleField(key);
        if (!valid && !firstInvalidInput) {
          firstInvalidInput = fieldValidators[key].input;
        }
      });

      if (firstInvalidInput) {
        if (formErrorBanner) {
          formErrorBanner.innerHTML = '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> <span>Please correct the highlighted fields before submitting your inspection request.</span>';
          formErrorBanner.hidden = false;
        }
        firstInvalidInput.focus();
        return;
      }

      if (formErrorBanner) formErrorBanner.hidden = true;

      const submitBtn = document.getElementById('submitInspectionBtn') || contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Request...</span> <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const service = document.getElementById('serviceNeeded').value.trim();
      const location = document.getElementById('siteLocation').value.trim();
      const details = document.getElementById('clientMessage').value.trim() || 'None specified';

      const summaryLines =
        `Waterproofing Inspection Request:\n\n` +
        `• Full Name: ${name}\n` +
        `• Phone Number: ${phone}\n` +
        `• Email Address: ${email}\n` +
        `• Service Required: ${service}\n` +
        `• Site Location: ${location}\n` +
        `• Scope / Details: ${details}\n\n` +
        `Please contact me to schedule a date for the site inspection.`;

      const mailtoSubject = encodeURIComponent(`Waterproofing Inspection Request - ${service} (${name})`);
      const mailtoBody = encodeURIComponent(summaryLines);
      if (fallbackMailtoLink) {
        fallbackMailtoLink.href = `mailto:everlastingfadoo@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }
      if (fallbackWhatsAppLink) {
        fallbackWhatsAppLink.href = `https://wa.me/233204513321?text=${mailtoBody}`;
      }

      try {
        if (!navigator.onLine) {
          throw new Error('Browser is currently offline.');
        }

        const response = await fetch("https://formsubmit.co/ajax/everlastingfadoo@gmail.com", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New Inspection Request - ${service} (${name})`,
            "Client Name": name,
            "Phone Number": phone,
            "Email Address": email,
            "Service Required": service,
            "Site Location": location,
            "Scope / Details": details
          })
        });

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const result = await response.json();
        if (result && (result.success === "false" || result.success === false)) {
          throw new Error(result.message || 'Email dispatch rejected by endpoint.');
        }

        contactForm.style.display = 'none';
        if (formFallbackBox) formFallbackBox.hidden = true;
        if (formSuccessMessage) {
          formSuccessMessage.hidden = false;
          formSuccessMessage.style.display = 'block';
        }
      } catch (err) {
        // Honest fallback: never pretend the automated API call succeeded when offline or blocked
        contactForm.style.display = 'none';
        if (formSuccessMessage) {
          formSuccessMessage.hidden = true;
          formSuccessMessage.style.display = 'none';
        }
        if (formFallbackBox) {
          formFallbackBox.hidden = false;
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

  // 8. Accessible Video Modal Handlers
  const openVideoBtn = document.getElementById('openVideoBtn');
  const closeVideoBtn = document.getElementById('closeVideoBtn');
  const modalBookBtn = document.getElementById('modalBookBtn');
  const videoModal = document.getElementById('videoModal');
  const demoVideoPlayer = document.getElementById('demoVideoPlayer');

  const openModal = () => {
    if (!videoModal) return;
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeVideoBtn) {
      setTimeout(() => closeVideoBtn.focus(), 50);
    }
    if (demoVideoPlayer) {
      demoVideoPlayer.currentTime = 0;
      demoVideoPlayer.play().catch(() => {});
    }
  };

  const closeModal = (restoreFocus = true) => {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    if (demoVideoPlayer) {
      demoVideoPlayer.pause();
    }
    if (restoreFocus && openVideoBtn) {
      openVideoBtn.focus();
    }
  };

  if (openVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', openModal);
  }

  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', () => closeModal(true));
  }

  if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => closeModal(false));
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal(true);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!videoModal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal(true);
      } else if (e.key === 'Tab') {
        trapFocus(videoModal, e);
      }
    });
  }

  // 9. Dynamic Year Update
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Initialize recommendation
  updateRecommendation();
});
