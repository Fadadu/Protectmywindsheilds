// WHATSAPP_NUMBER is defined in car-data.js

const products = {
  umbrella: {
    name: 'Umbrella Sunshade',
    icon: '',
    price: 1299,
    rating: 4.3,
    reviews: 62,
    images: [
      'images/umbrella-shade/1.png',
      'images/umbrella-shade/2.png',
      'images/umbrella-shade/3.png',
      'images/umbrella-shade/4.png',
      'images/umbrella-shade/5.png',
      'images/umbrella-shade/6.png'
    ],
    desc: 'Opens like an umbrella and shields your windshield in seconds, helping reduce heat buildup inside your car so you return to a cooler, more comfortable interior.',
    features: ['10-second setup', 'Premium UV protection', 'Easy to store in door', 'Custom fit for your car']
  },
  inside: {
    name: 'Foldable Panel Sunshade',
    icon: '',
    price: 899,
    rating: 4.5,
    reviews: 85,
    images: [
      'images/foldable-panel-shade/1.png',
      'images/foldable-panel-shade/2.png',
      'images/foldable-panel-shade/3.png',
      'images/foldable-panel-shade/4.png',
      'images/foldable-panel-shade/5.png',
      'images/foldable-panel-shade/6.png',
      'images/foldable-panel-shade/7.png'
    ],
    desc: 'Thick, padded sunshade with structured folding panels. Ideal for long-term daily parking under intense heat.',
    features: ['Heavy-duty thermal block', '3-layer protection', 'Structured fit', 'Easy to use and fold']
  },
  outside: {
    name: 'Exterior Windshield Cover',
    icon: '',
    price: 499,
    rating: 4.2,
    reviews: 41,
    images: [
      'images/outside-cover/1.png',
      'images/outside-cover/2.png',
      'images/outside-cover/3.png',
      'images/outside-cover/4.png',
      'images/outside-cover/5.png',
      'images/outside-cover/6.png'
    ],
    desc: 'External shield that secures inside door jams. Blocks heat before it even touches the glass.',
    features: ['Complete coverage', 'Multi-layer fabric blocks sun, dust & frost', 'Side mirror slots', 'Anti-theft door flaps']
  }
};

const sizeLabels = {
  hatchback: 'Hatchback',
  sedan: 'Sedan',
  suv: 'SUV / MUV',
  luxury: 'Luxury & Premium',
  other: 'Not Sure'
};

let state = { product: null, size: null };
let formUnlocked = false;
let pendingOrder = null;

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.3 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function showProductDetail(key) {
  const p = products[key];
  const card = document.getElementById('product-detail');

  document.getElementById('detail-name').textContent = p.name;
  document.getElementById('detail-price').textContent = '₹' + p.price.toLocaleString('en-IN');
  document.getElementById('detail-desc').textContent = p.desc;

  const ratingEl = card.querySelector('.detail-rating');
  ratingEl.innerHTML = `<span class="detail-stars">${renderStars(p.rating)}</span><span class="detail-rating-text">(${p.rating}/5) ${p.reviews}+ Reviews</span>`;

  document.getElementById('detail-features').innerHTML = p.features.map(f =>
    `<div class="detail-feature"><span class="df-tick">✓</span>${f}</div>`
  ).join('');

  const imgMain = document.getElementById('detail-img-main');
  const imgPlaceholder = document.getElementById('detail-img-placeholder');

  const firstImg = p.images[0];
  imgMain.src = firstImg;
  imgMain.alt = p.name;
  imgMain.style.display = 'block';
  imgMain.onerror = () => {
    imgMain.style.display = 'none';
    imgPlaceholder.textContent = p.icon;
    imgPlaceholder.style.display = 'flex';
  };
  imgPlaceholder.style.display = 'none';

  document.getElementById('detail-thumbs').innerHTML = p.images.map((img, i) =>
    `<img class="detail-thumb${i === 0 ? ' active' : ''}" src="${img}" alt="View ${i + 1}"
      onclick="document.querySelectorAll('.detail-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active'); document.getElementById('detail-img-main').src='${img}'">`
  ).join('');

  card.classList.add('visible');
}

function selectProduct(el, autoSelect = false) {
  document.querySelectorAll('.product-tile').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  state.product = el.dataset.product;

  showProductDetail(state.product);

  document.getElementById('card-size').classList.remove('locked');
  document.getElementById('step1-num').classList.add('done');
  document.getElementById('step1-num').textContent = '✓';

  updateSummary();
  updateProgress();
  if (!autoSelect) {
    setTimeout(() => preorderScrollTo('product-detail'), 200);
  }
}

function selectSize(el) {
  document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  state.size = el.dataset.size;

  document.getElementById('card-details').classList.remove('locked');
  document.getElementById('card-summary').classList.remove('locked');
  document.getElementById('sticky-cta').classList.remove('locked');
  document.getElementById('step2-num').classList.add('done');
  document.getElementById('step2-num').textContent = '✓';
  formUnlocked = true;

  updateSummary();
  updateProgress();
  setTimeout(() => preorderScrollTo('card-details'), 200);
}

function updateSummary() {
  const p = state.product ? products[state.product] : null;

  const sp = document.getElementById('sum-product');
  sp.textContent = p ? p.name : '—';
  sp.className = 'sr-val' + (p ? '' : ' empty');

  const ss = document.getElementById('sum-size');
  ss.textContent = state.size ? sizeLabels[state.size] : '—';
  ss.className = 'sr-val' + (state.size ? '' : ' empty');

  const total = p ? p.price : null;
  const st = document.getElementById('sum-total');
  const ctaPrice = document.getElementById('cta-price');

  if (total) {
    st.textContent = '₹' + total.toLocaleString('en-IN');
    ctaPrice.textContent = '₹' + total.toLocaleString('en-IN');
    ctaPrice.className = 'cta-price-val';
  } else {
    st.textContent = '₹—';
    ctaPrice.textContent = 'Select a product to start';
    ctaPrice.className = 'cta-price-val empty';
  }

  document.getElementById('btn-reserve').disabled = !(state.product && state.size);
}

function updateProgress() {
  // Progress bar removed by request.
}

function preorderScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validate() {
  let ok = true;
  const name = document.getElementById('f-name');
  const phone = document.getElementById('f-phone');
  const email = document.getElementById('f-email');
  const area = document.getElementById('f-area');

  if (!name.value.trim()) { name.classList.add('error'); ok = false } else name.classList.remove('error');
  if (!/^\d{10}$/.test(phone.value.replace(/\s/g, ''))) { phone.classList.add('error'); ok = false } else phone.classList.remove('error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add('error'); ok = false } else email.classList.remove('error');
  if (!area.value.trim()) { area.classList.add('error'); ok = false } else area.classList.remove('error');

  return ok;
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function openPaymentModal() {
  openModal('payment-modal');
}

function closePaymentModal() {
  closeModal('payment-modal');
}

function openConfirmModal() {
  openModal('confirm-modal');
}

function closeConfirmModal() {
  closeModal('confirm-modal');
}

function buildOrder() {
  const p = products[state.product];
  return {
    product: p,
    name: document.getElementById('f-name').value.trim(),
    phone: document.getElementById('f-phone').value.replace(/\s/g, ''),
    email: document.getElementById('f-email').value.trim(),
    area: document.getElementById('f-area').value.trim(),
    note: document.getElementById('f-note').value.trim(),
    carSize: sizeLabels[state.size],
    total: p.price,
  };
}

function buildWhatsAppMessage(order, paymentMode) {
  return encodeURIComponent(
    `*New Order — Suncraft*\n\n` +
    `Name: ${order.name}\n` +
    `Phone: ${order.phone}\n` +
    `Email: ${order.email}\n` +
    `Product: ${order.product.name}\n` +
    `Car Size: ${order.carSize}\n` +
    (order.note ? `Note: ${order.note}\n` : '') +
    `Total: ₹${order.total.toLocaleString('en-IN')}\n` +
    `Payment: ${paymentMode}\n\n` +
    `Please confirm my order!`
  );
}

async function submitToFormspree(order, paymentMode) {
  const formData = {
    name: order.name,
    phone: order.phone,
    email: order.email,
    area: order.area,
    product: order.product.name,
    carSize: order.carSize,
    note: order.note,
    total: '₹' + order.total.toLocaleString('en-IN'),
    paymentMode,
  };

  try {
    await fetch('https://formspree.io/f/xlgzeege', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
      keepalive: true,
    });
  } catch (err) {
    console.error('Formspree error:', err);
  }
}

function showSuccess(order, paymentMode) {
  const rows = [
    { l: 'Name', v: order.name },
    { l: 'Product', v: order.product.name },
    { l: 'Car Size', v: order.carSize },
    { l: 'Area', v: order.area },
    { l: 'Total', v: '₹' + order.total.toLocaleString('en-IN') },
    { l: 'Payment', v: paymentMode },
  ];
  const summaryContainer = document.getElementById('success-detail');
  summaryContainer.innerHTML = ''; // Clear previous
  rows.forEach(r => {
    const row = document.createElement('div');
    row.className = 'success-detail-row';

    const label = document.createElement('span');
    label.className = 'dr-label';
    label.textContent = r.l;

    const val = document.createElement('span');
    val.className = 'dr-val';
    val.textContent = r.v;

    row.appendChild(label);
    row.appendChild(val);
    summaryContainer.appendChild(row);
  });

  const msg = buildWhatsAppMessage(order, paymentMode);
  document.getElementById('success-wa').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

  document.querySelector('.success-title').textContent = "Order Confirmed!";
  document.querySelector('.success-sub').textContent = "Your order is confirmed. We'll message you shortly.";

  document.getElementById('main-form').style.display = 'none';
  document.getElementById('success-screen').style.display = 'block';
  document.getElementById('sticky-cta').style.display = 'none';
}

function choosePayLater() {
  if (!pendingOrder) return;
  closePaymentModal();
  const order = pendingOrder;
  pendingOrder = null;
  const paymentMode = 'Pay Later (COD)';
  showSuccess(order, paymentMode);
  submitToFormspree(order, paymentMode);
  openConfirmModal();
}

function choosePayNow() {
  if (!pendingOrder) return;
  closePaymentModal();
  const order = pendingOrder;
  pendingOrder = null;
  const paymentMode = 'Pay Now (Online)';
  submitToFormspree(order, paymentMode);
  const msg = buildWhatsAppMessage(order, paymentMode);
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

async function handleReserve() {
  if (!formUnlocked) return;
  if (!validate()) {
    preorderScrollTo('card-details');
    return;
  }

  pendingOrder = buildOrder();
  openPaymentModal();
}

// --- Shared UI Logic ---

window.addEventListener('load', function () {
  if (window.location.hash) {
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }

  // Auto-select the foldable product
  const onlyProduct = document.querySelector('.product-tile[data-product="inside"]');
  if (onlyProduct) {
    selectProduct(onlyProduct, true);
  }
});

function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navMenu').classList.remove('open');
}

function toggleFaq(btn) {
  const ans = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.style.display = 'none';
  });
  if (!isOpen) {
    btn.classList.add('open');
    ans.style.display = 'block';
    if (window.posthog) posthog.capture('faq_viewed', { question: btn.innerText.replace('▼', '').trim() });
  }
}

// --- Auth Modal Logic ---
function openAuthModal() {
  const m = document.getElementById('auth-modal');
  if (m) { m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); }
}
function closeAuthModal() {
  const m = document.getElementById('auth-modal');
  if (m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); }
}
function mockGoogleLogin() {
  closeAuthModal();
  alert('Successfully signed in with Google!');
  const authBtn = document.getElementById('auth-btn');
  if (authBtn) {
    authBtn.textContent = 'SC Account';
    authBtn.style.background = 'var(--white)';
    authBtn.style.color = 'var(--sky)';
  }
}
function toggleAuth(e) {
  if (e) e.preventDefault();
  openAuthModal();
}

