
// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 2800);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  ring.style.transform = `translate(${mouseX - 18}px, ${mouseY - 18}px)`;
});
document.querySelectorAll('a, button, .highlight-card, .feat-card, .inv-card, .dl-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.style.transform += ' scale(1.6)');
  el.addEventListener('mouseleave', () => {});
});

// Scroll Progress
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
  // Navbar scroll effect
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', scrollTop > 60);
});

// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
  p.style.animationDuration = (Math.random() * 10 + 8) + 's';
  p.style.animationDelay = (Math.random() * 10) + 's';
  particlesContainer.appendChild(p);
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Trigger counters
      if (e.target.querySelector('.counter')) {
        e.target.querySelectorAll('.counter').forEach(animateCounter);
      }
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Counter animation
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = true;
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = Date.now();
  const update = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('en-IN');
  };
  requestAnimationFrame(update);
}

// Mobile Menu
function openMenu() { document.getElementById('mobileMenu').classList.add('open'); }
function closeMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// Form Submit
function handleSubmit(e) {
  e.preventDefault();

  // Get Form Values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('message').value;

  // WhatsApp Number
  const whatsappNumber = "918527533067";

  // WhatsApp Message
  const whatsappMessage = `
🌟 New Enquiry - Nirala Diadem

👤 Full Name: ${name}
📞 Phone Number: ${phone}
📧 Email Address: ${email}
🏢 Area of Interest: ${interest}

💬 Message:
${message}
  `;

  // Create WhatsApp URL
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Open WhatsApp
  window.open(url, '_blank');

  // Button Animation
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = '✓ Redirecting to WhatsApp...';

  setTimeout(() => {
    btn.textContent = 'Send Enquiry →';
    e.target.reset();
  }, 3000);
}