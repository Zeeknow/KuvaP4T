const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.menu-card');
const revealItems = document.querySelectorAll('.reveal');

const setHeaderState = () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (navToggle && navPanel) {
  navToggle.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const updateTabs = (filter) => {
  tabs.forEach((tab) => {
    const active = tab.dataset.filter === filter;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  cards.forEach((card) => {
    const matches = card.classList.contains(filter);
    card.classList.toggle('hidden', !matches);
  });
};

tabs.forEach((tab) => {
  tab.addEventListener('click', () => updateTabs(tab.dataset.filter));
});

document.querySelectorAll('.nav-links a[data-filter]').forEach((link) => {
  link.addEventListener('click', () => updateTabs(link.dataset.filter));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const slides = Array.from(document.querySelectorAll('.hero-slide'));
const indicator = document.querySelector('.indicator-line span');
let currentSlideIndex = 0;

const updateSlide = (index) => {
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
  });

  const progress = ((index + 1) / slides.length) * 100;
  if (indicator) {
    indicator.style.width = `${progress}%`;
  }
};

if (slides.length > 1) {
  setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlide(currentSlideIndex);
  }, 5000);
}

const navLinks = document.querySelectorAll('.nav-links a, .button, .text-link');
navLinks.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    if (window.innerWidth > 820) {
      link.style.transform = 'translateY(-1px)';
    }
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = '';
  });
});

updateSlide(currentSlideIndex);
