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
        img: '/assets/img/tour-a-la-carte.webp',
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
        img: '/assets/img/tour-belem.webp',
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
        img: '/assets/img/tour-half-day.webp',
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
            'Panteão Nacional',
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
        img: '/assets/img/tour-centro-historico.webp',
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
        img: '/assets/img/tour-miradouros.webp',
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
        img: '/assets/img/tour-full-lisboa.webp',
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

// ═══════════════════════════════════════════════════════
//  I18N — textos do overlay de reserva (pt/en/es/it/fr)
//  A língua é lida do atributo lang do <html>.
// ═══════════════════════════════════════════════════════
const I18N = {
    pt: {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        dateFmt: (d, mName, y) => `${d} de ${mName} de ${y}`,
        chooseDuration: 'Escolha a duração',
        durationHint: 'De 1 a 5 horas — o preço ajusta automaticamente',
        chooseDate: 'Escolha a data',
        chooseTime: 'Escolha a hora',
        noSlotsToday: 'Para hoje já não há horários online — fale connosco no WhatsApp e encontramos uma solução.',
        noSlotsDay: 'Este dia já está reservado — fale connosco no WhatsApp e encontramos uma solução.',
        loadingSlots: 'A verificar disponibilidade…',
        passengers: 'Passageiros',
        passenger1: 'passageiro', passengerN: 'passageiros',
        multiTuk: (n, t) => `Para ${n} passageiros serão necessários ${t} tuk-tuks — o preço é calculado automaticamente.`,
        cont: 'Continuar', checkoutTitle: 'Finalizar Reserva',
        name: 'Nome', surname: 'Apelido', email: 'Email', phone: 'Telemóvel', country: 'País',
        namePh: 'Nome', surnamePh: 'Apelido', emailPh: 'email@exemplo.com', phonePh: '+351 9XX XXX XXX',
        selectCountry: 'Selecionar país', other: 'Outro',
        countries: { PT: 'Portugal', BR: 'Brasil', US: 'Estados Unidos', GB: 'Reino Unido', FR: 'França', DE: 'Alemanha', ES: 'Espanha', IT: 'Itália', NL: 'Países Baixos' },
        terms: 'Concordo com os termos da reserva e a política de cancelamento gratuito até 48h antes.',
        confirm: 'CONFIRMAR RESERVA', processing: 'A processar...',
        secure: 'Reserva segura · Cancelamento gratuito até 48h antes',
        subtotal: 'Subtotal', totalDue: 'Total devido',
        successTitle: 'Pedido enviado com sucesso!',
        successMsg: 'A Susane entrará em contacto em breve para confirmar a sua reserva.',
        successWa: 'Confirmar via WhatsApp',
        payError: 'Não foi possível iniciar o pagamento.',
        tryAgain: 'Tente novamente ou fale connosco pelo WhatsApp.',
        pickTourTitle: 'Escolha o seu passeio', from: 'Desde', perGroup: 'por grupo', bestSeller: 'Mais vendido',
        contactMessageLabel: 'Mensagem (opcional)', contactMessagePh: 'Conte-nos um pouco sobre o passeio que procura...',
        contactSending: 'A enviar...', contactSuccessTitle: 'Mensagem enviada!',
        contactSuccessMsg: 'Obrigado! A Susane vai responder brevemente para o seu e-mail.',
        contactError: 'Não foi possível enviar a mensagem. Tente novamente ou fale connosco pelo WhatsApp.',
    },
    en: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dateFmt: (d, mName, y) => `${mName} ${d}, ${y}`,
        chooseDuration: 'Choose the duration',
        durationHint: 'From 1 to 5 hours — the price adjusts automatically',
        chooseDate: 'Choose a date',
        chooseTime: 'Choose a time',
        noSlotsToday: 'No more online slots for today — message us on WhatsApp and we\'ll work something out.',
        noSlotsDay: 'This day is already booked — message us on WhatsApp and we\'ll work something out.',
        loadingSlots: 'Checking availability…',
        passengers: 'Passengers',
        passenger1: 'passenger', passengerN: 'passengers',
        multiTuk: (n, t) => `${n} passengers require ${t} tuk-tuks — the price is calculated automatically.`,
        cont: 'Continue', checkoutTitle: 'Complete Booking',
        name: 'First name', surname: 'Last name', email: 'Email', phone: 'Mobile phone', country: 'Country',
        namePh: 'First name', surnamePh: 'Last name', emailPh: 'email@example.com', phonePh: '+1 555 000 0000',
        selectCountry: 'Select country', other: 'Other',
        countries: { PT: 'Portugal', BR: 'Brazil', US: 'United States', GB: 'United Kingdom', FR: 'France', DE: 'Germany', ES: 'Spain', IT: 'Italy', NL: 'Netherlands' },
        terms: 'I agree to the booking terms and the free-cancellation policy (up to 48h before).',
        confirm: 'CONFIRM BOOKING', processing: 'Processing...',
        secure: 'Secure booking · Free cancellation up to 48h before',
        subtotal: 'Subtotal', totalDue: 'Total due',
        successTitle: 'Request sent successfully!',
        successMsg: 'Susane will contact you shortly to confirm your booking.',
        successWa: 'Confirm via WhatsApp',
        payError: 'We could not start the payment.',
        tryAgain: 'Please try again or contact us on WhatsApp.',
        pickTourTitle: 'Choose your tour', from: 'From', perGroup: 'per group', bestSeller: 'Best seller',
        contactMessageLabel: 'Message (optional)', contactMessagePh: 'Tell us a bit about the tour you\'re looking for...',
        contactSending: 'Sending...', contactSuccessTitle: 'Message sent!',
        contactSuccessMsg: 'Thank you! Susane will reply to your email shortly.',
        contactError: 'We could not send your message. Please try again or contact us on WhatsApp.',
    },
    es: {
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdays: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        dateFmt: (d, mName, y) => `${d} de ${mName} de ${y}`,
        chooseDuration: 'Elige la duración',
        durationHint: 'De 1 a 5 horas — el precio se ajusta automáticamente',
        chooseDate: 'Elige la fecha',
        chooseTime: 'Elige la hora',
        noSlotsToday: 'Ya no quedan horarios online para hoy — escríbenos por WhatsApp y buscamos una solución.',
        noSlotsDay: 'Este día ya está reservado — escríbenos por WhatsApp y buscamos una solución.',
        loadingSlots: 'Comprobando disponibilidad…',
        passengers: 'Pasajeros',
        passenger1: 'pasajero', passengerN: 'pasajeros',
        multiTuk: (n, t) => `Para ${n} pasajeros se necesitan ${t} tuk-tuks — el precio se calcula automáticamente.`,
        cont: 'Continuar', checkoutTitle: 'Finalizar Reserva',
        name: 'Nombre', surname: 'Apellido', email: 'Email', phone: 'Móvil', country: 'País',
        namePh: 'Nombre', surnamePh: 'Apellido', emailPh: 'email@ejemplo.com', phonePh: '+34 6XX XXX XXX',
        selectCountry: 'Seleccionar país', other: 'Otro',
        countries: { PT: 'Portugal', BR: 'Brasil', US: 'Estados Unidos', GB: 'Reino Unido', FR: 'Francia', DE: 'Alemania', ES: 'España', IT: 'Italia', NL: 'Países Bajos' },
        terms: 'Acepto las condiciones de la reserva y la política de cancelación gratuita hasta 48h antes.',
        confirm: 'CONFIRMAR RESERVA', processing: 'Procesando...',
        secure: 'Reserva segura · Cancelación gratuita hasta 48h antes',
        subtotal: 'Subtotal', totalDue: 'Total a pagar',
        successTitle: '¡Solicitud enviada con éxito!',
        successMsg: 'Susane se pondrá en contacto contigo en breve para confirmar tu reserva.',
        successWa: 'Confirmar por WhatsApp',
        payError: 'No se pudo iniciar el pago.',
        tryAgain: 'Inténtalo de nuevo o escríbenos por WhatsApp.',
        pickTourTitle: 'Elige tu tour', from: 'Desde', perGroup: 'por grupo', bestSeller: 'Más vendido',
        contactMessageLabel: 'Mensaje (opcional)', contactMessagePh: 'Cuéntanos un poco sobre el tour que buscas...',
        contactSending: 'Enviando...', contactSuccessTitle: '¡Mensaje enviado!',
        contactSuccessMsg: '¡Gracias! Susane responderá a tu email en breve.',
        contactError: 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.',
    },
    it: {
        months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        dateFmt: (d, mName, y) => `${d} ${mName} ${y}`,
        chooseDuration: 'Scegli la durata',
        durationHint: 'Da 1 a 5 ore — il prezzo si aggiorna automaticamente',
        chooseDate: 'Scegli la data',
        chooseTime: "Scegli l'orario",
        noSlotsToday: 'Per oggi non ci sono più orari online — scrivici su WhatsApp e troviamo una soluzione.',
        noSlotsDay: 'Questo giorno è già prenotato — scrivici su WhatsApp e troviamo una soluzione.',
        loadingSlots: 'Verifica disponibilità…',
        passengers: 'Passeggeri',
        passenger1: 'passeggero', passengerN: 'passeggeri',
        multiTuk: (n, t) => `Per ${n} passeggeri servono ${t} tuk-tuk — il prezzo viene calcolato automaticamente.`,
        cont: 'Continua', checkoutTitle: 'Completa la Prenotazione',
        name: 'Nome', surname: 'Cognome', email: 'Email', phone: 'Cellulare', country: 'Paese',
        namePh: 'Nome', surnamePh: 'Cognome', emailPh: 'email@esempio.com', phonePh: '+39 3XX XXX XXXX',
        selectCountry: 'Seleziona il paese', other: 'Altro',
        countries: { PT: 'Portogallo', BR: 'Brasile', US: 'Stati Uniti', GB: 'Regno Unito', FR: 'Francia', DE: 'Germania', ES: 'Spagna', IT: 'Italia', NL: 'Paesi Bassi' },
        terms: 'Accetto i termini della prenotazione e la politica di cancellazione gratuita fino a 48h prima.',
        confirm: 'CONFERMA PRENOTAZIONE', processing: 'Elaborazione...',
        secure: 'Prenotazione sicura · Cancellazione gratuita fino a 48h prima',
        subtotal: 'Subtotale', totalDue: 'Totale dovuto',
        successTitle: 'Richiesta inviata con successo!',
        successMsg: 'Susane ti contatterà a breve per confermare la tua prenotazione.',
        successWa: 'Conferma via WhatsApp',
        payError: 'Impossibile avviare il pagamento.',
        tryAgain: 'Riprova o scrivici su WhatsApp.',
        pickTourTitle: 'Scegli il tuo tour', from: 'Da', perGroup: 'a gruppo', bestSeller: 'Più venduto',
        contactMessageLabel: 'Messaggio (facoltativo)', contactMessagePh: 'Raccontaci un po\' del tour che stai cercando...',
        contactSending: 'Invio in corso...', contactSuccessTitle: 'Messaggio inviato!',
        contactSuccessMsg: 'Grazie! Susane risponderà alla tua email a breve.',
        contactError: 'Non è stato possibile inviare il messaggio. Riprova o scrivici su WhatsApp.',
    },
    fr: {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        weekdays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        dateFmt: (d, mName, y) => `${d} ${mName} ${y}`,
        chooseDuration: 'Choisissez la durée',
        durationHint: 'De 1 à 5 heures — le prix s\'ajuste automatiquement',
        chooseDate: 'Choisissez la date',
        chooseTime: "Choisissez l'heure",
        noSlotsToday: 'Plus de créneaux en ligne pour aujourd\'hui — écrivez-nous sur WhatsApp et nous trouverons une solution.',
        noSlotsDay: 'Ce jour est déjà réservé — écrivez-nous sur WhatsApp et nous trouverons une solution.',
        loadingSlots: 'Vérification des disponibilités…',
        passengers: 'Passagers',
        passenger1: 'passager', passengerN: 'passagers',
        multiTuk: (n, t) => `Pour ${n} passagers, ${t} tuk-tuks sont nécessaires — le prix est calculé automatiquement.`,
        cont: 'Continuer', checkoutTitle: 'Finaliser la Réservation',
        name: 'Prénom', surname: 'Nom', email: 'Email', phone: 'Portable', country: 'Pays',
        namePh: 'Prénom', surnamePh: 'Nom', emailPh: 'email@exemple.com', phonePh: '+33 6 XX XX XX XX',
        selectCountry: 'Sélectionner le pays', other: 'Autre',
        countries: { PT: 'Portugal', BR: 'Brésil', US: 'États-Unis', GB: 'Royaume-Uni', FR: 'France', DE: 'Allemagne', ES: 'Espagne', IT: 'Italie', NL: 'Pays-Bas' },
        terms: 'J\'accepte les conditions de réservation et la politique d\'annulation gratuite jusqu\'à 48h avant.',
        confirm: 'CONFIRMER LA RÉSERVATION', processing: 'Traitement...',
        secure: 'Réservation sécurisée · Annulation gratuite jusqu\'à 48h avant',
        subtotal: 'Sous-total', totalDue: 'Total à payer',
        successTitle: 'Demande envoyée avec succès !',
        successMsg: 'Susane vous contactera sous peu pour confirmer votre réservation.',
        successWa: 'Confirmer via WhatsApp',
        payError: 'Impossible de démarrer le paiement.',
        tryAgain: 'Réessayez ou contactez-nous sur WhatsApp.',
        pickTourTitle: 'Choisissez votre balade', from: 'Dès', perGroup: 'par groupe', bestSeller: 'Best-seller',
        contactMessageLabel: 'Message (facultatif)', contactMessagePh: 'Parlez-nous un peu de la balade que vous recherchez...',
        contactSending: 'Envoi...', contactSuccessTitle: 'Message envoyé !',
        contactSuccessMsg: 'Merci ! Susane répondra à votre email sous peu.',
        contactError: 'Impossible d\'envoyer le message. Réessayez ou contactez-nous sur WhatsApp.',
    },
};

const SITE_LANG = (document.documentElement.getAttribute('lang') || 'pt').slice(0, 2).toLowerCase();
const T = I18N[SITE_LANG] || I18N.pt;

// Mantidos por compatibilidade com código antigo
const MONTH_NAMES_PT = T.months;
const WEEKDAY_NAMES_PT = T.weekdays;

// ═══════════════════════════════════════════════════════
//  ANALYTICS (GA4) — dispara eventos só se o gtag existir
// ═══════════════════════════════════════════════════════
function trackEvent(name, params) {
    try {
        if (typeof window.gtag === 'function') {
            window.gtag('event', name, params || {});
        }
    } catch (_) { /* nunca deixar o analytics partir o site */ }
}

// ═══════════════════════════════════════════════════════
//  GLOBAL FUNCTIONS (called from HTML onclick)
// ═══════════════════════════════════════════════════════
function openBookingOverlay(tourId) {
    if (window._bookingOverlay) window._bookingOverlay.open(tourId);
    // begin_checkout: o cliente abriu o formulário de reserva.
    const tour = (typeof TOUR_DATA !== 'undefined') ? TOUR_DATA[tourId] : null;
    trackEvent('begin_checkout', {
        currency: 'EUR',
        items: [{ item_id: tourId, item_name: tour ? tour.name : tourId }],
    });
}

// ═══════════════════════════════════════════════════════
//  DOM READY
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

    // ─── -1. Banner de consentimento (RGPD + Consent Mode v2) ──
    // Obrigatório na UE para medir conversões de anúncios corretamente.
    // O estado por defeito (negado) é definido no <head> de cada página;
    // aqui pedimos a escolha ao visitante e atualizamos o gtag.
    (function initConsentBanner() {
        let stored;
        try { stored = localStorage.getItem('ltuk_consent'); } catch (e) { stored = null; }
        if (stored === 'granted' || stored === 'denied') return; // já escolheu

        const lang = (document.documentElement.lang || 'pt').slice(0, 2);
        const T = {
            pt: { txt: 'Usamos cookies para medir e melhorar a sua experiência e os nossos anúncios. Pode aceitar ou recusar.', ok: 'Aceitar', no: 'Recusar' },
            en: { txt: 'We use cookies to measure and improve your experience and our ads. You can accept or decline.', ok: 'Accept', no: 'Decline' },
            es: { txt: 'Usamos cookies para medir y mejorar su experiencia y nuestros anuncios. Puede aceptar o rechazar.', ok: 'Aceptar', no: 'Rechazar' },
            it: { txt: 'Usiamo i cookie per misurare e migliorare la tua esperienza e i nostri annunci. Puoi accettare o rifiutare.', ok: 'Accetta', no: 'Rifiuta' },
            fr: { txt: 'Nous utilisons des cookies pour mesurer et améliorer votre expérience et nos publicités. Vous pouvez accepter ou refuser.', ok: 'Accepter', no: 'Refuser' },
        };
        const t = T[lang] || T.pt;

        const bar = document.createElement('div');
        bar.className = 'consent-bar';
        bar.setAttribute('role', 'dialog');
        bar.setAttribute('aria-label', 'Cookies');
        bar.innerHTML =
            '<p class="consent-bar-text"></p>' +
            '<div class="consent-bar-actions">' +
            '<button type="button" class="consent-btn consent-btn--no"></button>' +
            '<button type="button" class="consent-btn consent-btn--ok"></button>' +
            '</div>';
        bar.querySelector('.consent-bar-text').textContent = t.txt;
        const btnNo = bar.querySelector('.consent-btn--no');
        const btnOk = bar.querySelector('.consent-btn--ok');
        btnNo.textContent = t.no;
        btnOk.textContent = t.ok;

        const decide = (granted) => {
            try { localStorage.setItem('ltuk_consent', granted ? 'granted' : 'denied'); } catch (e) {}
            if (typeof window.gtag === 'function') {
                const v = granted ? 'granted' : 'denied';
                window.gtag('consent', 'update', {
                    ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v,
                });
            }
            bar.classList.remove('is-visible');
            setTimeout(() => bar.remove(), 300);
        };
        btnOk.addEventListener('click', () => decide(true));
        btnNo.addEventListener('click', () => decide(false));

        document.body.appendChild(bar);
        void bar.offsetWidth; // força reflow para a transição de entrada tocar
        bar.classList.add('is-visible');
    })();

    // ─── 0. Analytics (GA4) ────────────────────────────────
    // view_item: se estamos numa página de detalhe de tour, regista qual.
    // O tourId é extraído do botão de reserva (evita editar as 30 páginas).
    if (document.querySelector('.td-hero')) {
        const bookBtn = document.querySelector('[onclick*="openBookingOverlay"]');
        const match = bookBtn && /openBookingOverlay\('([^']+)'\)/.exec(bookBtn.getAttribute('onclick') || '');
        if (match) {
            const tid = match[1];
            const tour = (typeof TOUR_DATA !== 'undefined') ? TOUR_DATA[tid] : null;
            trackEvent('view_item', {
                currency: 'EUR',
                items: [{ item_id: tid, item_name: tour ? tour.name : tid }],
            });
        }
    }

    // Cliques de contacto/saída (WhatsApp, email, telefone, OTAs). As classes
    // track-* já existiam no HTML; aqui ligamo-las a eventos GA4. O WhatsApp e
    // o email são leads (foi por email que veio a 1ª reserva) — marca-os como
    // conversão no GA4 se quiseres.
    document.addEventListener('click', (e) => {
        const el = e.target.closest('[class*="track-"]');
        if (!el) return;
        const c = el.className || '';
        let method = null;
        if (c.includes('track-whatsapp')) method = 'whatsapp';
        else if (c.includes('track-email')) method = 'email';
        else if (c.includes('track-phone')) method = 'phone';
        else if (c.includes('track-google')) method = 'google_reviews';
        else if (c.includes('track-gyg')) method = 'getyourguide';
        else if (c.includes('track-tripadvisor')) method = 'tripadvisor';
        else if (c.includes('track-viator')) method = 'viator';
        if (method) {
            trackEvent('contact_click', { method, link_url: el.href || '', page_lang: SITE_LANG });
        }
    }, { passive: true });

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
                // Só mostra a próxima mensagem DEPOIS da anterior desaparecer
                // por completo (mesma duração do transition do CSS) — a
                // versão anterior mostrava as duas ao mesmo tempo a meio da
                // transição, com o texto sobreposto e ilegível.
                setTimeout(() => {
                    promoMessages[currentPromoIdx].classList.add('active');
                }, 350);
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
    let headerTicking = false;

    const updateHeaderOnScroll = () => {
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
        headerTicking = false;
    };

    // rAF-throttled: sem isto, o scroll (que dispara dezenas de eventos por
    // segundo, sobretudo no mobile) forçava um recalculo de estilo por
    // evento -> engasgava o scroll em vez de acompanhar suavemente.
    window.addEventListener('scroll', () => {
        if (!headerTicking) {
            window.requestAnimationFrame(updateHeaderOnScroll);
            headerTicking = true;
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

    // ─── 5b. Tours "Ver mais" (mobile: mostra 3 de 6) ──────
    const toursSeeMoreBtn = document.getElementById('tours-see-more-btn');
    const toursGrid = document.querySelector('.tours-visual-grid');
    if (toursSeeMoreBtn && toursGrid) {
        toursSeeMoreBtn.addEventListener('click', () => {
            const expanded = toursGrid.classList.toggle('tours-expanded');
            toursSeeMoreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            const label = toursSeeMoreBtn.querySelector('span');
            if (label) {
                label.textContent = expanded
                    ? toursSeeMoreBtn.dataset.hideText
                    : toursSeeMoreBtn.dataset.showText;
            }
            if (!expanded) {
                toursGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ─── 5c. Quick Tour Picker (aberto pelo CTA sticky mobile) ──
    const QUICK_PICKER_ORDER = ['a-la-carte', 'belem', 'half-day', 'centro-historico', 'miradouros', 'full-lisboa'];
    const quickPickerOverlay = document.getElementById('quick-picker-overlay');
    const quickPickerList = document.getElementById('quick-picker-list');
    const quickPickerClose = document.getElementById('quick-picker-close');
    const quickPickerTitle = document.getElementById('quick-picker-title');
    const stickyCtaBtn = document.getElementById('mobile-sticky-cta-link');

    if (quickPickerOverlay && quickPickerList && stickyCtaBtn) {
        if (quickPickerTitle) quickPickerTitle.textContent = T.pickTourTitle;

        const priceLabel = (tour) => {
            if (tour.isALaCarte) {
                const min = tour.durationOptions[0].price;
                return `${T.from} €${min}`;
            }
            return `€${tour.basePrice} ${T.perGroup}`;
        };

        quickPickerList.innerHTML = QUICK_PICKER_ORDER.map((id) => {
            const tour = TOUR_DATA[id];
            if (!tour) return '';
            const isBestSeller = id === 'half-day';
            return `
                <button type="button" class="quick-picker-item" data-tour-id="${id}">
                    <img class="quick-picker-item-img" src="${tour.img}" alt="" loading="lazy">
                    <div class="quick-picker-item-body">
                        <div class="quick-picker-item-name">
                            ${tour.name}
                            ${isBestSeller ? `<span class="quick-picker-badge">★ ${T.bestSeller}</span>` : ''}
                        </div>
                        <div class="quick-picker-item-meta">${tour.duration}</div>
                    </div>
                    <div class="quick-picker-item-price">${priceLabel(tour)}</div>
                </button>`;
        }).join('');

        const openQuickPicker = () => {
            quickPickerOverlay.hidden = false;
            document.body.classList.add('quick-picker-locked');
            void quickPickerOverlay.offsetWidth; // força reflow para garantir a transição CSS
            quickPickerOverlay.classList.add('open');
        };
        const closeQuickPicker = () => {
            quickPickerOverlay.classList.remove('open');
            document.body.classList.remove('quick-picker-locked');
            setTimeout(() => { quickPickerOverlay.hidden = true; }, 250);
        };

        stickyCtaBtn.addEventListener('click', openQuickPicker);
        if (quickPickerClose) quickPickerClose.addEventListener('click', closeQuickPicker);
        quickPickerOverlay.addEventListener('click', (e) => {
            if (e.target === quickPickerOverlay) closeQuickPicker();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && quickPickerOverlay.classList.contains('open')) closeQuickPicker();
        });
        quickPickerList.querySelectorAll('.quick-picker-item').forEach((item) => {
            item.addEventListener('click', () => {
                const tourId = item.dataset.tourId;
                closeQuickPicker();
                openBookingOverlay(tourId);
            });
        });

        // Deep-link vindo de outra página (about/contact/gallery): ?openPicker=1
        if (new URLSearchParams(window.location.search).get('openPicker') === '1') {
            setTimeout(openQuickPicker, 350);
        }
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
            busyByDate: {}, // "2026-07-12" -> [{startMin, durationMin}] | 'loading' | 'error'
        };

        const calcPrice = (basePrice, pax) => {
            const tuks = Math.ceil(pax / 5);
            return basePrice * tuks;
        };

        // Minutos que a Susane precisa entre o fim de um tour e o início do
        // seguinte (deslocação + pausa). Um horário fica indisponível se o
        // tour candidato se sobrepuser a uma reserva já paga, contando esta
        // margem. Ajustável aqui num só sítio.
        const BOOKING_BUFFER_MIN = 90;

        // Vai buscar ao servidor os intervalos já ocupados numa data e
        // re-renderiza os horários quando chega a resposta (cache por data).
        const fetchAvailability = (date) => {
            const cfg = window.LISBONTUK_PAYMENTS;
            if (!cfg || !cfg.supabaseUrl || !cfg.anonKey) return; // sem backend -> não filtra
            if (state.busyByDate[date] !== undefined) return;     // já em cache/carregado
            state.busyByDate[date] = 'loading';
            fetch(`${cfg.supabaseUrl}/functions/v1/get-availability`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.anonKey}` },
                body: JSON.stringify({ date }),
            })
                .then((r) => r.json())
                .then((data) => {
                    state.busyByDate[date] = Array.isArray(data && data.busy) ? data.busy : [];
                    if (state.selectedDate === date) renderSteps();
                })
                .catch(() => {
                    // Falha de rede -> não bloqueia a reserva (mostra todos os horários)
                    state.busyByDate[date] = [];
                    if (state.selectedDate === date) renderSteps();
                });
        };

        // Um horário candidato colide com uma reserva se os intervalos se
        // sobrepõem contando a margem BOOKING_BUFFER_MIN de cada lado.
        const slotIsFree = (startMin, durationMin, busyList) => {
            const ce = startMin + durationMin;
            return !busyList.some((b) =>
                startMin < b.startMin + b.durationMin + BOOKING_BUFFER_MIN &&
                ce + BOOKING_BUFFER_MIN > b.startMin
            );
        };

        const generateTimeSlots = (durationHours) => {
            // Início mais cedo: 08:30. Início mais tarde: 19:00 — mas nunca
            // deixando um tour acabar depois das 22:00, por isso os tours mais
            // longos (4h/5h) começam proporcionalmente mais cedo.
            const FIRST_START = 8 * 60 + 30;  // 08:30
            const LATEST_START = 19 * 60;     // 19:00
            const DAY_END = 22 * 60;          // 22:00 (fim máximo de um tour)
            const lastStart = Math.min(LATEST_START, DAY_END - durationHours * 60);
            const slots = [];
            for (let t = FIRST_START; t <= lastStart; t += 30) {
                slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`);
            }
            let available = slots;

            // Se a data escolhida for hoje, esconde horários já passados
            // (com 2h de antecedência mínima para a Susane se organizar).
            if (state.selectedDate) {
                const now = new Date();
                const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                if (state.selectedDate === todayStr) {
                    const cutoff = now.getHours() * 60 + now.getMinutes() + 120;
                    available = available.filter(t => {
                        const [sh, sm] = t.split(':').map(Number);
                        return sh * 60 + sm >= cutoff;
                    });
                }
            }

            // Esconde horários que colidem com reservas já pagas (a Susane não
            // pode guiar dois tours ao mesmo tempo). Só filtra se a lista de
            // ocupados já chegou do servidor; enquanto 'loading' mostra tudo.
            const busy = state.busyByDate && state.busyByDate[state.selectedDate];
            if (Array.isArray(busy) && busy.length) {
                const durMin = durationHours * 60;
                available = available.filter(t => {
                    const [sh, sm] = t.split(':').map(Number);
                    return slotIsFree(sh * 60 + sm, durMin, busy);
                });
            }
            return available;
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
                            <div class="booking-step-label">${T.chooseDuration}</div>
                            <div class="booking-step-sublabel">${T.durationHint}</div>
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
                        <div class="booking-step-label">${T.chooseDate}</div>
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
            const availLoading = state.busyByDate[state.selectedDate] === 'loading';
            // "Hoje" para distinguir a mensagem de "sem horários" (antecedência vs dia cheio)
            const nowD = new Date();
            const isToday = state.selectedDate === `${nowD.getFullYear()}-${String(nowD.getMonth() + 1).padStart(2, '0')}-${String(nowD.getDate()).padStart(2, '0')}`;
            let timeInner;
            if (availLoading) {
                timeInner = `<p class="booking-slots-loading">${T.loadingSlots}</p>`;
            } else if (!timeDisabled && currentDurationHours > 0 && timeSlotsArr.length === 0) {
                timeInner = `<p class="booking-no-slots">${isToday ? T.noSlotsToday : T.noSlotsDay}</p>`;
            } else {
                timeInner = timeSlotsArr.map(t => `
                        <button class="booking-time-pill ${state.selectedTime === t ? 'selected' : ''}" data-time="${t}">${t}</button>
                    `).join('');
            }
            html += `
            <div class="booking-step ${timeDisabled ? 'disabled' : ''} ${state.selectedTime ? 'completed' : ''}" id="booking-step-time">
                <div class="booking-step-header">
                    <span class="booking-step-number">${2 + stepOffset}</span>
                    <div>
                        <div class="booking-step-label">${T.chooseTime}</div>
                        ${state.selectedTime ? `<div class="booking-step-sublabel">✓ ${state.selectedTime}</div>` : ''}
                    </div>
                </div>
                <div class="booking-time-grid" id="booking-time-grid">
                    ${timeInner}
                </div>
            </div>`;

            // Step 3: Passengers
            const paxDisabled = !state.selectedTime;
            html += `
            <div class="booking-step ${paxDisabled ? 'disabled' : ''}" id="booking-step-pax">
                <div class="booking-step-header">
                    <span class="booking-step-number">${3 + stepOffset}</span>
                    <div>
                        <div class="booking-step-label">${T.passengers}</div>
                    </div>
                </div>
                <div class="booking-pax-stepper">
                    <button class="pax-stepper-btn" id="pax-minus" ${state.passengers <= 1 ? 'disabled' : ''}>−</button>
                    <div class="pax-stepper-display">
                        <div class="pax-stepper-count" id="pax-count">${state.passengers}</div>
                        <div class="pax-stepper-label">${state.passengers === 1 ? T.passenger1 : T.passengerN}</div>
                    </div>
                    <button class="pax-stepper-btn" id="pax-plus" ${state.passengers >= 10 ? 'disabled' : ''}>+</button>
                </div>
                <div class="booking-multi-tuk-alert ${state.passengers < 6 ? 'hidden' : ''}" id="booking-multi-tuk">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>${T.multiTuk(state.passengers, tukCount)}</span>
                </div>
                <button class="btn btn-primary btn-block btn-large booking-continue-btn" id="booking-continue-btn">
                    ${T.cont} — €${totalPrice}
                </button>
            </div>`;

            // Step 4: Checkout
            const checkoutHidden = !state.selectedTime;
            html += `
            <div class="booking-step ${checkoutHidden ? 'disabled' : ''}" id="booking-step-checkout" style="display:none;">
                <div class="booking-step-header">
                    <span class="booking-step-number">${4 + stepOffset}</span>
                    <div>
                        <div class="booking-step-label">${T.checkoutTitle}</div>
                    </div>
                </div>
                <div class="booking-checkout-grid">
                    <form class="booking-checkout-form" id="booking-checkout-form" novalidate>
                        <div class="booking-checkout-row">
                            <div>
                                <label>${T.name} <span class="required">*</span></label>
                                <input type="text" id="bk-name" placeholder="${T.namePh}" required autocomplete="given-name">
                            </div>
                            <div>
                                <label>${T.surname} <span class="required">*</span></label>
                                <input type="text" id="bk-surname" placeholder="${T.surnamePh}" required autocomplete="family-name">
                            </div>
                        </div>
                        <div>
                            <label>${T.email} <span class="required">*</span></label>
                            <input type="email" id="bk-email" placeholder="${T.emailPh}" required autocomplete="email">
                        </div>
                        <div>
                            <label>${T.phone} <span class="required">*</span></label>
                            <input type="tel" id="bk-phone" placeholder="${T.phonePh}" required autocomplete="tel">
                        </div>
                        <div>
                            <label>${T.country}</label>
                            <select id="bk-country">
                                <option value="">${T.selectCountry}</option>
                                ${Object.entries(T.countries).map(([code, label]) => `<option value="${code}">${label}</option>`).join('')}
                                <option value="OTHER">${T.other}</option>
                            </select>
                        </div>
                        <div class="booking-checkout-terms">
                            <input type="checkbox" id="bk-terms" required>
                            <span>${T.terms}</span>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block btn-large" id="bk-submit-btn">
                            <span id="bk-submit-text">${T.confirm} — €${totalPrice}</span>
                            <span id="bk-submit-loading" class="stripe-loading hidden">
                                <span class="stripe-spinner"></span> ${T.processing}
                            </span>
                        </button>
                        <p class="stripe-security-note">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            ${T.secure}
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
                                ${state.passengers} ${state.passengers === 1 ? T.passenger1 : T.passengerN} ${tukCount > 1 ? `· ${tukCount} tuk-tuks` : ''}
                            </div>
                            <div class="booking-summary-divider"></div>
                            <div class="booking-summary-price-row">
                                <span>${T.subtotal}</span>
                                <span>€${currentBasePrice}</span>
                            </div>
                            ${tukCount > 1 ? `<div class="booking-summary-price-row">
                                <span>× ${tukCount} tuk-tuks</span>
                                <span>€${totalPrice}</span>
                            </div>` : ''}
                            <div class="booking-summary-total">
                                <span>${T.totalDue}</span>
                                <span>€${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            // Success state
            html += `<div class="booking-success hidden" id="booking-success">
                <div class="booking-success-icon">✓</div>
                <h3>${T.successTitle}</h3>
                <p>${T.successMsg}</p>
                <div class="booking-success-details" id="booking-success-details"></div>
                <a href="https://wa.me/351966697738" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="margin-top:1rem;">
                    ${T.successWa}
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
            return T.dateFmt(parseInt(parts[2], 10), T.months[parseInt(parts[1], 10) - 1], parts[0]);
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
                    fetchAvailability(state.selectedDate); // busca horários ocupados
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
                    // add_payment_info: chegou ao passo de dados/pagamento.
                    const t = state.tourData;
                    const base = t && t.isALaCarte ? (state.selectedDuration ? state.selectedDuration.price : 0) : (t ? t.basePrice : 0);
                    trackEvent('add_payment_info', {
                        currency: 'EUR',
                        value: calcPrice(base, state.passengers),
                        items: [{ item_id: state.tourId, item_name: t ? t.name : state.tourId, quantity: state.passengers }],
                    });
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
                                    lang: SITE_LANG, // Stripe Checkout + página de confirmação na língua certa
                                }),
                            });
                            const data = await res.json();
                            if (data && data.url) { window.location.href = data.url; return; }
                            throw new Error((data && data.error) || T.payError);
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
                            errBox.textContent = '⚠️ ' + err.message + ' ' + T.tryAgain;
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
                            <strong>${T.chooseDate.split(' ').pop()}:</strong> ${formatDatePT(state.selectedDate)} · ${state.selectedTime}<br>
                            <strong>${T.passengers}:</strong> ${state.passengers}<br>
                            <strong>Total:</strong> €${totalPrice}<br>
                            <strong>${T.name}:</strong> ${customer.name}
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
                busyByDate: {},
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

        // A galeria usa CSS multi-column (masonry) -> a ordem no DOM enche
        // cada coluna de cima a baixo antes de passar à seguinte, o que NÃO
        // corresponde à ordem de leitura visual (linha a linha, esquerda
        // para a direita). Recalculamos aqui a ordem visual real, para que
        // o contador e as setas prev/next sigam a mesma ordem que os olhos.
        let visualOrder = galleryCards.map((_, i) => i);
        const recomputeVisualOrder = () => {
            visualOrder = galleryCards
                .map((card, domIdx) => ({ domIdx, rect: card.getBoundingClientRect() }))
                .sort((a, b) => (Math.round(a.rect.top) - Math.round(b.rect.top)) || (a.rect.left - b.rect.left))
                .map((entry) => entry.domIdx);
        };
        recomputeVisualOrder();
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(recomputeVisualOrder, 200);
        });

        const show = (visualIdx) => {
            currentIdx = (visualIdx + visualOrder.length) % visualOrder.length;
            const card = galleryCards[visualOrder[currentIdx]];
            const thumb = card.querySelector('img');
            const captionEl = card.querySelector('.gallery-card-caption');
            lbImg.src = card.dataset.full || thumb.src;
            lbImg.alt = thumb.alt;
            lbCaption.textContent = captionEl ? captionEl.textContent : '';
            lbCounter.textContent = `${currentIdx + 1} / ${galleryCards.length}`;
        };

        const openLightbox = (domIdx) => {
            lastFocused = document.activeElement;
            recomputeVisualOrder();
            show(visualOrder.indexOf(domIdx));
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

        // O HTML já vem com ~5 reviews reais "cozinhadas" (baked) no próprio
        // código-fonte -- para SEO (o Google indexa o texto sem precisar de
        // correr JS) e para o visitante ver conteúdo real logo de imediato,
        // sem esperar pelo fetch. O JS por baixo só atualiza por cima quando
        // (e se) conseguir dados mais frescos -- nunca apaga o que já lá está.
        const hasStaticReviews = grid.children.length > 0;

        const pageLang = (document.documentElement.lang || 'pt').slice(0, 2);
        const NUM_LOCALE = { pt: 'pt-PT', en: 'en-GB', es: 'es-ES', it: 'it-IT', fr: 'fr-FR' };
        const COUNT_LABEL = { pt: 'avaliações no Google', en: 'reviews on Google', es: 'reseñas en Google', it: 'recensioni su Google', fr: 'avis sur Google' };
        const STARS_LABEL = { pt: ' de 5 estrelas', en: ' out of 5 stars', es: ' de 5 estrellas', it: ' stelle su 5', fr: ' étoiles sur 5' };
        const fmt = (n, d) => Number(n).toLocaleString(NUM_LOCALE[pageLang] || 'pt-PT', { minimumFractionDigits: d, maximumFractionDigits: d });
        const pct = (r) => Math.max(0, Math.min(100, (r / 5) * 100)) + '%';
        const AVATAR_BG = ['#1976D2', '#DB2777', '#0D9488', '#7E6BD9', '#EA580C', '#0EA5E9'];

        const starbar = (r) => {
            const s = document.createElement('span');
            s.className = 'gr-starbar gr-starbar--sm';
            s.style.setProperty('--pct', pct(r));
            s.setAttribute('role', 'img');
            s.setAttribute('aria-label', fmt(r, 1) + (STARS_LABEL[pageLang] || STARS_LABEL.pt));
            return s;
        };

        // Esqueleto de carregamento (3 cartões pulsantes) -- só quando ainda
        // não há reviews estáticas no HTML; caso contrário ficam visíveis
        // enquanto o fetch corre em segundo plano (sem flash de loading).
        if (!hasStaticReviews) {
            grid.hidden = false;
            grid.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const sk = document.createElement('div');
                sk.className = 'gr-card gr-card--skeleton';
                sk.innerHTML = '<div class="gr-sk-head"></div><div class="gr-sk-line"></div><div class="gr-sk-line"></div><div class="gr-sk-line gr-sk-short"></div>';
                grid.appendChild(sk);
            }
        }

        const MAX_REVIEWS = 9; // limite da secção (a Places API só devolve até 5 hoje)
        const VISIBLE_BY_DEFAULT = 3;

        // O botão "ver mais" já existe no HTML (visível quando há >3 reviews
        // estáticas); liga-se uma vez, independente do resultado do fetch.
        const seeMoreWrap = document.getElementById('reviews-see-more-wrap');
        const seeMoreBtn = document.getElementById('reviews-see-more-btn');
        if (seeMoreWrap && seeMoreBtn && !seeMoreBtn.dataset.wired) {
            seeMoreBtn.dataset.wired = '1';
            seeMoreBtn.addEventListener('click', () => {
                const expanded = grid.classList.toggle('gr-grid-expanded');
                seeMoreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                const label = seeMoreBtn.querySelector('span');
                if (label) {
                    label.textContent = expanded
                        ? seeMoreBtn.dataset.hideText
                        : seeMoreBtn.dataset.showText;
                }
                if (!expanded) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        // Mantém o aggregateRating do schema.org (JSON-LD) sincronizado com a
        // nota/contagem reais do Google, para as estrelas na pesquisa nunca
        // ficarem desatualizadas sem precisar de editar o HTML à mão.
        const syncAggregateRatingSchema = (rating, total) => {
            if (typeof rating !== 'number' && typeof total !== 'number') return;
            document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
                let data;
                try { data = JSON.parse(script.textContent); } catch (e) { return; }
                const graph = Array.isArray(data['@graph']) ? data['@graph'] : null;
                const agency = graph && graph.find((node) => node['@type'] === 'TravelAgency');
                if (!agency) return;
                agency.aggregateRating = {
                    '@type': 'AggregateRating',
                    ratingValue: typeof rating === 'number' ? rating.toFixed(1) : agency.aggregateRating?.ratingValue,
                    reviewCount: typeof total === 'number' ? String(total) : agency.aggregateRating?.reviewCount,
                    bestRating: '5',
                    worstRating: '1',
                };
                script.textContent = JSON.stringify(data);
            });
        };

        const renderCard = (rv, i) => {
            const card = document.createElement('article');
            card.className = 'gr-card' + (i >= VISIBLE_BY_DEFAULT ? ' gr-card-extra' : '');

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
            const list = (Array.isArray(data.reviews) ? data.reviews : []).slice(0, MAX_REVIEWS);
            // Resposta sem reviews (ex.: falha pontual da API do Google) ->
            // preferimos manter as reviews estáticas do HTML a mostrar vazio.
            if (!list.length) {
                if (!hasStaticReviews) grid.hidden = true;
                return;
            }

            if (typeof data.rating === 'number' && ratingEl) {
                ratingEl.textContent = fmt(data.rating, 1);
                if (starsEl) {
                    starsEl.style.setProperty('--pct', pct(data.rating));
                    starsEl.setAttribute('aria-label', fmt(data.rating, 1) + (STARS_LABEL[pageLang] || STARS_LABEL.pt));
                }
            }
            if (typeof data.total === 'number' && countEl) {
                countEl.innerHTML = '<strong>' + fmt(data.total, 0) + '</strong> ' + (COUNT_LABEL[pageLang] || COUNT_LABEL.pt);
            }
            if (liveEl) liveEl.hidden = false;
            syncAggregateRatingSchema(data.rating, data.total);

            grid.innerHTML = '';
            list.forEach((rv, i) => grid.appendChild(renderCard(rv, i)));

            if (seeMoreWrap) seeMoreWrap.hidden = list.length <= VISIBLE_BY_DEFAULT;
        })
        .catch(() => {
            // Falha no fetch (ex.: chave Google por configurar) -> mantém as
            // reviews estáticas do HTML; só esconde a secção se nem isso houver.
            if (!hasStaticReviews) {
                grid.innerHTML = '';
                grid.hidden = true;
            }
        });
    })();

    // ─── 10b. Availability Calendar (home) ──────────────────
    (function initAvailabilityCalendar() {
        const cal = document.getElementById('avail-cal');
        if (!cal) return;
        const legend = document.getElementById('avail-legend');
        const cfg = window.LISBONTUK_PAYMENTS;
        if (!cfg || !cfg.supabaseUrl || !cfg.anonKey) { cal.hidden = true; return; }

        const pageLang = (document.documentElement.lang || 'pt').slice(0, 2);
        const DOW = {
            pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            it: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
            fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        };
        const MON = {
            pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            it: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        };
        const STATUS_LABEL = {
            pt: { disponivel: 'Disponível', poucas_vagas: 'Poucas vagas', lotado: 'Lotado' },
            en: { disponivel: 'Available', poucas_vagas: 'Few spots', lotado: 'Fully booked' },
            es: { disponivel: 'Disponible', poucas_vagas: 'Pocas plazas', lotado: 'Completo' },
            it: { disponivel: 'Disponibile', poucas_vagas: 'Pochi posti', lotado: 'Al completo' },
            fr: { disponivel: 'Disponible', poucas_vagas: 'Peu de places', lotado: 'Complet' },
        };
        const FALLBACK_TEXT = {
            pt: 'Não foi possível carregar o calendário agora — mas pode sempre consultar a disponibilidade real no formulário de reserva.',
            en: 'Could not load the calendar right now — but you can always check real availability in the booking form.',
            es: 'No se pudo cargar el calendario ahora — pero siempre puede consultar la disponibilidad real en el formulario de reserva.',
            it: 'Al momento non è stato possibile caricare il calendario — ma puoi sempre controllare la disponibilità reale nel modulo di prenotazione.',
            fr: "Impossible de charger le calendrier pour le moment — mais vous pouvez toujours consulter la disponibilité réelle dans le formulaire de réservation.",
        };
        const STATUS_CLASS = { disponivel: 'ok', poucas_vagas: 'low', lotado: 'full' };

        const DAYS = 14;
        const today = new Date();
        const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const days = Array.from({ length: DAYS }, (_, i) => {
            const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
            return { date: d, key: dateKey(d) };
        });

        const openBookingFlow = (dateKeyClicked, status) => {
            trackEvent('availability_day_click', { date: dateKeyClicked, status });
            const stickyBtn = document.getElementById('mobile-sticky-cta-link');
            if (stickyBtn) stickyBtn.click();
        };

        fetch(`${cfg.supabaseUrl}/functions/v1/get-availability-range`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.anonKey}` },
            body: JSON.stringify({ from: days[0].key, days: DAYS }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (!data || data.error) throw new Error((data && data.error) || 'sem dados');
                cal.innerHTML = '';
                days.forEach(({ date, key }) => {
                    const info = data[key];
                    const status = (info && info.status) || 'disponivel';
                    const cls = STATUS_CLASS[status] || 'ok';
                    const label = (STATUS_LABEL[pageLang] || STATUS_LABEL.pt)[status] || '';
                    const dow = (DOW[pageLang] || DOW.pt)[date.getDay()];
                    const mon = (MON[pageLang] || MON.pt)[date.getMonth()];

                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = `avail-day avail-day--${cls}`;
                    btn.dataset.date = key;
                    if (status === 'lotado') btn.disabled = true;
                    btn.innerHTML = `
                        <span class="avail-day-dow">${dow}</span>
                        <span class="avail-day-num">${date.getDate()}</span>
                        <span class="avail-day-mon">${mon}</span>
                        <span class="avail-day-status"><span class="avail-dot avail-dot--${cls}"></span>${label}</span>
                    `;
                    if (status !== 'lotado') {
                        btn.addEventListener('click', () => openBookingFlow(key, status));
                    }
                    cal.appendChild(btn);
                });
                if (legend) legend.hidden = false;
            })
            .catch(() => {
                cal.innerHTML = `<p class="avail-cal-fallback">${FALLBACK_TEXT[pageLang] || FALLBACK_TEXT.pt}</p>`;
            });
    })();

    // ─── 11. Contact Form (contact.html) ───────────────────
    (function initContactForm() {
        const form = document.getElementById('booking-form');
        if (!form) return;

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');
        const submitBtn = document.getElementById('form-submit-btn');
        const submitLabel = submitBtn ? submitBtn.textContent : '';

        let feedback = document.getElementById('form-feedback');
        if (!feedback) {
            feedback = document.createElement('p');
            feedback.id = 'form-feedback';
            feedback.className = 'contact-form-feedback';
            feedback.setAttribute('role', 'status');
            feedback.hidden = true;
            form.appendChild(feedback);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const cfg = window.LISBONTUK_PAYMENTS;
            if (!cfg || !cfg.supabaseUrl || !cfg.anonKey) return;

            feedback.hidden = true;
            feedback.className = 'contact-form-feedback';
            submitBtn.disabled = true;
            submitBtn.textContent = T.contactSending;

            fetch(cfg.supabaseUrl + '/functions/v1/send-contact-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.anonKey },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput ? messageInput.value : '',
                    lang: SITE_LANG,
                }),
            })
            .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
            .then(({ ok, data }) => {
                if (!ok || !data || data.error) throw new Error((data && data.error) || 'send failed');
                form.reset();
                feedback.textContent = '✅ ' + T.contactSuccessTitle + ' ' + T.contactSuccessMsg;
                feedback.classList.add('contact-form-feedback--success');
                feedback.hidden = false;
                feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch(() => {
                feedback.textContent = '⚠️ ' + T.contactError;
                feedback.classList.add('contact-form-feedback--error');
                feedback.hidden = false;
                feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = submitLabel;
            });
        });
    })();
});
