document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    
    const portfolios = JSON.parse(localStorage.getItem('portfolios')) || [];
    const item = portfolios.find(p => p.id === id);

    const container = document.getElementById('detail-container');

    if (!item) {
        container.innerHTML = `
            <div style="text-align:center; padding: 100px 0;">
                <i class="fas fa-exclamation-triangle fa-3x" style="color: #e74c3c; margin-bottom: 20px;"></i>
                <h2 data-i18n="detail_not_found">İlan Bulunamadı</h2>
                <p class="text-muted" style="margin-top:10px;" data-i18n="detail_not_found_text">Aradığınız ilan yayından kaldırılmış veya bağlantı hatalı olabilir.</p>
                <a href="index.html" class="btn btn-primary" style="margin-top:20px;"><i class="fas fa-home"></i> <span data-i18n="detail_back">Ana Sayfaya Dön</span></a>
            </div>
        `;
        if (window.applyTranslations) applyTranslations(localStorage.getItem('preferredLanguage') || 'tr');
        return;
    }

    // Set page title
    document.title = `${item.title} | Çağrı Duran Emlak`;
    
    window.detailImages = item.images && item.images.length > 0 ? item.images : ['images/logo.png'];
    window.currentImgIndex = 0;

    // Show exactly 9 slots for additional photos in single column
    const gridItemsHtml = [];
    for (let i = 1; i <= 9; i++) {
        const src = detailImages[i];
        if (src) {
            gridItemsHtml.push(`
                <div class="grid-item" onclick="changeMainImage(${i})">
                    <img src="${src}" onerror="this.src='https://placehold.co/800x600/0f172a/d4af37?text=Görsel'">
                </div>
            `);
        } else {
            gridItemsHtml.push(`
                <div class="grid-item empty-slot">
                    <div style="text-align:center; opacity: 0.1;">
                        <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 10px;"></i>
                        <p>Fotoğraf Bekleniyor</p>
                    </div>
                </div>
            `);
        }
    }
    const gridHtml = `<div class="photo-grid">${gridItemsHtml.join('')}</div>`;

    let linkHtml = '';
    if (item.link) {
        linkHtml = `<a href="${item.link}" target="_blank" class="btn btn-outline" style="margin-top: 20px; color:var(--primary); border-color:var(--primary);"><i class="fas fa-external-link-alt"></i> Farklı Sitede İncele</a>`;
    }

    // Calculate WhatsApp Link text properly
    const encodedTitle = encodeURIComponent(`Merhaba, ${item.title} (${item.price}) ilanıyla ilgileniyorum.`);

    container.innerHTML = `
        <div class="detail-location"><i class="fas fa-map-marker-alt" style="color:var(--primary);"></i> <span data-i18n="detail_no_location">${item.location || 'Konum Belirtilmemiş'}</span></div>
        <h1 class="detail-title">${item.title} <span class="badge ${item.type === 'rent' ? 'badge-rent' : (item.type === 'arsa' ? 'badge-arsa' : '')}" style="position:static; margin-left:10px; font-size:0.9rem; padding: 4px 12px; transform: translateY(-4px); display:inline-block;">${item.badge}</span></h1>
        <div class="detail-price">${item.price}</div>
        
        <div class="gallery-container">
            <div class="main-image-wrapper" onclick="openLightbox()">
                <img id="detail-main-img" src="${detailImages[0]}" onerror="this.src='https://placehold.co/800x600/0f172a/d4af37?text=Görsel'">
                <div class="expand-hint"><i class="fas fa-search-plus"></i> <span data-i18n="detail_expand">Büyütmek için tıkla</span></div>
            </div>
            ${gridHtml}
        </div>
        
        <div class="desc-section">
            <h3><i class="fas fa-list" style="color:var(--primary); margin-right:10px;"></i><span data-i18n="detail_features">Özellikler</span></h3>
            <div class="properties-grid" style="margin-bottom:0;">
                <div class="prop-item">
                    <i class="fas ${item.type === 'arsa' ? 'fa-vector-square' : 'fa-bed'}"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="${item.type === 'arsa' ? 'detail_zoning' : 'detail_beds'}">${item.type === 'arsa' ? 'İmar Durumu' : 'Oda Sayısı'}</span>
                        <span class="prop-value">${item.beds || '-'}</span>
                    </div>
                </div>
                <div class="prop-item">
                    <i class="fas fa-ruler-combined"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_area">Brüt / Net m²</span>
                        <span class="prop-value">${item.area || '-'} m²</span>
                    </div>
                </div>
                ${item.type !== 'arsa' ? `
                <div class="prop-item">
                    <i class="fas fa-building"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_age">Bina Yaşı</span>
                        <span class="prop-value">${item.age || '-'}</span>
                    </div>
                </div>
                <div class="prop-item">
                    <i class="fas fa-layer-group"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_floor">Bulunduğu Kat</span>
                        <span class="prop-value">${item.floor || '-'}</span>
                    </div>
                </div>
                <div class="prop-item">
                    <i class="fas fa-fire"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_heating">Isıtma Sistemi</span>
                        <span class="prop-value">${item.heating || '-'}</span>
                    </div>
                </div>
                <div class="prop-item">
                    <i class="fas fa-couch"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_furnished">Eşya Durumu</span>
                        <span class="prop-value">${item.furnished || '-'}</span>
                    </div>
                </div>
                <div class="prop-item">
                    <i class="fas fa-bath"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_bathrooms">Banyo Sayısı</span>
                        <span class="prop-value">${item.bathrooms || '-'}</span>
                    </div>
                </div>
                <div class="prop-item">
                    <i class="fas fa-door-open"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_balcony">Balkon</span>
                        <span class="prop-value">${item.balcony || '-'}</span>
                    </div>
                </div>
                <div class="prop-item">
                    <i class="fas fa-money-check-alt"></i>
                    <div class="prop-info">
                        <span class="prop-label" data-i18n="detail_credit">Krediye Uygunluk</span>
                        <span class="prop-value">${item.credit || '-'}</span>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="desc-section">
            <h3><i class="fas fa-info-circle" style="color:var(--primary); margin-right:10px;"></i><span data-i18n="detail_desc">Mülk Bilgileri / Açıklama</span></h3>
            <div class="desc-content" data-i18n="detail_no_desc">${item.description || 'Açıklama girilmemiş.'}</div>
            ${linkHtml}
        </div>
        
        <div class="action-bars">
            <a href="https://wa.me/905435225881?text=${encodedTitle}" target="_blank" class="btn btn-whatsapp">
                <i class="fab fa-whatsapp"></i> <span data-i18n="detail_whatsapp">WhatsApp'tan Bilgi Al</span>
            </a>
            <a href="tel:+905435225881" class="btn btn-primary">
                <i class="fas fa-phone"></i> <span data-i18n="detail_call">Hemen Ara</span>
            </a>
        </div>
    `;

    // Apply translations after rendering
    const currentLang = localStorage.getItem('preferredLanguage') || 'tr';
    if (window.applyTranslations) applyTranslations(currentLang);

    // Show/Hide Edit Button if logged in
    const editBtn = document.getElementById('edit-detail-btn');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (editBtn && isLoggedIn) {
        editBtn.style.display = 'inline-block';
        editBtn.href = `index.html?edit=${item.id}`;
    }

    window.changeMainImage = (idx) => {
        window.currentImgIndex = idx;
        const mainImg = document.getElementById('detail-main-img');
        if (mainImg) mainImg.src = detailImages[idx];
        
        // Update active thumbnail
        document.querySelectorAll('.grid-item').forEach((el, i) => {
            el.classList.toggle('active', i === idx - 1);
        });
    };

    window.openLightboxIndex = (idx) => {
        window.currentImgIndex = idx;
        document.getElementById('lightboxOverlay').style.display = 'flex';
        updateLightboxImg();
    };

    window.openLightbox = () => {
        openLightboxIndex(window.currentImgIndex);
    };

    window.closeLightbox = () => {
        document.getElementById('lightboxOverlay').style.display = 'none';
    };

    window.changeLightbox = (dir) => {
        currentImgIndex += dir;
        if(currentImgIndex < 0) currentImgIndex = detailImages.length - 1;
        if(currentImgIndex >= detailImages.length) currentImgIndex = 0;
        updateLightboxImg();
    };

    window.updateLightboxImg = () => {
        const lbImg = document.getElementById('lightbox-main-img');
        lbImg.src = detailImages[currentImgIndex];
        
        document.querySelectorAll('.grid-item').forEach((el, i) => {
            el.classList.toggle('active', i === currentImgIndex - 1);
        });
        
        document.getElementById('detail-main-img').src = detailImages[currentImgIndex];
    };

    // Respond to language changes from the header switcher
    window.addEventListener('languageChanged', (e) => {
        applyTranslations(e.detail.language);
    });
});
