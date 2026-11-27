document.querySelector('#year').textContent = new Date().getFullYear();

const supabaseUrl = 'https://mjksxhimhginciznfksv.supabase.co';
const supabasePublishableKey = 'sb_publishable_FT5nLM-081hjs68xD0dy2A_97cGMK3T';
const purchaseForm = document.querySelector('#purchase-form');
const purchaseEmail = document.querySelector('#purchase-email');
const purchaseButton = document.querySelector('#purchase-button');
const billingYearly = document.querySelector('#billing-yearly');
function updatePlan() {
  document.querySelector('#subscription-price').textContent = billingYearly.checked ? '€200 per year' : '€25 per month';
  document.querySelector('#subscribe-label').textContent = billingYearly.checked ? 'Subscribe · €200/year' : 'Subscribe · €25/month';
  document.querySelector('#yearly-discount').hidden = !billingYearly.checked;
}
billingYearly.addEventListener('change', updatePlan);
updatePlan();
const purchaseStatus = document.querySelector('#purchase-status');
let checkoutBusy = false;

function setPurchaseStatus(message, type = '') {
  purchaseStatus.textContent = message;
  purchaseStatus.dataset.type = type;
}
function updateSubmit() {
  billingYearly.disabled = checkoutBusy;
  purchaseButton.disabled = checkoutBusy;
}

const paymentResult = new URLSearchParams(window.location.search).get('payment');
if (paymentResult === 'success') setPurchaseStatus('Payment received. Your license is being sent by email.', 'success');
else if (paymentResult === 'already-active') setPurchaseStatus('You already have a subscription active. Check manage subscription.', 'success');
else if (paymentResult === 'cancelled') setPurchaseStatus('Payment cancelled. You were not charged.', 'neutral');

purchaseForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (purchaseButton.disabled) return;
  if (!purchaseForm.checkValidity()) { purchaseForm.reportValidity(); return; }
  checkoutBusy = true;
  updateSubmit();
  purchaseButton.setAttribute('aria-busy', 'true');
  setPurchaseStatus('Opening secure checkout…', 'neutral');
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
      method: 'POST', headers: { apikey: supabasePublishableKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: purchaseEmail.value.trim(), plan: billingYearly.checked ? 'yearly' : 'monthly' }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.url) throw new Error(result.error || 'Checkout is temporarily unavailable.');
    if (billingYearly.checked && result.plan !== 'yearly') throw new Error('Yearly checkout is temporarily unavailable. Please try again later.');
    const target = new URL(result.url);
    if (target.protocol !== 'https:') throw new Error('Invalid checkout address.');
    window.location.assign(target.href);
  } catch (error) {
    setPurchaseStatus(error.message || 'Checkout is temporarily unavailable.', 'error');
    checkoutBusy = false;
    purchaseButton.removeAttribute('aria-busy');
    updateSubmit();
  }
});
updateSubmit();
