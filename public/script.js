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
    gsap.to('#person-img', { duration: 1.5, opacity: 100, scale: 0.7, delay: 1 });
    // Move the text up slightly slower than the image appearance
    gsap.to('h1', { duration: 2, y: -200, delay: 1.1, scale: 1 }); // Adjust 'y' for the amount of upward movement

    // Show menu toggle after a delay
    setTimeout(() => {
        document.getElementById('menuToggle').style.visibility = 'visible';
    }, 3000); // Adjust the delay time as needed (in milliseconds)
}

window.addEventListener('DOMContentLoaded', () => {
    // Select the elements
    const menuToggle = document.querySelector('#menuToggle input');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            // Show menu
            menu.style.display = 'flex';
        } else {
            // Hide menu
            menu.style.display = 'none';
        }
    });
});




// Commenting out the previous burger menu interaction script
// As it is no longer necessary with the new navigation menu
/*
document.getElementById('nav-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('fullscreen-nav').classList.toggle('active');
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('fullscreen-nav').classList.remove('active');
    document.getElementById('nav-toggle').classList.remove('active');
});
*/
