import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFAQ();
  initScrollAnimation();
  initCTAButtons();
  initStatsCounter();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}

function initScrollAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.curriculum-card, .benefit-item, .pricing-card'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

function initCTAButtons() {
  const ctaButtons = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-nav'
  );

  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (!button.closest('a')) {
        e.preventDefault();

        const modal = createModal();
        document.body.appendChild(modal);

        setTimeout(() => {
          modal.classList.add('show');
        }, 10);
      }
    });
  });
}

function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <h2>¡Comienza tu Carrera Hoy!</h2>
      <p>Completa el formulario para inscribirte al curso</p>
      <form class="enrollment-form">
        <input type="text" placeholder="Nombre completo" required>
        <input type="email" placeholder="Email" required>
        <input type="tel" placeholder="Teléfono (opcional)">
        <button type="submit" class="btn-primary btn-large btn-block">
          Inscribirme Ahora
        </button>
      </form>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal.show {
      opacity: 1;
      visibility: visible;
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
    }

    .modal-content {
      position: relative;
      background: white;
      border-radius: 16px;
      padding: 48px;
      max-width: 500px;
      width: 90%;
      z-index: 1;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }

    .modal.show .modal-content {
      transform: scale(1);
    }

    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 32px;
      cursor: pointer;
      color: #6b7280;
      line-height: 1;
      padding: 8px;
      transition: color 0.3s ease;
    }

    .modal-close:hover {
      color: #1f2937;
    }

    .modal-content h2 {
      font-size: 28px;
      margin-bottom: 12px;
      color: #1f2937;
    }

    .modal-content p {
      color: #6b7280;
      margin-bottom: 32px;
    }

    .enrollment-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .enrollment-form input {
      padding: 14px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s ease;
      font-family: inherit;
    }

    .enrollment-form input:focus {
      outline: none;
      border-color: #2563eb;
    }
  `;
  document.head.appendChild(style);

  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  const form = modal.querySelector('.enrollment-form');

  const closeModal = () => {
    modal.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Pronto recibirás más información.');
    closeModal();
  });

  return modal;
}

function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCount = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          if (target) {
            animateCount(stat, target);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}
