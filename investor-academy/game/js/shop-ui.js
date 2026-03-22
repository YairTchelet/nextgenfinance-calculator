/* === shop-ui.js ===
 * Shop UI Component
 */


/* === shop-ui.js === */
/**
 * Buffett Game - Shop UI Component
 * ממשק משתמש לחנות הקוסמטיקה
 */

window.BuffettShopUI = window.BuffettShopUI || {};

// ==============================
// SHOP UI STYLES
// ==============================
BuffettShopUI.injectStyles = function() {
    if (document.getElementById('buffett-shop-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'buffett-shop-styles';
    style.textContent = `
        /* Shop Overlay */
        .shop-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.92);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .shop-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Shop Container */
        .shop-container {
            width: 95%;
            max-width: 900px;
            max-height: 90vh;
            background: linear-gradient(145deg, #1a1a2e, #16213e);
            border-radius: 20px;
            border: 2px solid rgba(214, 158, 46, 0.3);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
            transform: scale(0.9) translateY(20px);
            transition: transform 0.3s ease;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        .shop-overlay.active .shop-container {
            transform: scale(1) translateY(0);
        }
        
        /* Shop Header */
        .shop-header {
            background: linear-gradient(135deg, var(--accent-start, #d69e2e), var(--accent-end, #ecc94b));
            padding: 20px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        }
        
        .shop-title {
            font-size: 1.8em;
            font-weight: 700;
            color: #1a1a2e;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .shop-title-icon {
            font-size: 1.2em;
        }
        
        .shop-balance {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(0, 0, 0, 0.2);
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 1.2em;
            font-weight: 600;
            color: #1a1a2e;
        }
        
        .shop-balance-icon {
            font-size: 1.3em;
        }
        
        .shop-close {
            background: rgba(0, 0, 0, 0.2);
            border: none;
            color: #1a1a2e;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5em;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .shop-close:hover {
            background: rgba(0, 0, 0, 0.3);
            transform: rotate(90deg);
        }
        
        /* Shop Navigation */
        .shop-nav {
            display: flex;
            background: rgba(0, 0, 0, 0.3);
            padding: 10px;
            gap: 8px;
            overflow-x: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--accent-start, #d69e2e) transparent;
        }
        
        .shop-nav::-webkit-scrollbar {
            height: 6px;
        }
        
        .shop-nav::-webkit-scrollbar-thumb {
            background: var(--accent-start, #d69e2e);
            border-radius: 3px;
        }
        
        .shop-nav-btn {
            flex-shrink: 0;
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            color: #a0aec0;
            font-size: 0.95em;
            font-weight: 500;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: inherit;
        }
        
        .shop-nav-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }
        
        .shop-nav-btn.active {
            background: linear-gradient(135deg, var(--accent-start, #d69e2e), var(--accent-end, #ecc94b));
            color: #1a1a2e;
            border-color: transparent;
            font-weight: 600;
        }
        
        .shop-nav-icon {
            font-size: 1.2em;
        }
        
        /* Shop Content */
        .shop-content {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            scrollbar-width: thin;
            scrollbar-color: var(--accent-start, #d69e2e) transparent;
        }
        
        .shop-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .shop-content::-webkit-scrollbar-thumb {
            background: var(--accent-start, #d69e2e);
            border-radius: 4px;
        }
        
        /* Category Description */
        .shop-category-desc {
            text-align: center;
            color: #a0aec0;
            margin-bottom: 20px;
            font-size: 1em;
        }
        
        /* Items Grid */
        .shop-items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
        }
        
        /* Item Card */
        .shop-item {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 18px;
            transition: transform 0.3s ease;
            position: relative;
            overflow: hidden;
            contain: layout style;
        }
        
        .shop-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .shop-item.owned {
            border-color: rgba(72, 187, 120, 0.5);
        }
        
        .shop-item.equipped {
            border-color: #d69e2e;
            box-shadow: 0 0 20px rgba(214, 158, 46, 0.3);
        }
        
        /* Rarity Glow */
        .shop-item[data-rarity="rare"] {
            border-color: rgba(49, 130, 206, 0.5);
        }
        
        .shop-item[data-rarity="epic"] {
            border-color: rgba(128, 90, 213, 0.5);
        }
        
        .shop-item[data-rarity="legendary"] {
            border-color: rgba(214, 158, 46, 0.5);
        }
        
        .shop-item[data-rarity="legendary"]:hover {
            box-shadow: 0 0 25px rgba(214, 158, 46, 0.6);
        }
        
        /* Item Header */
        .shop-item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        
        .shop-item-preview {
            font-size: 2.5em;
            line-height: 1;
        }
        
        .shop-item-rarity {
            font-size: 0.75em;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .shop-item-rarity.common {
            background: linear-gradient(135deg, #718096, #a0aec0);
            color: #fff;
        }
        
        .shop-item-rarity.rare {
            background: linear-gradient(135deg, #2b6cb0, #4299e1);
            color: #fff;
        }
        
        .shop-item-rarity.epic {
            background: linear-gradient(135deg, #6b46c1, #9f7aea);
            color: #fff;
        }
        
        .shop-item-rarity.legendary {
            background: linear-gradient(135deg, #b7791f, #ecc94b);
            color: #1a1a2e;
        }
        
        /* Item Info */
        .shop-item-name {
            font-size: 1.15em;
            font-weight: 600;
            color: #fff;
            margin-bottom: 6px;
        }
        
        .shop-item-desc {
            font-size: 0.85em;
            color: #a0aec0;
            margin-bottom: 15px;
            line-height: 1.4;
        }

        /* Theme Color Swatches */
        .theme-swatch-bar {
            display: flex;
            gap: 6px;
            justify-content: center;
            margin-bottom: 10px;
        }
        .theme-swatch {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.2);
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        /* Item Footer */
        .shop-item-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .shop-item-price {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 1.1em;
            font-weight: 600;
            color: var(--accent-end, #ecc94b);
        }
        
        .shop-item-price.free {
            color: #48bb78;
        }
        
        .shop-item-price.cant-afford {
            color: #fc8181;
        }
        
        /* Item Buttons */
        .shop-item-btn {
            padding: 8px 18px;
            border-radius: 8px;
            font-size: 0.9em;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
            border: none;
            font-family: inherit;
        }
        
        .shop-item-btn.buy {
            background: linear-gradient(135deg, var(--accent-start, #d69e2e), var(--accent-end, #ecc94b));
            color: #1a1a2e;
        }
        
        .shop-item-btn.buy:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(214, 158, 46, 0.4);
        }
        
        .shop-item-btn.buy:disabled {
            background: #4a5568;
            color: #718096;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .shop-item-btn.equip {
            background: linear-gradient(135deg, #2b6cb0, #4299e1);
            color: #fff;
        }
        
        .shop-item-btn.equip:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(66, 153, 225, 0.4);
        }
        
        .shop-item-btn.equipped {
            background: linear-gradient(135deg, #276749, #48bb78);
            color: #fff;
            cursor: default;
        }
        
        /* Owned Badge */
        .shop-item-owned-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: linear-gradient(135deg, #276749, #48bb78);
            color: #fff;
            font-size: 0.7em;
            padding: 4px 8px;
            border-radius: 5px;
            font-weight: 600;
        }
        
        /* Purchase Animation */
        .shop-item.purchasing {
            animation: purchase-pulse 0.5s ease;
        }
        
        @keyframes purchase-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); }
        }
        
        /* Stats Section */
        .shop-stats {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px 25px;
            display: flex;
            justify-content: space-around;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .shop-stat {
            text-align: center;
        }
        
        .shop-stat-value {
            font-size: 1.3em;
            font-weight: 700;
            color: #ecc94b;
        }
        
        .shop-stat-label {
            font-size: 0.8em;
            color: #718096;
            margin-top: 2px;
        }
        
        /* Mobile Responsive */
        @media (max-width: 600px) {
            .shop-container {
                width: 100%;
                height: 100%;
                max-height: 100%;
                border-radius: 0;
            }
            
            .shop-header {
                padding: 15px;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .shop-title {
                font-size: 1.4em;
            }
            
            .shop-balance {
                font-size: 1em;
                padding: 8px 15px;
            }
            
            .shop-nav {
                padding: 8px;
            }
            
            .shop-nav-btn {
                padding: 10px 15px;
                font-size: 0.85em;
            }
            
            .shop-items-grid {
                grid-template-columns: 1fr;
            }
            
            .shop-stats {
                flex-wrap: wrap;
                gap: 15px;
            }
        }
    `;
    document.head.appendChild(style);
};

// ==============================
// CREATE SHOP HTML
// ==============================
BuffettShopUI.createShopHTML = function() {
    if (document.getElementById('buffett-shop-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'buffett-shop-overlay';
    overlay.className = 'shop-overlay';
    
    overlay.innerHTML = `
        <div class="shop-container">
            <div class="shop-header">
                <div class="shop-title">
                    <span class="shop-title-icon">🏪</span>
                    <span>חנות הקוסמטיקה</span>
                </div>
                <div class="shop-balance">
                    <span class="shop-balance-icon">💰</span>
                    <span id="shop-balance-value">0</span>
                </div>
                <button class="shop-close" id="shop-close-btn">&times;</button>
            </div>
            
            <div class="shop-nav" id="shop-nav"></div>
            
            <div class="shop-content" id="shop-content"></div>
            
            <div class="shop-stats">
                <div class="shop-stat">
                    <div class="shop-stat-value" id="shop-stat-spent">0</div>
                    <div class="shop-stat-label">נקודות שהוצאו</div>
                </div>
                <div class="shop-stat">
                    <div class="shop-stat-value" id="shop-stat-items">0</div>
                    <div class="shop-stat-label">פריטים ברשותך</div>
                </div>
                <div class="shop-stat">
                    <div class="shop-stat-value" id="shop-stat-legendary">0</div>
                    <div class="shop-stat-label">אגדיים</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Event listeners
    document.getElementById('shop-close-btn').addEventListener('click', () => this.close());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
    });
};

// ==============================
// RENDER NAVIGATION
// ==============================
BuffettShopUI.renderNav = function() {
    const nav = document.getElementById('shop-nav');
    if (!nav) return;
    
    nav.innerHTML = '';
    
    Object.values(BuffettShop.categories).forEach((cat, index) => {
        const btn = document.createElement('button');
        btn.className = `shop-nav-btn ${index === 0 ? 'active' : ''}`;
        btn.dataset.category = cat.id;
        btn.innerHTML = `
            <span class="shop-nav-icon">${cat.icon}</span>
            <span>${cat.name}</span>
        `;
        btn.addEventListener('click', () => this.selectCategory(cat.id));
        nav.appendChild(btn);
    });
};

// ==============================
// SELECT CATEGORY
// ==============================
BuffettShopUI.selectCategory = function(categoryId) {
    // Update nav buttons
    document.querySelectorAll('.shop-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categoryId);
    });
    
    this.currentCategory = categoryId;
    this.renderItems(categoryId);
};

// ==============================
// RENDER ITEMS
// ==============================
BuffettShopUI.renderItems = function(categoryId) {
    const content = document.getElementById('shop-content');
    if (!content) return;
    
    const category = BuffettShop.categories[categoryId];
    const items = BuffettShop.items[categoryId];
    
    if (!items) {
        content.innerHTML = '<div style="text-align:center;color:#718096;padding:40px;">אין פריטים בקטגוריה זו</div>';
        return;
    }
    
    const owned = BuffettShop.getOwned();
    const equipped = BuffettShop.getEquipped();
    const currentPoints = BuffettShop.logic.getPoints();
    const isDecoCategory = categoryId === 'officeDecorations';
    const equipKey = categoryId === 'cardFrames' ? 'cardFrame' : categoryId.slice(0, -1);
    
    let html = `
        <div class="shop-category-desc">${category.description}</div>
        <div class="shop-items-grid">
    `;
    
    // Sort items: equipped first, then owned, then by price
    const sortedItems = [...items].sort((a, b) => {
        const aEquipped = isDecoCategory ? (owned[categoryId]?.includes(a.id)) : (equipped[equipKey] === a.id);
        const bEquipped = isDecoCategory ? (owned[categoryId]?.includes(b.id)) : (equipped[equipKey] === b.id);
        const aOwned = owned[categoryId]?.includes(a.id);
        const bOwned = owned[categoryId]?.includes(b.id);
        
        if (aEquipped && !bEquipped) return -1;
        if (!aEquipped && bEquipped) return 1;
        if (aOwned && !bOwned) return -1;
        if (!aOwned && bOwned) return 1;
        return a.price - b.price;
    });
    
    sortedItems.forEach(item => {
        const isOwned = owned[categoryId]?.includes(item.id);
        const isEquipped = isDecoCategory ? isOwned : (equipped[equipKey] === item.id);
        const canAfford = currentPoints >= item.price;
        const rarity = BuffettShop.rarities[item.rarity];
        
        let buttonHtml = '';
        let priceClass = item.price === 0 ? 'free' : (canAfford ? '' : 'cant-afford');
        
        if (isDecoCategory) {
            // Office decorations: no equip, just buy or "displayed in office"
            if (isOwned) {
                buttonHtml = `<button class="shop-item-btn equipped">במשרד ✓</button>`;
            } else {
                buttonHtml = `<button class="shop-item-btn buy" data-action="buy" data-category="${categoryId}" data-id="${item.id}" ${!canAfford ? 'disabled' : ''}>קנה</button>`;
            }
        } else if (isEquipped) {
            buttonHtml = `<button class="shop-item-btn equipped">מצויד ✓</button>`;
        } else if (isOwned) {
            buttonHtml = `<button class="shop-item-btn equip" data-action="equip" data-category="${categoryId}" data-id="${item.id}">צייד</button>`;
        } else {
            buttonHtml = `<button class="shop-item-btn buy" data-action="buy" data-category="${categoryId}" data-id="${item.id}" ${!canAfford ? 'disabled' : ''}>קנה</button>`;
        }
        
        // Build theme swatch preview if this is a theme item
        let themeSwatchHtml = '';
        if (categoryId === 'themes' && item.css) {
            const bg = item.css['--bg-primary'] || '#f7fafc';
            const accent1 = item.css['--accent-start'] || '#38b2ac';
            const accent2 = item.css['--accent-end'] || '#3182ce';
            const txt = item.css['--text-primary'] || '#2d3748';
            themeSwatchHtml = `
                <div class="theme-swatch-bar">
                    <span class="theme-swatch" style="background:${bg}" title="רקע"></span>
                    <span class="theme-swatch" style="background:${accent1}" title="צבע ראשי"></span>
                    <span class="theme-swatch" style="background:${accent2}" title="צבע משני"></span>
                    <span class="theme-swatch" style="background:${txt}" title="טקסט"></span>
                </div>
            `;
        }

        html += `
            <div class="shop-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}" data-rarity="${item.rarity}" data-id="${item.id}">
                ${isOwned && !item.isDefault ? '<div class="shop-item-owned-badge">ברשותך</div>' : ''}
                <div class="shop-item-header">
                    <div class="shop-item-preview">${item.preview}</div>
                    <div class="shop-item-rarity ${item.rarity}">${rarity.name}</div>
                </div>
                <div class="shop-item-name">${item.name}</div>
                ${themeSwatchHtml}
                <div class="shop-item-desc">${item.description}</div>
                <div class="shop-item-footer">
                    <div class="shop-item-price ${priceClass}">
                        ${item.price === 0 ? 'חינם' : `💰 ${item.price.toLocaleString()}`}
                    </div>
                    ${buttonHtml}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
    
    // Add event listeners to buttons
    content.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const category = e.target.dataset.category;
            const id = e.target.dataset.id;
            
            if (action === 'buy') {
                this.handlePurchase(category, id);
            } else if (action === 'equip') {
                this.handleEquip(category, id);
            }
        });
    });
};

// ==============================
// HANDLE PURCHASE
// ==============================
BuffettShopUI.handlePurchase = function(category, itemId) {
    const result = BuffettShop.logic.purchaseItem(category, itemId);
    
    if (result.success) {
        // Animate the item card
        const itemEl = document.querySelector(`.shop-item[data-id="${itemId}"]`);
        if (itemEl) {
            itemEl.classList.add('purchasing');
            setTimeout(() => {
                if (itemEl) itemEl.classList.remove('purchasing');
            }, 500);
        }
        
        // Auto-equip on purchase (except decorations which are always equipped)
        if (category !== 'officeDecorations') {
            BuffettShop.logic.equipItem(category, itemId);
        }
        
        // Update shop UI after animation settles
        setTimeout(() => {
            this.updateBalance();
            this.updateStats();
            this.renderItems(category);
        }, 300);
        
        // Show notification
        this.showNotification(`רכשת וציידת: ${result.item.name}!`, 'success');
    } else {
        this.showNotification(result.error, 'error');
    }
};

// ==============================
// HANDLE EQUIP
// ==============================
BuffettShopUI.handleEquip = function(category, itemId) {
    const result = BuffettShop.logic.equipItem(category, itemId);
    
    if (result.success) {
        this.renderItems(category);
        
        const item = BuffettShop.getItem(category, itemId);
        this.showNotification(`ציידת: ${item.name}`, 'success');
    } else {
        this.showNotification(result.error, 'error');
    }
};

// ==============================
// UPDATE BALANCE
// ==============================
BuffettShopUI.updateBalance = function() {
    const balanceEl = document.getElementById('shop-balance-value');
    if (balanceEl) {
        balanceEl.textContent = BuffettShop.logic.getPoints().toLocaleString();
    }
};

// ==============================
// UPDATE STATS
// ==============================
BuffettShopUI.updateStats = function() {
    const stats = BuffettShop.logic.getStats();
    const owned = BuffettShop.getOwned();
    
    const totalOwned = Object.values(owned).reduce((sum, arr) => sum + arr.length, 0);
    
    const spentEl = document.getElementById('shop-stat-spent');
    const itemsEl = document.getElementById('shop-stat-items');
    const legendaryEl = document.getElementById('shop-stat-legendary');
    
    if (spentEl) spentEl.textContent = stats.totalSpent.toLocaleString();
    if (itemsEl) itemsEl.textContent = totalOwned;
    if (legendaryEl) legendaryEl.textContent = stats.legendaryOwned;
};

// ==============================
// SHOW NOTIFICATION
// ==============================
BuffettShopUI.showNotification = function(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.shop-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'shop-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10001;
        animation: notification-slide 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #276749, #48bb78); color: #fff;' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #c53030, #fc8181); color: #fff;' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #2b6cb0, #4299e1); color: #fff;' : ''}
    `;
    notification.textContent = message;
    
    // Add animation keyframes if not exists
    if (!document.getElementById('notification-animation')) {
        const style = document.createElement('style');
        style.id = 'notification-animation';
        style.textContent = `
            @keyframes notification-slide {
                from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
};

// ==============================
// OPEN SHOP
// ==============================
BuffettShopUI.open = function() {
    // Clean up any lingering effect particles
    const effectContainer = document.getElementById('buffett-effect-container');
    if (effectContainer) effectContainer.innerHTML = '';
    
    this.injectStyles();
    this.createShopHTML();
    this.renderNav();
    this.updateBalance();
    this.updateStats();
    this.selectCategory('themes');
    
    const overlay = document.getElementById('buffett-shop-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
};

// ==============================
// CLOSE SHOP
// ==============================
BuffettShopUI.close = function() {
    const overlay = document.getElementById('buffett-shop-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
    // Re-apply cosmetics immediately when closing shop 
    // This also triggers office/mascot refresh via the event
    try { BuffettShop.applyEquipped(true); } catch(e) {}
};

// ==============================
// TOGGLE SHOP
// ==============================
BuffettShopUI.toggle = function() {
    const overlay = document.getElementById('buffett-shop-overlay');
    if (overlay && overlay.classList.contains('active')) {
        this.close();
    } else {
        this.open();
    }
};

// ==============================
// INITIALIZATION
// ==============================
BuffettShopUI.init = function() {
    this.injectStyles();
    this.currentCategory = 'themes';
    console.log('BuffettShopUI initialized');
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BuffettShopUI.init());
} else {
    BuffettShopUI.init();
}

BuffettShopUI.loaded = true;
console.log('BuffettShopUI loaded');

