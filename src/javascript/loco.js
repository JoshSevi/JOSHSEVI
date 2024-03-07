
    // Your loco function implementation
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


