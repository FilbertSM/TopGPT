export const premiumScroll = (e, targetId) => {
    e.preventDefault();
    
    // Defer execution to next tick to let React render/commit complete
    // and avoid layout thrashing via getBoundingClientRect()
    setTimeout(() => {
        const targetElement = targetId === "home" || targetId === ""
            ? document.documentElement
            : document.getElementById(targetId);
            
        if (targetElement) {
            const start = window.scrollY || window.pageYOffset;
            const targetPos = targetElement.getBoundingClientRect().top + start;
            const distance = targetPos - start;
            
            // Emil-design-eng: Snappy transitions (< 300ms) increase perceived speed
            const duration = 300; 
            let startTimestamp = null;

            const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const ease = easeOutQuint(progress);
                window.scrollTo(0, start + distance * ease);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, 0);
};

