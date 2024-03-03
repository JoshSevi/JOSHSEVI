window.addEventListener('load', () => {
    // Assuming the splash screen is shown for 2 seconds
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-screen').classList.remove('hidden');
        animateMainScreen();
    }, 2000);
});

function animateMainScreen() {
    // Animate the image to fade in and scale up slightly for the parallax effect
    gsap.to('#person-img', { duration: 1, opacity: 40, scale: 1.4, delay: 0.8 });
    // Move the text up slightly slower than the image appearance
    gsap.to('h1', { duration: 1.5, y: -160, delay: 2.5 }); // Adjust 'y' for the amount of upward movement
}

document.getElementById('nav-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('fullscreen-nav').classList.toggle('active');
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('fullscreen-nav').classList.remove('active');
    document.getElementById('nav-toggle').classList.remove('active');
});

