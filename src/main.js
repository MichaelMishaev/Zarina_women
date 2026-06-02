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
    btn.classList.add('is-loading');
    btn.querySelector('.cta-main').textContent = 'שולח...';

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(new FormData(form)),
      });
      form.querySelector('.form-footer').hidden = true;
      Array.from(form.querySelectorAll('fieldset')).forEach(f => (f.hidden = true));
      success.hidden = false;
    } catch {
      error.hidden = false;
      btn.disabled = false;
      btn.classList.remove('is-loading');
      btn.querySelector('.cta-main').textContent = 'שליחת הטופס';
    }
  });
}
