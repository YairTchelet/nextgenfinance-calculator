/* === shop-system.js ===
 * Shop storage, purchase logic, apply cosmetics, visual effects
 */

BuffettShop.storage = {
    getData: function() {
        try {
            const data = localStorage.getItem(BuffettShop.config.storageKey);
            if (!data) return this.getDefaultData();
            const parsed = JSON.parse(data);
            // Validate structure
            if (!parsed.owned || !parsed.equipped) {
                return this.getDefaultData();
            }
            // Migrate: add new categories if missing
            if (!parsed.owned.mascots) {
                parsed.owned.mascots = ['mascot-none'];
            }
            if (!parsed.owned.officeDecorations) {
                parsed.owned.officeDecorations = [];
            }
            if (!parsed.equipped.mascot) {
                parsed.equipped.mascot = 'mascot-none';
            }
            return parsed;
        } catch (e) {
            console.error('Error loading shop data:', e);
            return this.getDefaultData();
        }
    },

    saveData: function(data) {
        try {
            if (!data || typeof data !== 'object') return false;
            localStorage.setItem(BuffettShop.config.storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving shop data:', e);
            return false;
        }
    },

    getDefaultData: function() {
        return {
            lifetimePoints: 0,
            currentPoints: 0,
            owned: {
                themes: ['theme-default'],
                cardFrames: ['frame-default'],
                effects: ['effect-default'],
                titles: ['title-default'],
                avatars: ['avatar-default'],
                mascots: ['mascot-none'],
                officeDecorations: []
            },
            equipped: {
                theme: 'theme-default',
                cardFrame: 'frame-default',
                effect: 'effect-default',
                title: 'title-default',
                avatar: 'avatar-default',
                mascot: 'mascot-none'
            },
            stats: {
                totalSpent: 0,
                itemsPurchased: 0,
                legendaryOwned: 0
            }
        };
    }
};

// ==============================
// SHOP LOGIC
// ==============================
BuffettShop.logic = {
    canAfford: function(price) {
        try {
            const data = BuffettShop.storage.getData();
            return (data.currentPoints || 0) >= price;
        } catch (e) {
            return false;
        }
    },

    isOwned: function(category, itemId) {
        try {
            const data = BuffettShop.storage.getData();
            return data.owned[category] && data.owned[category].includes(itemId);
        } catch (e) {
            return false;
        }
    },

    isEquipped: function(category, itemId) {
        try {
            // Office decorations are always "equipped" once owned
            if (category === 'officeDecorations') {
                return this.isOwned(category, itemId);
            }
            const data = BuffettShop.storage.getData();
            const equipKey = category === 'cardFrames' ? 'cardFrame' : category.slice(0, -1);
            return data.equipped[equipKey] === itemId;
        } catch (e) {
            return false;
        }
    },

    purchaseItem: function(category, itemId) {
        try {
            const item = BuffettShop.getItem(category, itemId);
            if (!item) return { success: false, error: 'פריט לא נמצא' };
            
            if (this.isOwned(category, itemId)) {
                return { success: false, error: 'הפריט כבר ברשותך' };
            }

            if (!this.canAfford(item.price)) {
                return { success: false, error: 'אין מספיק נקודות' };
            }

            const data = BuffettShop.storage.getData();
            data.currentPoints -= item.price;
            
            if (!data.owned[category]) {
                data.owned[category] = [];
            }
            data.owned[category].push(itemId);
            
            data.stats.totalSpent += item.price;
            data.stats.itemsPurchased += 1;
            
            if (item.rarity === 'legendary') {
                data.stats.legendaryOwned += 1;
            }

            BuffettShop.storage.saveData(data);

            return { 
                success: true, 
                item: item,
                newBalance: data.currentPoints
            };
        } catch (e) {
            console.error('Purchase error:', e);
            return { success: false, error: 'שגיאה בקנייה' };
        }
    },

    equipItem: function(category, itemId) {
        try {
            if (!this.isOwned(category, itemId)) {
                return { success: false, error: 'הפריט לא ברשותך' };
            }

            // Office decorations are always equipped once owned - no action needed
            if (category === 'officeDecorations') {
                if (window.BuffettOffice) BuffettOffice.refresh();
                return { success: true };
            }

            const data = BuffettShop.storage.getData();
            const equipKey = category === 'cardFrames' ? 'cardFrame' : category.slice(0, -1);
            data.equipped[equipKey] = itemId;
            BuffettShop.storage.saveData(data);

            // Apply the item immediately
            BuffettShop.applyEquipped();

            return { success: true };
        } catch (e) {
            console.error('Equip error:', e);
            return { success: false, error: 'שגיאה בציוד' };
        }
    },

    addPoints: function(points) {
        try {
            const data = BuffettShop.storage.getData();
            data.currentPoints = (data.currentPoints || 0) + points;
            data.lifetimePoints = (data.lifetimePoints || 0) + points;
            BuffettShop.storage.saveData(data);
            return data.currentPoints;
        } catch (e) {
            console.error('Add points error:', e);
            return 0;
        }
    },

    getPoints: function() {
        try {
            return BuffettShop.storage.getData().currentPoints || 0;
        } catch (e) {
            return 0;
        }
    },

    getStats: function() {
        try {
            return BuffettShop.storage.getData().stats || { totalSpent: 0, itemsPurchased: 0, legendaryOwned: 0 };
        } catch (e) {
            return { totalSpent: 0, itemsPurchased: 0, legendaryOwned: 0 };
        }
    }
};

// ==============================
// UTILITY FUNCTIONS
// ==============================
BuffettShop.getItem = function(category, itemId) {
    const items = this.items[category];
    if (!items) return null;
    return items.find(item => item.id === itemId);
};

BuffettShop.getEquipped = function() {
    return BuffettShop.storage.getData().equipped;
};

BuffettShop.getOwned = function() {
    return BuffettShop.storage.getData().owned;
};

// ==============================
// APPLY COSMETICS
// ==============================
// Debounced apply — prevents GPU rendering storm on rapid purchases
BuffettShop._applyDebounceTimer = null;
BuffettShop._applyQueued = false;

BuffettShop.applyEquipped = function(immediate) {
    if (immediate) {
        this._doApplyEquipped();
        return;
    }
    // Debounce: wait 100ms for rapid calls to settle
    this._applyQueued = true;
    if (this._applyDebounceTimer) return; // already scheduled
    this._applyDebounceTimer = setTimeout(() => {
        this._applyDebounceTimer = null;
        if (this._applyQueued) {
            this._applyQueued = false;
            this._doApplyEquipped();
        }
    }, 100);
};

BuffettShop._doApplyEquipped = function() {
    try {
        const equipped = this.getEquipped();
        const root = document.documentElement;
        
        // === THEME ===
        // Batch all CSS changes in a single frame to prevent rendering storm
        const defaultTheme = this.getItem('themes', 'theme-default');
        const theme = this.getItem('themes', equipped.theme);
        
        // Collect all CSS changes first, then apply in one batch
        const cssChanges = {};
        
        // Reset to defaults
        if (defaultTheme && defaultTheme.css) {
            Object.entries(defaultTheme.css).forEach(([prop, value]) => {
                cssChanges[prop] = value;
            });
        }
        
        // Apply equipped theme on top
        if (theme && theme.css) {
            Object.entries(theme.css).forEach(([prop, value]) => {
                cssChanges[prop] = value;
            });
            if (theme.css['--bg-primary']) {
                cssChanges['--bg'] = theme.css['--bg-primary'];
            }
            if (theme.css['--text-primary']) {
                cssChanges['--text-primary'] = theme.css['--text-primary'];
            }
            if (theme.css['--text-secondary']) {
                cssChanges['--text-secondary'] = theme.css['--text-secondary'];
            }
            if (theme.css['--card-bg'] && !theme.css['--card-bg'].includes('gradient')) {
                cssChanges['--card-bg'] = theme.css['--card-bg'];
            }
            // Map theme surfaces for buttons, panels, modals
            if (theme.css['--bg-secondary']) {
                cssChanges['--surface-bg'] = theme.css['--bg-secondary'];
                // Compute a slightly lighter/darker variant for dim surfaces
                const hex = theme.css['--bg-secondary'].replace('#','');
                const r = parseInt(hex.substr(0,2),16), g = parseInt(hex.substr(2,2),16), b = parseInt(hex.substr(4,2),16);
                const isDark = (r + g + b) / 3 < 128;
                const adj = isDark ? 20 : -15;
                const clamp = v => Math.max(0, Math.min(255, v + adj));
                cssChanges['--surface-dim'] = `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`;
            }
        }
        
        // Apply all CSS changes in one go with transitions disabled
        document.body.classList.add('no-transitions');
        Object.entries(cssChanges).forEach(([prop, value]) => {
            root.style.setProperty(prop, value);
        });
        // Force style recalc before re-enabling transitions
        void document.body.offsetHeight;
        document.body.classList.remove('no-transitions');

        // === CARD FRAME ===
        const frameId = equipped.cardFrame;
        const frameClasses = ['frame-gold-trim','frame-neon','frame-stock-certificate','frame-holographic','frame-diamond','frame-fire'];
        const cardTargets = [
            document.getElementById('company-display'),
            document.getElementById('special-round-display')
        ].filter(Boolean);
        cardTargets.forEach(el => {
            frameClasses.forEach(fc => el.classList.remove(fc));
            if (frameId && frameId !== 'frame-default') el.classList.add(frameId);
        });

        // === AVATAR + TITLE ===
        const profileEl = document.getElementById('player-profile');
        const avatarEl = document.getElementById('player-avatar');
        const titleEl = document.getElementById('player-title');
        if (profileEl && avatarEl && titleEl) {
            const avatar = this.getItem('avatars', equipped.avatar);
            const title = this.getItem('titles', equipped.title);
            const hasCustom = (avatar && !avatar.isDefault) || (title && !title.isDefault);
            if (hasCustom) {
                avatarEl.textContent = avatar?.preview || '👤';
                titleEl.textContent = title?.name || '';
                profileEl.style.display = 'flex';
            } else {
                profileEl.style.display = 'none';
            }
        }

        // Dispatch event for other components to react
        window.dispatchEvent(new CustomEvent('buffettShopEquipmentChanged', { 
            detail: equipped 
        }));
    } catch (e) {
        console.error('Error applying cosmetics:', e);
    }
};

// ==============================
// EFFECT SYSTEM
// ==============================
BuffettShop.effects = {
    play: function(effectId) {
        const effect = BuffettShop.getItem('effects', effectId);
        if (!effect) return;

        switch(effect.effectType) {
            case 'flash':
                this.playFlash(effect.effectConfig);
                break;
            case 'confetti':
                this.playConfetti(effect.effectConfig);
                break;
            case 'coins':
                this.playCoins(effect.effectConfig);
                break;
            case 'fireworks':
                this.playFireworks(effect.effectConfig);
                break;
            case 'arrows':
                this.playArrows(effect.effectConfig);
                break;
            case 'moneyRain':
                this.playMoneyRain(effect.effectConfig);
                break;
            case 'champagne':
                this.playChampagne(effect.effectConfig);
                break;
            case 'aurora':
                this.playAurora(effect.effectConfig);
                break;
            case 'buffettApplause':
                this.playBuffettApplause(effect.effectConfig);
                break;
        }
    },

    _effectCooldown: false,
    
    playCurrentEffect: function() {
        // Debounce: prevent effects from stacking if triggered rapidly
        if (this._effectCooldown) return;
        this._effectCooldown = true;
        setTimeout(() => { this._effectCooldown = false; }, 2000);
        
        const equipped = BuffettShop.getEquipped();
        this.play(equipped.effect);
    },

    _cleanupTimer: null,

    createEffectContainer: function() {
        // Don't create effects while shop overlay is open
        const shopOverlay = document.getElementById('buffett-shop-overlay');
        if (shopOverlay && shopOverlay.classList.contains('active')) {
            return null;
        }
        
        let container = document.getElementById('buffett-effect-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'buffett-effect-container';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
                overflow: hidden;
            `;
            document.body.appendChild(container);
        }
        // Safety: clear old particles if too many DOM nodes
        if (container.children.length > 10) {
            container.innerHTML = '';
        }
        // Master cleanup: guarantee container empties after 4s no matter what
        clearTimeout(this._cleanupTimer);
        this._cleanupTimer = setTimeout(() => {
            if (container.parentNode && container.children.length > 0) {
                container.innerHTML = '';
            }
        }, 4000);
        return container;
    },

    // Safe particle removal: animationend is primary, setTimeout is fallback
    _safeRemove: function(el, fallbackMs) {
        let removed = false;
        const remove = () => { if (!removed && el.parentNode) { removed = true; el.remove(); } };
        el.addEventListener('animationend', remove, { once: true });
        setTimeout(remove, fallbackMs);
    },

    playFlash: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${config.color};
            opacity: 0;
            animation: flash-effect ${config.duration}ms ease-out;
            will-change: opacity;
        `;
        container.appendChild(flash);
        this._safeRemove(flash, config.duration + 100);
    },

    playConfetti: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const count = Math.min(config.particleCount || 8, 10);
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            const color = config.colors[Math.floor(Math.random() * config.colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 300;
            const size = 8 + Math.random() * 6;
            
            confetti.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                opacity: 0.9;
                animation: confetti-fall 1.5s ease-out ${delay}ms forwards;
                will-change: transform, opacity;
            `;
            container.appendChild(confetti);
            this._safeRemove(confetti, 2000);
        }
    },

    playCoins: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const count = Math.min(config.coinCount || 6, 8);
        
        for (let i = 0; i < count; i++) {
            const coin = document.createElement('div');
            const left = Math.random() * 100;
            const delay = Math.random() * 800;
            
            coin.textContent = '🪙';
            coin.style.cssText = `
                position: absolute;
                top: -30px;
                left: ${left}%;
                font-size: 24px;
                animation: coin-fall 1.5s ease-in ${delay}ms forwards;
                will-change: transform, opacity;
            `;
            container.appendChild(coin);
            this._safeRemove(coin, 2500);
        }
    },

    playFireworks: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const bursts = Math.min(config.bursts || 2, 3);
        for (let b = 0; b < bursts; b++) {
            setTimeout(() => {
                if (!container.parentNode) return; // container may have been cleaned
                const x = 20 + Math.random() * 60;
                const y = 20 + Math.random() * 40;
                
                for (let i = 0; i < 6; i++) {
                    const spark = document.createElement('div');
                    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
                    const angle = (i / 6) * 2 * Math.PI;
                    const tx = Math.cos(angle) * 80;
                    const ty = Math.sin(angle) * 80;
                    
                    spark.style.cssText = `
                        position: absolute;
                        top: ${y}%;
                        left: ${x}%;
                        width: 6px;
                        height: 6px;
                        background: ${color};
                        border-radius: 50%;
                        animation: firework-burst 0.8s ease-out forwards;
                        will-change: transform, opacity;
                        --tx: ${tx}px;
                        --ty: ${ty}px;
                    `;
                    container.appendChild(spark);
                    this._safeRemove(spark, 900);
                }
            }, b * 400);
        }
    },

    playArrows: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const count = Math.min(config.count || 8, 10);
        
        for (let i = 0; i < count; i++) {
            const arrow = document.createElement('div');
            const left = Math.random() * 100;
            const delay = Math.random() * 400;
            
            arrow.textContent = config.direction === 'up' ? '↑' : '↓';
            arrow.style.cssText = `
                position: absolute;
                bottom: -30px;
                left: ${left}%;
                font-size: 28px;
                font-weight: bold;
                color: ${config.color};
                text-shadow: 0 0 10px ${config.color};
                animation: arrow-rise 1.2s ease-out ${delay}ms forwards;
                will-change: transform, opacity;
            `;
            container.appendChild(arrow);
            this._safeRemove(arrow, 1800);
        }
    },

    playMoneyRain: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const count = Math.min(config.billCount || 10, 12);
        
        for (let i = 0; i < count; i++) {
            const bill = document.createElement('div');
            const symbol = config.symbols[Math.floor(Math.random() * config.symbols.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 1000;
            
            bill.textContent = symbol;
            bill.style.cssText = `
                position: absolute;
                top: -40px;
                left: ${left}%;
                font-size: 28px;
                animation: money-fall 2s ease-in ${delay}ms forwards;
                will-change: transform, opacity;
            `;
            container.appendChild(bill);
            this._safeRemove(bill, 3200);
        }
    },

    playChampagne: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const bubbleCount = Math.min(config.bubbleCount || 8, 10);
        
        // Bottle pop
        const bottle = document.createElement('div');
        bottle.textContent = '🍾';
        bottle.style.cssText = `
            position: absolute;
            bottom: 20%;
            left: 50%;
            font-size: 48px;
            transform: translateX(-50%);
            animation: bottle-pop 0.5s ease-out forwards;
            will-change: transform, opacity;
        `;
        container.appendChild(bottle);
        
        // Bubbles
        setTimeout(() => {
            if (!container.parentNode) return;
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                const offsetX = (Math.random() - 0.5) * 150;
                const delay = Math.random() * 400;
                const size = 4 + Math.random() * 6;
                
                bubble.style.cssText = `
                    position: absolute;
                    bottom: 25%;
                    left: calc(50% + ${offsetX}px);
                    width: ${size}px;
                    height: ${size}px;
                    background: ${config.color};
                    border-radius: 50%;
                    opacity: 0.8;
                    animation: bubble-rise 1.2s ease-out ${delay}ms forwards;
                    will-change: transform, opacity;
                `;
                container.appendChild(bubble);
                this._safeRemove(bubble, 1800);
            }
        }, 300);
        
        this._safeRemove(bottle, 2000);
    },

    playAurora: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const waveCount = Math.min(config.waves || 2, 3);
        
        for (let i = 0; i < waveCount; i++) {
            const wave = document.createElement('div');
            const color = config.colors[i % config.colors.length];
            const delay = i * 200;
            
            wave.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(180deg, ${color}00, ${color}40, ${color}00);
                opacity: 0;
                animation: aurora-wave 2.5s ease-in-out ${delay}ms forwards;
                will-change: opacity;
            `;
            container.appendChild(wave);
            this._safeRemove(wave, 3000);
        }
    },

    playBuffettApplause: function(config) {
        const container = this.createEffectContainer();
        if (!container) return;
        const duration = Math.min(config.duration || 2500, 3000);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            animation: buffett-appear 0.5s ease-out forwards;
        `;
        
        overlay.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 10px;">🧓👏</div>
            <div style="font-size: 24px; color: #d69e2e; font-weight: bold; text-shadow: 0 0 10px rgba(214, 158, 46, 0.5);">
                ${config.message || 'השקעה מצוינת!'}
            </div>
        `;
        
        container.appendChild(overlay);
        
        // Add applause emojis (limited to 6)
        for (let i = 0; i < 6; i++) {
            const clap = document.createElement('div');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 800;
            
            clap.textContent = '👏';
            clap.style.cssText = `
                position: absolute;
                top: ${y}%;
                left: ${x}%;
                font-size: 24px;
                opacity: 0;
                animation: clap-appear 0.5s ease-out ${delay}ms forwards;
                will-change: transform, opacity;
            `;
            container.appendChild(clap);
            this._safeRemove(clap, duration);
        }
        
        this._safeRemove(overlay, duration);
    }
};

// Clean up effects when tab becomes hidden — no GPU work on invisible tabs
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        const effectContainer = document.getElementById('buffett-effect-container');
        if (effectContainer) effectContainer.innerHTML = '';
        clearTimeout(BuffettShop.effects._cleanupTimer);
    }
});

// ==============================
// EFFECT CSS ANIMATIONS
// ==============================
BuffettShop.injectEffectStyles = function() {
    if (document.getElementById('buffett-effect-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'buffett-effect-styles';
    style.textContent = `
        @keyframes flash-effect {
            0% { opacity: 0; }
            20% { opacity: 0.3; }
            100% { opacity: 0; }
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes coin-fall {
            0% { transform: translateY(0) rotateY(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotateY(720deg); opacity: 0.5; }
        }
        
        @keyframes firework-burst {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--tx, 50px), var(--ty, -50px)) scale(0); opacity: 0; }
        }
        
        @keyframes arrow-rise {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
        
        @keyframes money-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes bottle-pop {
            0% { transform: translateX(-50%) rotate(0deg); }
            50% { transform: translateX(-50%) rotate(-15deg) scale(1.2); }
            100% { transform: translateX(-50%) rotate(0deg) scale(1); }
        }
        
        @keyframes bubble-rise {
            0% { transform: translateY(0) scale(1); opacity: 0.8; }
            100% { transform: translateY(-50vh) scale(0.5); opacity: 0; }
        }
        
        @keyframes aurora-wave {
            0% { opacity: 0; transform: translateY(100%); }
            50% { opacity: 0.6; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100%); }
        }
        
        @keyframes buffett-appear {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes clap-appear {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.8; transform: scale(1); }
        }
        

    `;
    document.head.appendChild(style);
};

// ==============================
// INITIALIZATION
// ==============================
BuffettShop.init = function() {
    // Inject effect styles
    this.injectEffectStyles();
    
    // Apply equipped cosmetics immediately on init (no debounce)
    this.applyEquipped(true);
    
    console.log('BuffettShop initialized');
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BuffettShop.init());
} else {
    BuffettShop.init();
}

// Signal that shop is loaded
BuffettShop.loaded = true;
console.log('BuffettShop system loaded');