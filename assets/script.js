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

// Service Modal Functions (Global Scope)
const serviceDetails = {
    'term': {
        title: 'Term Insurance',
        desc: 'Pure protection plans ensuring extremely high coverage at a minimal premium to protect your loved ones.',
        icon: 'shield'
    },
    'endowment': {
        title: 'Endowment Plans',
        desc: 'A balanced combination of life protection and assured savings for your future capital needs.',
        icon: 'trending-up'
    },
    'health': {
        title: 'Health Plans',
        desc: 'Comprehensive medical coverage guarding your finances against unforeseen healthcare emergencies.',
        icon: 'heart'
    },
    'child': {
        title: 'Child Plans',
        desc: "Secure your child's higher education and marriage expenses with guaranteed returns.",
        icon: 'user'
    }
};

window.openServiceModal = function(type) {
    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('service-modal-content');
    if(!modal) return;
    
    const details = serviceDetails[type];
    if(details) {
        document.getElementById('modal-title').innerText = details.title;
        document.getElementById('modal-desc').innerText = details.desc;
        const iconEl = document.getElementById('modal-feather-icon');
        iconEl.setAttribute('data-feather', details.icon);
        if(typeof feather !== 'undefined') feather.replace();
    }
    
    modal.classList.remove('hidden');
    // small delay for transition
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

window.closeServiceModal = function() {
    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('service-modal-content');
    if(!modal) return;
    
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Plan Modal Logic
const planData = {
    '732': { title: 'New Children MoneyBack (Plan 732)', type: 'Children Plan', desc: 'A specially designed plan to meet the educational, marriage and other needs of growing children through survival benefits.' },
    '734': { title: 'Jeevan Tarun (Plan 734)', type: 'Children Plan', desc: 'A participating non-linked limited premium payment plan which offers an attractive combination of protection and saving features for children.' },
    '774': { title: 'Amrit Baal (Plan 774)', type: 'Children Plan', desc: 'Designed to ensure the child\'s higher education or start-up needs are met with guaranteed additions.' },
    '745': { title: 'Jeevan Umang (Plan 745)', type: 'WholeLife Plan', desc: 'Offers income and protection to your family. This plan provides for annual survival benefits from the end of the premium paying term till maturity and a lump sum payment at the time of maturity or on survival to age 100.' },
    '771': { title: 'Jeevan Utsav (Plan 771)', type: 'WholeLife Plan', desc: 'A non-linked, non-participating, individual, savings, whole life insurance plan providing guaranteed lifelong income.' },
    '883': { title: 'Jeevan Utsav SinglePremium (Plan 883)', type: 'WholeLife Plan', desc: 'A single premium version of Jeevan Utsav offering guaranteed lifelong returns and whole life insurance cover with one-time investment.' },
    '717': { title: 'Single Premium Endowment (Plan 717)', type: 'Single Premium Plan', desc: 'A participating non-linked savings cum protection plan, where premium is paid in lump sum at the outset.' },
    '888': { title: 'New Jeevan Sathi (Plan 888)', type: 'Single Premium Plan', desc: 'A single premium joint life insurance plan providing cover for both lives with assured returns.' },
    '758': { title: 'Jeevan Shanti (Plan 758)', type: 'Pension Plan', desc: 'A single premium plan wherein the policyholder has an option to choose an immediate or deferred annuity.' },
    '857': { title: 'Jeevan Akshay (Plan 857)', type: 'Pension Plan', desc: 'An immediate annuity plan, which can be purchased by paying a lump sum amount. Provides for annuity payments of a stated amount throughout the lifetime of the annuitant.' },
    '879': { title: 'Smart Pension (Plan 879)', type: 'Pension Plan', desc: 'A modern pension solution designed to build a retirement corpus and provide steady income.' },
    '955': { title: 'New Jeevan Amar (Plan 955)', type: 'Term Plan', desc: 'A non-linked, non-participating, life term assurance plan which provides financial protection to the insured\'s family in case of unfortunate death.' },
    '875': { title: 'Yuva Term (Plan 875)', type: 'Term Plan', desc: 'An affordable term plan specifically targeted at young professionals to secure their family\'s future at lowest premiums.' },
    '887': { title: 'Bima Kavach (Plan 887)', type: 'Term Plan', desc: 'A simple term protection plan providing a safety net to the family with high life cover at low cost.' },
    '873': { title: 'Index Plus (Plan 873)', type: 'ULIP Plan', desc: 'A unit-linked, non-participating individual life insurance plan offering life cover combined with market-linked investment returns.' },
    '886': { title: 'Protection Plus (Plan 886)', type: 'ULIP Plan', desc: 'A dual benefit plan offering robust life insurance protection along with opportunities for wealth creation through equity markets.' }
};

window.openPlanModal = function(planId) {
    const modal = document.getElementById('plan-modal');
    const modalContent = document.getElementById('plan-modal-content');
    if(!modal) return;
    
    const details = planData[planId];
    if(details) {
        document.getElementById('plan-modal-title').innerText = details.title;
        document.getElementById('plan-modal-type').innerText = details.type;
        document.getElementById('plan-modal-desc').innerText = details.desc;
    }
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

window.closePlanModal = function() {
    const modal = document.getElementById('plan-modal');
    const modalContent = document.getElementById('plan-modal-content');
    if(!modal) return;
    
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}
