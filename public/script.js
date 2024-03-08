function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // --- SETUP START ---
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true,
        tablet: { smooth: true }, // for tablet smooth
        smartphone: { smooth: true } // for mobile
    });

    // Tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed" // LocomotiveScroll handles things differently on mobile devices
    });

    // Each time the window updates, refresh ScrollTrigger and then update LocomotiveScroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.defaults({ scroller: "main" });
    // --- SETUP END ---

    // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

loco();

window.addEventListener('load', () => {
    // Assuming the splash screen is shown for 2 seconds
    setTimeout(() => {
        document.getElementById('splashscreen').style.display = 'none';
        document.getElementById('main-screen').classList.remove('hidden');
        animateMainScreen();
        loco();
    }, 2000);
});

function animateMainScreen() {
    // Animate the image to fade in and scale up slightly for the parallax effect
    gsap.to('#main-image', { duration: 1.5, opacity: 100, scale: 0.9, delay: 1 });
    // Move the text up slightly slower than the image appearance
    gsap.to('#main-text h1', { duration: 2, y: -180, delay: 1.1, scale: 3 }); // Adjust 'y' for the amount of upward movement
    // Show menu toggle after a delay
    setTimeout(() => {
        document.getElementById('menuToggle').style.visibility = 'visible';
    }, 3000); // Adjust the delay time as needed (in milliseconds)
}

const menuToggle = document.getElementById('menuToggle');
const checkbox = menuToggle.querySelector('input[type="checkbox"]');
const spans = menuToggle.querySelectorAll('span');
const mainScreenSection = document.getElementById('main-screen');
const aboutSection = document.getElementById('about');
const projectSection = document.getElementById('projects');
const contactSection = document.getElementById('contact');
const menu = document.getElementById('menu');
const links = document.querySelectorAll('#menu-nav a, #menu-social a');

// Function to set span colors based on section and checkbox status
function setSpanColorsForMainScreen(isChecked) {
    spans.forEach(span => {
        // If checkbox is checked, set span color to white, else black
        span.style.backgroundColor = isChecked ? "var(--white)" : "var(--black)";
        // Adjust box-shadow color based on isChecked state
        span.style.boxShadow = isChecked ? "0px 2px 8px var(--white)" : "0px 2px 8px var(--black)";
    });
}

function setSpanColorsForAboutSection(isChecked) {
    spans.forEach(span => {
        // If checkbox is checked, set span color to black, else white
        span.style.backgroundColor = isChecked ? "var(--black)" : "var(--white)";
        // Animate box-shadow color change with GSAP, based on isChecked
        gsap.to(span, { boxShadow: isChecked ? "0px 2px 8px var(--black)" : "0px 2px 8px var(--white)", delay: 0.5 });
    });
}

ScrollTrigger.create({
    trigger: mainScreenSection,
    start: "top top",
    end: "bottom top",
    onEnter: () => {
        setSpanColorsForMainScreen(checkbox.checked);
        menu.style.backgroundColor = "var(--black)";
        links.forEach(link => {
            link.style.color = "var(--white)";
        });
    },
});

ScrollTrigger.create({
    trigger: aboutSection, projectSection, contactSection,
    start: "top top",
    end: "bottom top",
    onEnter: () => {
        setSpanColorsForAboutSection(checkbox.checked);
        menu.style.backgroundColor = "var(--white)";
        links.forEach(link => {
            link.style.color = "var(--black)";
        });
    },

    onLeaveBack: () => {
        setSpanColorsForMainScreen(checkbox.checked);
        menu.style.backgroundColor = "var(--black)";
        links.forEach(link => {
            link.style.color = "var(--white)";
        });
    },
});

// Listen for changes on the checkbox to adjust styles dynamically
checkbox.addEventListener('change', () => {
    if (mainScreenSection.getBoundingClientRect().bottom >= 0 && mainScreenSection.getBoundingClientRect().top <= window.innerHeight) {
        // If the main-screen section is fully or partially visible
        setSpanColorsForMainScreen(checkbox.checked);
    } else if (aboutSection.getBoundingClientRect().top <= window.innerHeight && aboutSection.getBoundingClientRect().bottom >= 0) {
        // If the about section is fully or partially visible
        setSpanColorsForAboutSection(checkbox.checked);
    }else if (projectSection.getBoundingClientRect().top <= window.innerHeight && projectSection.getBoundingClientRect().bottom >= 0) {
        // If the about section is fully or partially visible
        setSpanColorsForAboutSection(checkbox.checked);
    }else if (contactSection.getBoundingClientRect().top <= window.innerHeight && contactSection.getBoundingClientRect().bottom >= 0) {
        // If the about section is fully or partially visible
        setSpanColorsForAboutSection(checkbox.checked);
    }
});
