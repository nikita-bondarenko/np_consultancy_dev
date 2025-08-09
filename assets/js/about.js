// Простая анимация счетчиков
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.about__subtitle');
    let animated = false;

    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            element.textContent = element.textContent.replace(/^\d+/, current);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                
                counters.forEach((counter, index) => {
                    const text = counter.textContent;
                    const number = parseInt(text.match(/\d+/)[0]);
                    
                    setTimeout(() => {
                        animateNumber(counter, number);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const section = document.querySelector('.about');
    if (section) {
        observer.observe(section);
    }
});