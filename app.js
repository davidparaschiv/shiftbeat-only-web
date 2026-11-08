document.querySelector('#year').textContent = new Date().getFullYear();

const supabaseUrl = 'https://mjksxhimhginciznfksv.supabase.co';
const supabasePublishableKey = 'sb_publishable_FT5nLM-081hjs68xD0dy2A_97cGMK3T';
const purchaseForm = document.querySelector('#purchase-form');
const purchaseEmail = document.querySelector('#purchase-email');
const purchaseButton = document.querySelector('#purchase-button');
const purchaseStatus = document.querySelector('#purchase-status');
const country = document.querySelector('#billing-country');
const roCity = document.querySelector('#billing-ro-city');
const externalCity = document.querySelector('#billing-city');
const catalogStatus = document.querySelector('#billing-catalog-status');
const retry = document.querySelector('#billing-retry');
let countriesReady = false;
let citiesReady = false;
let cityController;
let checkoutBusy = false;

function setPurchaseStatus(message, type = '') {
  purchaseStatus.textContent = message;
  purchaseStatus.dataset.type = type;
}
function updateSubmit() {
  purchaseButton.disabled = checkoutBusy || !countriesReady || !country.value || (country.value === 'RO' && !citiesReady);
}
function placeholder(select, label) {
  select.replaceChildren(new Option(label, ''));
}
async function catalog(name, signal) {
  const response = await fetch(`${supabaseUrl}/functions/v1/${name}`, { signal });
  const result = await response.json();
  if (!response.ok || !Array.isArray(result)) throw new Error('Catalogue unavailable');
  return result;
}
async function loadCountries() {
  countriesReady = false;
  country.disabled = true;
  catalogStatus.textContent = '';
  retry.hidden = true;
  updateSubmit();
  try {
    const rows = await catalog('get-countries');
    if (!rows.length || rows.some(row => !/^[A-Z]{2}$/.test(row.code) || typeof row.name !== 'string')) throw new Error('Invalid countries');
    placeholder(country, 'Select your country');
    rows.forEach(row => country.add(new Option(row.name, row.code)));
    countriesReady = true;
    country.disabled = false;
  } catch {
    placeholder(country, 'Countries unavailable');
    catalogStatus.textContent = 'We couldn’t load the countries. Please try again.';
    retry.hidden = false;
  }
  updateSubmit();
}
async function updateCountry() {
  cityController?.abort();
  const isRO = country.value === 'RO';
  roCity.hidden = !isRO;
  roCity.required = isRO;
  roCity.disabled = true;
  externalCity.hidden = isRO;
  externalCity.required = Boolean(country.value) && !isRO;
  externalCity.disabled = !country.value || isRO;
  externalCity.placeholder = country.value ? 'Your city' : 'Select a country first';
  document.querySelector('label[for="billing-city"], label[for="billing-ro-city"]').htmlFor = isRO ? 'billing-ro-city' : 'billing-city';
  catalogStatus.textContent = '';
  retry.hidden = true;
  updateSubmit();
  if (!isRO) return;
  if (citiesReady) { roCity.disabled = false; updateSubmit(); return; }
  placeholder(roCity, 'Loading cities…');
  const controller = new AbortController();
  cityController = controller;
  try {
    const rows = await catalog('get-cities', controller.signal);
    if (controller.signal.aborted) return;
    if (!rows.length || rows.some(row => !Number.isInteger(row.id) || typeof row.name !== 'string' || typeof row.county !== 'string')) throw new Error('Invalid cities');
    placeholder(roCity, 'Select your city');
    rows.forEach(row => roCity.add(new Option(`${row.name} · ${row.county}`, String(row.id))));
    citiesReady = true;
    roCity.disabled = false;
  } catch {
    if (controller.signal.aborted) return;
    placeholder(roCity, 'Cities unavailable');
    catalogStatus.textContent = 'We couldn’t load the Romanian cities. Please try again.';
    retry.hidden = false;
  }
  updateSubmit();
}
country.addEventListener('change', updateCountry);
retry.addEventListener('click', () => countriesReady ? updateCountry() : loadCountries());

const paymentResult = new URLSearchParams(window.location.search).get('payment');
if (paymentResult === 'success') setPurchaseStatus('Payment received. Your license is being sent by email.', 'success');
else if (paymentResult === 'cancelled') setPurchaseStatus('Payment cancelled. You were not charged.', 'neutral');

purchaseForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (purchaseButton.disabled) return;
  if (!purchaseForm.checkValidity()) { purchaseForm.reportValidity(); return; }
  const input = (id) => document.querySelector(id).value.trim();
  const billing = {
    first_name: input('#billing-first-name'), last_name: input('#billing-last-name'),
    address: input('#billing-address'), country: country.value,
    city_id: country.value === 'RO' ? Number(roCity.value) : null,
    city: country.value === 'RO' ? null : externalCity.value.trim(),
  };
  if (!billing.first_name || !billing.last_name || !billing.address || (billing.country !== 'RO' && !billing.city)) {
    setPurchaseStatus('Please complete your billing details.', 'error'); return;
  }
  checkoutBusy = true;
  updateSubmit();
  purchaseButton.setAttribute('aria-busy', 'true');
  setPurchaseStatus('Opening secure checkout…', 'neutral');
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
      method: 'POST', headers: { apikey: supabasePublishableKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: purchaseEmail.value.trim(), billing }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.url) throw new Error(result.error || 'Checkout is temporarily unavailable.');
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
loadCountries();
