document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Calculator Logic (if on calculators page)
  const calcBtn = document.getElementById('calculate-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const principal = parseFloat(document.getElementById('principal').value) || 0;
      const rate = parseFloat(document.getElementById('rate').value) || 0;
      const years = parseFloat(document.getElementById('years').value) || 0;

      const amount = principal * Math.pow((1 + (rate / 100)), years);

      document.getElementById('result-amount').innerText = '₹ ' + amount.toFixed(2);
    });
  }

  // Contact Form Submission (if on contact page)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const serviceRequired = document.getElementById('serviceRequired').value;
      const message = document.getElementById('message').value;

      const text = `Hello Sunil Kumar Pandey,\n\nI would like to request a consultation. Here are my details:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Required:* ${serviceRequired}\n*Message:* ${message}`;
      const whatsappUrl = `https://wa.me/919669484612?text=${encodeURIComponent(text)}`;

      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    });
  }


  // Plan Filtering and Search Logic (if on plans page)
  const searchInput = document.getElementById('plan-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const planCards = document.querySelectorAll('.plan-card');

  if (searchInput && filterBtns.length > 0 && planCards.length > 0) {
    const filterPlans = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

      planCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || category === activeFilter;

        if (matchesSearch && matchesFilter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    };

    searchInput.addEventListener('input', filterPlans);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPlans();
      });
    });
  }

  // Initialize AOS if it exists
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});
