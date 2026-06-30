/* Shared unlock for the password-protected developer guides.
   Content is AES-256-GCM encrypted; the key is derived from the password via
   PBKDF2 (SHA-256, 210k iterations). A wrong password fails GCM auth → no content
   is ever exposed in the page source. Params MUST match dev/encrypt.js. */
(function () {
  var ITER = 210000;

  function b64ToBytes(b64) {
    var bin = atob(b64), a = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return a;
  }

  async function deriveKey(password, salt) {
    var km = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: salt, iterations: ITER, hash: 'SHA-256' },
      km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
  }

  async function decryptContent(password) {
    var enc = window.__ENC__ || '';
    var parts = enc.split('.');
    if (parts.length !== 3) throw new Error('no payload');
    var salt = b64ToBytes(parts[0]), iv = b64ToBytes(parts[1]), ct = b64ToBytes(parts[2]);
    var key = await deriveKey(password, salt);
    var buf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct); // throws on wrong pw
    return new TextDecoder().decode(buf);
  }

  function initDoc() {
    var tt = document.getElementById('toTop');
    if (tt) {
      window.addEventListener('scroll', function () { tt.classList.toggle('show', window.scrollY > 500); });
      tt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('pw');
    var btn = document.getElementById('unlockBtn');
    var errEl = document.getElementById('lockErr');
    var lock = document.getElementById('lock');
    var doc = document.getElementById('doc');
    if (!input || !btn || !doc) return;

    async function tryUnlock(silent) {
      var pw = input.value || '';
      if (!pw) return;
      btn.disabled = true; errEl.textContent = ''; btn.textContent = 'Unlocking…';
      try {
        var html = await decryptContent(pw);
        doc.innerHTML = html;
        lock.style.display = 'none';
        doc.style.display = 'block';
        try { sessionStorage.setItem('cc_dev_pw', pw); } catch (e) {}
        initDoc();
        window.scrollTo(0, 0);
      } catch (e) {
        if (!silent) errEl.textContent = 'Incorrect password. Try again.';
        try { sessionStorage.removeItem('cc_dev_pw'); } catch (e2) {}
        btn.disabled = false; btn.textContent = 'Unlock';
        input.value = silent ? input.value : '';
        input.focus();
      }
    }

    btn.addEventListener('click', function () { tryUnlock(false); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(false); });

    // Stay unlocked for the browser session
    try {
      var saved = sessionStorage.getItem('cc_dev_pw');
      if (saved) { input.value = saved; tryUnlock(true); }
    } catch (e) {}
    input.focus();
  });
})();
