document.addEventListener('DOMContentLoaded', () => {
    // Enable admin edit from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const isAdminInitially = sessionStorage.getItem('isAdmin') === 'true';

    // 1. Navbar Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-times');
            hamburger.querySelector('i').classList.toggle('fa-bars');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // 3. Contact Form Logic
    const phoneInput = document.getElementById('phone');
    const kvkkCheckbox = document.getElementById('kvkk');
    const submitBtn = document.getElementById('submitBtn');

    if (phoneInput && kvkkCheckbox && submitBtn) {
        const validateForm = () => {
            let phoneVal = phoneInput.value.trim();
            let phoneDigits = phoneVal.replace(/\D/g, "");
            let isPhoneValid = phoneDigits.length >= 10;
            let isKvkkChecked = kvkkCheckbox.checked;

            if (isPhoneValid && isKvkkChecked) {
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.setAttribute('disabled', 'true');
            }
        };

        phoneInput.addEventListener('input', validateForm);
        kvkkCheckbox.addEventListener('change', validateForm);
    }

    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    if (messageInput && charCount) {
        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            charCount.textContent = length;
            if (length >= 200) {
                charCount.style.color = 'var(--primary)';
            } else {
                charCount.style.color = 'var(--text-muted)';
            }
        });
    }

    // Translations are handled by i18n.js
    // Initialize Language
    const savedLang = localStorage.getItem('preferredLanguage') || 'tr';
    if (window.applyTranslations) applyTranslations(savedLang);
    if (window.updateFlagState) updateFlagState(savedLang);

    // 5. Dynamic Portfolios & Admin Logic
    const initialPortfolios = [
        { id: 1, type: 'sale', title: 'Lüks Villa - Lara', price: '₺25.000.000', beds: '5+2', area: '450', images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'], badge: 'Satılık', link: '', description: 'Deniz manzaralı, geniş bahçeli ve özel havuzlu ultra lüks villa.', age: 'Sıfır', floor: 'Müstakil', location: 'Lara, Antalya', heating: 'Yerden Isıtma' },
        { id: 2, type: 'sale', title: 'Deniz Manzaralı Rezidans', price: '₺8.500.000', beds: '3+1', area: '160', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'], badge: 'Satılık', link: '', description: 'Konyaaltı sahilinde, kesintisiz Akdeniz manzarasına sahip prestijli daire.', age: '2', floor: '8. Kat', location: 'Konyaaltı, Antalya', heating: 'Vrf Klima' },
        { id: 3, type: 'sale', title: 'Merkezi Konumda Daire', price: '₺4.200.000', beds: '2+1', area: '110', images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'], badge: 'Satılık', link: '', description: 'Işıklar caddesine ve denize yürüme mesafesinde, bakımlı masrafsız daire.', age: '10', floor: '2. Kat', location: 'Muratpaşa, Antalya', heating: 'Doğalgaz Kombi' },
        
        { id: 4, type: 'rent', title: 'Site İçi Kiralık Daire', price: '₺35.000 / Ay', beds: '3+1', area: '140', images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'], badge: 'Kiralık', link: '', description: 'Havuzlu ve güvenlikli site içerisinde, aile yaşamına uygun geniş kiralık.', age: '4', floor: '4. Kat', location: 'Kepez, Antalya', heating: 'Doğalgaz' },
        { id: 5, type: 'rent', title: 'Modern Eşyalı Stüdyo', price: '₺20.000 / Ay', beds: '1+1', area: '65', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], badge: 'Kiralık', link: '', description: 'Yeni eşyalı, kampüs bölgesine yakın modern tasarımlı stüdyo daire.', age: '1', floor: 'Giriş Kat', location: 'Döşemealtı, Antalya', heating: 'Klima' },
        { id: 6, type: 'rent', title: 'Manzaralı Çatı Katı', price: '₺45.000 / Ay', beds: '4+1', area: '220', images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'], badge: 'Kiralık', link: '', description: 'Toros Dağları ve şehir manzaralı geniş teraslı, lüks dubleks daire.', age: 'Sıfır', floor: 'Dubleks', location: 'Konyaaltı, Antalya', heating: 'Merkezi Sistem' },
        
        { id: 7, type: 'arsa', title: 'Villalık Arsa - Döşemealtı', price: '₺6.500.000', beds: 'İmarlı', area: '600', images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'], badge: 'Arsa', link: '', description: 'Villa yapımına uygun, doğa ile iç içe huzurlu bir konumda yatırım fırsatı.', age: '-', floor: '-', location: 'Döşemealtı, Antalya', heating: '-' },
        { id: 8, type: 'arsa', title: 'Ticari Arsa - Aksu', price: '₺12.000.000', beds: 'Ticari', area: '2.500', images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'], badge: 'Arsa', link: '', description: 'Ana yola cepheli, lojistik veya showroom yapımına uygun ticari imarlı.', age: '-', floor: '-', location: 'Aksu, Antalya', heating: '-' },
        { id: 9, type: 'arsa', title: 'Zeytinlik - Serik', price: '₺3.200.000', beds: 'Tarım', area: '4.500', images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'], badge: 'Arsa', link: '', description: 'Köy yerleşim alanına yakın, verimli toprağı ve yolu olan zeytinlik.', age: '-', floor: '-', location: 'Serik, Antalya', heating: '-' }
    ];

    let portfolios = JSON.parse(localStorage.getItem('portfolios'));
    if (!portfolios) {
        portfolios = initialPortfolios;
        localStorage.setItem('portfolios', JSON.stringify(portfolios));
    } else {
        // Migration mapping for old data
        portfolios = portfolios.map(p => {
            if (!p.images) p.images = p.img ? [p.img] : ['images/logo.png'];
            if (!p.link) p.link = '';
            if (p.description === undefined) p.description = '';
            if (p.age === undefined) p.age = '';
            if (p.floor === undefined) p.floor = '';
            if (p.location === undefined) p.location = '';
            if (p.heating === undefined) p.heating = '';
            if (p.furnished === undefined) p.furnished = '';
            if (p.bathrooms === undefined) p.bathrooms = '';
            if (p.balcony === undefined) p.balcony = '';
            if (p.credit === undefined) p.credit = '';
            return p;
        });
        localStorage.setItem('portfolios', JSON.stringify(portfolios));
    }

    let adminCreds = JSON.parse(localStorage.getItem('adminCredentials')) || { user: 'admin', pass: '123456' };
    let isAdmin = sessionStorage.getItem('isAdmin') === 'true';

    window.renderPortfolios = () => {
        const grids = {
            sale: document.getElementById('grid-sale'),
            rent: document.getElementById('grid-rent'),
            arsa: document.getElementById('grid-arsa')
        };

        // Clear existing
        Object.values(grids).forEach(grid => { if(grid) grid.innerHTML = ''; });

        portfolios.forEach(item => {
            const grid = grids[item.type];
            if (!grid) return;

            let badgeClass = item.type === 'rent' ? 'badge-rent' : (item.type === 'arsa' ? 'badge-arsa' : '');
            let iconClass = item.type === 'arsa' ? 'fa-map-marker-alt' : 'fa-bed';
            
            let adminControls = isAdmin ? `
                <div class="admin-controls">
                    <button class="admin-btn edit-btn" onclick="event.stopPropagation(); editPortfolio(${item.id})"><i class="fas fa-edit"></i></button>
                    <button class="admin-btn delete-btn" onclick="event.stopPropagation(); deletePortfolio(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            ` : '';

            const cardHTML = `
                <div class="portfolio-card" data-id="${item.id}" onclick="window.open('detail.html?id=${item.id}', '_blank')" style="cursor:pointer;">
                    <div class="card-image">
                        <img src="${item.images[0]}" onerror="this.src='https://placehold.co/800x600/0f172a/d4af37?text=Görsel+Bulunamadı'" alt="${item.title}">
                        <span class="badge ${badgeClass}">${item.badge}</span>
                        ${adminControls}
                    </div>
                    <div class="card-content">
                        <h3>${item.title}</h3>
                        <p class="price">${item.price}</p>
                        <ul class="features">
                            <li><i class="fas ${iconClass}"></i> ${item.beds}</li>
                            <li><i class="fas fa-ruler-combined"></i> ${item.area} m²</li>
                        </ul>
                        ${item.description ? `<p class="portfolio-desc">${item.description}</p>` : ''}
                        ${item.link ? `<a href="${item.link}" target="_blank" onclick="event.stopPropagation()" class="portfolio-detail-link"><i class="fas fa-external-link-alt"></i> Detaylara ulaşmak için linke tıklayınız</a>` : ''}
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });

        // FAQ Toggle Logic
        document.querySelectorAll('.faq-question').forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                item.classList.toggle('active');
            });
        });

        // Add headers admin controls
        document.querySelectorAll('.admin-add-btn').forEach(btn => btn.remove());
        if (isAdmin) {
            document.querySelectorAll('.portfolio-grid').forEach(grid => {
                const type = grid.id.replace('grid-', '');
                const addBtnHtml = `<div class="admin-add-btn text-center" style="grid-column: 1 / -1; margin-bottom: 20px;">
                                        <button class="btn btn-outline" onclick="openModal('${type}')" style="color: var(--primary); border-color: var(--primary);"><i class="fas fa-plus"></i> Yeni Ekle</button>
                                    </div>`;
                grid.insertAdjacentHTML('afterbegin', addBtnHtml);
            });
        }
    };

    window.handleLogin = () => {
        const user = document.getElementById('username')?.value;
        const pass = document.getElementById('password')?.value;
        const currentLang = localStorage.getItem('preferredLanguage') || 'tr';
        const t = (window.translations && window.translations[currentLang]) || {};

        if (user === adminCreds.user && pass === adminCreds.pass) {
            sessionStorage.setItem('isAdmin', 'true');
            isAdmin = true;
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('login-dropdown').classList.remove('show');
            updateAuthUI();
            renderPortfolios();
        } else {
            alert(t['login_error'] || 'Hatalı kullanıcı adı veya şifre.');
        }
    };

    window.handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        isAdmin = false;
        updateAuthUI();
        renderPortfolios();
    };

    const updateAuthUI = () => {
        const loginWrapper = document.getElementById('login-trigger-wrapper');
        const logoutForm = document.getElementById('logout-form');
        if (!loginWrapper || !logoutForm) return;

        if (isAdmin) {
            loginWrapper.style.display = 'none';
            logoutForm.style.display = 'flex';
        } else {
            loginWrapper.style.display = 'block';
            logoutForm.style.display = 'none';
        }
    };

    const headerLoginBtn = document.getElementById('headerLoginBtn');
    const loginDropdown = document.getElementById('login-dropdown');
    
    if (headerLoginBtn && loginDropdown) {
        headerLoginBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            loginDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!loginDropdown.contains(e.target) && e.target !== headerLoginBtn) {
                loginDropdown.classList.remove('show');
            }
        });
        
        // Prevent click inside dropdown from closing it
        loginDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    window.openModal = (type = 'sale', id = null) => {
        const modal = document.getElementById('portfolioModal');
        modal.style.display = 'flex';
        
        // Re-apply translations for modal labels
        const currentLang = localStorage.getItem('preferredLanguage') || 'tr';
        if (window.applyTranslations) applyTranslations(currentLang);
        
        document.getElementById('modal-type').value = type;
        if(id) {
            document.getElementById('modal-id').value = id;
            const item = portfolios.find(p => p.id === id);
            if(item) {
                document.getElementById('modal-title').value = item.title || '';
                document.getElementById('modal-price').value = item.price || '';
                document.getElementById('modal-beds').value = item.beds || '';
                document.getElementById('modal-area').value = item.area || '';
                document.getElementById('modal-badge').value = item.badge || '';
                document.getElementById('modal-link').value = item.link || '';
                document.getElementById('modal-desc').value = item.description || '';
                document.getElementById('modal-age').value = item.age || '';
                document.getElementById('modal-floor').value = item.floor || '';
                document.getElementById('modal-location').value = item.location || '';
                document.getElementById('modal-heating').value = item.heating || '';
                document.getElementById('modal-furnished').value = item.furnished || '';
                document.getElementById('modal-bathrooms').value = item.bathrooms || '';
                document.getElementById('modal-balcony').value = item.balcony || '';
                document.getElementById('modal-credit').value = item.credit || '';
                
                if (item.images && item.images.length > 0) {
                    renderImageSlots(item.images);
                } else {
                    renderImageSlots(['']);
                }
            }
        } else {
            // Reset for new
            document.getElementById('modal-form').reset();
            document.getElementById('modal-id').value = '';
            document.getElementById('modal-type').value = type;
            document.getElementById('modal-desc').value = '';
            document.getElementById('modal-age').value = '';
            document.getElementById('modal-floor').value = '';
            document.getElementById('modal-location').value = '';
            document.getElementById('modal-heating').value = '';
            document.getElementById('modal-furnished').value = '';
            document.getElementById('modal-bathrooms').value = '';
            document.getElementById('modal-balcony').value = '';
            document.getElementById('modal-credit').value = '';
            renderImageSlots(['']);
        }
    };

    window.editPortfolio = (id) => {
        const item = portfolios.find(p => p.id === id);
        if (item) openModal(item.type, id);
    };

    window.renderImageSlots = (images) => {
        const container = document.getElementById('dynamic-image-container');
        if (!container) return;
        container.innerHTML = '';
        images.forEach((img, idx) => {
            addImageSlot(img);
        });
    };

    window.addImageSlot = (url = '') => {
        const lang = localStorage.getItem('preferredLanguage') || 'tr';
        const t = (window.translations && window.translations[lang]) || {};
        
        const container = document.getElementById('dynamic-image-container');
        const index = container.children.length + 1;
        
        const wrapper = document.createElement('div');
        wrapper.className = `image-upload-wrapper dynamic-slot ${index === 1 ? 'kapak-slot' : ''}`;
        wrapper.id = `slot-container-${index}`;
        
        // Use translated labels
        const label = index === 1 ? (t['admin_main_img'] || 'Ana Vitrin Fotoğrafı') : (t['admin_extra_img'] || 'Ek Fotoğraf') + ` ${index - 1}`;
        const placeholder = t['admin_url'] || 'Fotoğraf URL veya Yüklenen Dosya';
        const dropHint = t['admin_drop_hint'] || 'Tıklayın veya sürükleyin';
        const required = index === 1 ? 'required' : '';
        const deleteBtn = index === 1 ? '' : `<button type="button" class="slot-delete-btn" title="Sil" onclick="removeImageSlot(${index})"><i class="fas fa-times"></i></button>`;

        wrapper.innerHTML = `
            <div class="slot-number">${index}</div>
            ${deleteBtn}
            <div class="drop-zone" onclick="document.getElementById('file-input-${index}').click()" id="drop-zone-${index}">
                <i class="fas fa-image" style="font-size: 1.5rem; margin-bottom: 5px;"></i> 
                <span>${label}</span>
                <p style="font-size: 0.7rem; margin-top:5px; opacity:0.7;">${dropHint}</p>
            </div>
            <input type="text" id="modal-img-${index}" placeholder="${placeholder}" ${required} value="${url}" style="width: 100%;">
            <input type="file" id="file-input-${index}" accept="image/*" style="display: none;" onchange="handleFileUpload(event, ${index})">
        `;
        
        container.appendChild(wrapper);
        setupSingleDragAndDrop(index);
    };

    window.removeImageSlot = (index) => {
        const slot = document.getElementById(`slot-container-${index}`);
        if (slot) slot.remove();
        reindexSlots();
    };

    const reindexSlots = () => {
        const container = document.getElementById('dynamic-image-container');
        const slots = container.querySelectorAll('.image-upload-wrapper');
        container.innerHTML = '';
        slots.forEach((slot, i) => {
            const url = slot.querySelector('input[type="text"]').value;
            addImageSlot(url);
        });
    };

    const setupSingleDragAndDrop = (index) => {
        const dropZone = document.getElementById(`drop-zone-${index}`);
        if(dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });
            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
            });
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    handleFileUpload(e, index);
                }
            });
        }
    };

    window.closeModal = () => {
        document.getElementById('portfolioModal').style.display = 'none';
    };

    window.savePortfolio = () => {
        const id = document.getElementById('modal-id').value;
        const type = document.getElementById('modal-type').value;
        const title = document.getElementById('modal-title').value;
        const price = document.getElementById('modal-price').value;
        const beds = document.getElementById('modal-beds').value;
        const area = document.getElementById('modal-area').value;
        const badge = document.getElementById('modal-badge').value;
        const link = document.getElementById('modal-link').value;
        const description = document.getElementById('modal-desc').value.trim();
        const age = document.getElementById('modal-age').value;
        const floor = document.getElementById('modal-floor').value;
        const location = document.getElementById('modal-location').value;
        const heating = document.getElementById('modal-heating').value;
        const furnished = document.getElementById('modal-furnished').value;
        const bathrooms = document.getElementById('modal-bathrooms').value;
        const balcony = document.getElementById('modal-balcony').value;
        const credit = document.getElementById('modal-credit').value;
        
        let imagesArr = [];
        const container = document.getElementById('dynamic-image-container');
        const imgInputs = container.querySelectorAll('input[type="text"]');
        imgInputs.forEach(input => {
            const val = input.value.trim();
            if(val) imagesArr.push(val);
        });
        if (imagesArr.length === 0) imagesArr.push('images/logo.png'); // fallback

        if (id) {
            // Edit existing
            const index = portfolios.findIndex(p => p.id == id);
            if (index !== -1) {
                portfolios[index] = { ...portfolios[index], type, title, price, beds, area, badge, link, description, age, floor, location, heating, furnished, bathrooms, balcony, credit, images: imagesArr };
            }
        } else {
            // Add new
            const newId = portfolios.length > 0 ? Math.max(...portfolios.map(p => p.id)) + 1 : 1;
            portfolios.push({ id: newId, type, title, price, beds, area, badge, link, description, age, floor, location, heating, furnished, bathrooms, balcony, credit, images: imagesArr });
        }

        localStorage.setItem('portfolios', JSON.stringify(portfolios));
        closeModal();
        renderPortfolios();
    };

    window.deletePortfolio = (id) => {
        if (confirm('Bu portföyü silmek istediğinize emin misiniz?')) {
            portfolios = portfolios.filter(p => p.id != id);
            localStorage.setItem('portfolios', JSON.stringify(portfolios));
            renderPortfolios();
        }
    };

    window.openPasswordModal = () => {
        document.getElementById('passwordModal').style.display = 'flex';
        document.getElementById('old-password').value = '';
        document.getElementById('new-password').value = '';
    };

    window.closePasswordModal = () => {
        document.getElementById('passwordModal').style.display = 'none';
    };

    window.changePassword = () => {
        const oldP = document.getElementById('old-password').value;
        const newP = document.getElementById('new-password').value;
        if (oldP === adminCreds.pass) {
            adminCreds.pass = newP;
            localStorage.setItem('adminCredentials', JSON.stringify(adminCreds));
            alert('Şifre başarıyla güncellendi.');
            closePasswordModal();
        } else {
            alert('Eski şifre hatalı!');
        }
    };

    let currentGalleryImages = [];
    let currentGalleryIndex = 0;

    window.openGallery = (id) => {
        // Prevent clicking if admin tools were clicked. Admin buttons have stopPropagation, but just in case.
        if(event && event.target.closest('.admin-btn')) return;

        const item = portfolios.find(p => p.id === id);
        if(!item || !item.images || item.images.length === 0) return;
        currentGalleryImages = item.images;
        currentGalleryIndex = 0;
        
        document.getElementById('galleryModal').style.display = 'flex';
        updateGalleryUI();
    };

    window.closeGallery = () => {
        document.getElementById('galleryModal').style.display = 'none';
    };

    window.changeGalleryImage = (dir) => {
        currentGalleryIndex += dir;
        if (currentGalleryIndex < 0) currentGalleryIndex = currentGalleryImages.length - 1;
        if (currentGalleryIndex >= currentGalleryImages.length) currentGalleryIndex = 0;
        updateGalleryUI();
    };

    window.setGalleryImage = (index) => {
        currentGalleryIndex = index;
        updateGalleryUI();
    };

    const updateGalleryUI = () => {
        const mainImg = document.getElementById('gallery-main-img');
        const thumbnailsContainer = document.getElementById('gallery-thumbnails');
        
        if (currentGalleryImages.length > 0) {
            mainImg.src = currentGalleryImages[currentGalleryIndex];
            
            thumbnailsContainer.innerHTML = currentGalleryImages.map((src, index) => `
                <img src="${src}" class="gallery-thumb ${index === currentGalleryIndex ? 'active' : ''}" onclick="setGalleryImage(${index})">
            `).join('');
            
            // Hide nav arrows if only 1 image
            if(currentGalleryImages.length === 1) {
                document.querySelectorAll('.gallery-nav').forEach(el => el.style.display = 'none');
            } else {
                document.querySelectorAll('.gallery-nav').forEach(el => el.style.display = 'flex');
            }
        }
    };

    // ── Before/After Comparison Slider ──────────────────────────────────────
    const initKDComparisonSlider = () => {
        const slider = document.getElementById('kdComparisonSlider');
        if (!slider) return;

        const before = document.getElementById('kdCsBefore');
        const handle = document.getElementById('kdCsHandle');
        let isDragging = false;

        const setPosition = (x) => {
            const rect = slider.getBoundingClientRect();
            let pct = (x - rect.left) / rect.width;
            pct = Math.max(0.02, Math.min(0.98, pct)); // clamp between 2%-98%
            const pctRight = (1 - pct) * 100;
            before.style.clipPath = `inset(0 ${pctRight.toFixed(2)}% 0 0)`;
            handle.style.left = `${(pct * 100).toFixed(2)}%`;
        };

        // Mouse events
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            setPosition(e.clientX);
        });
        window.addEventListener('mouseup', () => { isDragging = false; });

        // Touch events
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        }, { passive: false });
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            setPosition(e.touches[0].clientX);
        }, { passive: true });
        window.addEventListener('touchend', () => { isDragging = false; });
    };

    // Run after DOM ready
    initKDComparisonSlider();

    window.openRichKDModal = () => {
        const modal = document.getElementById('kdDetailModal');
        const container = document.querySelector('.kd-steps-container');
        
        const steps = [
            {
                num: '01',
                title: 'Ücretsiz Ön İnceleme & Analiz',
                desc: 'Binanızı uzman ekibimizle yerinde inceliyor, kentsel dönüşüm potansiyelini ve mevcut risk durumunu ücretsiz olarak raporluyoruz.',
                img: 'images/kd-comparison.png'
            },
            {
                num: '02',
                title: 'Resmi Riskli Yapı Tespiti',
                desc: 'Bakanlık lisanslı kuruluşlar aracılığıyla binanızın deprem risk raporunu hazırlatıyor, resmi süreci yasal güvenceyle başlatıyoruz.',
                img: 'images/kd-consulting.png'
            },
            {
                num: '03',
                title: 'Hızlı Raporlama & Hak Analizi',
                desc: 'Süreci 48 saat içinde raporlayarak kira yardımı, taşınma desteği ve kredi imkanları hakkında sizi detaylıca bilgilendiriyoruz.',
                img: 'images/kd-main.png'
            },
            {
                num: '04',
                title: '2/3 Çoğunluk & Uzlaşı Yönetimi',
                desc: 'Kat malikleri arasındaki uzlaşma sürecini profesyonelce yönetiyor, 2/3 çoğunluk kararının yasal mevzuata uygun alınmasını sağlıyoruz.',
                img: 'images/kd-consulting.png'
            },
            {
                num: '05',
                title: 'Müteahhit Seçimi & İnşaat Süreci',
                desc: 'Antalya\'nın en güvenilir inşaat firmalarıyla sizi buluşturuyor, kat karşılığı sözleşmenizi en yüksek avantajla imza altına alıyoruz.',
                img: 'images/kd-progress.png'
            },
            {
                num: '06',
                title: 'Anahtar Teslim & Yeni Yaşam',
                desc: 'İnşaat sürecini adım adım denetliyor, mülkünüzü modern, depreme dayanıklı ve yüksek yatırım değerli haliyle teslim ediyoruz.',
                img: 'images/kd-main.png'
            }
        ];

        container.innerHTML = steps.map(step => `
            <div class="kd-step">
                <div class="kd-step-img">
                    <img src="${step.img}" alt="${step.title}">
                </div>
                <div class="kd-step-text">
                    <div class="kd-step-num">${step.num}</div>
                    <h3>${step.title}</h3>
                    <p>${step.desc}</p>
                </div>
            </div>
        `).join('');

        modal.style.display = 'flex';
        container.scrollLeft = 0; // Reset slider position
    };

    window.moveKdSlider = (dir) => {
        const container = document.querySelector('.kd-steps-container');
        const stepWidth = container.offsetWidth;
        container.scrollBy({ left: dir * stepWidth, behavior: 'smooth' });
    };

    window.closeKDModal = () => {
        document.getElementById('kdDetailModal').style.display = 'none';
    };

    window.handleFileUpload = (event, index) => {
        const file = event.target.files ? event.target.files[0] : (event.dataTransfer && event.dataTransfer.files[0]);
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            alert('Lütfen geçerli bir görsel dosyası seçin.');
            return;
        }
        
        const dropZone = document.getElementById(`drop-zone-${index}`);
        dropZone.innerHTML = `<i class="fas fa-spinner fa-spin"></i> İşleniyor...`;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Force exactly 400x300 optimization (half size)
                const TARGET_WIDTH = 400;
                const TARGET_HEIGHT = 300;
                
                canvas.width = TARGET_WIDTH;
                canvas.height = TARGET_HEIGHT;
                
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // Calculate ratios to maintain aspect ratio while filling the 800x600 area (Cover logic)
                const imgRatio = img.width / img.height;
                const targetRatio = TARGET_WIDTH / TARGET_HEIGHT;
                
                let sourceX, sourceY, sourceWidth, sourceHeight;
                
                if (imgRatio > targetRatio) {
                    // Source is wider than target
                    sourceHeight = img.height;
                    sourceWidth = img.height * targetRatio;
                    sourceX = (img.width - sourceWidth) / 2;
                    sourceY = 0;
                } else {
                    // Source is taller than target
                    sourceWidth = img.width;
                    sourceHeight = img.width / targetRatio;
                    sourceX = 0;
                    sourceY = (img.height - sourceHeight) / 2;
                }

                ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.85); // High quality optimization
                document.getElementById(`modal-img-${index}`).value = dataUrl;
                
                dropZone.innerHTML = `<i class="fas fa-check-circle" style="color: #2ecc71;"></i> Optimize Edildi`;
                
                setTimeout(() => {
                    const label = index === 1 ? 'Ana Vitrin Fotoğrafı' : `Ek Fotoğraf ${index - 1}`;
                    dropZone.innerHTML = `<i class="fas fa-image"></i> ${label}<p style="font-size: 0.7rem; margin-top:5px; opacity:0.7;">Tıklayın veya sürükleyin</p>`;
                }, 2000);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    // Dynamic slots handle their own drag and drop setup

    // Dynamic YouTube Feed Fetcher
    window.currentYtVideoId = '';

    window.loadLatestYouTubeVideo = () => {
        const channelId = 'UC8V2RZ2m-tKTsXC26ENGVWg';
        const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    // Sadece Shorts olmayan standart videoları filtrele
                    const standardVideos = data.items.filter(item => !item.link.includes('shorts/'));
                    if (standardVideos.length > 0) {
                        const latestVideo = standardVideos[0];
                        
                        if (latestVideo.link.includes('v=')) {
                            currentYtVideoId = latestVideo.link.split('v=')[1].split('&')[0];
                        }
                        
                        const ytThumbnail = document.getElementById('yt-thumbnail');
                        const ytWrapper = document.getElementById('yt-thumbnail-wrapper');
                        
                        if (ytThumbnail && currentYtVideoId) {
                            ytThumbnail.src = latestVideo.thumbnail;
                            ytThumbnail.style.display = 'block';
                            
                            if (ytWrapper) {
                                ytWrapper.onclick = () => {
                                    window.open(`https://www.youtube.com/watch?v=${currentYtVideoId}`, '_blank');
                                };
                            }
                        }
                    }
                }
            })
            .catch(err => console.error('Error fetching YouTube feed:', err));
    };

    window.openVideoModal = (source) => {
        const modal = document.getElementById('videoLightboxModal');
        const container = document.getElementById('videoLightboxContainer');
        const lang = localStorage.getItem('preferredLanguage') || 'tr';
        const t = (window.translations && window.translations[lang]) || {};
        
        if (source === 'youtube' && currentYtVideoId) {
            container.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${currentYtVideoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position: absolute; top:0; left:0;"></iframe>`;
            if(modal) modal.style.display = 'flex';
        } else if (source === 'instagram') {
            const msg = t['insta_placeholder_text'] || 'Instagram akışını göstermek için widget servisi gereklidir.';
            alert(msg);
        }
    };

    window.closeVideoModal = () => {
        const modal = document.getElementById('videoLightboxModal');
        const container = document.getElementById('videoLightboxContainer');
        if(modal) modal.style.display = 'none';
        if(container) container.innerHTML = ''; // Durdurmak için iframe silinir
    };

    loadLatestYouTubeVideo();

    updateAuthUI();
    renderPortfolios();

    // Mobile Portfolio Logic
    window.togglePortfolioDropdown = () => {
        const drop = document.getElementById('portfolio-dropdown');
        if(drop) {
            drop.style.display = drop.style.display === 'flex' ? 'none' : 'flex';
        }
    };

    window.showPortfolioSection = (type) => {
        document.getElementById('sale').classList.remove('mobile-active');
        document.getElementById('rent').classList.remove('mobile-active');
        document.getElementById('arsa').classList.remove('mobile-active');
        
        const section = document.getElementById(type);
        if(section) {
            section.classList.add('mobile-active');
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    // Mobile About Toggle Logic
    window.toggleAbout = () => {
        const moreBlock = document.getElementById('about-more');
        const btn = document.getElementById('readMoreBtn');
        if(moreBlock && btn) {
            if(moreBlock.style.display === 'none' || moreBlock.classList.contains('about-more-hidden')) {
                moreBlock.style.display = 'block';
                moreBlock.classList.remove('about-more-hidden');
                btn.style.display = 'none';
            }
        }
    };

    // WhatsApp Widget Logic
    window.toggleWaChat = () => {
        const box = document.getElementById('wa-chat-box');
        if(box) {
            box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
            if(box.style.display === 'flex') {
                document.getElementById('wa-input').focus();
            }
        }
    };

    window.sendWaMsg = () => {
        const input = document.getElementById('wa-input');
        if(input) {
            const msg = input.value.trim();
            if(msg) {
                window.open(`https://wa.me/905435225881?text=${encodeURIComponent(msg)}`, '_blank');
                input.value = '';
                toggleWaChat();
            }
        }
    };

    // If editId was present and user IS admin, open the modal
    if (editId && isAdmin) {
        window.editPortfolio(parseInt(editId));
        // Clear param from URL without reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }

    // KVKK Modal Logic
    window.openKvkkModal = () => {
        const modal = document.getElementById('kvkkModal');
        if(modal) modal.style.display = 'flex';
    };

    window.closeKvkkModal = () => {
        const modal = document.getElementById('kvkkModal');
        if(modal) modal.style.display = 'none';
    };

    // Contact Form Validation
    const contactPhone = document.getElementById('phone');
    const contactKvkk = document.getElementById('kvkk');
    const contactSubmit = document.getElementById('submitBtn');

    if (contactPhone && contactKvkk && contactSubmit) {
        const validateForm = () => {
            const isPhoneValid = contactPhone.value.trim().length >= 10;
            const isKvkkChecked = contactKvkk.checked;
            contactSubmit.disabled = !(isPhoneValid && isKvkkChecked);
        };

        contactPhone.addEventListener('input', validateForm);
        contactKvkk.addEventListener('change', validateForm);
    }

});
