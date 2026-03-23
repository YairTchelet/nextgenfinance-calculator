/* === game-config.js ===
 * Game configuration and utility functions
 */

// Initialize global game namespace (in case game-data.js not yet loaded)
window.BuffettGame = window.BuffettGame || {};

window.BuffettGame.config = {
    totalRounds: 10,
    specialRoundPositions: [3, 7], // 0-indexed: rounds 4 and 8
    
    // Point values by tier
    tierPoints: {
        1: 100, // Easy
        2: 150, // Medium
        3: 200, // Hard
        4: 250  // Expert
    },
    
    // Hint cost (percentage of base points)
    hintCostPercent: 0.5,
    
    // Projections unlock cost
    projectionsUnlockCost: 200,
    
    // Unlock threshold (percentage correct)
    unlockThreshold: 60,
    
    // Combo system
    comboMultipliers: [1, 1.5, 2, 2.5, 3], // Index = streak count (0, 1, 2, 3, 4+)
    
    // LocalStorage keys
    storageKeys: {
        difficulties: 'buffettGameUnlockedDifficulties',
        lifetimeScore: 'buffettGameLifetimeScore',
        highScores: 'buffettGameHighScores',
        achievements: 'buffettGameAchievements', // legacy key
        mastery: 'buffett_mastery',              // System 1
        newAchievements: 'buffett_achievements'  // System 2
    }
};

// ==============================
// UTILITY FUNCTIONS
// ==============================
window.BuffettGame.utils = {
    // Get companies for a specific difficulty
    getCompaniesForDifficulty: function(difficulty) {
        return window.BuffettGame.companies[difficulty] || [];
    },
    
    // Get events for a specific difficulty
    getEventsForDifficulty: function(difficulty) {
        return window.BuffettGame.specialEvents[difficulty] || [];
    },
    
    // Get principle by ID
    getPrinciple: function(id) {
        return window.BuffettGame.principles[id] || null;
    },
    
    // Shuffle array (Fisher-Yates)
    shuffle: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Generate game rounds for a difficulty
    generateRounds: function(difficulty) {
        const companies = this.shuffle(this.getCompaniesForDifficulty(difficulty));
        const events = this.shuffle(this.getEventsForDifficulty(difficulty));
        const config = window.BuffettGame.config;
        
        const rounds = [];
        let companyIndex = 0;
        let eventIndex = 0;
        
        for (let i = 0; i < config.totalRounds; i++) {
            if (config.specialRoundPositions.includes(i) && eventIndex < events.length) {
                rounds.push({
                    type: 'special',
                    data: events[eventIndex++]
                });
            } else if (companyIndex < companies.length) {
                rounds.push({
                    type: 'company',
                    data: companies[companyIndex++]
                });
            }
        }
        
        return rounds;
    }
};

// Signal that content is loaded
window.BuffettGame.contentLoaded = true;
console.log('BuffettGame content loaded successfully');