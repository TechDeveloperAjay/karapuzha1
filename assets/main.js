document.addEventListener('DOMContentLoaded', () => {

  // ─── HEADER SCROLL EFFECT ────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ─── SCROLL REVEAL ANIMATIONS ────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // ─── SCROLL SPY (NAV ACTIVE LINK) ────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(section => {
    scrollSpyObserver.observe(section);
  });

  // ─── BOOKING WIDGET VALIDATION ───────────────────
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  
  // Set minimum check-in date to today
  const today = new Date().toISOString().split('T')[0];
  checkinInput.min = today;
  checkinInput.value = today;

  // Set minimum check-out date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  checkoutInput.min = tomorrowStr;
  checkoutInput.value = tomorrowStr;

  checkinInput.addEventListener('change', () => {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    
    // Automatically set check-out to check-in + 1 day
    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    checkoutInput.min = nextDayStr;
    if (checkoutDate <= checkinDate) {
      checkoutInput.value = nextDayStr;
    }
  });

  // ─── TESTIMONIAL SLIDER ──────────────────────────
  const track = document.querySelector('.testimonial-track');
  const slides = Array.from(document.querySelectorAll('.testimonial'));
  const dotsContainer = document.querySelector('.slider-nav');
  
  if (slides.length > 0 && dotsContainer) {
    let currentSlideIndex = 0;
    let autoSlideInterval;

    // Create dot indicators
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.slider-dot'));

    function goToSlide(index) {
      currentSlideIndex = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        let nextIndex = (currentSlideIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    // Swipe/Touch events for testimonials
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left -> next slide
          goToSlide((currentSlideIndex + 1) % slides.length);
        } else {
          // Swipe right -> prev slide
          goToSlide((currentSlideIndex - 1 + slides.length) % slides.length);
        }
        resetAutoSlide();
      }
      isDragging = false;
    });
  }

  // ─── SPECIFICATIONS ACCORDION ────────────────────
  const specItems = document.querySelectorAll('.spec-item');
  specItems.forEach(item => {
    const headerEl = item.querySelector('.spec-header');
    headerEl.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other spec items
      specItems.forEach(other => {
        other.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ─── GALLERY LIGHTBOX ────────────────────────────
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const bgStyle = item.querySelector('.gallery-item-inner').style.background;
        // Parse background url if present, else fallback
        let src = '';
        if (bgStyle.includes('url(')) {
          const matches = bgStyle.match(/url\("?(.+?)"?\)/);
          if (matches && matches[1]) {
            src = matches[1];
          }
        }
        
        if (src) {
          lightboxImg.src = src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Disable page scrolling
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close lightbox on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto'; // Re-enable page scrolling
    }
  }

});
