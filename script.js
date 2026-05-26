// Replace with your deployed Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRpgO5An3DEUc5y6KITnGQkczYWKLdSjzcPsgp-XBdE9Z7qvQKaZqgJ-9WX3-g9XtH/exec';

const hasPlusOneCheckbox = document.getElementById('has-plus-one');
const plusOneGroup       = document.getElementById('plus-one-group');
const plusOneInput       = document.getElementById('plus-one-name');
const form               = document.getElementById('rsvp-form');
const submitBtn          = document.getElementById('submit-btn');
const formMsg            = document.getElementById('form-msg');

// Show / hide plus-one name field
hasPlusOneCheckbox.addEventListener('change', () => {
  const checked = hasPlusOneCheckbox.checked;
  plusOneGroup.classList.toggle('hidden', !checked);
  plusOneInput.required = checked;
  if (!checked) plusOneInput.value = '';
});

// RSVP form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const plusOne = plusOneInput.value.trim();

  if (!name || !address) {
    showMsg('Please fill in all required fields.', 'error');
    return;
  }

  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending...';
  formMsg.className     = 'form-msg hidden';

  const payload = { name, address, plusOneName: plusOne };

  try {
    const res  = await fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      body:    JSON.stringify(payload),
    });
    const json = await res.json();

    if (json.status === 'success') {
      showMsg('🎉 You\'re on the list! See you July 4th!', 'success');
      form.reset();
      plusOneGroup.classList.add('hidden');
      plusOneInput.required = false;
    } else {
      throw new Error(json.message || 'Unexpected response');
    }
  } catch (err) {
    showMsg('😟 Something went wrong. Please try again or contact your host.', 'error');
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Count Me In! 🎆';
  }
});

function showMsg(text, type) {
  formMsg.textContent = text;
  formMsg.className   = `form-msg ${type}`;
}
