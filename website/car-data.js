/**
 * car-data.js — Shared across index.html and product-detail.html
 * Single source of truth for car classes, models, and selection logic.
 */

const WHATSAPP_NUMBER = '918511245666';

const carData = {
  hatchback: {
    label: 'Hatchback',
    models: [
      'Maruti Alto', 'Maruti WagonR', 'Maruti Swift', 'Maruti Baleno',
      'Maruti Celerio', 'Maruti Ignis', 'Hyundai i20', 'Hyundai Grand i10',
      'Hyundai Santro', 'Tata Tiago', 'Tata Altroz', 'Renault Kwid',
      'Honda Jazz', 'Toyota Glanza', 'Volkswagen Polo'
    ]
  },
  sedan: {
    label: 'Sedan',
    models: [
      'Honda City', 'Honda Amaze', 'Hyundai Verna', 'Hyundai Aura',
      'Maruti Dzire', 'Maruti Ciaz', 'Skoda Slavia', 'Volkswagen Virtus',
      'Toyota Yaris', 'Tata Tigor', 'Nissan Sunny', 'Renault Scala'
    ]
  },
  suv: {
    label: 'SUV / MUV',
    models: [
      'Hyundai Creta', 'Hyundai Tucson', 'Kia Seltos', 'Kia Carens', 'Kia Sonet',
      'Maruti Brezza', 'Maruti Grand Vitara', 'Maruti Ertiga', 'Maruti XL6',
      'Toyota Innova', 'Toyota Innova HyCross', 'Toyota Fortuner', 'Toyota Urban Cruiser',
      'Tata Nexon', 'Tata Punch', 'Tata Safari', 'Tata Harrier',
      'Mahindra Scorpio', 'Mahindra Thar', 'Mahindra XUV700', 'Mahindra XUV300',
      'Mahindra Bolero', 'Renault Duster', 'Nissan Kicks', 'Honda WR-V'
    ]
  },
  luxury: {
    label: 'Luxury & Premium',
    models: [
      'Land Rover Defender', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque',
      'BMW 5 Series', 'BMW X1', 'BMW X5', 'BMW 3 Series',
      'Mercedes GLE', 'Mercedes C-Class', 'Mercedes E-Class', 'Mercedes GLC',
      'Audi Q7', 'Audi Q5', 'Audi A4', 'Audi A6',
      'Jaguar F-PACE', 'Jaguar XE', 'Volvo XC90', 'Volvo XC60',
      'Porsche Cayenne', 'Jeep Compass', 'Jeep Meridian'
    ]
  }
};

/** Populate the car-model <select> from carData for a given type key */
function populateModelDropdown(type) {
  const modelEl = document.getElementById('car-model');
  if (!modelEl) return;

  if (!type || !carData[type]) {
    modelEl.innerHTML = '<option value="">— Select Model —</option>';
    return;
  }

  const models = carData[type].models;
  modelEl.innerHTML =
    '<option value="">— Select Model —</option>' +
    models.map(m => `<option value="${m}">${m}</option>`).join('');
}

/** Called when car class dropdown changes */
function onCarTypeChange() {
  const typeEl  = document.getElementById('car-type');
  const luxHint = document.getElementById('luxury-hint');
  const type    = typeEl ? typeEl.value : '';

  populateModelDropdown(type);

  if (luxHint) luxHint.style.display = (type === 'luxury') ? 'block' : 'none';

  // Homepage: keep state in sync
  if (typeof state !== 'undefined') {
    state.size    = type || null;
    state.product = type ? 'inside' : null;
    if (type && typeof products !== 'undefined' && products['inside']) {
      products['inside'].price = type === 'luxury' ? 1119 : 899;
    }
    const sumProduct = document.getElementById('sum-product');
    if (sumProduct && typeof updateSummary === 'function') updateSummary();
  }

  // Product detail: update WhatsApp link
  if (typeof updateDetailWhatsAppLink === 'function') updateDetailWhatsAppLink();
}

/** Called when car model dropdown changes */
function onCarModelChange() {
  const modelEl = document.getElementById('car-model');
  if (!modelEl || !modelEl.value) return;

  // Homepage multi-step form
  const detailsCard = document.getElementById('card-details');
  if (detailsCard) {
    detailsCard.classList.remove('locked');
    const summaryCard = document.getElementById('card-summary');
    if (summaryCard) summaryCard.classList.remove('locked');
    const stickyCta = document.getElementById('sticky-cta');
    if (stickyCta) stickyCta.classList.remove('locked');
    const stepNum = document.getElementById('step2-num');
    if (stepNum) { stepNum.classList.add('done'); stepNum.textContent = '✓'; }
    if (typeof formUnlocked !== 'undefined') window.formUnlocked = true;
    if (typeof updateSummary === 'function') updateSummary();
    if (typeof preorderScrollTo === 'function') setTimeout(() => preorderScrollTo('card-details'), 200);
  }

  // Product detail: update WhatsApp link
  if (typeof updateDetailWhatsAppLink === 'function') updateDetailWhatsAppLink();
}

/** Updates the WhatsApp CTA on the product detail page */
function updateDetailWhatsAppLink() {
  const btn     = document.getElementById('wa-detail-btn');
  if (!btn) return;
  const type    = (document.getElementById('car-type')  || {}).value || '';
  const model   = (document.getElementById('car-model') || {}).value || '';
  let msg = "Hi, I'm interested in the Suncraft Foldable Panel Sunshade.";
  if (type && model) {
    msg += ` I have a ${carData[type].label} (${model}). Please share details and pricing.`;
  } else if (type) {
    msg += ` I have a ${carData[type].label}. Please share details and pricing.`;
  }
  btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
