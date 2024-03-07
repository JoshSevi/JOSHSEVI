export function project() {
    // Your project function implementation
    // ============PROJECT====================
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        const offsetTop = 120 + index * 50;
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
}

