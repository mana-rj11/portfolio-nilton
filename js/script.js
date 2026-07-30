// ---------- SPLIT-FLAP BOARD ----------
const boardEl = document.getElementById('flapBoard');
const target = "NILTON MANA";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const flapEls = [];

// 1 générer une "case" (div) par lettre du nom
target.split("").forEach(ch => {
    const el = document.createElement('div');
    el.className = 'flap' + (ch == ' ' ? ' space' : '');
    el.textContent = ch === ' ' ? '' : ch;
    boardEl.appendChild(el);
    flapEls.push(el);
});