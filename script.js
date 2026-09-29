
const history = document.getElementById('terminal-history');

function runCommand(cmd) {
  if (cmd === 'clear') {
    history.innerHTML = '';
    return;
  }

  let responseText = '';

  if (cmd === 'skills') {
    responseText = '<b>Loaded Skills:</b><br>• HTML5 / CSS3 / JavaScript<br>• Git / GitHub<br>• Linux (Bash, SSH, SFTP)<br>• Web Server Deployment';
  } else if (cmd === 'hobby') {
    responseText = '<b>Hobbies & Interests:</b><br>I enjoy web development, exploring Linux server environments, reading tech insights, and solving logical challenges.';
  } else if (cmd === 'status') {
    responseText = '● portfolio.service - Successfully Operational<br>Status: <span style="color:#10b981;">Active (running)</span><br>Core Load: 100%<br>Readiness for new tasks: High';
  }

  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = `
    <div><span class="prompt">visitor@server:~$</span> <span class="command">${cmd}</span></div>
    <div class="output">${responseText}</div>
  `;

  history.appendChild(line);
  history.scrollTop = history.scrollHeight;
}
const dot = document.querySelector('.cursor-dot');
const glow = document.querySelector('.cursor-glow');

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

// Update target mouse position
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Instant positioning for the center dot
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

// Smooth linear interpolation (LERP) loop for the glowing aura
function animateCursor() {
  // Smoothly interpolate current glow position toward mouse position (0.15 speed factor)
  glowX += (mouseX - glowX) * 0.15;
  glowY += (mouseY - glowY) * 0.15;

  glow.style.left = `${glowX}px`;
  glow.style.top = `${glowY}px`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover expansion effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .project-card, .personal-card, .skill-btn');

hoverTargets.forEach((target) => {
  target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
const phrases = ["a Developer 👨‍💻", "a JavaScript Learner 🐧", "a Creator 🚀"];
let i = 0, j = 0, isDeleting = false;

function typeWriter() {
  const currentPhrase = phrases[i];
  const el = document.getElementById("typewriter");

  if (!el) return;

  if (isDeleting) {
    el.textContent = currentPhrase.substring(0, j - 1);
    j--;
  } else {
    el.textContent = currentPhrase.substring(0, j + 1);
    j++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && j === currentPhrase.length) {
    typeSpeed = 2000; // Пауза перед удалением
    isDeleting = true;
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

document.addEventListener("DOMContentLoaded", typeWriter);
const skillsData = {
  webdev: {
    title: "Web Development (HTML, CSS, JS)",
    level: "85%",
    description: "Creating responsive, fast, and modern web applications using clean HTML5 markup, flex/grid layouts, and vanilla JavaScript logic."
  },
  linux: {
    title: "Linux & Server Administration",
    level: "75%",
    description: "Navigating terminal interfaces, managing permissions, deploying web assets, and executing remote operations over SSH protocols."
  },
  git: {
    title: "Git & Version Control",
    level: "80%",
    description: "Managing project source code, organizing repositories, tracking version history, and deploying builds directly via GitHub."
  },
  problem_solving: {
    title: "Problem Solving & Algorithmic Logic",
    level: "90%",
    description: "Breaking down complex development requirements into structured, clean, and maintainable software components."
  }
};

function selectSkill(skillKey, buttonElement) {
  const buttons = document.querySelectorAll('.skill-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  buttonElement.classList.add('active');

  const data = skillsData[skillKey];
  document.getElementById('skillTitle').textContent = data.title;
  document.getElementById('skillDescription').textContent = data.description;
  
  const progressBar = document.getElementById('skillProgress');
  progressBar.style.width = '0%';
  setTimeout(() => { progressBar.style.width = data.level; }, 100);
}


const personalData = {
  setup: {
    title: "🖥️ Dark Mode & Clean Desk",
    text: "I work best in a minimal dark-themed setup with quiet background music. A good keyboard, clean organization, and a terminal window open are essential for my daily focus."
  },
  passions: {
    title: "🎧 Music, Tech & Gaming",
    text: "When I'm not coding, you'll find me listening to synthwave/lo-fi tracks, following tech innovations, or playing competitive and strategy games."
  },
  philosophy: {
    title: "🚀 Always Be Learning",
    text: "I believe in practical learning — getting hands-on with technology, making mistakes, and building real projects is the best way to grow as a creator."
  }
};

function openBioModal(key) {
  const box = document.getElementById('bioBox');
  const title = document.getElementById('bioTitle');
  const content = document.getElementById('bioContent');

  title.textContent = personalData[key].title;
  content.textContent = personalData[key].text;

  box.classList.remove('hidden');
}


const storyData = {
  chapter1: "<b>Phase 01 — Curiosity:</b> It all started when I wondered how websites and software actually worked behind the scenes. I began inspecting web pages and experimenting with basic code.",
  chapter2: "<b>Phase 02 — Hands-on Practice:</b> I started building small personal applications, setting up my first Linux web servers, and versioning my code with Git on GitHub.",
  chapter3: "<b>Phase 03 — Building & Growing:</b> Today, I continuously expand my tech stack, deploy live applications, and work on creative interactive experiences like this site."
};

function showTimelineDetail(chapterKey) {
  const detailBox = document.getElementById('timelineDetail');
  detailBox.innerHTML = storyData[chapterKey];
}