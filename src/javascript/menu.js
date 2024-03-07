
 function navmenu() {
    // Your navmenu function implementation

// ============NAV MENU====================

    const menuToggle = document.getElementById('menuToggle');
    const checkbox = menuToggle.querySelector('input[type="checkbox"]');
    const spans = menuToggle.querySelectorAll('span');
    const mainScreenSection = document.getElementById('main-screen');
    const aboutSection = document.getElementById('about');
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
        trigger: aboutSection,
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
        }
    });
}
