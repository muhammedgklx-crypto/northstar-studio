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
            'nav.products': 'Products',
            'footer.copyright': '© 2026 Northstar Studio. All rights reserved.',
            'footer.privacy': 'Privacy',
            'footer.support': 'Support',
            'btn.login': 'Login',
            'btn.register': 'Register',
            'btn.logout': 'Logout',
            'btn.panel': 'Panel',
            'theme.toggle': 'Toggle theme',
            'lang.menu': 'Language',
            'brand': 'Northstar Studio'
        },
        tr: {
            'nav.home': 'Anasayfa',
            'nav.about': 'Hakkımızda',
            'nav.services': 'Hizmetler',
            'nav.portfolio': 'Portföy',
            'nav.blog': 'Belgeler',
            'nav.contact': 'İletişim',
            'nav.products': 'Ürünler',
            'footer.copyright': '© 2026 Northstar Studio. Tüm hakları saklıdır.',
            'footer.privacy': 'Gizlilik',
            'footer.support': 'Destek',
            'btn.login': 'Giriş',
            'btn.register': 'Kayıt Ol',
            'btn.logout': 'Çıkış',
            'btn.panel': 'Panel',
            'theme.toggle': 'Temayı değiştir',
            'lang.menu': 'Dil',
            'brand': 'Northstar Studio'
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
        // Sayfa başlığını çevir
        const titleEl = document.querySelector('title');
        if (titleEl) {
            document.title = document.title.replace('Northstar Studio', translations[lang]['brand']);
        }
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
