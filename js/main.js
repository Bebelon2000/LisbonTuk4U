/**
 * LisbonTuk4U - Core JavaScript
 * Handles mobile drawer interactions and scroll-based conversions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer Navigation
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const navDrawer = document.getElementById('mobile-nav-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link-item');

    const openDrawer = () => {
        navDrawer.classList.add('open');
        drawerOverlay.classList.add('active');
        navDrawer.setAttribute('aria-hidden', 'false');
        menuToggleBtn.setAttribute('aria-expanded', 'true');
        // Prevent background scrolling while menu is open
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        navDrawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
        navDrawer.setAttribute('aria-hidden', 'true');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        // Restore background scrolling
        document.body.style.overflow = '';
    };

    if (menuToggleBtn && menuCloseBtn && navDrawer && drawerOverlay) {
        menuToggleBtn.addEventListener('click', openDrawer);
        menuCloseBtn.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);

        // Close drawer when link items are clicked (smooth anchor scroll)
        drawerLinks.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    // 2. Sticky Mobile Call-to-Action Scroll Observer
    // The sticky CTA is hidden in the Hero section to avoid cluttering and is faded in as soon as user leaves the Hero.
    const stickyCta = document.getElementById('sticky-cta-mobile');
    const heroSection = document.querySelector('.hero-section');

    if (stickyCta && heroSection) {
        // Use IntersectionObserver for maximum performance and buttery-smooth FPS
        const observerOptions = {
            root: null, // Viewport
            threshold: 0.1, // Trigger when 10% of the Hero is in view
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero is visible, hide sticky CTA to reduce visual clutter
                    stickyCta.classList.add('hidden');
                } else {
                    // Hero has been scrolled past, show the sticky CTA for conversion
                    stickyCta.classList.remove('hidden');
                }
            });
        }, observerOptions);

        observer.observe(heroSection);
    }

    // 3. Sistema de Reserva Dinâmico (Modelo OTA Avançado - Bulletproof HTML)
    const bookingDate = document.getElementById('booking-date');
    const bookingPassengers = document.getElementById('booking-passengers');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutTourTitle = document.getElementById('checkout-tour-title');
    const checkoutDatetimeDetails = document.getElementById('checkout-datetime-details');
    const checkoutPriceBreakdown = document.getElementById('checkout-price-breakdown');
    const availabilityStatus = document.getElementById('availability-status');

    let selectedTour = null;
    let selectedTimeSlot = null;

    // Configurar limites de data (mínimo é hoje)
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.min = today;
    }

    const updateCheckoutSummary = () => {
        if (!selectedTour || !selectedTimeSlot) return;
        
        const passengers = parseInt(bookingPassengers.value) || 2;
        const totalPrice = selectedTour.pricePerPax * passengers;
        
        if (checkoutTourTitle) {
            checkoutTourTitle.textContent = `${selectedTour.name} (${selectedTour.label})`;
        }
        
        if (checkoutDatetimeDetails) {
            const dateValue = bookingDate.value;
            let formattedDate = "--/--/----";
            if (dateValue) {
                const dateParts = dateValue.split('-');
                if (dateParts.length === 3) {
                    formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                } else {
                    formattedDate = dateValue;
                }
            }
            checkoutDatetimeDetails.textContent = `Data: ${formattedDate} às ${selectedTimeSlot}`;
        }
        
        if (checkoutPriceBreakdown) {
            checkoutPriceBreakdown.innerHTML = `<strong>${totalPrice.toFixed(2)} €</strong> <span style="font-size: 0.95rem; font-weight: normal; color: var(--color-text-light);">| ${passengers} ${passengers === 1 ? 'Passageiro' : 'Passageiros'} x ${selectedTour.pricePerPax.toFixed(2)} €</span>`;
        }
        
        if (checkoutFormContainer) {
            checkoutFormContainer.style.display = 'block';
            setTimeout(() => {
                checkoutFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    };

    // Configurar os escutas de clique para as pills estáticas
    const setupStaticTimePills = () => {
        const timePills = document.querySelectorAll('.time-pill');
        timePills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Desmarcar todas as outras pills no widget
                document.querySelectorAll('.time-pill').forEach(p => {
                    p.classList.remove('selected');
                });
                
                // Marcar a pill clicada
                pill.classList.add('selected');
                
                // Obter dados do cartão pai
                const card = pill.closest('.ota-tour-card');
                if (card) {
                    const tourName = card.getAttribute('data-tour-name');
                    const tourDuration = card.getAttribute('data-tour-duration');
                    const pricePerPax = parseFloat(card.getAttribute('data-price-per-pax')) || 0;
                    const selectedTime = pill.getAttribute('data-time');
                    
                    selectedTour = {
                        name: tourName,
                        label: tourDuration,
                        pricePerPax: pricePerPax
                    };
                    selectedTimeSlot = selectedTime;
                    
                    updateCheckoutSummary();
                }
            });
        });
    };

    // Inicializar os escutas das pills existentes no HTML
    setupStaticTimePills();

    // Event listener para mudança de data
    if (bookingDate) {
        bookingDate.addEventListener('change', (e) => {
            const date = e.target.value;
            if (date && availabilityStatus) {
                availabilityStatus.textContent = "Data selecionada com sucesso. Escolha um horário abaixo nos cartões.";
                availabilityStatus.className = "availability-status success";
                
                // Atualizar o checkout se um horário já estiver selecionado
                if (selectedTour && selectedTimeSlot) {
                    updateCheckoutSummary();
                }
            }
        });
    }

    // Event listener para mudança de passageiros
    if (bookingPassengers) {
        bookingPassengers.addEventListener('change', () => {
            if (selectedTour && selectedTimeSlot) {
                updateCheckoutSummary();
            }
        });
    }
});
