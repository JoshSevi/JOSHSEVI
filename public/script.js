document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    const menuToggle = document.getElementById('menuToggle');
    const checkbox = menuToggle.querySelector('input[type="checkbox"]');
    const spans = menuToggle.querySelectorAll('span');
    const sections = {
        'main-screen': document.getElementById('main-screen'),
        'about': document.getElementById('about'),
        'project': document.getElementById('project'),
        'contact': document.getElementById('contact')
    };
    const menu = document.getElementById('menu');
    const links = document.querySelectorAll('#menu-nav a, #menu-social a');

    function setSpanColorsForMainScreen(isChecked) {
        spans.forEach(span => {
            span.style.backgroundColor = isChecked ? "var(--white)" : "var(--black)";
            span.style.boxShadow = isChecked ? "0px 2px 8px var(--white)" : "0px 2px 8px var(--black)";
        });
        menu.style.backgroundColor = isChecked ? "var(--black)" : "var(--white)";
        links.forEach(link => {
            link.style.color = isChecked ? "var(--white)" : "var(--black)";
        });
    }

    function setSpanColorsForOtherSection(isChecked) {
        spans.forEach(span => {
            span.style.backgroundColor = isChecked ? "var(--black)" : "var(--white)";
            gsap.to(span, { boxShadow: isChecked ? "0px 2px 8px var(--black)" : "0px 2px 8px var(--white)", delay: 0.5 });
        });
        menu.style.backgroundColor = isChecked ? "var(--white)" : "var(--black)";
        links.forEach(link => {
            link.style.color = isChecked ? "var(--black)" : "var(--white)";
        });
    }

    function handleMenuColors(sectionId, isChecked) {
        if (sectionId === 'main-screen') {
            setSpanColorsForMainScreen(isChecked);
        } else {
            setSpanColorsForOtherSection(isChecked);
        }
    }

    Object.keys(sections).forEach(sectionId => {
        ScrollTrigger.create({
            trigger: sections[sectionId],
            start: "top top",
            end: "bottom top",
            onEnter: () => {
                handleMenuColors(sectionId, checkbox.checked);
            },
            onLeaveBack: () => {
                if (sectionId === 'about') {
                    checkbox.checked = false; // Uncheck the checkbox when leaving the project section
                    handleMenuColors('main-screen', checkbox.checked);
                }
            }
        });
    });

    checkbox.addEventListener('change', () => {
        const visibleSection = Object.keys(sections).find(sectionId => {
            const section = sections[sectionId];
            return section.getBoundingClientRect().top <= window.innerHeight && section.getBoundingClientRect().bottom >= 0;
        });

        handleMenuColors(visibleSection || 'main-screen', checkbox.checked);
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('splashscreen').style.display = 'none';
            document.getElementById('main-screen').classList.remove('hidden');
            animateMainScreen();
            // Scroll to the top of the page
            window.scrollTo(0, 0);
        }, 2000);
    });

    function animateMainScreen() {
        gsap.to('#main-image', { duration: 1.5, opacity: 1, scale: 1, delay: 1 });
        gsap.to('#main-text h1', { duration: 2, y: -180, delay: 1.1, scale: 1 });
        setTimeout(() => {
            document.getElementById('menuToggle').style.visibility = 'visible';
        }, 3000);
    }
});

