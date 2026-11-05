/**
 * EVERLASTIN FADOO COMPANY LIMITED - MAIN JAVASCRIPT
 * Interactive controls, Benny Homes-style floating navbar, email routing, and WhatsApp enquiries
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Floating Glass Navbar scroll effect (Referenced from Benny Homes)
  const siteNavbar = document.getElementById('siteNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteNavbar.classList.add('scrolled');
    } else {
      siteNavbar.classList.remove('scrolled');
    }
  });

  // 2. Fullscreen Mobile Navigation Toggle (Benny Homes style)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile nav when any navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 3. Active Nav Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          targetNav.classList.add('active');
        }
      }
    });
  });

  // 4. Counter Animation for Dark Stats
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;

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

  // 5. Service Category Filter Tabs & Mobile Progressive "View More" (3 initial + 2 per click)
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const viewMoreWrap = document.getElementById('servicesViewMoreWrap');
  const viewMoreBtn = document.getElementById('viewMoreServicesBtn');
  const viewMoreText = document.getElementById('viewMoreServicesText');

  const INITIAL_MOBILE_SERVICES = 3;
  const MOBILE_SERVICES_STEP = 2;
  let currentFilter = 'all';
  let mobileVisibleLimit = INITIAL_MOBILE_SERVICES;

  function renderServices() {
    const matchingCards = [];

    serviceCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matches = (currentFilter === 'all' || category === currentFilter);
      if (matches) {
        matchingCards.push(card);
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
        card.classList.remove('mobile-service-hidden');
      }
    });

    matchingCards.forEach((card, index) => {
      if (index < mobileVisibleLimit) {
        card.classList.remove('mobile-service-hidden');
      } else {
        card.classList.add('mobile-service-hidden');
      }
    });

    if (viewMoreWrap) {
      const remaining = matchingCards.length - mobileVisibleLimit;
      if (remaining > 0) {
        viewMoreWrap.classList.remove('all-shown');
        if (viewMoreText) {
          const nextBatch = Math.min(MOBILE_SERVICES_STEP, remaining);
          viewMoreText.textContent = `View More Services (+${nextBatch})`;
        }
      } else {
        viewMoreWrap.classList.add('all-shown');
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      mobileVisibleLimit = INITIAL_MOBILE_SERVICES;
      renderServices();
    });
  });

  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      mobileVisibleLimit += MOBILE_SERVICES_STEP;
      renderServices();
    });
  }

  renderServices();

  // 6. Interactive Estimate Calculator
  const calcService = document.getElementById('calcService');
  const calcArea = document.getElementById('calcArea');
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

  function updateRecommendation() {
    if (!calcService || !recServiceTitle || !recServiceDesc) return;
    const selectedService = calcService.value;
    const area = calcArea ? calcArea.value || 100 : 100;
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

  // Pre-configured WhatsApp Enquiry from Calculator
  if (sendWhatsAppQuoteBtn) {
    sendWhatsAppQuoteBtn.addEventListener('click', () => {
      const service = calcService ? calcService.value : 'Waterproofing';
      const area = calcArea ? calcArea.value : 'Not specified';
      const prop = calcProperty ? calcProperty.value : 'Residential';
      const urgency = calcUrgency ? calcUrgency.value : 'Standard';

      const msg = encodeURIComponent(
        `Hello Everlastin Fadoo Company Limited,\n\nI would like to make an enquiry regarding your waterproofing services:\n• Service Required: ${service}\n• Estimated Area: ${area} m²\n• Property Type: ${prop}\n• Urgency: ${urgency}\n\nPlease let me know your availability for an inspection and quotation.`
      );

      window.open(`https://wa.me/233204513321?text=${msg}`, '_blank');
    });
  }

  // 7. Site Inspection Request Form (Dispatched to everlastingfadoo@gmail.com)
  const contactForm = document.getElementById('contactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submitInspectionBtn') || contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Request to Email...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      const name = document.getElementById('clientName').value;
      const phone = document.getElementById('clientPhone').value;
      const email = document.getElementById('clientEmail').value;
      const service = document.getElementById('serviceNeeded').value;
      const location = document.getElementById('siteLocation').value;
      const details = document.getElementById('clientMessage').value || 'None specified';

      try {
        // Send email to everlastingfadoo@gmail.com via FormSubmit API
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

        contactForm.style.display = 'none';
        if (formSuccessMessage) {
          formSuccessMessage.style.display = 'block';
        }
      } catch (err) {
        // Direct mailto fallback if fetch fails or network blocked
        const mailtoSubject = encodeURIComponent(`Waterproofing Inspection Request - ${service} (${name})`);
        const mailtoBody = encodeURIComponent(
          `Waterproofing Inspection Request:\n\n` +
          `• Full Name: ${name}\n` +
          `• Phone Number: ${phone}\n` +
          `• Email Address: ${email}\n` +
          `• Service Required: ${service}\n` +
          `• Site Location: ${location}\n` +
          `• Scope / Details: ${details}\n\n` +
          `Please contact me to schedule a date for the site inspection.`
        );
        window.location.href = `mailto:everlastingfadoo@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        contactForm.style.display = 'none';
        if (formSuccessMessage) {
          formSuccessMessage.style.display = 'block';
        }
      }
    });
  }

  // 8. Video Modal Handlers
  const openVideoBtn = document.getElementById('openVideoBtn');
  const closeVideoBtn = document.getElementById('closeVideoBtn');
  const videoModal = document.getElementById('videoModal');

  if (openVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeModal = () => {
    if (videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', closeModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
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
