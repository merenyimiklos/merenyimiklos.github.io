/* ===== main.js ===== */


document.addEventListener('DOMContentLoaded', () => {
const faders = document.querySelectorAll('.animate-fade');
const appearOptions = {
threshold: 0.2,
rootMargin: '0px 0px -50px 0px'
};


const appearOnScroll = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;
entry.target.classList.add('visible');
observer.unobserve(entry.target);
});
}, appearOptions);


faders.forEach(fader => {
appearOnScroll.observe(fader);
});
});