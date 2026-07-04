/**
 * LisbonTuk4U - Core JavaScript v2.1
 * Smart header, language dropdown, booking overlay (EcoTukTours-style), tour details modal.
 */

// ═══════════════════════════════════════════════════════
//  TOUR DATA (central source of truth)
// ═══════════════════════════════════════════════════════
// Itens incluídos em todos os tours guiados (privados)
const TOUR_INCLUDED = [
    'Pick-up e entrega no hotel',
    'Guia local certificada',
    'Tuk-tuk 100% elétrico e privativo',
    'Comentários em PT · EN · ES · IT · FR',
    'Cancelamento grátis até 48h antes',
];

const TOUR_DATA = {
    'a-la-carte': {
        name: 'Lisboa à la Carte',
        img: 'assets/img/tour-a-la-carte.webp',
        duration: '1h – 5h',
        durationHours: 0, // variable
        basePrice: 0,
        isALaCarte: true,
        durationOptions: [
            { hours: 1, price: 120, label: '1h · €120' },
            { hours: 2, price: 180, label: '2h · €180' },
            { hours: 3, price: 240, label: '3h · €240' },
            { hours: 4, price: 300, label: '4h · €300' },
            { hours: 5, price: 360, label: '5h · €360' },
        ],
        maxPax: 5,
        description: 'O passeio é seu. Diga-nos o que quer ver e de quanto tempo dispõe, e a Susane monta o roteiro perfeito à sua medida. Ideal para quem já conhece Lisboa, viaja com crianças ou prefere simplesmente um ritmo só seu.',
        howItWorks: [
            'Escolha a duração — de 1 a 5 horas',
            'Diga-nos o que quer ver (ou deixe à Susane)',
            'Desfrute de um roteiro feito só para si',
        ],
        // Sugestões que o cliente pode incluir no seu roteiro
        popularStops: [
            'Alfama e os seus miradouros',
            'Castelo de São Jorge',
            'Graça e Senhora do Monte',
            'Bairro Alto e Chiado',
            'Belém e os Jerónimos',
            'Parque Eduardo VII',
            'LX Factory',
            'Ginjinha ou pastéis de nata',
        ],
        included: TOUR_INCLUDED,
    },
    'belem': {
        name: 'Belém',
        img: 'assets/img/tour-belem.webp',
        duration: '2 horas',
        durationHours: 2,
        basePrice: 180,
        isALaCarte: false,
        maxPax: 5,
        description: 'Uma viagem à Era dos Descobrimentos pela zona ribeirinha de Belém. Em 2 horas percorremos os monumentos que contam a história dos navegadores portugueses — com tempo para provar os autênticos pastéis de Belém.',
        itinerary: [
            'Pastéis de Belém',
            'Mosteiro dos Jerónimos',
            'Torre de Belém',
            'Padrão dos Descobrimentos',
        ],
        included: TOUR_INCLUDED,
    },
    'half-day': {
        name: 'Half Day',
        img: 'assets/img/tour-half-day.webp',
        duration: '4 horas',
        durationHours: 4,
        basePrice: 300,
        isALaCarte: false,
        maxPax: 5,
        description: 'O passeio mais completo da Susane. Em 4 horas juntamos o melhor de Lisboa — Alfama, Graça, os grandes miradouros e ainda Belém — com paragem para uma ginjinha e tempo de sobra para fotografias em cada esquina.',
        itinerary: [
            'Igreja de Santo António',
            'Catedral da Sé',
            'Miradouro de Santa Luzia',
            'Miradouro das Portas do Sol',
            'Miradouro da Senhora do Monte',
            'Igreja e Mosteiro de São Vicente de Fora',
            'Feira da Ladra',
            'Panteão Nacional',
            'Paragem para ginjinha',
            'Elevador de Santa Justa',
            'Miradouro de São Pedro de Alcântara',
            'Assembleia da República',
            'Basílica da Estrela',
            'Pastéis de Belém',
            'Mosteiro dos Jerónimos',
            'Torre de Belém',
            'Padrão dos Descobrimentos',
        ],
        included: TOUR_INCLUDED,
    },
    'centro-historico': {
        name: 'Centro Histórico',
        img: 'assets/img/tour-centro-historico.webp',
        duration: '2 horas',
        durationHours: 2,
        basePrice: 180,
        isALaCarte: false,
        maxPax: 5,
        description: 'O coração antigo de Lisboa em 2 horas. Suba as colinas de Alfama e da Graça, perca-se nas ruelas medievais e descubra os miradouros, igrejas e azulejos que tornam esta a cidade mais autêntica da Europa.',
        itinerary: [
            'Igreja de Santo António',
            'Catedral da Sé',
            'Miradouro de Santa Luzia',
            'Miradouro das Portas do Sol',
            'Igreja e Convento da Graça',
            'Miradouro da Graça',
            'Miradouro da Senhora do Monte',
            'Igreja e Mosteiro de São Vicente de Fora',
            'Feira da Ladra',
            'Panteão Nacional',
            'Miradouro do Parque Eduardo VII',
        ],
        included: TOUR_INCLUDED,
    },
    'miradouros': {
        name: 'Lisboa Miradouros',
        img: 'assets/img/tour-miradouros.webp',
        duration: '3 horas',
        durationHours: 3,
        basePrice: 240,
        isALaCarte: false,
        maxPax: 5,
        description: 'As melhores vistas de Lisboa num só passeio. Em 3 horas subimos aos miradouros mais bonitos da cidade, atravessando bairros históricos, igrejas centenárias e os recantos preferidos de quem cá vive.',
        itinerary: [
            'Igreja de Santo António',
            'Catedral da Sé',
            'Miradouro de Santa Luzia',
            'Miradouro das Portas do Sol',
            'Igreja e Convento da Graça',
            'Miradouro da Graça',
            'Miradouro da Senhora do Monte',
            'Igreja e Mosteiro de São Vicente de Fora',
            'Feira da Ladra',
            'Panteão Nacional',
            'Elevador de Santa Justa',
            'Miradouro de São Pedro de Alcântara',
            'Assembleia da República',
            'Basílica da Estrela',
            'Miradouro do Parque Eduardo VII',
        ],
        included: TOUR_INCLUDED,
    },
    'full-lisboa': {
        name: 'Full Lisboa',
        img: 'assets/img/tour-full-lisboa.webp',
        duration: '5 horas',
        durationHours: 5,
        basePrice: 360,
        isALaCarte: false,
        maxPax: 5,
        description: 'A experiência definitiva: 5 horas para viver Lisboa de uma ponta à outra. Dos miradouros de Alfama à LX Factory e a Belém, com os elevadores históricos pelo caminho e todas as paragens fotográficas que quiser.',
        itinerary: [
            'Igreja de Santo António',
            'Catedral da Sé',
            'Miradouro de Santa Luzia',
            'Miradouro das Portas do Sol',
            'Igreja e Convento da Graça',
            'Miradouro da Graça',
            'Miradouro da Senhora do Monte',
            'Igreja e Mosteiro de São Vicente de Fora',
            'Feira da Ladra',
            'Panteão Nacional',
            'Elevador da Bica',
            'Elevador de Santa Justa',
            'Miradouro de São Pedro de Alcântara',
            'Miradouro do Parque Eduardo VII',
            'Assembleia da República',
            'Basílica da Estrela',
            'LX Factory',
            'Pastéis de Belém',
            'Mosteiro dos Jerónimos',
            'Torre de Belém',
            'Padrão dos Descobrimentos',
        ],
        included: TOUR_INCLUDED,
    },
};

const MONTH_NAMES_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const WEEKDAY_NAMES_PT = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

// ═══════════════════════════════════════════════════════
//  GLOBAL FUNCTIONS (called from HTML onclick)
// ═══════════════════════════════════════════════════════
function openBookingOverlay(tourId) {
    if (window._bookingOverlay) window._bookingOverlay.open(tourId);
}

// ═══════════════════════════════════════════════════════
//  DOM READY
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. Mobile Menu Drawer ─────────────────────────────
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const navDrawer = document.getElementById('mobile-nav-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link-item');

    const openDrawer = () => {
        navDrawer.classList.add('open');
        drawerOverlay.classList.add('active');
        navDrawer.setAttribute('aria-hidden', 'false');
        if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        navDrawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
        navDrawer.setAttribute('aria-hidden', 'true');
        if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    if (menuToggleBtn && menuCloseBtn && navDrawer && drawerOverlay) {
        menuToggleBtn.addEventListener('click', openDrawer);
        menuCloseBtn.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);
        drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
    }

    // ─── 2. Promo Banner ───────────────────────────────────
    const promoBanner = document.getElementById('promo-banner');
    const promoClose = document.getElementById('promo-close');
    const promoMessages = document.querySelectorAll('.promo-msg');
    let currentPromoIdx = 0;

    if (promoBanner && !sessionStorage.getItem('promoDismissed')) {
        if (promoMessages.length > 1) {
            setInterval(() => {
                promoMessages[currentPromoIdx].classList.remove('active');
                currentPromoIdx = (currentPromoIdx + 1) % promoMessages.length;
                promoMessages[currentPromoIdx].classList.add('active');
            }, 4000);
        }
        if (promoClose) {
            promoClose.addEventListener('click', () => {
                promoBanner.classList.add('hidden');
                document.body.classList.add('promo-dismissed');
                sessionStorage.setItem('promoDismissed', 'true');
            });
        }
    } else if (promoBanner) {
        promoBanner.classList.add('hidden');
        document.body.classList.add('promo-dismissed');
    }

    // ─── 3. Smart Header (sombra + esconder ao descer, mostrar ao subir) ──
    const header = document.getElementById('site-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Sombra/fundo assim que sai do topo
        header.classList.toggle('scrolled', currentScrollY > 10);

        // Esconde quando se desce (depois de passar o header) e volta ao subir.
        // Ignora micro-movimentos (>6px) para não tremer.
        if (Math.abs(currentScrollY - lastScrollY) > 6) {
            const goingDown = currentScrollY > lastScrollY;
            header.classList.toggle('header-hidden', goingDown && currentScrollY > 140);
            lastScrollY = currentScrollY;
        }
    }, { passive: true });

    // ─── 4. Language Dropdown ───────────────────────────────
    const langDropdown = document.getElementById('lang-dropdown');
    const langTrigger = document.getElementById('lang-dropdown-trigger');

    if (langDropdown && langTrigger) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langDropdown.classList.toggle('open');
            langTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
                langTrigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ─── 5. Sticky Mobile CTA ──────────────────────────────
    const stickyCta = document.getElementById('sticky-cta-mobile');
    const heroSection = document.querySelector('.hero-section');

    if (stickyCta && heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCta.classList.add('hidden');
                } else {
                    stickyCta.classList.remove('hidden');
                }
            });
        }, { root: null, threshold: 0.1 });
        observer.observe(heroSection);
    }

    // ─── 6. Booking Overlay (EcoTukTours-style) ────────────
    const BookingOverlay = (() => {
        const overlay = document.getElementById('booking-overlay');
        const overlayBody = document.getElementById('booking-overlay-body');
        const overlayTitle = document.getElementById('booking-overlay-tour-title');
        const closeBtn = document.getElementById('booking-overlay-close');
        const backBtn = document.getElementById('booking-overlay-back');

        let state = {
            tourId: null,
            tourData: null,
            selectedDuration: null,
            selectedDate: null,
            selectedTime: null,
            passengers: 2,
            calendarMonth: new Date().getMonth(),
            calendarYear: new Date().getFullYear(),
        };

        const calcPrice = (basePrice, pax) => {
            const tuks = Math.ceil(pax / 5);
            return basePrice * tuks;
        };

        const generateTimeSlots = (durationHours) => {
            const slots = [];
            let h = 8, m = 30;
            const maxH = durationHours >= 4 ? 16 : 17;
            while (h < maxH || (h === maxH && m === 0)) {
                slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
                m += 30;
                if (m >= 60) { h++; m -= 60; }
            }
            return slots;
        };

        const renderSteps = () => {
            const tour = state.tourData;
            if (!tour) return;

            const currentBasePrice = tour.isALaCarte
                ? (state.selectedDuration ? state.selectedDuration.price : 120)
                : tour.basePrice;
            const currentDurationHours = tour.isALaCarte
                ? (state.selectedDuration ? state.selectedDuration.hours : 0)
                : tour.durationHours;
            const totalPrice = calcPrice(currentBasePrice, state.passengers);
            const tukCount = Math.ceil(state.passengers / 5);

            let html = '';

            // Step 0: Duration selector (À la Carte only)
            if (tour.isALaCarte) {
                html += `
                <div class="booking-step ${state.selectedDuration ? 'completed' : ''}" id="booking-step-duration">
                    <div class="booking-step-header">
                        <span class="booking-step-number">1</span>
                        <div>
                            <div class="booking-step-label">Escolha a duração</div>
                            <div class="booking-step-sublabel">De 1 a 5 horas — o preço ajusta automaticamente</div>
                        </div>
                    </div>
                    <div class="booking-duration-pills">
                        ${tour.durationOptions.map(opt => `
                            <button class="booking-duration-pill ${state.selectedDuration && state.selectedDuration.hours === opt.hours ? 'selected' : ''}"
                                    data-hours="${opt.hours}" data-price="${opt.price}">
                                ${opt.label}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
            }

            const stepOffset = tour.isALaCarte ? 1 : 0;

            // Step 1: Calendar
            const calendarDisabled = tour.isALaCarte && !state.selectedDuration;
            html += `
            <div class="booking-step ${calendarDisabled ? 'disabled' : ''} ${state.selectedDate ? 'completed' : ''}" id="booking-step-date">
                <div class="booking-step-header">
                    <span class="booking-step-number">${1 + stepOffset}</span>
                    <div>
                        <div class="booking-step-label">Escolha a data</div>
                        ${state.selectedDate ? `<div class="booking-step-sublabel">✓ ${formatDatePT(state.selectedDate)}</div>` : ''}
                    </div>
                </div>
                <div class="booking-calendar" id="booking-calendar">
                    ${renderCalendar()}
                </div>
            </div>`;

            // Step 2: Time
            const timeDisabled = !state.selectedDate;
            const timeSlotsArr = currentDurationHours > 0 ? generateTimeSlots(currentDurationHours) : [];
            html += `
            <div class="booking-step ${timeDisabled ? 'disabled' : ''} ${state.selectedTime ? 'completed' : ''}" id="booking-step-time">
                <div class="booking-step-header">
                    <span class="booking-step-number">${2 + stepOffset}</span>
                    <div>
                        <div class="booking-step-label">Escolha a hora</div>
                        ${state.selectedTime ? `<div class="booking-step-sublabel">✓ ${state.selectedTime}</div>` : ''}
                    </div>
                </div>
                <div class="booking-time-grid" id="booking-time-grid">
                    ${timeSlotsArr.map(t => `
                        <button class="booking-time-pill ${state.selectedTime === t ? 'selected' : ''}" data-time="${t}">${t}</button>
                    `).join('')}
                </div>
            </div>`;

            // Step 3: Passengers
            const paxDisabled = !state.selectedTime;
            html += `
            <div class="booking-step ${paxDisabled ? 'disabled' : ''}" id="booking-step-pax">
                <div class="booking-step-header">
                    <span class="booking-step-number">${3 + stepOffset}</span>
                    <div>
                        <div class="booking-step-label">Passageiros</div>
                    </div>
                </div>
                <div class="booking-pax-stepper">
                    <button class="pax-stepper-btn" id="pax-minus" ${state.passengers <= 1 ? 'disabled' : ''}>−</button>
                    <div class="pax-stepper-display">
                        <div class="pax-stepper-count" id="pax-count">${state.passengers}</div>
                        <div class="pax-stepper-label">${state.passengers === 1 ? 'passageiro' : 'passageiros'}</div>
                    </div>
                    <button class="pax-stepper-btn" id="pax-plus" ${state.passengers >= 10 ? 'disabled' : ''}>+</button>
                </div>
                <div class="booking-multi-tuk-alert ${state.passengers < 6 ? 'hidden' : ''}" id="booking-multi-tuk">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>Para ${state.passengers} passageiros serão necessários ${tukCount} tuk-tuks — o preço é calculado automaticamente.</span>
                </div>
                <button class="btn btn-primary btn-block btn-large booking-continue-btn" id="booking-continue-btn">
                    Continuar — €${totalPrice}
                </button>
            </div>`;

            // Step 4: Checkout
            const checkoutHidden = !state.selectedTime;
            html += `
            <div class="booking-step ${checkoutHidden ? 'disabled' : ''}" id="booking-step-checkout" style="display:none;">
                <div class="booking-step-header">
                    <span class="booking-step-number">${4 + stepOffset}</span>
                    <div>
                        <div class="booking-step-label">Finalizar Reserva</div>
                    </div>
                </div>
                <div class="booking-checkout-grid">
                    <form class="booking-checkout-form" id="booking-checkout-form" novalidate>
                        <div class="booking-checkout-row">
                            <div>
                                <label>Nome <span class="required">*</span></label>
                                <input type="text" id="bk-name" placeholder="Nome" required autocomplete="given-name">
                            </div>
                            <div>
                                <label>Apelido <span class="required">*</span></label>
                                <input type="text" id="bk-surname" placeholder="Apelido" required autocomplete="family-name">
                            </div>
                        </div>
                        <div>
                            <label>Email <span class="required">*</span></label>
                            <input type="email" id="bk-email" placeholder="email@exemplo.com" required autocomplete="email">
                        </div>
                        <div>
                            <label>Telemóvel <span class="required">*</span></label>
                            <input type="tel" id="bk-phone" placeholder="+351 9XX XXX XXX" required autocomplete="tel">
                        </div>
                        <div>
                            <label>País</label>
                            <select id="bk-country">
                                <option value="">Selecionar país</option>
                                <option value="PT">Portugal</option>
                                <option value="BR">Brasil</option>
                                <option value="US">Estados Unidos</option>
                                <option value="GB">Reino Unido</option>
                                <option value="FR">França</option>
                                <option value="DE">Alemanha</option>
                                <option value="ES">Espanha</option>
                                <option value="IT">Itália</option>
                                <option value="NL">Países Baixos</option>
                                <option value="OTHER">Outro</option>
                            </select>
                        </div>
                        <div class="booking-checkout-terms">
                            <input type="checkbox" id="bk-terms" required>
                            <span>Concordo com os termos da reserva e a política de cancelamento gratuito até 48h antes.</span>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block btn-large" id="bk-submit-btn">
                            <span id="bk-submit-text">CONFIRMAR RESERVA — €${totalPrice}</span>
                            <span id="bk-submit-loading" class="stripe-loading hidden">
                                <span class="stripe-spinner"></span> A processar...
                            </span>
                        </button>
                        <p class="stripe-security-note">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            Reserva segura · Cancelamento gratuito até 48h antes
                        </p>
                    </form>
                    <div class="booking-tour-summary">
                        <img class="booking-summary-img" src="${tour.img}" alt="${tour.name}">
                        <div class="booking-summary-body">
                            <div class="booking-summary-name">${tour.name}</div>
                            <div class="booking-summary-detail">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                ${currentDurationHours ? currentDurationHours + 'h' : tour.duration}
                            </div>
                            ${state.selectedDate ? `<div class="booking-summary-detail">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                ${formatDatePT(state.selectedDate)}
                            </div>` : ''}
                            ${state.selectedTime ? `<div class="booking-summary-detail">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                ${state.selectedTime}
                            </div>` : ''}
                            <div class="booking-summary-detail">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                                ${state.passengers} ${state.passengers === 1 ? 'passageiro' : 'passageiros'} ${tukCount > 1 ? `· ${tukCount} tuk-tuks` : ''}
                            </div>
                            <div class="booking-summary-divider"></div>
                            <div class="booking-summary-price-row">
                                <span>Subtotal</span>
                                <span>€${currentBasePrice}</span>
                            </div>
                            ${tukCount > 1 ? `<div class="booking-summary-price-row">
                                <span>× ${tukCount} tuk-tuks</span>
                                <span>€${totalPrice}</span>
                            </div>` : ''}
                            <div class="booking-summary-total">
                                <span>Total devido</span>
                                <span>€${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            // Success state
            html += `<div class="booking-success hidden" id="booking-success">
                <div class="booking-success-icon">✓</div>
                <h3>Pedido enviado com sucesso!</h3>
                <p>A Susane entrará em contacto em breve para confirmar a sua reserva.</p>
                <div class="booking-success-details" id="booking-success-details"></div>
                <a href="https://wa.me/351966697738" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="margin-top:1rem;">
                    Confirmar via WhatsApp
                </a>
            </div>`;

            overlayBody.innerHTML = html;
            bindOverlayEvents();
        };

        const renderCalendar = () => {
            const year = state.calendarYear;
            const month = state.calendarMonth;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const firstDay = new Date(year, month, 1);
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            // Monday = 0 start
            let startDay = firstDay.getDay() - 1;
            if (startDay < 0) startDay = 6;

            const isPrevDisabled = (year === today.getFullYear() && month <= today.getMonth());

            let html = `
                <div class="calendar-nav">
                    <button class="calendar-nav-btn" id="cal-prev" ${isPrevDisabled ? 'disabled' : ''}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <span class="calendar-month-title">${MONTH_NAMES_PT[month]} ${year}</span>
                    <button class="calendar-nav-btn" id="cal-next">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>
                <div class="calendar-weekdays">
                    ${WEEKDAY_NAMES_PT.map(d => `<span class="calendar-weekday">${d}</span>`).join('')}
                </div>
                <div class="calendar-days">`;

            // Empty cells before first day
            for (let i = 0; i < startDay; i++) {
                html += `<button class="calendar-day empty" disabled></button>`;
            }

            for (let d = 1; d <= daysInMonth; d++) {
                const dateObj = new Date(year, month, d);
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const isPast = dateObj < today;
                const isToday = dateObj.getTime() === today.getTime();
                const isSelected = state.selectedDate === dateStr;
                const classes = [
                    'calendar-day',
                    isPast ? 'disabled' : '',
                    isToday ? 'today' : '',
                    isSelected ? 'selected' : '',
                ].filter(Boolean).join(' ');

                html += `<button class="${classes}" data-date="${dateStr}" ${isPast ? 'disabled' : ''}>${d}</button>`;
            }

            html += `</div>`;
            return html;
        };

        const formatDatePT = (dateStr) => {
            const parts = dateStr.split('-');
            return `${parts[2]} de ${MONTH_NAMES_PT[parseInt(parts[1], 10) - 1]} de ${parts[0]}`;
        };

        const bindOverlayEvents = () => {
            // Duration pills (à la carte)
            overlayBody.querySelectorAll('.booking-duration-pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    state.selectedDuration = {
                        hours: parseInt(pill.dataset.hours),
                        price: parseInt(pill.dataset.price),
                    };
                    state.selectedTime = null; // Reset time when duration changes
                    renderSteps();
                });
            });

            // Calendar nav
            const calPrev = overlayBody.querySelector('#cal-prev');
            const calNext = overlayBody.querySelector('#cal-next');
            if (calPrev) calPrev.addEventListener('click', () => {
                state.calendarMonth--;
                if (state.calendarMonth < 0) { state.calendarMonth = 11; state.calendarYear--; }
                renderSteps();
            });
            if (calNext) calNext.addEventListener('click', () => {
                state.calendarMonth++;
                if (state.calendarMonth > 11) { state.calendarMonth = 0; state.calendarYear++; }
                renderSteps();
            });

            // Calendar days
            overlayBody.querySelectorAll('.calendar-day:not(.disabled):not(.empty)').forEach(day => {
                day.addEventListener('click', () => {
                    state.selectedDate = day.dataset.date;
                    state.selectedTime = null; // Reset time when date changes
                    renderSteps();
                    // Smooth scroll to time step
                    setTimeout(() => {
                        const timeStep = document.getElementById('booking-step-time');
                        if (timeStep) timeStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                });
            });

            // Time pills
            overlayBody.querySelectorAll('.booking-time-pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    state.selectedTime = pill.dataset.time;
                    renderSteps();
                    setTimeout(() => {
                        const paxStep = document.getElementById('booking-step-pax');
                        if (paxStep) paxStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                });
            });

            // Pax stepper
            const paxMinus = overlayBody.querySelector('#pax-minus');
            const paxPlus = overlayBody.querySelector('#pax-plus');
            if (paxMinus) paxMinus.addEventListener('click', () => {
                if (state.passengers > 1) { state.passengers--; renderSteps(); }
            });
            if (paxPlus) paxPlus.addEventListener('click', () => {
                if (state.passengers < 10) { state.passengers++; renderSteps(); }
            });

            // Continue to checkout
            const continueBtn = overlayBody.querySelector('#booking-continue-btn');
            if (continueBtn) {
                continueBtn.addEventListener('click', () => {
                    const checkoutStep = document.getElementById('booking-step-checkout');
                    const paxStep = document.getElementById('booking-step-pax');
                    if (checkoutStep) {
                        checkoutStep.style.display = '';
                        checkoutStep.classList.remove('disabled');
                        // Hide continue button
                        continueBtn.style.display = 'none';
                        checkoutStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }

            // Form submit
            const form = overlayBody.querySelector('#booking-checkout-form');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    if (!form.checkValidity()) { form.reportValidity(); return; }

                    const submitText = document.getElementById('bk-submit-text');
                    const submitLoading = document.getElementById('bk-submit-loading');
                    const submitBtn = document.getElementById('bk-submit-btn');
                    submitText.classList.add('hidden');
                    submitLoading.classList.remove('hidden');
                    submitBtn.disabled = true;

                    const tour = state.tourData;
                    const basePrice = tour.isALaCarte ? state.selectedDuration.price : tour.basePrice;
                    const totalPrice = calcPrice(basePrice, state.passengers);
                    const customer = {
                        name: document.getElementById('bk-name').value,
                        surname: document.getElementById('bk-surname').value,
                        email: document.getElementById('bk-email').value,
                        phone: document.getElementById('bk-phone').value,
                        country: document.getElementById('bk-country').value,
                    };

                    const cfg = window.LISBONTUK_PAYMENTS;

                    // ─── Pagamento real (Stripe via Supabase) ───────────
                    if (cfg && cfg.enabled && cfg.supabaseUrl && cfg.anonKey) {
                        try {
                            const res = await fetch(`${cfg.supabaseUrl}/functions/v1/create-checkout-session`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${cfg.anonKey}`,
                                },
                                body: JSON.stringify({
                                    tourId: state.tourId,
                                    durationHours: tour.isALaCarte ? state.selectedDuration.hours : tour.durationHours,
                                    passengers: state.passengers,
                                    date: state.selectedDate,
                                    time: state.selectedTime,
                                    customer,
                                }),
                            });
                            const data = await res.json();
                            if (data && data.url) { window.location.href = data.url; return; }
                            throw new Error((data && data.error) || 'Não foi possível iniciar o pagamento.');
                        } catch (err) {
                            submitText.classList.remove('hidden');
                            submitLoading.classList.add('hidden');
                            submitBtn.disabled = false;
                            let errBox = document.getElementById('bk-error');
                            if (!errBox) {
                                errBox = document.createElement('p');
                                errBox.id = 'bk-error';
                                errBox.className = 'booking-error-note';
                                submitBtn.parentNode.insertBefore(errBox, submitBtn.nextSibling);
                            }
                            errBox.textContent = '⚠️ ' + err.message + ' Tente novamente ou fale connosco pelo WhatsApp.';
                            return;
                        }
                    }

                    // ─── Fallback: confirmação simulada (até ligar as chaves) ───
                    setTimeout(() => {
                        overlayBody.querySelectorAll('.booking-step').forEach(s => s.style.display = 'none');
                        const success = document.getElementById('booking-success');
                        success.classList.remove('hidden');
                        document.getElementById('booking-success-details').innerHTML = `
                            <strong>Tour:</strong> ${tour.name}<br>
                            <strong>Data:</strong> ${formatDatePT(state.selectedDate)}<br>
                            <strong>Hora:</strong> ${state.selectedTime}<br>
                            <strong>Passageiros:</strong> ${state.passengers}<br>
                            <strong>Valor total:</strong> €${totalPrice}<br>
                            <strong>Nome:</strong> ${customer.name}
                        `;
                    }, 1500);
                });
            }
        };

        const open = (tourId) => {
            const tour = TOUR_DATA[tourId];
            if (!tour) return;

            state = {
                tourId,
                tourData: tour,
                selectedDuration: null,
                selectedDate: null,
                selectedTime: null,
                passengers: 2,
                calendarMonth: new Date().getMonth(),
                calendarYear: new Date().getFullYear(),
            };

            overlayTitle.textContent = tour.name;
            renderSteps();
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            overlay.scrollTo(0, 0);
        };

        const close = () => {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', close);
        if (backBtn) backBtn.addEventListener('click', close);

        return { open, close };
    })();

    window._bookingOverlay = BookingOverlay;

    // ─── 8. Old OTA Engine (kept for compatibility, section hidden via CSS) ──
    // The old booking engine code for #reserva is preserved but the section is hidden.
    // Time slot generation for OTA cards (if section is re-enabled)
    const bookingDate = document.getElementById('booking-date');
    const bookingPassengers = document.getElementById('booking-passengers');
    const multiTukAlert = document.getElementById('multi-tuk-alert');
    const availabilityStatus = document.getElementById('availability-status');

    let selectedDate = null;
    let currentMultiplier = 1;

    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.min = today;
        bookingDate.addEventListener('change', (e) => {
            selectedDate = e.target.value;
            if (availabilityStatus) {
                availabilityStatus.className = 'availability-status success';
                availabilityStatus.textContent = '✅ Data disponível! Escolha um passeio e um horário abaixo.';
            }
        });
    }

    if (bookingPassengers) {
        bookingPassengers.addEventListener('change', (e) => {
            const pax = parseInt(e.target.value, 10);
            if (pax >= 6) {
                currentMultiplier = 2;
                if (multiTukAlert) multiTukAlert.classList.remove('hidden');
            } else {
                currentMultiplier = 1;
                if (multiTukAlert) multiTukAlert.classList.add('hidden');
            }
        });
    }

    // Auto-format card inputs (if old modal is opened)
    const cardInput = document.getElementById('stripe-card-number');
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            let formatted = '';
            for (let i = 0; i < val.length; i++) {
                if (i > 0 && i % 4 === 0) formatted += ' ';
                formatted += val[i];
            }
            e.target.value = formatted;
        });
    }

    const expiryInput = document.getElementById('stripe-card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 2) val = val.substring(0,2) + ' / ' + val.substring(2,4);
            e.target.value = val;
        });
    }

    // ─── 9. Gallery Lightbox ───────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));

    if (lightbox && galleryCards.length) {
        const lbImg = document.getElementById('lightbox-img');
        const lbCaption = document.getElementById('lightbox-caption');
        const lbCounter = document.getElementById('lightbox-counter');
        const lbClose = document.getElementById('lightbox-close');
        const lbPrev = document.getElementById('lightbox-prev');
        const lbNext = document.getElementById('lightbox-next');
        let currentIdx = 0;
        let lastFocused = null;

        const show = (idx) => {
            currentIdx = (idx + galleryCards.length) % galleryCards.length;
            const card = galleryCards[currentIdx];
            const thumb = card.querySelector('img');
            const captionEl = card.querySelector('.gallery-card-caption');
            lbImg.src = card.dataset.full || thumb.src;
            lbImg.alt = thumb.alt;
            lbCaption.textContent = captionEl ? captionEl.textContent : '';
            lbCounter.textContent = `${currentIdx + 1} / ${galleryCards.length}`;
        };

        const openLightbox = (idx) => {
            lastFocused = document.activeElement;
            show(idx);
            lightbox.classList.add('open');
            document.body.classList.add('lightbox-open');
            lbClose.focus();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.classList.remove('lightbox-open');
            lbImg.src = '';
            if (lastFocused) lastFocused.focus();
        };

        galleryCards.forEach((card, idx) => card.addEventListener('click', () => openLightbox(idx)));
        lbClose.addEventListener('click', closeLightbox);
        lbPrev.addEventListener('click', () => show(currentIdx - 1));
        lbNext.addEventListener('click', () => show(currentIdx + 1));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') show(currentIdx - 1);
            else if (e.key === 'ArrowRight') show(currentIdx + 1);
        });

        // Swipe táctil (mobile)
        let touchStartX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        lightbox.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 60) {
                if (dx > 0) show(currentIdx - 1);
                else show(currentIdx + 1);
            }
        }, { passive: true });
    }

    // ─── 10. Google Reviews (Places API via Supabase) ──────
    (function initGoogleReviews() {
        const root = document.getElementById('google-reviews');
        if (!root) return;
        const cfg = window.LISBONTUK_PAYMENTS;
        const grid = document.getElementById('gr-grid');
        const ratingEl = document.getElementById('gr-rating');
        const starsEl = document.getElementById('gr-stars');
        const countEl = document.getElementById('gr-count');
        const liveEl = document.getElementById('gr-live');
        const logoTemplate = root.querySelector('.gr-glogo');
        if (!grid || !cfg || !cfg.supabaseUrl || !cfg.anonKey) return; // sem backend -> fica o fallback estático

        const fmt = (n, d) => Number(n).toLocaleString('pt-PT', { minimumFractionDigits: d, maximumFractionDigits: d });
        const pct = (r) => Math.max(0, Math.min(100, (r / 5) * 100)) + '%';
        const AVATAR_BG = ['#1976D2', '#DB2777', '#0D9488', '#7E6BD9', '#EA580C', '#0EA5E9'];

        const starbar = (r) => {
            const s = document.createElement('span');
            s.className = 'gr-starbar gr-starbar--sm';
            s.style.setProperty('--pct', pct(r));
            s.setAttribute('role', 'img');
            s.setAttribute('aria-label', fmt(r, 1) + ' de 5 estrelas');
            return s;
        };

        // Esqueleto de carregamento (3 cartões pulsantes)
        grid.hidden = false;
        grid.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const sk = document.createElement('div');
            sk.className = 'gr-card gr-card--skeleton';
            sk.innerHTML = '<div class="gr-sk-head"></div><div class="gr-sk-line"></div><div class="gr-sk-line"></div><div class="gr-sk-line gr-sk-short"></div>';
            grid.appendChild(sk);
        }

        const renderCard = (rv, i) => {
            const card = document.createElement('article');
            card.className = 'gr-card';

            const head = document.createElement('header');
            head.className = 'gr-card-head';

            let av;
            if (rv.photo) {
                av = document.createElement('img');
                av.className = 'gr-avatar';
                av.src = rv.photo; av.alt = ''; av.loading = 'lazy';
                av.referrerPolicy = 'no-referrer';
                av.onerror = function () {
                    const span = document.createElement('span');
                    span.className = 'gr-avatar gr-avatar--initial';
                    span.style.background = AVATAR_BG[i % AVATAR_BG.length];
                    span.textContent = (rv.author || '?').trim().charAt(0).toUpperCase();
                    av.replaceWith(span);
                };
            } else {
                av = document.createElement('span');
                av.className = 'gr-avatar gr-avatar--initial';
                av.style.background = AVATAR_BG[i % AVATAR_BG.length];
                av.textContent = (rv.author || '?').trim().charAt(0).toUpperCase();
            }
            head.appendChild(av);

            const meta = document.createElement('div');
            meta.className = 'gr-card-meta';
            const nm = document.createElement('span');
            nm.className = 'gr-card-name';
            nm.textContent = rv.author || 'Cliente Google';
            const tm = document.createElement('span');
            tm.className = 'gr-card-time';
            tm.textContent = rv.time || '';
            meta.appendChild(nm); meta.appendChild(tm);
            head.appendChild(meta);

            if (logoTemplate) {
                const g = logoTemplate.cloneNode(true);
                g.setAttribute('class', 'gr-card-g');
                g.removeAttribute('width'); g.removeAttribute('height');
                head.appendChild(g);
            }
            card.appendChild(head);
            card.appendChild(starbar(rv.rating));

            const txt = document.createElement('p');
            txt.className = 'gr-card-text';
            txt.textContent = rv.text;
            card.appendChild(txt);
            return card;
        };

        fetch(cfg.supabaseUrl + '/functions/v1/google-reviews', {
            headers: { 'Authorization': 'Bearer ' + cfg.anonKey, 'apikey': cfg.anonKey }
        })
        .then((r) => r.json())
        .then((data) => {
            if (!data || data.error) throw new Error((data && data.error) || 'sem dados');
            if (typeof data.rating === 'number' && ratingEl) {
                ratingEl.textContent = fmt(data.rating, 1);
                if (starsEl) {
                    starsEl.style.setProperty('--pct', pct(data.rating));
                    starsEl.setAttribute('aria-label', fmt(data.rating, 1) + ' de 5 estrelas');
                }
            }
            if (typeof data.total === 'number' && countEl) {
                countEl.innerHTML = '<strong>' + fmt(data.total, 0) + '</strong> avaliações no Google';
            }
            if (liveEl) liveEl.hidden = false;

            grid.innerHTML = '';
            const list = Array.isArray(data.reviews) ? data.reviews : [];
            if (!list.length) { grid.hidden = true; return; }
            list.forEach((rv, i) => grid.appendChild(renderCard(rv, i)));
        })
        .catch(() => {
            // Sem ligação ainda (ex.: chave Google por configurar) -> mantém o resumo estático
            grid.innerHTML = '';
            grid.hidden = true;
        });
    })();
});
