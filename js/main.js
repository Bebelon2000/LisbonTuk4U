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

    // 3. Sistema de Reserva Dinâmico & Integração Bókun
    const durationSlider = document.getElementById('duration-slider');
    const tourName = document.getElementById('tour-name');
    const tourRoute = document.getElementById('tour-route');
    const tourPrice = document.getElementById('tour-price');
    const bookingDate = document.getElementById('booking-date');
    const bookingTime = document.getElementById('booking-time');
    const availabilityStatus = document.getElementById('availability-status');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');

    // Configurar limites de data (mínimo é hoje)
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.min = today;
    }

    const durationSteps = [
        { label: "1h", hours: 1, name: "Little Tour", price: 120, route: "Alfama ou Chiado / Bairro Alto" },
        { label: "2h", hours: 2, name: "Big Tour", price: 200, route: "Alfama + Chiado + Bairro Alto" },
        { label: "3h", hours: 3, name: "Macro Tour", price: 280, route: "Alfama + Chiado + Bairro Alto + Belém" },
        { label: "4h", hours: 4, name: "Half Day Tour", price: 360, route: "Rota Histórica Completa + Belém + Principais Miradouros" },
        { label: "6h", hours: 6, name: "Full Day Tour", price: 520, route: "Lisboa Inteira (Centro Histórico + Belém + Parque das Nações + Almoço flexível)" }
    ];

    const updateTourSelection = (value) => {
        const step = durationSteps[parseInt(value) - 1];
        if (step) {
            tourName.textContent = step.name;
            tourRoute.innerHTML = `<strong>Duração: ${step.hours}h</strong> — ${step.route}`;
            tourPrice.textContent = `${step.price} €`;
        }
    };

    if (durationSlider) {
        durationSlider.addEventListener('input', (e) => {
            updateTourSelection(e.target.value);
        });
        updateTourSelection(durationSlider.value);
    }

    // Chamada Assíncrona para o Proxy da API do Bókun
    const fetchBokunAvailability = async (date) => {
        if (!bookingTime || !availabilityStatus) return;
        
        bookingTime.disabled = true;
        bookingTime.innerHTML = '<option value="">A carregar horários...</option>';
        availabilityStatus.textContent = "A consultar agenda da guia Susane no Bókun...";
        availabilityStatus.className = "availability-status loading";

        try {
            // Chamada segura via proxy Hostinger
            const response = await fetch(`/api/availability.php?experienceId=tuk-tour-lisbon&date=${date}`);
            if (!response.ok) throw new Error("Erro de rede.");
            
            const data = await response.json();
            
            if (data && data.slots && data.slots.length > 0) {
                bookingTime.innerHTML = '<option value="">Selecione a hora...</option>';
                data.slots.forEach(slot => {
                    const option = document.createElement('option');
                    option.value = slot;
                    option.textContent = slot;
                    bookingTime.appendChild(option);
                });
                bookingTime.disabled = false;
                availabilityStatus.textContent = "Horários disponíveis encontrados.";
                availabilityStatus.className = "availability-status success";
            } else {
                bookingTime.innerHTML = '<option value="">Sem horários disponíveis</option>';
                availabilityStatus.textContent = "Susane não tem horários disponíveis para este dia. Por favor, tente outra data.";
                availabilityStatus.className = "availability-status error";
            }
        } catch (error) {
            console.warn("Erro ao contactar o Bókun. Ativando simulador de contingência...");
            simulateOfflineAvailability(date);
        }
    };

    const simulateOfflineAvailability = (date) => {
        // Horários predefinidos em caso de falha de ligação com o servidor Bókun
        const simulatedSlots = ["09:00", "11:30", "14:30", "17:00"];
        bookingTime.innerHTML = '<option value="">Selecione a hora...</option>';
        simulatedSlots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = `${slot} (Disponibilidade Rápida)`;
            bookingTime.appendChild(option);
        });
        bookingTime.disabled = false;
        availabilityStatus.textContent = "Conexão offline: A mostrar horários de contingência.";
        availabilityStatus.className = "availability-status warning";
    };

    if (bookingDate) {
        bookingDate.addEventListener('change', (e) => {
            if (e.target.value) {
                fetchBokunAvailability(e.target.value);
            }
        });
    }
});
