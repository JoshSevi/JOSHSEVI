

 function mainscreen() {
    // Your mainscreen function implementation

        // Animate the image to fade in and scale up slightly for the parallax effect
        gsap.to('#main-image', { duration: 1.5, opacity: 100, scale: 0.9, delay: 1 });
        // Move the text up slightly slower than the image appearance
        gsap.to('#main-text h1', { duration: 2, y: -180, delay: 1.1, scale: 3 }); // Adjust 'y' for the amount of upward movement
        // Show menu toggle after a delay
        setTimeout(() => {
            document.getElementById('menuToggle').style.visibility = 'visible';
        }, 3000); // Adjust the delay time as needed (in milliseconds)
    }

