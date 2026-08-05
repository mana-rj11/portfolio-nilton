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

// ---------- MACHINE À ÉCRIRE : RÔLES ----------
const roles = [
    "Développeur Full Stack",
    "Java · Spring Boot",
    "Angular · TypeScript",
    "PostgreSQL · Firebird"
];

const roleLine = document.getElementById('roleLine');
let roleIdx = 0;
let charIdx = 0;
let deleting = false;

function typeRole(){
    const current = roles[roleIdx];

    if(!deleting){
        charIdx++;
        roleLine.innerHTML = current.slice(0, charIdx) + '<span class="cursor">▌</span';

        if(charIdx === current.length){
            deleting = true;
            setTimeout(typeRole, 1600);
            return;
        }
    } else {
        charIdx--;
        roleLine.innerHTML = current.slice(0, charIdx) + '<span class="cursor">▌</span>';

        if(charIdx == 0){
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }

    setTimeout(typeRole, deleting ? 25 : 55);
}

typeRole();

// ---------- SCROLL REVEAL ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- BOUTON CV (placeholder) ----------
document.getElementById('cvBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert("Ajoute ici le lien vers ton CV en PDF, ex: href='cv-nilton-mana.pdf'");
});