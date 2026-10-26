document.querySelector('#year').textContent = new Date().getFullYear();

const supabaseUrl = 'https://mjksxhimhginciznfksv.supabase.co';
const supabasePublishableKey = 'sb_publishable_FT5nLM-081hjs68xD0dy2A_97cGMK3T';
const purchaseForm = document.querySelector('#purchase-form');
const purchaseEmail = document.querySelector('#purchase-email');
const purchaseButton = document.querySelector('#purchase-button');
const purchaseStatus = document.querySelector('#purchase-status');

function setPurchaseStatus(message, type = '') {
  purchaseStatus.textContent = message;
  purchaseStatus.dataset.type = type;
}

const paymentResult = new URLSearchParams(window.location.search).get('payment');
if (paymentResult === 'success') {
  setPurchaseStatus('Payment received. Your license is being sent by email.', 'success');
} else if (paymentResult === 'cancelled') {
  setPurchaseStatus('Payment cancelled. You were not charged.', 'neutral');
}

purchaseForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = purchaseEmail.value.trim();

  if (!purchaseEmail.checkValidity()) {
    purchaseEmail.reportValidity();
    return;
  }

  purchaseButton.disabled = true;
  purchaseButton.setAttribute('aria-busy', 'true');
  setPurchaseStatus('Opening secure checkout…', 'neutral');

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
      method: 'POST',
      headers: {
        apikey: supabasePublishableKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.url) {
      throw new Error(result.error || 'Checkout is temporarily unavailable.');
    }

    window.location.assign(result.url);
  } catch (error) {
    setPurchaseStatus(error.message || 'Checkout is temporarily unavailable.', 'error');
    purchaseButton.disabled = false;
    purchaseButton.removeAttribute('aria-busy');
  }
});

