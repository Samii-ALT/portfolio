let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


// Contact Form
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch('https://formspree.io/f/xzepkbbl', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = 'Message sent successfully! ✅';
            contactForm.reset();
        } else {
            formStatus.textContent = 'Something went wrong. Please try again.';
        }

    } catch (error) {
        formStatus.textContent = 'Something went wrong. Please try again.';
    }
});

// =========================
// CERTIFICATION SLIDER
// =========================

const slider = document.querySelector('.certification-slider');
const track = document.querySelector('.certification-track');

let isDragging = false;
let isHovering = false;

let startX = 0;
let previousX = 0;

let position = 0;

const speed = 1.5;


// Duplicate certificates
track.innerHTML += track.innerHTML;


// Auto slide
function animateSlider() {

    if (!isDragging && !isHovering) {
        position -= speed;
    }

    const halfWidth = track.scrollWidth / 2;

    if (position <= -halfWidth) {
        position += halfWidth;
    }

    if (position > 0) {
        position -= halfWidth;
    }

    track.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animateSlider);
}

animateSlider();


// Pause when mouse enters
document.querySelectorAll('.certificate-card').forEach(card => {

    card.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    card.addEventListener('mouseleave', () => {
        isHovering = false;
    });

});


// Start dragging
slider.addEventListener('mousedown', (e) => {

    isDragging = true;

    startX = e.clientX;
    previousX = startX;
});


// Drag
slider.addEventListener('mousemove', (e) => {

    if (!isDragging) return;

    const currentX = e.clientX;

    const difference = currentX - previousX;

    position += difference;

    previousX = currentX;
});


// Stop dragging
window.addEventListener('mouseup', () => {

    isDragging = false;
});


// Mobile touch
slider.addEventListener('touchstart', (e) => {

    isDragging = true;

    startX = e.touches[0].clientX;
    previousX = startX;

}, { passive: true });


slider.addEventListener('touchmove', (e) => {

    if (!isDragging) return;

    const currentX = e.touches[0].clientX;

    const difference = currentX - previousX;

    position += difference;

    previousX = currentX;

}, { passive: true });


slider.addEventListener('touchend', () => {

    isDragging = false;

});

const readMoreBtn = document.getElementById("read-more-btn");
const moreText = document.getElementById("more-text");

readMoreBtn.onclick = () => {
    moreText.classList.toggle("show");

    if (moreText.classList.contains("show")) {
        readMoreBtn.textContent = "Read Less";
    } else {
        readMoreBtn.textContent = "Read More";
    }
};