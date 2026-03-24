// Kawader School App.js

// 1. Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 2. Mobile Menu Toggle with Overlay
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileBtnIcon = mobileBtn ? mobileBtn.querySelector('i') : null;

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

function openMenu() {
  navLinks.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (mobileBtnIcon) {
    mobileBtnIcon.classList.remove('ph-list');
    mobileBtnIcon.classList.add('ph-x');
  }
}

function closeMenu() {
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (mobileBtnIcon) {
    mobileBtnIcon.classList.remove('ph-x');
    mobileBtnIcon.classList.add('ph-list');
  }
}

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when overlay is tapped
  overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is tapped
  navLinks.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// 3. Scroll-Triggered Fade-In (AOS alternative)
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Optional: unobserve after animating
      // scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  scrollObserver.observe(el);
});

// 4. Counter Animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // ~60fps
  const isPercent = element.dataset.suffix === '%';
  const hasPlus = element.dataset.prefix === '+';
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = 
        (hasPlus ? '+' : '') + 
        Math.floor(start) + 
        (isPercent ? '%' : '');
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = 
        (hasPlus ? '+' : '') + 
        target + 
        (isPercent ? '%' : '');
    }
  }
  
  updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target, 2000);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.glass-stats').forEach(section => {
  statsObserver.observe(section);
});

// 5. Interactive Cards Glow Effect (Mouse Track)
document.querySelectorAll('.interactive-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});
