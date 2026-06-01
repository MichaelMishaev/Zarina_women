const year = document.querySelector('[data-current-year]');
if (year) year.textContent = new Date().getFullYear().toString();

// Paste your Google Apps Script web app URL here after deployment
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwHYGUToZ5tVOEdvoyRoBZ9ngW3uQTgOWtwuoMTCKNHhbYWqhkGyRcePwblTGCoLrdYLw/exec';

const form = document.getElementById('register-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const success = form.querySelector('.form-success');
    const error = form.querySelector('.form-error');

    btn.disabled = true;
    btn.querySelector('.cta-main').textContent = 'שולח...';

    try {
      const params = new URLSearchParams(new FormData(form));
      await fetch(SHEET_URL + '?' + params.toString(), { mode: 'no-cors' });
      form.querySelector('.form-footer').hidden = true;
      Array.from(form.querySelectorAll('fieldset')).forEach(f => (f.hidden = true));
      success.hidden = false;
    } catch {
      error.hidden = false;
      btn.disabled = false;
      btn.querySelector('.cta-main').textContent = 'שליחת הטופס';
    }
  });
}
