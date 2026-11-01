// Site JS: PWA service worker registration, simple client-side i18n, and helpers

(function () {
    // Service Worker registration for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js').then(function (reg) {
                // registered
                console.log('Service worker registered.', reg);
            }).catch(function (err) {
                console.warn('Service worker registration failed:', err);
            });
        });
    }

    // Simple client-side i18n: keys mapped in translations object below
    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.portfolio': 'Portfolio',
            'nav.blog': 'Blog',
                        'nav.contact': 'Contact',
                        'nav.products': 'Products'
                    },
        tr: {
            'nav.home': 'Anasayfa',
            'nav.about': 'Hakkımızda',
            'nav.services': 'Hizmetler',
            'nav.portfolio': 'Portföy',
            'nav.blog': 'Belgeler',
                        'nav.contact': 'İletişim',
                        'nav.products': 'Ürünler'
                    }
                };

    function applyTranslations(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }

    // read saved lang or default to tr
    const saved = localStorage.getItem('site-lang') || new URLSearchParams(location.search).get('lang') || 'tr';
    applyTranslations(saved);

    // language selector buttons
    document.querySelectorAll('.lang-select').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang') || 'tr';
            localStorage.setItem('site-lang', lang);
            applyTranslations(lang);
        });
    });
})();
