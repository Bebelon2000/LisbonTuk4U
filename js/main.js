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

    // 3. Sistema de Reserva Dinâmico (Modelo OTA Avançado)
    const bookingDate = document.getElementById('booking-date');
    const bookingPassengers = document.getElementById('booking-passengers');
    const toursOtaGrid = document.getElementById('tours-ota-grid');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutTourTitle = document.getElementById('checkout-tour-title');
    const checkoutDatetimeDetails = document.getElementById('checkout-datetime-details');
    const checkoutPriceBreakdown = document.getElementById('checkout-price-breakdown');
    const availabilityStatus = document.getElementById('availability-status');

    // Mapeamento dos passeios com Bókun Experience IDs
    const durationSteps = [
        { label: "1h", hours: 1, name: "Little Tour", pricePerPax: 60, experienceId: "tour-1h", route: "Alfama ou Chiado / Bairro Alto" },
        { label: "2h", hours: 2, name: "Big Tour", pricePerPax: 100, experienceId: "tour-2h", route: "Alfama + Chiado + Bairro Alto" },
        { label: "3h", hours: 3, name: "Macro Tour", pricePerPax: 140, experienceId: "tour-3h", route: "Alfama + Chiado + Bairro Alto + Belém" },
        { label: "4h", hours: 4, name: "Half Day Tour", pricePerPax: 180, experienceId: "tour-4h", route: "Rota Histórica Completa + Belém + Principais Miradouros" },
        { label: "6h", hours: 6, name: "Full Day Tour", pricePerPax: 260, experienceId: "tour-6h", route: "Lisboa Inteira (Centro Histórico + Belém + Parque das Nações + Almoço flexível)" }
    ];

    let selectedTour = null;
    let selectedTimeSlot = null;

    // Configurar limites de data (mínimo é hoje)
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.min = today;
    }

    const renderToursGrid = () => {
        if (!toursOtaGrid) return;
        toursOtaGrid.innerHTML = '';
        
        durationSteps.forEach((step, index) => {
            const card = document.createElement('div');
            card.className = 'ota-tour-card';
            card.innerHTML = `
                <div>
                    <div class="ota-tour-header">
                        <h3 class="ota-tour-title">${step.name}</h3>
                        <span class="ota-duration-badge">${step.label} Duração</span>
                    </div>
                    <p class="ota-tour-route">${step.route}</p>
                </div>
                <div>
                    <div class="ota-price-info">
                        Preço por pessoa: <span class="ota-price-value">${step.pricePerPax.toFixed(2)} €</span>
                    </div>
                    <div class="time-slots-container">
                        <span class="time-slots-title">Horários Disponíveis:</span>
                        <div class="time-slots-grid" id="slots-grid-${index}">
                            <span class="no-slots-msg">Selecione uma data acima...</span>
                        </div>
                    </div>
                </div>
            `;
            toursOtaGrid.appendChild(card);
        });
    };

    // Render imediato no load
    renderToursGrid();

    const fetchAllAvailability = async (date) => {
        if (!date) return;
        
        if (availabilityStatus) {
            availabilityStatus.textContent = "A carregar horários sincronizados com o Bókun...";
            availabilityStatus.className = "availability-status loading";
        }
        
        if (checkoutFormContainer) {
            checkoutFormContainer.style.display = 'none';
        }
        selectedTour = null;
        selectedTimeSlot = null;

        // Loop sobre cada passeio
        const fetchPromises = durationSteps.map(async (step, index) => {
            const slotsGrid = document.getElementById(`slots-grid-${index}`);
            if (!slotsGrid) return;
            slotsGrid.innerHTML = '<span class="no-slots-msg" style="color: var(--color-text-light);">A carregar...</span>';
            
            try {
                // Chamada segura via proxy Hostinger
                const response = await fetch(`/api/availability.php?experienceId=${step.experienceId}&date=${date}`);
                if (!response.ok) throw new Error("Erro de rede.");
                
                const data = await response.json();
                
                if (data && data.slots && data.slots.length > 0) {
                    renderTimePills(slotsGrid, data.slots, step, index);
                } else {
                    slotsGrid.innerHTML = '<span class="no-slots-msg">Esgotado</span>';
                }
            } catch (error) {
                console.warn(`Erro no Bókun para ${step.name}. Ativando slots simulados...`);
                simulateOfflineSlots(slotsGrid, step, index);
            }
        });

        await Promise.all(fetchPromises);
        
        if (availabilityStatus) {
            availabilityStatus.textContent = "Pesquisa concluída. Escolha um horário para reservar.";
            availabilityStatus.className = "availability-status success";
        }
    };

    const renderTimePills = (container, slots, step, cardIndex) => {
        container.innerHTML = '';
        slots.forEach(slot => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'time-pill';
            button.textContent = slot;
            button.setAttribute('aria-label', `Reservar ${step.name} às ${slot}`);
            
            button.addEventListener('click', () => {
                // Desmarcar todas as outras pills
                document.querySelectorAll('.time-pill').forEach(pill => {
                    pill.classList.remove('selected');
                });
                button.classList.add('selected');
                
                selectedTour = step;
                selectedTimeSlot = slot;
                
                updateCheckoutSummary();
            });
            container.appendChild(button);
        });
    };

    const simulateOfflineSlots = (container, step, cardIndex) => {
        // Horários simulados (contingência offline)
        const simulatedSlots = ["10:00", "11:30", "14:00", "16:30"];
        renderTimePills(container, simulatedSlots, step, cardIndex);
    };

    const updateCheckoutSummary = () => {
        if (!selectedTour || !selectedTimeSlot) return;
        
        const passengers = parseInt(bookingPassengers.value) || 2;
        const totalPrice = selectedTour.pricePerPax * passengers;
        
        if (checkoutTourTitle) {
            checkoutTourTitle.textContent = `${selectedTour.name} (${selectedTour.label})`;
        }
        
        if (checkoutDatetimeDetails) {
            const dateParts = bookingDate.value.split('-');
            const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : bookingDate.value;
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

    // Event Listeners
    if (bookingDate) {
        bookingDate.addEventListener('change', (e) => {
            if (e.target.value) {
                fetchAllAvailability(e.target.value);
            }
        });
    }

    if (bookingPassengers) {
        bookingPassengers.addEventListener('change', () => {
            if (selectedTour && selectedTimeSlot) {
                updateCheckoutSummary();
            }
        });
    }
});
