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
            document.getElementById('main-screen').classList.remove('hidden');
            animateMainScreen();
            handleMenuColors();
            window.scrollTo(0, 0);
        }, 2000);
    });

    function animateMainScreen() {
        gsap.to('#main-image', { duration: 1.5, opacity: 100, scale: 0.6, delay: 1 });
        gsap.to('#main-title h1', { duration: 2, y: -220, delay: 1.1, scale: 2 });

        setTimeout(() => {
            document.getElementById('main-introduction').style.visibility = 'visible';
            setTimeout(() => {
                document.getElementById('menuToggle').style.visibility = 'visible';
            }, ); // Delay setting visibility by 500 milliseconds
        }, 3000);
    }


    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const offsetTop = 20 + index * 70;
        card.style.paddingTop = `${offsetTop}px`;

        if (index === cards.length - 1) {
            return;
        }

        const toScale = 1 - (cards.length - 1 - index) * 0.06;
        const nextCard = cards[index + 1];
        const cardInner = card.querySelector('.card-body');

        gsap.to(cardInner, {
            scrollTrigger: {
                trigger: nextCard,
                start: `top+=${offsetTop} bottom`,
                end: `bottom bottom-=${card.clientHeight}`, // Adjusted end position
                scrub: true
            },
            scale: toScale,
        });
    });

});
