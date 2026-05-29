/**
 * Somali Cancer Foundation - Main JavaScript
 * Custom interactive elements, responsive menu and scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu Setup
  initMobileMenu();

  // Scroll Animations Setup
  initScrollAnimations();

  // Custom Interactivity (Modal Toast Notifications for presentation preview)
  initInteractiveNotices();

  // Active Navigation Highlight
  highlightActiveLink();
});

/**
 * Responsive Mobile Menu Controller
 */
function initMobileMenu() {
  const hamburger = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-menu');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('hidden');
      mobileNav.classList.toggle('flex');
      
      // Toggle Hamburger Icons
      const menuIcon = hamburger.querySelector('.hamburger-icon');
      const closeIcon = hamburger.querySelector('.close-icon');
      if (menuIcon && closeIcon) {
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        if (!mobileNav.classList.contains('hidden')) {
          mobileNav.classList.add('hidden');
          mobileNav.classList.remove('flex');
          const menuIcon = hamburger.querySelector('.hamburger-icon');
          const closeIcon = hamburger.querySelector('.close-icon');
          if (menuIcon && closeIcon) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          }
        }
      }
    });
  }
}

/**
 * Scroll Reveal Effects using IntersectionObserver for maximum performance
 */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animates once
        }
      });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    const checkScroll = () => {
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run initially
  }
}

/**
 * Highlight Current Page in Header
 */
function highlightActiveLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === 'index.html' && href === '#') || (page === '' && href === 'index.html')) {
      link.classList.add('text-[#00AEEF]', 'font-semibold');
      link.classList.remove('text-gray-600', 'text-gray-700');
    }
  });
}

/**
 * Intercept preview actions and display modern notifications (replaces default window.alert)
 */
function initInteractiveNotices() {
  // Create beautiful notification element
  const noticeContainer = document.createElement('div');
  noticeContainer.id = 'notice-toast';
  noticeContainer.className = 'fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 transition-all duration-300 ease-in-out pointer-events-none';
  
  noticeContainer.innerHTML = `
    <div class="bg-white border-l-4 border-[#00AEEF] shadow-xl rounded-lg p-4 max-w-sm flex items-start gap-3 pointer-events-auto">
      <div class="bg-[#F0FAFF] p-2 rounded-full text-[#00AEEF]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      </div>
      <div>
        <h4 class="font-bold text-[#313F47] text-sm">System Preview Node</h4>
        <p id="notice-toast-message" class="text-xs text-gray-500 mt-1"></p>
      </div>
    </div>
  `;
  document.body.appendChild(noticeContainer);

  const showToast = (message) => {
    const msgEl = document.getElementById('notice-toast-message');
    if (msgEl) {
      msgEl.textContent = message;
      // Animate slide up
      noticeContainer.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
      
      // Auto-hide after 5 seconds
      if (window.toastTimeout) clearTimeout(window.toastTimeout);
      window.toastTimeout = setTimeout(() => {
        noticeContainer.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      }, 5000);
    }
  };

  // 1. Donation Buttons Previews
  const donateTriggers = document.querySelectorAll('.donate-trigger-btn');
  donateTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Online donations will be available in the official website launch.');
    });
  });

  // 2. Donate Form Submit Preview
  const donateForm = document.getElementById('donate-form');
  if (donateForm) {
    donateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for your interest in supporting Somali Cancer Foundation. Online payments will be activated in the official website launch.');
    });
  }

  // 3. Request Support Form Preview (Get Help)
  const helpForm = document.getElementById('help-support-form');
  if (helpForm) {
    helpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('This support request form will be active in the official website launch.');
    });
  }

  // 4. Contact Form Preview
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Contact form submission will be available in the official website launch.');
    });
  }
  
  // 5. General "Learn More" info placeholders
  const placeholderTriggers = document.querySelectorAll('.info-placeholder-btn');
  placeholderTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Detailed informative brochures will be available inside the official resource portal upon publication.');
    });
  });
}
