const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const textarea = document.querySelector('#chatInput');
const form = document.querySelector('#chatForm');
const messages = document.querySelector('#messages');
const newChatBtn = document.querySelector('#newChatBtn');

let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
root.setAttribute('data-theme', theme);

function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
}

function autoresize() {
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
}

function appendMessage(role, text) {
  const wrap = document.createElement('article');
  wrap.className = `message ${role}`;
  wrap.innerHTML = `
    <div class="message-label">${role === 'user' ? 'You' : 'Bakery Intel Agent'}</div>
    <div class="bubble"><p>${text}</p></div>
  `;
  messages.appendChild(wrap);
  wrap.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function mockReply(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes('anna nagar')) {
    return 'Anna Nagar looks promising because it combines strong demand visibility, dense residential catchments, and easier competitor benchmarking with a map-first review.';
  }
  if (lower.includes('price') || lower.includes('pricing')) {
    return 'I would compare bakery product pricing from BigQuery first, then overlay nearby premium and budget competitors in Maps before recommending a positioning band.';
  }
  return 'I can combine bakery sales signals, local competition, and route context into one recommendation. Try asking about a locality, store format, or product pricing strategy.';
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (textarea) {
  textarea.addEventListener('input', autoresize);
  autoresize();
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = textarea.value.trim();
    if (!value) return;
    appendMessage('user', value);
    textarea.value = '';
    autoresize();
    setTimeout(() => appendMessage('assistant', mockReply(value)), 500);
  });
}

if (newChatBtn) {
  newChatBtn.addEventListener('click', () => {
    messages.innerHTML = `
      <article class="message assistant">
        <div class="message-label">Bakery Intel Agent</div>
        <div class="bubble"><p>New workspace ready. Ask about locations, pricing, foot traffic, or bakery sales patterns.</p></div>
      </article>
    `;
  });
}
