const translations = {
    'tr': {
        // Nav & General
        'nav_home': 'Anasayfa',
        'nav_about': 'Hakkında',
        'nav_sale': 'Satılık Portföy',
        'nav_rent': 'Kiralık Portföy',
        'nav_arsa': 'Arsa Portföy',
        'nav_contact': 'Size Ulaşalım',
        'nav_login': 'Giriş',
        'footer_text': 'Profesyonel gayrimenkul değerleme ve danışmanlık hizmetleri ile yanınızdayız.',
        'footer_copy': '&copy; 2026 Çağrı Duran Emlak. Tüm hakları saklıdır.',
        'float_wa': 'WhatsApp\'tan Yazın',
        'float_ig': 'Instagram\'ı İnceleyin',
        'float_yt': 'YouTube Kanalımız',
        'float_phone': 'Hemen Arayın',
        
        // Index Content
        'about_title': 'Hakkında',
        'about_text': '1993 doğumlu olan Çağrı Duran, eğitim hayatını Afyonkarahisar’da tamamlamıştır. 2011 yılında Acil Tıp Teknisyeni olarak görevine başlamış, aynı yıldan itibaren Antalya’da yaşamını sürdürmektedir. Sağlık sektöründe edindiği disiplin, kriz yönetimi becerisi ve insan odaklı yaklaşım, meslek hayatına güçlü bir temel oluşturmuştur.<br><br>Gayrimenkul sektörüne olan ilgisini profesyonel bir kariyere dönüştürerek 2023 yılında bu alanda faaliyet göstermeye başlayan Çağrı Duran, bugün Çağrı Duran Emlak markası altında hizmet vermektedir. Aynı zamanda Realty World Center iş ortaklığı ile müşterilerine daha kurumsal, güvenilir ve güçlü bir hizmet ağı sunmaktadır.<br><br>Sürekli gelişimi ilke edinen bir anlayışla hareket eden Çağrı Duran, sektördeki yenilikleri yakından takip ederek danışanlarına en doğru ve güncel çözümleri sunmayı hedeflemektedir. Öncelikle Antalya ( Muratpaşa-Kepez- Konyaaltı-Döşemealtı ) ve ilçeleri başta olmak üzere alım, satım ve kiralama süreçlerinde şeffaflık, güven ve dürüstlük temel prensipleriyle hareket etmektedir.<br><br>Müşteri memnuniyetini her zaman ön planda tutan Çağrı Duran Emlak, doğru fiyatlandırma, etkili pazarlama ve hızlı sonuç odaklı hizmet anlayışıyla danışanlarına en iyi deneyimi sunmayı amaçlamaktadır.',
        'feat_1': 'Güvenilir ve Şeffaf Hizmet',
        'feat_2': 'Geniş ve Seçkin Portföy',
        'feat_3': 'Profesyonel Danışmanlık',
        'sale_title': 'Satılık Portföy',
        'rent_title': 'Kiralık Portföy',
        'arsa_title': 'Arsa Portföy',
        'contact_title': 'Size Ulaşalım',
        'contact_subtitle': 'Hayalinizdeki eve ulaşmak veya gayrimenkulünüzü en iyi şekilde değerlendirmek için iletişim bilgilerinizi bırakın, uzman ekibimiz en kısa sürede sizi arasın.',
        'contact_send': 'Bilgilerimi Gönder',
        'contact_note': 'Telefon numarası girilmeden Gönder butonu aktifleşmez.',
        'form_name': 'Adınız Soyadınız',
        'form_email': 'E-mail Adresiniz',
        'form_phone': 'Telefon Numarası',
        'form_message': 'Mesajınız',
        'contact_address': 'Çağlayan Mah. Bülent Ecevit Blv. Akasya Sitesi No:157A Muratpaşa/Antalya',
        'contact_map_link': 'Haritada Görüntüle',
        'form_kvkk': 'KVKK <strong class="kvkk-link" style="cursor: pointer; color: var(--primary); text-decoration: underline;" onclick="event.preventDefault(); openKvkkModal();">metnini</strong> okudum ve onaylıyorum.',
        'youtube_title': 'YOUTUBE',
        'youtube_subscribe': 'YouTube\'a Göz At',
        'instagram_title': 'INSTAGRAM',
        'instagram_subscribe': 'Instagram\'a Göz At',
        'insta_placeholder_text': 'Instagram akışını otomatik göstermek için bir widget servisi gereklidir. Son paylaşımlarımızı görmek için sayfamıza göz atın!',

        // Detail Page
        'detail_back': 'Ana Sayfaya Dön',
        'detail_not_found': 'İlan Bulunamadı',
        'detail_not_found_text': 'Aradığınız ilan yayından kaldırılmış veya bağlantı hatalı olabilir.',
        'detail_features': 'Özellikler',
        'detail_beds': 'Oda Sayısı',
        'detail_zoning': 'İmar Durumu',
        'detail_area': 'Brüt / Net m²',
        'detail_age': 'Bina Yaşı',
        'detail_floor': 'Bulunduğu Kat',
        'detail_heating': 'Isıtma Sistemi',
        'detail_furnished': 'Eşya Durumu',
        'detail_bathrooms': 'Banyo Sayısı',
        'detail_balcony': 'Balkon',
        'detail_credit': 'Krediye Uygunluk',
        'detail_desc': 'Mülk Bilgileri / Açıklama',
        'detail_whatsapp': 'WhatsApp\'tan Bilgi Al',
        'detail_call': 'Hemen Ara',
        'detail_expand': 'Büyütmek için tıkla',
        'detail_no_location': 'Konum Belirtilmemiş',
        'detail_no_desc': 'Açıklama girilmemiş.',
        // Admin
        'admin_title': 'Portföy Ekle / Düzenle',
        'admin_cat': 'Kategori',
        'admin_sale': 'Satılık',
        'admin_rent': 'Kiralık',
        'admin_land': 'Arsa',
        'admin_prop_title': 'İlan Başlığı',
        'admin_price': 'Fiyat (örn: ₺15.000.000)',
        'admin_link': 'Harici Detay Linki (Opsiyonel)',
        'admin_room': 'Oda/Durum (örn: 3+1)',
        'admin_area': 'm² (örn: 150)',
        'admin_badge': 'Rozet Metni (örn: Yeni)',
        'admin_age': 'Bina Yaşı',
        'admin_floor': 'Bulunduğu Kat',
        'admin_loc': 'Konum / İlçe',
        'admin_heat': 'Isıtma Sistemi',
        'admin_furn': 'Eşya Durumu',
        'admin_bath': 'Banyo Sayısı',
        'admin_balc': 'Balkon',
        'admin_credit': 'Krediye Uygunluk',
        'admin_desc': 'Mülk Bilgileri / Açıklama',
        'admin_images': 'Görseller (En az 1 Kapak Görseli)',
        'admin_img_hint': 'Görsel yüklemek için cihazınızdan resim seçebilir veya sürükleyebilirsiniz.',
        'admin_add_img': 'Yeni Görsel Ekle',
        'admin_save': 'Kaydet',
        'admin_drop': 'Görsel Seç / Sürükle',
        'admin_url': 'Görsel URL (veya üstten seçin)',
        'admin_edit': 'Düzenle',
        'admin_del': 'Sil',
        'admin_pwd': 'Şifre Değiştir',
        'admin_logout': 'Çıkış Yap',
        'admin_user': 'Kullanıcı Adı',
        'admin_pass': 'Şifre'
    },
    'en': {
        // Nav & General
        'nav_home': 'Home',
        'nav_about': 'About',
        'nav_sale': 'For Sale',
        'nav_rent': 'For Rent',
        'nav_arsa': 'Land/Plots',
        'nav_contact': 'Contact Us',
        'nav_login': 'Login',
        'footer_text': 'We are with you with professional real estate appraisal and consultancy services.',
        'footer_copy': '&copy; 2026 Çağrı Duran Emlak. All rights reserved.',
        'float_wa': 'Write on WhatsApp',
        'float_ig': 'Check Instagram',
        'float_yt': 'Our YouTube Channel',
        'float_phone': 'Call Now',
        
        // Index Content
        'about_title': 'About Us',
        'about_text': 'Born in 1993, Çağrı Duran completed his education in Afyonkarahisar. He started his career as an Emergency Medical Technician in 2011 and has been living in Antalya since then. The discipline, crisis management skills, and human-oriented approach he gained in the health sector have formed a strong basis for his professional life.<br><br>Turning his interest in the real estate sector into a professional career, Çağrı Duran began operating in this field in 2023 and today serves under the Çağrı Duran Real Estate brand. At the same time, through a partnership with Realty World Center, he offers his clients a more corporate, reliable, and strong service network.<br><br>Adopting a principle of continuous development, Çağrı Duran aims to offer his clients the most accurate and up-to-date solutions by closely following the innovations in the sector. He acts with the core principles of transparency, trust, and honesty in the buying, selling, and leasing processes, primarily in Antalya (Muratpaşa-Kepez-Konyaaltı-Döşemealtı) and its districts.<br><br>Always prioritizing customer satisfaction, Çağrı Duran Real Estate aims to provide the best experience to its clients with an understanding of correct pricing, effective marketing, and fast result-oriented service.',
        'feat_1': 'Reliable and Transparent Service',
        'feat_2': 'Broad and Exclusive Portfolio',
        'feat_3': 'Professional Consultancy',
        'sale_title': 'For Sale Portfolio',
        'rent_title': 'For Rent Portfolio',
        'arsa_title': 'Land Portfolio',
        'contact_title': 'Let Us Reach You',
        'contact_subtitle': 'Leave your contact information to reach your dream home or to evaluate your real estate in the best way, our expert team will call you as soon as possible.',
        'contact_send': 'Send My Information',
        'contact_note': 'The Send button is not active until a phone number is entered.',
        'form_name': 'Your Name and Surname',
        'form_email': 'Your E-mail Address',
        'form_phone': 'Phone Number',
        'form_message': 'Your Message',
        'contact_address': 'Caglayan Mah. Bulent Ecevit Blv. Akasya Sitesi No:157A Muratpasa/Antalya',
        'contact_map_link': 'View on Google Maps',
        'form_kvkk': 'I have read and agree to the <strong class="kvkk-link" style="cursor: pointer; color: var(--primary); text-decoration: underline;" onclick="event.preventDefault(); openKvkkModal();">KVKK text</strong>.',
        'youtube_title': 'YOUTUBE',
        'youtube_subscribe': 'Check out our YouTube',
        'instagram_title': 'INSTAGRAM',
        'instagram_subscribe': 'Check out our Instagram',
        'insta_placeholder_text': 'A widget service is required to display the Instagram feed automatically. Check out our page to see our latest posts for now!',

        // Detail Page
        'detail_back': 'Back to Home',
        'detail_not_found': 'Ad Not Found',
        'detail_not_found_text': 'The ad you are looking for may have been removed or the link is incorrect.',
        'detail_features': 'Features',
        'detail_beds': 'Number of Rooms',
        'detail_zoning': 'Zoning Status',
        'detail_area': 'Gross / Net m²',
        'detail_age': 'Building Age',
        'detail_floor': 'Floor Level',
        'detail_heating': 'Heating System',
        'detail_furnished': 'Furnishing Status',
        'detail_bathrooms': 'Number of Bathrooms',
        'detail_balcony': 'Balcony',
        'detail_credit': 'Credit Availability',
        'detail_desc': 'Property Information / Description',
        'detail_whatsapp': 'Get Information via WhatsApp',
        'detail_call': 'Call Now',
        'detail_expand': 'Click to expand',
        'detail_no_location': 'Location Not Specified',
        'detail_no_desc': 'Description not provided.',
        // Admin
        'admin_title': 'Add / Edit Portfolio',
        'admin_cat': 'Category',
        'admin_sale': 'For Sale',
        'admin_rent': 'For Rent',
        'admin_land': 'Land',
        'admin_prop_title': 'Ad Title',
        'admin_price': 'Price (e.g. $500,000)',
        'admin_link': 'External Link (Optional)',
        'admin_room': 'Rooms/Type (e.g. 3+1)',
        'admin_area': 'm² (e.g. 150)',
        'admin_badge': 'Badge (e.g. New)',
        'admin_age': 'Building Age',
        'admin_floor': 'Floor Level',
        'admin_loc': 'Location / District',
        'admin_heat': 'Heating System',
        'admin_furn': 'Furnishing Status',
        'admin_bath': 'Number of Bathrooms',
        'admin_balc': 'Balcony',
        'admin_credit': 'Credit Availability',
        'admin_desc': 'Property Info / Description',
        'admin_images': 'Images (At least 1 cover)',
        'admin_img_hint': 'To upload an image, you can select a picture from your device or drag it.',
        'admin_add_img': 'Add New Image',
        'admin_save': 'Save',
        'admin_drop': 'Select / Drag Image',
        'admin_url': 'Image URL (or select above)',
        'admin_edit': 'Edit',
        'admin_del': 'Delete',
        'admin_pwd': 'Change Password',
        'admin_logout': 'Logout',
        'admin_user': 'Username',
        'admin_pass': 'Password'
    }
};

window.setLanguage = (lang) => {
    localStorage.setItem('preferredLanguage', lang);
    applyTranslations(lang);
    updateFlagState(lang);
    
    // Dispatch a custom event to notify other scripts that language changed
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
};

window.applyTranslations = (lang) => {
    const t = translations[lang] || translations['tr'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });
    document.documentElement.lang = lang;
};

window.updateFlagState = (lang) => {
    document.querySelectorAll('.flag-icon').forEach(flag => {
        flag.classList.remove('active');
        // Check if the onclick contains the language code
        const onclickAttr = flag.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(lang)) {
            flag.classList.add('active');
        }
    });
};

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'tr';
    applyTranslations(savedLang);
    updateFlagState(savedLang);
});
