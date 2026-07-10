/**
 * Tour Detail Page — JS
 * Thumb gallery swap + mobile CTA visibility
 */
document.addEventListener('DOMContentLoaded', () => {
    // ── Thumb Gallery: click thumb → swap hero image ──
    const heroImg = document.getElementById('td-hero-img');
    const thumbs = document.querySelectorAll('.td-thumb');

    if (heroImg && thumbs.length) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                heroImg.style.opacity = '0';
                setTimeout(() => {
                    heroImg.src = thumb.dataset.full || thumb.src;
                    heroImg.alt = thumb.alt || '';
                    heroImg.style.opacity = '1';
                }, 200);
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    // ── Mobile CTA: show only after scrolling past hero ──
    const mobileCta = document.getElementById('td-mobile-cta');
    const hero = document.querySelector('.td-hero');

    if (mobileCta && hero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                mobileCta.classList.toggle('visible', !entry.isIntersecting);
            });
        }, { threshold: 0.1 });
        observer.observe(hero);
    }
});
