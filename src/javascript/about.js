document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('#about-content h2, #about-content p', {
        scrollTrigger: '#about-content',
        opacity: 0,
        duration: 1,
        delay: 0.5,
        stagger: 0.3
    });

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

    function setMenuColors(isChecked, inMainScreen) {
        const menuColor = inMainScreen ? "var(--white)" : "var(--black)";
        const linkColor = inMainScreen ? "var(--black)" : "var(--white)";
        const spanColor = inMainScreen ? (isChecked ? "var(--black)" : "var(--white)") : (isChecked ? "var(--white)" : "var(--black)");
        const boxShadowColor = inMainScreen ? (isChecked ? "var(--black)" : "var(--white)") : (isChecked ? "var(--white)" : "var(--black)");

        spans.forEach(span => {
            span.style.backgroundColor = spanColor;
            span.style.boxShadow = `0px 2px 8px ${boxShadowColor}`;
        });

        menu.style.backgroundColor = menuColor;

        links.forEach(link => {
            link.style.color = linkColor;
        });
    }

    function handleMenuColors() {
        const mainScreenTop = sections['main-screen'].getBoundingClientRect().top;
        const aboutTop = sections['about'].getBoundingClientRect().top;
        const projectTop = sections['project'].getBoundingClientRect().top;
        const contactTop = sections['contact'].getBoundingClientRect().top;

        if (mainScreenTop <= 0 && aboutTop > 0) {
            setMenuColors(checkbox.checked, false);
        } else if (aboutTop <= 0 && projectTop > 0) {
            setMenuColors(checkbox.checked, true);
        } else if (projectTop <= 0 && contactTop > 0) {
            setMenuColors(checkbox.checked, true);
        } else if (contactTop <= 0) {
            setMenuColors(checkbox.checked, true);
        }
    }

    function handleCheckboxChange() {
        handleMenuColors();
    }

    function handleScroll() {
        handleMenuColors();
    }

    Object.values(sections).forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            onEnter: handleScroll,
            onLeaveBack: handleScroll
        });
    });

    menuToggle.addEventListener('change', handleCheckboxChange);

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('splashscreen').style.display = 'none';
            document.getElementById('menuToggle').style.visbility = 'visible';

            handleMenuColors();
            window.scrollTo(0, 0);
        }, 500);
    });


});

