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

// ---------- MENU BURGER ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// ---------- TRAÎNÉE DE VAPEUR AU CURSEUR ----------
const canvas = document.getElementById('steamCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function spawnParticle(x, y){
  particles.push({
    x: x + (Math.random() - 0.5) * 14,
    y: y + (Math.random() - 0.5) * 14,
    radius: 6 + Math.random() * 10,
    life: 1,
    speedX: (Math.random() - 0.5) * 1.4,
    speedY: -0.5 - Math.random() * 1.1,
    drift: (Math.random() - 0.5) * 0.02
  });
}

window.addEventListener('mousemove', (e) => {
  // Plusieurs particules par mouvement, dispersées autour du curseur
  for(let i = 0; i < 3; i++){
    spawnParticle(e.clientX, e.clientY);
  }
});

function animateParticles(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.speedX += p.drift;
    p.x += p.speedX;
    p.y += p.speedY;
    p.radius += 0.75;
    p.life -= 0.015;

    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
    gradient.addColorStop(0, `rgba(224, 229, 236, ${p.life * 0.28})`);
    gradient.addColorStop(1, `rgba(224, 229, 236, 0)`);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  });

  particles = particles.filter(p => p.life > 0);

  requestAnimationFrame(animateParticles);
}
animateParticles();