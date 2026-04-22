const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 10;
function resize() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();
class Particle {
constructor() {this.init();}
init() {
this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height;
this.radius = Math.random() * 150 + 100;
this.color = "#ffc437";
this.vx = (Math.random() - 0.5) * 0.5;
this.vy = (Math.random() - 0.5) * 0.5;
this.opacity = Math.random();
this.fadeSpeed = 0.005 + Math.random() * 0.01;
this.growing = Math.random() > 0.5;
}
update() {
this.x += this.vx;
this.y += this.vy;
if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
if (this.growing) {
this.opacity += this.fadeSpeed;
if (this.opacity >= 0.6) this.growing = false;
} else{
this.opacity -= this.fadeSpeed;
if (this.opacity <= 0.1) this.growing = true;}
}
draw() {
ctx.beginPath();
ctx.globalAlpha = this.opacity;
ctx.fillStyle = this.color;
ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
ctx.fill();
    }
}
function createParticles() {
for (let i = 0; i < particleCount; i++) {particles.push(new Particle());}
}
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
particles.forEach(p => {
p.update();
p.draw();
});
requestAnimationFrame(animate);
}

createParticles();
animate();

const modal = document.getElementById('wp-modal-overlay');
const btnOpen = document.getElementById('open-whatsapp-modal');
const btnClose = document.querySelector('.close-modal');
btnOpen.onclick = () => { modal.style.display = 'flex'; showStep('step-intro'); };
btnClose.onclick = () => { modal.style.display = 'none'; };
function showStep(stepId) {
    document.querySelectorAll('.modal-step').forEach(step => step.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
}
function toggleAssuntoFields() {
const assunto = document.getElementById('inp-assunto').value;
document.getElementById('fields-auxilio').style.display = (assunto === 'Auxílio doença') ? 'block' : 'none';
document.getElementById('fields-idade').style.display = (['BPC Loas', 'Aposentadoria'].includes(assunto)) ? 'block' : 'none';
    validateForm();
}
function validateForm() {
const nome = document.getElementById('inp-nome').value.trim();
const profissao = document.getElementById('inp-profissao').value.trim();
const assunto = document.getElementById('inp-assunto').value;
let isValid = nome !== '' && profissao !== '' && assunto !== '';

if (assunto === 'Auxílio doença') {
isValid = isValid && document.getElementById('inp-inss').value !== '' && document.getElementById('inp-laudo').value !== '';
    } else if (['BPC Loas', 'Aposentadoria'].includes(assunto)) {
isValid = isValid && document.getElementById('inp-idade').value !== '';
}
document.getElementById('btn-final-whatsapp').disabled = !isValid;
}
function redirectToWhatsApp(withData = false) {
    const phone = "5588992535489";
    let message = "";
if (withData) {
const nome = document.getElementById('inp-nome').value;
const profissao = document.getElementById('inp-profissao').value;
const assunto = document.getElementById('inp-assunto').value;
message = `Olá!\n* Nome: ${nome}\n* Profissão: ${profissao}\n* Assunto: ${assunto}`;
if (assunto === 'Auxílio doença') {
message += `\n* Contribui INSS: ${document.getElementById('inp-inss').value}\n* Laudo +9 meses: ${document.getElementById('inp-laudo').value}`;
} else if (['BPC Loas', 'Aposentadoria'].includes(assunto)) {
message += `\n* Idade: ${document.getElementById('inp-idade').value}`;}
}
const url = `https://wa.me/${phone}/?text=${encodeURIComponent(message)}`;
window.open(url, '_blank');

showStep('step-thanks');
}

document.addEventListener('DOMContentLoaded', () => {
const toggleButton = document.getElementById('toggle-mode');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {body.classList.add('dark-mode');}
toggleButton.addEventListener('click', () => {
body.classList.toggle('dark-mode');
if (body.classList.contains('dark-mode')) {localStorage.setItem('theme', 'dark');
} else {localStorage.setItem('theme', 'light');}
  });
});
