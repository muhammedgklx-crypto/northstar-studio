// Site JS: PWA service worker registration, simple client-side i18n, and helpers

(function () {
    // Service Worker registration for PWA (disabled to avoid cache errors)
    // if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', function () {
    //         navigator.serviceWorker.register('/service-worker.js').then(function (reg) {
    //             console.log('Service worker registered.', reg);
    //         }).catch(function (err) {
    //             console.warn('Service worker registration failed:', err);
    //         });
    //     });
    // }

    // Simple client-side i18n: keys mapped in translations object below
    const translations = {
        en: {
            // Nav
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.portfolio': 'Portfolio',
            'nav.blog': 'Blog',
            'nav.contact': 'Contact',
            'nav.products': 'Products',
            // Footer
            'footer.copyright': '© 2026 Northstar Studio. All rights reserved.',
            'footer.privacy': 'Privacy',
            'footer.support': 'Support',
            // Buttons
            'btn.login': 'Login',
            'btn.register': 'Register',
            'btn.logout': 'Logout',
            'btn.panel': 'Panel',
            // Theme/Lang/Brand
            'theme.toggle': 'Toggle theme',
            'lang.menu': 'Language',
            'brand': 'Northstar Studio',
            // Index
            'index.eyebrow': 'Digital brand, powerful web experience',
            'index.hero-title': 'Professional solutions that grow your business in the online world.',
            'index.hero-desc': 'Corporate websites, e-commerce experiences and digital marketing strategies elevate your brand\'s online visibility in a modern and reliable way.',
            'index.btn-contact': 'Contact Us',
            'index.btn-services': 'View Services',
            'index.badge-fast': '⚡ Fast delivery',
            'index.badge-growth': '📈 Measurable growth',
            'index.badge-focus': '🎯 Target-focused design',
            'index.panel-title': 'Project performance',
            'index.metric-satisfaction': 'Satisfaction',
            'index.metric-support': 'Support',
            'index.panel-desc': 'We produce sustainable, high-performance digital projects that exceed our customers\' expectations.',
            'index.approach-title': 'Our collaboration approach',
            'index.approach-desc': 'Every project is built on a structure suitable for brand identity, user-friendly and technically powerful.',
            'index.card-strategy': 'Strategy',
            'index.card-strategy-desc': 'We analyze your business goals and determine the most accurate digital roadmap.',
            'index.card-design': 'Design',
            'index.card-design-desc': 'We increase the impact of your brand with modern, simple and user-friendly interfaces.',
            'index.card-development': 'Development',
            'index.card-development-desc': 'We support the project life cycle with fast, secure and scalable solutions.',
            'index.recent-title': 'Examples from our recent projects',
            'index.recent-desc': 'Solutions we prepared for brands working in different sectors.',
            'index.card-corporate': 'Corporate platform',
            'index.card-corporate-desc': 'Brought to life with high conversion focused content structure and modern visual language.',
            'index.card-ecommerce': 'E-commerce experience',
            'index.card-ecommerce-desc': 'We optimized product discovery, payment flow and mobile usage experience together.',
            'index.card-content': 'Content and SEO',
            'index.card-content-desc': 'We did comprehensive content and technical optimization to increase search visibility.',
            'index.btn-portfolio': 'View Portfolio',
            'index.btn-services2': 'Services',
            'index.btn-blog': 'Read Documents',
            'index.experience-title': 'Powerful experience we prepared for you',
            'index.list-1': '✔ Manageable content structure and fast update flow',
            'index.list-2': '✔ Text, service and portfolio management via admin panel',
            'index.list-3': '✔ Comfortable experience at night use with dark mode support',
            'index.list-4': '✔ Measure content performance with view tracking',
            'index.planning-title': 'Innovative content planning',
            'index.planning-desc': 'After publishing your content, it analyzes audience behavior, rearranges texts and creates a more effective communication flow.',
            'index.quote': '"Digital visibility, regular content and powerful user experience come together to grow."',
            // About
            'about.eyebrow': 'About Us',
            'about.title': 'We build the digital future of brands together.',
            'about.desc': 'By bringing together creative ideas, strong design and reliable technology, we make our customers\' online presence more effective.',
            'about.vision': 'Our Vision',
            'about.vision-desc': 'To provide modern, accessible and high-performance digital experiences for businesses of all scales.',
            'about.list-1': '• User-focused design approach',
            'about.list-2': '• Fast, secure and scalable development',
            'about.list-3': '• Transparent communication and sustainable support',
            'about.why': 'Why us?',
            'about.why-desc': 'We prepare a step-by-step roadmap that will enable businesses to stand out in the digital world.',
            'about.quote': '"We design the best experience for you and produce sustainable results."',
            // Services
            'services.eyebrow': 'Services',
            'services.title': 'Comprehensive digital services for your business.',
            'services.desc': 'We provide scalable solutions tailored to your needs in web design, e-commerce and digital marketing.',
            'services.custom': 'Custom solution',
            // Portfolio
            'portfolio.eyebrow': 'Portfolio',
            'portfolio.title': 'Solutions proven effective with projects we have realized.',
            'portfolio.desc': 'Projects we developed for different sectors were designed focusing on user experience and business success.',
            // Blog
            'blog.eyebrow': 'Text Documents',
            'blog.title': 'Edit, share and track how many people view your written content.',
            'blog.desc': 'Corporate blog posts, guides and strategy content are published here in one place.',
            'blog.search-placeholder': 'Search articles...',
            'blog.btn-search': 'Search',
            'blog.chip-all': 'All',
            'blog.views': 'views',
            'blog.btn-read-more': 'Read More',
            'blog.no-results': 'No document found for this filter.',
            'blog.no-results-desc': 'You can try again after changing the search term.',
            'blog.popular-title': 'Most viewed',
            'blog.popular-desc': 'Content that interests your reader audience the most.',
            'blog.btn-read': 'Read',
            // Contact
            'contact.eyebrow': 'Contact',
            'contact.title': 'Contact us for a new project or collaboration.',
            'contact.desc': 'Fill out the contact form, we will get back to you shortly.',
            'contact.label-name': 'Your Name',
            'contact.label-email': 'Email',
            'contact.label-subject': 'Subject',
            'contact.label-message': 'Your Message',
            'contact.btn-send': 'Send',
            'contact.info-title': 'Contact information',
            'contact.info-desc': 'If you wish, you can contact us by phone, email or online meeting.',
            // Privacy
            'privacy.title': 'Privacy Policy',
            'privacy.desc': 'This site processes our visitors\' personal data with respect and privacy. The name, email address and message content of users who send the contact form are stored only to be answered by the site administration.',
            'privacy.data-usage': 'Data Usage',
            'privacy.data-usage-desc': 'The collected information is used only to answer requests and manage the contact process. Data is not shared with third parties.',
            'privacy.security': 'Security',
            'privacy.security-desc': 'The site operates over HTTPS in accordance with security standards. Messages are stored within the application and efforts are made to protect them against unauthorized access.',
            // BlogPost
            'blogpost.views': 'views',
            'blogpost.btn-view-all': 'View All Documents',
            'blogpost.comments': 'Comments',
            'blogpost.comment-count': 'comments',
            'blogpost.label-name': 'Your Name',
            'blogpost.label-email': 'Email',
            'blogpost.label-comment': 'Your Comment',
            'blogpost.btn-submit': 'Submit Comment',
            'blogpost.no-comments': 'No comments yet.',
            'blogpost.no-comments-desc': 'Be the first to leave a comment.',
            'blogpost.popular-title': 'Most viewed',
            'blogpost.popular-desc': 'Similar content',
            'blogpost.btn-read': 'Read',
            // ThankYou
            'thankyou.msg-received': 'Your message has been received!',
            'thankyou.msg-desc': 'We will contact you as soon as possible. Thank you for your interest.',
            'thankyou.btn-home': 'Return to Home',
            // Inbox
            'inbox.title': 'Incoming Messages',
            'inbox.desc': 'Recent contact requests and messages are listed here.',
            'inbox.no-messages': 'No new messages yet.',
            // Product
            'product.title': 'Sample Product',
            'product.desc': 'This is a simple product page demonstrating payment with Stripe Checkout for demonstration purposes.',
            'product.price': 'Price:',
            'product.btn-pay': 'Pay with Stripe',
            // CheckoutSuccess
            'checkout.title': 'Thank you — Payment Received',
            'checkout.desc': 'Your payment has been processed successfully.',
            'checkout.session-id': 'Session ID:',
            'checkout.btn-home': 'Return to Home',
            // Login
            'login.title': 'Login',
            'login.label-email': 'Email',
            'login.label-password': 'Password',
            'login.btn-login': 'Login',
            'login.no-account': "Don't have an account yet?",
            'login.link-register': 'Register',
            // Register
            'register.title': 'Register',
            'register.label-name': 'Your Name',
            'register.label-email': 'Email',
            'register.label-password': 'Password',
            'register.btn-register': 'Register',
            'register.have-account': 'Already have an account?',
            'register.link-login': 'Login',
            // Page titles
            'page.Ana Sayfa': 'Home',
            'page.Hakkımızda': 'About',
            'page.Hizmetler': 'Services',
            'page.Portföy': 'Portfolio',
            'page.Belgeler': 'Documents',
            'page.İletişim': 'Contact',
            'page.Gizlilik Politikası': 'Privacy Policy',
            'page.Giriş Yap': 'Login',
            'page.Kayıt Ol': 'Register',
            'page.Ürün - Ödeme Örneği': 'Product - Payment Example',
            'page.Ödeme Başarılı': 'Payment Successful',
            'page.Gelen Mesajlar': 'Incoming Messages',
        },
        tr: {
            // Nav
            'nav.home': 'Anasayfa',
            'nav.about': 'Hakkımızda',
            'nav.services': 'Hizmetler',
            'nav.portfolio': 'Portföy',
            'nav.blog': 'Belgeler',
            'nav.contact': 'İletişim',
            'nav.products': 'Ürünler',
            // Footer
            'footer.copyright': '© 2026 Northstar Studio. Tüm hakları saklıdır.',
            'footer.privacy': 'Gizlilik',
            'footer.support': 'Destek',
            // Buttons
            'btn.login': 'Giriş',
            'btn.register': 'Kayıt Ol',
            'btn.logout': 'Çıkış',
            'btn.panel': 'Panel',
            // Theme/Lang/Brand
            'theme.toggle': 'Temayı değiştir',
            'lang.menu': 'Dil',
            'brand': 'Northstar Studio',
            // Index
            'index.eyebrow': 'Dijital marka, güçlü web deneyimi',
            'index.hero-title': 'İşletmenizi çevrimiçi dünyada büyüten profesyonel çözümler.',
            'index.hero-desc': 'Kurumsal web siteleri, e-ticaret deneyimleri ve dijital pazarlama stratejileriyle markanızın online görünürlüğünü modern ve güvenilir bir şekilde yükseltiyoruz.',
            'index.btn-contact': 'İletişime Geç',
            'index.btn-services': 'Hizmetleri İncele',
            'index.badge-fast': '⚡ Hızlı teslimat',
            'index.badge-growth': '📈 Ölçülebilir büyüme',
            'index.badge-focus': '🎯 Hedef odaklı tasarım',
            'index.panel-title': 'Proje performansı',
            'index.metric-satisfaction': 'Memnuniyet',
            'index.metric-support': 'Destek',
            'index.panel-desc': 'Müşterilerimizin beklentilerini aşan, sürdürülebilir ve yüksek performanslı dijital projeler üretiyoruz.',
            'index.approach-title': 'İş birliği yaklaşımımız',
            'index.approach-desc': 'Her proje, marka kimliğine uygun, kullanıcı dostu ve teknik olarak güçlü bir yapı üzerine inşa edilir.',
            'index.card-strategy': 'Strateji',
            'index.card-strategy-desc': 'İş hedeflerinizi analiz edip en doğru dijital yol haritasını çıkarıyoruz.',
            'index.card-design': 'Tasarım',
            'index.card-design-desc': 'Modern, sade ve kullanıcı odaklı arayüzlerle markanızın etkisini artırıyoruz.',
            'index.card-development': 'Geliştirme',
            'index.card-development-desc': 'Hızlı, güvenli ve ölçeklenebilir çözümlerle proje yaşam döngüsünü destekliyoruz.',
            'index.recent-title': 'Son projelerimizden örnekler',
            'index.recent-desc': 'Farklı sektörlerde çalışan markalar için hazırladığımız çözümler.',
            'index.card-corporate': 'Kurumsal platform',
            'index.card-corporate-desc': 'Yüksek dönüşüm odaklı içerik yapısı ve modern görsel dil ile hayata geçirildi.',
            'index.card-ecommerce': 'E-ticaret deneyimi',
            'index.card-ecommerce-desc': 'Ürün keşfi, ödeme akışı ve mobil kullanım deneyimini birlikte optimize ettik.',
            'index.card-content': 'İçerik ve SEO',
            'index.card-content-desc': 'Arama görünürlüğünü artırmak için kapsamlı içerik ve teknik optimizasyon yaptık.',
            'index.btn-portfolio': 'Portföyü İncele',
            'index.btn-services2': 'Hizmetler',
            'index.btn-blog': 'Belgeleri Oku',
            'index.experience-title': 'Sizin için hazırladığımız güçlü deneyim',
            'index.list-1': '✔ Yönetilebilir içerik yapısı ve hızlı güncelleme akışı',
            'index.list-2': '✔ Admin panel üzerinden metin, hizmet ve portföy yönetimi',
            'index.list-3': '✔ Dark mode desteği ile gece kullanımında rahat deneyim',
            'index.list-4': '✔ Görüntülenme takibi ile içerik performansını ölçme',
            'index.planning-title': 'Yenilikçi içerik planlaması',
            'index.planning-desc': 'İçeriklerinizi yayınladıktan sonra izleyici davranışlarını analiz eder, metinleri yeniden düzenleyip daha etkili bir iletişim akışı kurarız.',
            'index.quote': '"Dijital görünürlük, düzenli içerik ve güçlü kullanıcı deneyiminin birleşimiyle büyür."',
            // About
            'about.eyebrow': 'Hakkımızda',
            'about.title': 'Markaların dijital geleceğini birlikte inşa ediyoruz.',
            'about.desc': 'Yaratıcı fikirleri, güçlü tasarımı ve güvenilir teknolojiyi bir araya getirerek müşterilerimizin çevrimiçi varlığını daha etkili hale getiriyoruz.',
            'about.vision': 'Vizyonumuz',
            'about.vision-desc': 'Her ölçekteki işletme için modern, erişilebilir ve yüksek performanslı dijital deneyimler sunmak.',
            'about.list-1': '• Kullanıcı odaklı tasarım yaklaşımı',
            'about.list-2': '• Hızlı, güvenli ve ölçeklenebilir geliştirme',
            'about.list-3': '• Şeffaf iletişim ve sürdürülebilir destek',
            'about.why': 'Neden biz?',
            'about.why-desc': 'İşletmelerin dijital dünyada öne çıkmasını sağlayacak adım adım bir yol haritası hazırlıyoruz.',
            'about.quote': '"Sizin için en iyi deneyimi kurguluyor, sürdürülebilir sonuçlar üretiyoruz."',
            // Services
            'services.eyebrow': 'Hizmetler',
            'services.title': 'İşletmeniz için kapsamlı dijital hizmetler.',
            'services.desc': 'Web tasarım, e-ticaret ve dijital pazarlama alanlarında ihtiyaçlarınıza uygun, ölçeklenebilir çözümler sunuyoruz.',
            'services.custom': 'Özel çözüm',
            // Portfolio
            'portfolio.eyebrow': 'Portföy',
            'portfolio.title': 'Gerçekleştirdiğimiz projelerle etkisini kanıtlamış çözümler.',
            'portfolio.desc': 'Farklı sektörlere özel geliştirdiğimiz projeler, kullanıcı deneyimi ve iş başarısı odaklı tasarlandı.',
            // Blog
            'blog.eyebrow': 'Metin Belgeleri',
            'blog.title': 'Yazılmış içeriklerinizi düzenleyin, paylaşın ve kaç kişinin görüntülediğini takip edin.',
            'blog.desc': 'Kurumsal blog yazıları, rehberler ve strateji içerikleri burada tek bir yerde yayınlanır.',
            'blog.search-placeholder': 'Makale ara...',
            'blog.btn-search': 'Ara',
            'blog.chip-all': 'Tümü',
            'blog.views': 'görüntülenme',
            'blog.btn-read-more': 'Devamını Oku',
            'blog.no-results': 'Bu filtreye uygun belge bulunamadı.',
            'blog.no-results-desc': 'Arama terimini değiştirdikten sonra tekrar deneyebilirsiniz.',
            'blog.popular-title': 'En çok görüntülenenler',
            'blog.popular-desc': 'Okuyucu kitlenin en çok ilgisini çeken içerikler.',
            'blog.btn-read': 'Oku',
            // Contact
            'contact.eyebrow': 'İletişim',
            'contact.title': 'Yeni bir proje ya da iş birliği için bize ulaşın.',
            'contact.desc': 'İletişim formunu doldurun, kısa sürede size dönüş yapalım.',
            'contact.label-name': 'Adınız',
            'contact.label-email': 'E-posta',
            'contact.label-subject': 'Konu',
            'contact.label-message': 'Mesajınız',
            'contact.btn-send': 'Gönder',
            'contact.info-title': 'İletişim bilgileri',
            'contact.info-desc': 'İsterseniz telefon, e-posta ya da çevrimiçi görüşme ile iletişime geçebilirsiniz.',
            // Privacy
            'privacy.title': 'Gizlilik Politikası',
            'privacy.desc': 'Bu site, ziyaretçilerimizin kişisel verilerini saygı ve gizlilik içinde işler. İletişim formu gönderen kullanıcıların adı, e-posta adresi ve mesaj içeriği yalnızca site yönetimi tarafından yanıtlanmak üzere saklanır.',
            'privacy.data-usage': 'Veri Kullanımı',
            'privacy.data-usage-desc': 'Toplanan bilgiler, yalnızca taleplerin cevaplanması ve iletişim sürecinin yönetilmesi için kullanılır. Veriler üçüncü taraflarla paylaşılmaz.',
            'privacy.security': 'Güvenlik',
            'privacy.security-desc': 'Site, güvenlik standartlarına uygun olarak HTTPS üzerinden çalışır. Mesajlar uygulama içinde saklanır ve yetkisiz erişime karşı korunmaya çalışılır.',
            // BlogPost
            'blogpost.views': 'görüntülenme',
            'blogpost.btn-view-all': 'Tüm Belgeleri Gör',
            'blogpost.comments': 'Yorumlar',
            'blogpost.comment-count': 'yorum',
            'blogpost.label-name': 'Adınız',
            'blogpost.label-email': 'E-posta',
            'blogpost.label-comment': 'Yorumunuz',
            'blogpost.btn-submit': 'Yorum Gönder',
            'blogpost.no-comments': 'Henüz yorum yok.',
            'blogpost.no-comments-desc': 'İlk yorumu siz bırakın.',
            'blogpost.popular-title': 'En çok görüntülenenler',
            'blogpost.popular-desc': 'Benzer içerikler',
            'blogpost.btn-read': 'Oku',
            // ThankYou
            'thankyou.msg-received': 'Mesajınız alındı!',
            'thankyou.msg-desc': 'En kısa sürede sizinle iletişime geçeceğiz. İlginiz için teşekkür ederiz.',
            'thankyou.btn-home': 'Ana Sayfaya Dön',
            // Inbox
            'inbox.title': 'Gelen Mesajlar',
            'inbox.desc': 'Son iletişim talepleri ve mesajlar burada listelenir.',
            'inbox.no-messages': 'Henüz yeni mesaj yok.',
            // Product
            'product.title': 'Örnek Ürün',
            'product.desc': 'Bu, Stripe Checkout ile ödemeyi demonstrasyon amaçlı gösteren basit bir ürün sayfasıdır.',
            'product.price': 'Fiyat:',
            'product.btn-pay': 'Stripe ile Öde',
            // CheckoutSuccess
            'checkout.title': 'Teşekkürler — Ödeme Alındı',
            'checkout.desc': 'Ödemeniz başarılı olarak işlendi.',
            'checkout.session-id': 'Oturum ID:',
            'checkout.btn-home': 'Anasayfaya Dön',
            // Login
            'login.title': 'Giriş Yap',
            'login.label-email': 'E-posta',
            'login.label-password': 'Parola',
            'login.btn-login': 'Giriş Yap',
            'login.no-account': 'Henüz hesabın yok mu?',
            'login.link-register': 'Kayıt Ol',
            // Register
            'register.title': 'Kayıt Ol',
            'register.label-name': 'Adınız',
            'register.label-email': 'E-posta',
            'register.label-password': 'Parola',
            'register.btn-register': 'Kayıt Ol',
            'register.have-account': 'Zaten hesabın var mı?',
            'register.link-login': 'Giriş Yap',
            // Page titles
            'page.Ana Sayfa': 'Ana Sayfa',
            'page.Hakkımızda': 'Hakkımızda',
            'page.Hizmetler': 'Hizmetler',
            'page.Portföy': 'Portföy',
            'page.Belgeler': 'Belgeler',
            'page.İletişim': 'İletişim',
            'page.Gizlilik Politikası': 'Gizlilik Politikası',
            'page.Giriş Yap': 'Giriş Yap',
            'page.Kayıt Ol': 'Kayıt Ol',
            'page.Ürün - Ödeme Örneği': 'Ürün - Ödeme Örneği',
            'page.Ödeme Başarılı': 'Ödeme Başarılı',
            'page.Gelen Mesajlar': 'Gelen Mesajlar',
        }
    };

    // Dinamik kart içerikleri: veritabanındaki Türkçe metin -> İngilizce
    // Anahtar = Türkçe metnin kendisi, değer = İngilizce karşılığı
    const dynamicTranslations = {
        en: {
            'Kurumsal Web Tasarım': 'Corporate Web Design',
            'E-Ticaret Çözümleri': 'E-Commerce Solutions',
            'Dijital Pazarlama': 'Digital Marketing',
            'Süreç ve Otomasyon': 'Process & Automation',
            'Marka değerini yükselten, kullanıcı dostu ve hızlı kurumsal web siteleri tasarlıyoruz.': 'We design corporate websites that elevate brand value, are user-friendly and fast.',
            'Ürün keşfi, güvenli ödeme ve mobil satış deneyimini tek çatı altında optimize ediyoruz.': 'We optimize product discovery, secure payment and mobile sales experience in a single roof.',
            'SEO, içerik ve reklam stratejileriyle marka görünürlüğünü artırıyoruz.': 'We increase brand visibility with SEO, content and advertising strategies.',
            'İş akışlarınızı otomatikleştiren özel çözümler geliştiriyoruz.': 'We develop custom solutions that automate your workflows.',
            'İncele': 'Explore',
            'Detayları Gör': 'View Details',
            'Hemen Başla': 'Get Started',
            'Tavsiye Al': 'Get Advice',
            'Görüntüle': 'View',
            'Keşfet': 'Discover',
            'Eğitim Portalı': 'Education Portal',
            'Kafe Web Sitesi': 'Cafe Website',
            'Kurumsal Site': 'Corporate Site',
            'Sağlık Kliniği': 'Health Clinic',
            'Web Uygulaması': 'Web Application',
            'Marka Hikayesi': 'Brand Story',
            'Kurumsal': 'Corporate',
            'Hizmet': 'Service',
            'Öğrenci, öğretmen ve yönetim panelini tek bir deneyimde birleştiren modern portal.': 'Modern portal that combines student, teacher and management panel in a single experience.',
            'Rezervasyon, menü ve sosyal medya içerik akışını bütünleştiren butik site.': 'Boutique site integrating reservation, menu and social media content flow.',
            'Profesyonel görünüm ve hızlı içerik yönetimiyle markayı öne çıkaran çözüm.': 'Solution that highlights the brand with a professional look and fast content management.',
            'Randevu, iletişim ve hizmet tanıtımı odaklı geliştirilmiş dijital ağı.': 'Digital network focused on appointment, communication and service promotion.',
            'Güncel Web Tasarım Trendleri': 'Current Web Design Trends',
            'SEO ile Organik Ziyaret Artırma': 'Increasing Organic Traffic with SEO',
            'İletişim Formu Dönüştürme Kuralları': 'Contact Form Conversion Rules',
            'Mobil İlk Dijital Deneyim': 'Mobile First Digital Experience',
            '2026\'da kullanıcı deneyimini artıran modern tasarım yaklaşımlarını keşfedin.': 'Discover modern design approaches that enhance user experience in 2026.',
            'Arama motorlarında görünürlüğünüzü yükselten temel stratejileri öğrenin.': 'Learn the core strategies that increase your visibility in search engines.',
            'Formların dönüşüm oranını artırmak için uygulanabilecek etkili yöntemler.': 'Effective methods to increase form conversion rates.',
            'Mobil kullanıcı davranışına göre şekillenen modern site yapıları.': 'Modern site structures shaped by mobile user behavior.',
            'Tasarım': 'Design',
            'Pazarlama': 'Marketing',
            'İletişim': 'Contact',
            'Ürün': 'Product',
            'Örnek Ürün A': 'Sample Product A',
            'Örnek Ürün B': 'Sample Product B',
            'Kısa açıklama A': 'Short description A',
            'Kısa açıklama B': 'Short description B',
            'Özel çözüm': 'Custom solution',
            'Örnek Ürün': 'Sample Product',
            '(Gerçek anahtarlar appsettings.json içinde Stripe:SecretKey ve PublishableKey ile sağlanmalıdır.)': '(Real keys must be provided in appsettings.json as Stripe:SecretKey and PublishableKey.)',
            '2026\'da kullanıcı deneyimini artıran modern tasarım yaklaşımlarını keşfedin.': 'Discover modern design approaches that enhance user experience in 2026.'
        },
        tr: {
            'Kurumsal Web Tasarım': 'Kurumsal Web Tasarım',
            'E-Ticaret Çözümleri': 'E-Ticaret Çözümleri',
            'Dijital Pazarlama': 'Dijital Pazarlama',
            'Süreç ve Otomasyon': 'Süreç ve Otomasyon',
            'Marka değerini yükselten, kullanıcı dostu ve hızlı kurumsal web siteleri tasarlıyoruz.': 'Marka değerini yükselten, kullanıcı dostu ve hızlı kurumsal web siteleri tasarlıyoruz.',
            'Ürün keşfi, güvenli ödeme ve mobil satış deneyimini tek çatı altında optimize ediyoruz.': 'Ürün keşfi, güvenli ödeme ve mobil satış deneyimini tek çatı altında optimize ediyoruz.',
            'SEO, içerik ve reklam stratejileriyle marka görünürlüğünü artırıyoruz.': 'SEO, içerik ve reklam stratejileriyle marka görünürlüğünü artırıyoruz.',
            'İş akışlarınızı otomatikleştiren özel çözümler geliştiriyoruz.': 'İş akışlarınızı otomatikleştiren özel çözümler geliştiriyoruz.',
            'İncele': 'İncele',
            'Detayları Gör': 'Detayları Gör',
            'Hemen Başla': 'Hemen Başla',
            'Tavsiye Al': 'Tavsiye Al',
            'Görüntüle': 'Görüntüle',
            'Keşfet': 'Keşfet',
            'Eğitim Portalı': 'Eğitim Portalı',
            'Kafe Web Sitesi': 'Kafe Web Sitesi',
            'Kurumsal Site': 'Kurumsal Site',
            'Sağlık Kliniği': 'Sağlık Kliniği',
            'Web Uygulaması': 'Web Uygulaması',
            'Marka Hikayesi': 'Marka Hikayesi',
            'Kurumsal': 'Kurumsal',
            'Hizmet': 'Hizmet',
            'Öğrenci, öğretmen ve yönetim panelini tek bir deneyimde birleştiren modern portal.': 'Öğrenci, öğretmen ve yönetim panelini tek bir deneyimde birleştiren modern portal.',
            'Rezervasyon, menü ve sosyal medya içerik akışını bütünleştiren butik site.': 'Rezervasyon, menü ve sosyal medya içerik akışını bütünleştiren butik site.',
            'Profesyonel görünüm ve hızlı içerik yönetimiyle markayı öne çıkaran çözüm.': 'Profesyonel görünüm ve hızlı içerik yönetimiyle markayı öne çıkaran çözüm.',
            'Randevu, iletişim ve hizmet tanıtımı odaklı geliştirilmiş dijital ağı.': 'Randevu, iletişim ve hizmet tanıtımı odaklı geliştirilmiş dijital ağı.',
            'Güncel Web Tasarım Trendleri': 'Güncel Web Tasarım Trendleri',
            'SEO ile Organik Ziyaret Artırma': 'SEO ile Organik Ziyaret Artırma',
            'İletişim Formu Dönüştürme Kuralları': 'İletişim Formu Dönüştürme Kuralları',
            'Mobil İlk Dijital Deneyim': 'Mobil İlk Dijital Deneyim',
            '2026\'da kullanıcı deneyimini artıran modern tasarım yaklaşımlarını keşfedin.': '2026\'da kullanıcı deneyimini artıran modern tasarım yaklaşımlarını keşfedin.',
            'Arama motorlarında görünürlüğünüzü yükselten temel stratejileri öğrenin.': 'Arama motorlarında görünürlüğünüzü yükselten temel stratejileri öğrenin.',
            'Formların dönüşüm oranını artırmak için uygulanabilecek etkili yöntemler.': 'Formların dönüşüm oranını artırmak için uygulanabilecek etkili yöntemler.',
            'Mobil kullanıcı davranışına göre şekillenen modern site yapıları.': 'Mobil kullanıcı davranışına göre şekillenen modern site yapıları.',
            'Tasarım': 'Tasarım',
            'Pazarlama': 'Pazarlama',
            'İletişim': 'İletişim',
            'Ürün': 'Ürün',
            'Örnek Ürün A': 'Örnek Ürün A',
            'Örnek Ürün B': 'Örnek Ürün B',
            'Kısa açıklama A': 'Kısa açıklama A',
            'Kısa açıklama B': 'Kısa açıklama B',
            'Özel çözüm': 'Özel çözüm',
            'Örnek Ürün': 'Örnek Ürün',
            '(Gerçek anahtarlar appsettings.json içinde Stripe:SecretKey ve PublishableKey ile sağlanmalıdır.)': '(Gerçek anahtarlar appsettings.json içinde Stripe:SecretKey ve PublishableKey ile sağlanmalıdır.)',
            '2026\'da kullanıcı deneyimini artıran modern tasarım yaklaşımlarını keşfedin.': '2026\'da kullanıcı deneyimini artıran modern tasarım yaklaşımlarını keşfedin.'
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
        // Input placeholder çevirisi
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        // Dinamik kart içerikleri (veritabanından gelen metinler)
        // TR metni sözlükteki anahtarla eşleşirse EN karşılığına çevrilir
        const dt = dynamicTranslations[lang];
        if (dt) {
            document.querySelectorAll('.card-title, .card-text, .badge, .card .btn, .chip').forEach(el => {
                const txt = el.textContent.trim();
                // Sadece metni birebir eşleşen elementleri çevir
                if (dt[txt]) {
                    el.textContent = dt[txt];
                }
            });
        }
        // Sayfa başlığını çevir
        const titleEl = document.querySelector('title');
        if (titleEl) {
            const currentTitle = document.title;
            const brand = translations[lang]['brand'];
            const baseTitle = currentTitle.replace(' - ' + brand, '').replace(' - Northstar Studio', '');
            const pageKey = 'page.' + baseTitle;
            if (translations[lang] && translations[lang][pageKey]) {
                document.title = translations[lang][pageKey] + ' - ' + brand;
            } else {
                document.title = currentTitle.replace('Northstar Studio', brand);
            }
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
