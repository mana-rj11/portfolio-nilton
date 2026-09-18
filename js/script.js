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

// ---------- COMPÉTENCES : DONNÉES ----------
const skills = [
  { name: "Java", category: "backend", icon: "openjdk", url: "https://www.java.com" },
  { name: "Spring Boot", category: "backend", icon: "springboot", url: "https://spring.io/projects/spring-boot" },
  { name: "Hibernate / JPA", category: "backend", icon: "hibernate", url: "https://hibernate.org" },
  { name: "Python", category: "backend", icon: "python", url: "https://www.python.org" },
  { name: "Angular", category: "frontend", icon: "angular", url: "https://angular.dev" },
  { name: "TypeScript", category: "frontend", icon: "typescript", url: "https://www.typescriptlang.org" },
  { name: "RxJS", category: "frontend", icon: "reactivex", url: "https://rxjs.dev" },
  { name: "PostgreSQL", category: "database", icon: "postgresql", url: "https://www.postgresql.org" },
  { name: "Firebird", category: "database", icon: "firebird", url: "https://firebirdsql.org" },
  { name: "SQL", category: "database", icon: "sqlite", url: "#" },
  { name: "Docker", category: "devops", icon: "docker", url: "https://www.docker.com" },
  { name: "Git", category: "devops", icon: "git", url: "https://git-scm.com" },
  { name: "GitHub", category: "devops", icon: "github", url: "https://github.com" },
  { name: "GitHub Desktop", category: "devops", icon: "github", url: "https://desktop.github.com" },
  { name: "IntelliJ IDEA", category: "tools", icon: "intellijidea", url: "https://www.jetbrains.com/idea" },
  { name: "Eclipse", category: "tools", icon: "eclipseide", url: "https://www.eclipse.org" },
  { name: "VS Code", category: "tools", icon: "visualstudiocode", url: "https://code.visualstudio.com" }
];

// ---------- COMPÉTENCES : AFFICHAGE ----------
const skillsGrid = document.getElementById('skillsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderSkills(filter){
  skillsGrid.innerHTML = '';

  const filtered = filter === 'all'
    ? skills
    : skills.filter(s => s.category === filter);

  filtered.forEach(s => {
    const card = document.createElement('a');
    card.className = 'skill-card';
    card.href = s.url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.innerHTML = `
      <img src="https://cdn.simpleicons.org/${s.icon}/e0e5ec" alt="${s.name}" loading="lazy">
      <div class="skill-name">${s.name}</div>
      <div class="skill-cat">${s.category}</div>
    `;
    skillsGrid.appendChild(card);
  });
}

const filterOrder = ['all', 'backend', 'frontend', 'database', 'devops', 'tools'];
let currentFilterIndex = 0; //"all" est en position 0 au départ

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const clickedFilter = btn.dataset.filter;
    const newIndex = filterOrder.indexOf(clickedFilter);

    if(newIndex === currentFilterIndex) return;   //déja sur le filtre

    const direction = newIndex > currentFilterIndex ? 'ltr' : 'rtl';

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    renderSkills(clickedFilter);

    // force le navigateur a "oublier" une éventuelle animation précédente,
    // pour pouvoir la relancer même avec la même classe
    skillsGrid.classList.remove('enter-ltr', 'enter-rtl');
    void skillsGrid.offsetWidth;  // force un reflow
    skillsGrid.classList.add(direction === 'ltr' ? 'enter-ltr' : 'enter-rtl'); 

    currentFilterIndex = newIndex;
  })
})

renderSkills('all');