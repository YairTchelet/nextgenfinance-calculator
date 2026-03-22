/* === game-engine.js ===
 * Core game logic, state management, rendering
 */


        // Game State
        const GameState = {
            phase: 'MENU', difficulty: null, currentRound: 0, totalRounds: 10,
            score: 0, correctDecisions: 0, consecutiveCorrect: 0, comboMultiplier: 1,
            decisionMade: false, projectionsUnlocked: false, hintUsed: false,
            gameRounds: [], roundOutcomes: []
        };

        // DOM Elements
        const DOM = {
            difficultySelect: document.getElementById('difficulty-select'),
            scoreContainer: document.getElementById('score-container'),
            progressStagesContainer: document.getElementById('progress-stages-container'),
            gameContainer: document.getElementById('game-container'),
            companyDisplay: document.getElementById('company-display'),
            specialRoundDisplay: document.getElementById('special-round-display'),
            loadingEl: document.getElementById('loading'),
            currentRoundDisplay: document.getElementById('current-round-display'),
            correctDecisionsEl: document.getElementById('correct-decisions'),
            scoreEl: document.getElementById('score'),
            comboDisplay: document.getElementById('combo-display'),
            companyName: document.getElementById('company-name'),
            companySymbol: document.getElementById('company-symbol'),
            companyPrice: document.getElementById('company-price'),
            companySector: document.getElementById('company-sector'),
            companyDescription: document.getElementById('company-description'),
            companyManagement: document.getElementById('company-management-info'),
            companyMoat: document.getElementById('company-moat-info'),
            companyEvents: document.getElementById('company-events-info'),
            basicMetricsGrid: document.getElementById('basic-metrics-grid'),
            advancedMetricsGrid: document.getElementById('advanced-metrics-grid'),
            linePlotContainer: document.getElementById('line-plot-area-container'),
            unlockProjectionsButton: document.getElementById('unlock-projections-button'),
            decisionFeedback: document.getElementById('decision-feedback'),
            principleBadge: document.getElementById('principle-badge'),
            decisionTitle: document.getElementById('decision-title'),
            decisionExplanation: document.getElementById('decision-explanation'),
            decisiveSignals: document.getElementById('decisive-signals'),
            decisiveSignalsList: document.getElementById('decisive-signals-list'),
            companyHintButton: document.getElementById('company-hint-button'),
            companyHintDisplay: document.getElementById('company-hint-display'),
            companyHintText: document.getElementById('company-hint-text'),
            buyButton: document.getElementById('buy-button'),
            passButton: document.getElementById('pass-button'),
            decisionButtons: document.getElementById('decision-buttons'),
            continueButton: document.getElementById('continue-button'),
            reasoningSection: document.getElementById('reasoning-section'),
            reasoningOptions: document.getElementById('reasoning-options'),
            submitReasoningButton: document.getElementById('submit-reasoning-button'),
            specialTitle: document.getElementById('special-title'),
            specialDescription: document.getElementById('special-description'),
            specialFeedback: document.getElementById('special-feedback'),
            specialPrincipleBadge: document.getElementById('special-principle-badge'),
            specialFeedbackTitle: document.getElementById('special-feedback-title'),
            specialExplanation: document.getElementById('special-explanation'),
            specialHintButton: document.getElementById('special-hint-button'),
            specialHintDisplay: document.getElementById('special-hint-display'),
            specialHintText: document.getElementById('special-hint-text'),
            impactButtons: document.getElementById('impact-buttons'),
            positiveImpactButton: document.getElementById('positive-impact-button'),
            neutralImpactButton: document.getElementById('neutral-impact-button'),
            negativeImpactButton: document.getElementById('negative-impact-button'),
            specialContinueButton: document.getElementById('special-continue-button'),
            easyButton: document.getElementById('easy-button'),
            mediumButton: document.getElementById('medium-button'),
            hardButton: document.getElementById('hard-button'),
            difficultyDescription: document.getElementById('difficulty-description'),
            resultOverlay: document.getElementById('result-overlay'),
            resultMessage: document.getElementById('result-message'),
            expertFeedback: document.getElementById('expert-feedback'),
            restartButton: document.getElementById('restart-button'),
            glossaryButton: document.getElementById('glossary-button'),
            glossaryOverlay: document.getElementById('glossary-overlay'),
            glossaryList: document.getElementById('glossary-list'),
            glossaryClose: document.getElementById('glossary-close'),
            modalOverlay: document.getElementById('custom-modal-overlay'),
            modalTitle: document.getElementById('modal-title'),
            modalMessage: document.getElementById('modal-message'),
            modalConfirmButton: document.getElementById('modal-confirm-button'),
            modalCancelButton: document.getElementById('modal-cancel-button'),
            modalOkButton: document.getElementById('modal-ok-button')
        };

        // Storage Functions
        const Storage = {
            keys: { difficulties: 'buffettGameUnlockedDifficulties' },
            getUnlockedDifficulties() {
                try { return JSON.parse(localStorage.getItem(this.keys.difficulties)) || ['easy']; }
                catch { localStorage.setItem(this.keys.difficulties, JSON.stringify(['easy'])); return ['easy']; }
            },
            unlockDifficulty(difficulty) {
                let unlocked = this.getUnlockedDifficulties();
                if (!unlocked.includes(difficulty)) {
                    unlocked.push(difficulty);
                    localStorage.setItem(this.keys.difficulties, JSON.stringify(unlocked));
                    return true;
                }
                return false;
            }
        };

        // Modal Functions
        let currentConfirmCallback = null;
        function closeModal() { DOM.modalOverlay.classList.remove('show'); DOM.modalOverlay.classList.add('hidden'); currentConfirmCallback = null; }
        function showInfoModal(title, message) {
            DOM.modalTitle.textContent = title; DOM.modalMessage.textContent = message;
            DOM.modalConfirmButton.style.display = 'none'; DOM.modalCancelButton.style.display = 'none';
            DOM.modalOkButton.style.display = 'inline-block';
            DOM.modalOverlay.classList.remove('hidden'); DOM.modalOverlay.classList.add('show');
        }
        function showConfirmModal(title, message, onConfirm) {
            DOM.modalTitle.textContent = title; DOM.modalMessage.textContent = message;
            currentConfirmCallback = onConfirm;
            DOM.modalConfirmButton.style.display = 'inline-block'; DOM.modalCancelButton.style.display = 'inline-block';
            DOM.modalOkButton.style.display = 'none';
            DOM.modalOverlay.classList.remove('hidden'); DOM.modalOverlay.classList.add('show');
        }

        // Glossary Functions
        function openGlossary() {
            const glossary = window.BuffettGame?.glossary || [];
            DOM.glossaryList.innerHTML = glossary.map(item => `<li class="glossary-item"><div class="glossary-term">${item.term}</div><div>${item.definition}</div></li>`).join('');
            DOM.glossaryOverlay.classList.remove('hidden'); DOM.glossaryOverlay.classList.add('show');
        }
        function closeGlossary() { DOM.glossaryOverlay.classList.remove('show'); DOM.glossaryOverlay.classList.add('hidden'); }

        // Difficulty Functions
        function updateDifficultyButtonsState() {
            const unlocked = Storage.getUnlockedDifficulties();
            [DOM.easyButton, DOM.mediumButton, DOM.hardButton].forEach(btn => {
                const diff = btn.dataset.difficulty;
                btn.classList.toggle('locked', !unlocked.includes(diff));
                btn.disabled = !unlocked.includes(diff);
            });
        }
        function updateDifficultyDescription(difficulty) {
            const desc = { easy: "קל: תרחישים ברורים יחסית.", medium: "בינוני: תמהיל מאוזן.", hard: "קשה: מצבים מאתגרים.", default: "בחר רמת קושי" };
            DOM.difficultyDescription.textContent = desc[difficulty] || desc.default;
        }
        function selectDifficulty(difficulty) {
            const btn = document.querySelector(`.difficulty-button[data-difficulty="${difficulty}"]`);
            if (btn.classList.contains('locked')) { showInfoModal("רמה נעולה", "השלם רמות קודמות (60%+)"); return; }
            GameState.difficulty = difficulty;
            [DOM.easyButton, DOM.mediumButton, DOM.hardButton].forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            updateDifficultyDescription(difficulty);
            setTimeout(startGame, 200);
        }

        // Progress Stages
        function initializeProgressStages() {
            DOM.progressStagesContainer.innerHTML = '';
            GameState.roundOutcomes = new Array(GameState.totalRounds).fill(null);
            for (let i = 0; i < GameState.totalRounds; i++) {
                const stage = document.createElement('div');
                stage.classList.add('progress-stage', 'upcoming');
                stage.textContent = i + 1;
                stage.id = `progress-stage-${i}`;
                DOM.progressStagesContainer.appendChild(stage);
            }
        }
        function updateProgressStageDisplay() {
            const stages = DOM.progressStagesContainer.children;
            for (let i = 0; i < stages.length; i++) {
                stages[i].classList.remove('current', 'passed', 'failed', 'upcoming');
                if (GameState.roundOutcomes[i]) stages[i].classList.add(GameState.roundOutcomes[i]);
                else if (i === GameState.currentRound) stages[i].classList.add('current');
                else stages[i].classList.add('upcoming');
            }
        }

        // Combo System
        function handleCorrectDecisionCombo() {
            GameState.consecutiveCorrect++;
            if (GameState.consecutiveCorrect >= 2) {
                GameState.comboMultiplier = Math.min(GameState.consecutiveCorrect, 5);
                DOM.comboDisplay.textContent = `x${GameState.comboMultiplier} רצף!`;
                DOM.comboDisplay.classList.remove('hidden');
            }
        }
        function resetCombo() { GameState.consecutiveCorrect = 0; GameState.comboMultiplier = 1; DOM.comboDisplay.classList.add('hidden'); }
        function calculateComboBonus(basePoints) { return GameState.comboMultiplier > 1 ? Math.round(basePoints * (GameState.comboMultiplier - 1) * 0.25) : 0; }
        function calculatePotentialPoints(roundData) { let pts = roundData.pointValue || 100; return GameState.hintUsed ? Math.round(pts * 0.5) : pts; }

        // ==============================
        // REASONING SYSTEM (Tier 3+)
        // ==============================
        let selectedReasonings = [];
        let reasoningSubmitted = false;

        function shouldShowReasoning() {
            // Show reasoning for hard (tier 3) and expert (tier 4) difficulties
            return GameState.difficulty === 'hard' || GameState.difficulty === 'expert';
        }

        function displayReasoningOptions(company, playerDecision) {
            if (!company.reasoningOptions || company.reasoningOptions.length === 0) return;
            
            selectedReasonings = [];
            reasoningSubmitted = false;
            DOM.reasoningOptions.innerHTML = '';
            
            // Shuffle options for display
            const shuffledOptions = [...company.reasoningOptions].sort(() => Math.random() - 0.5);
            
            shuffledOptions.forEach(option => {
                const optionEl = document.createElement('div');
                optionEl.className = 'reasoning-option';
                optionEl.dataset.id = option.id;
                optionEl.innerHTML = `
                    <div class="reasoning-checkbox"></div>
                    <div class="reasoning-option-text">${option.text}</div>
                `;
                optionEl.addEventListener('click', () => toggleReasoningOption(option.id, optionEl));
                DOM.reasoningOptions.appendChild(optionEl);
            });
            
            DOM.submitReasoningButton.disabled = true;
            DOM.reasoningSection.classList.remove('hidden');
        }

        function toggleReasoningOption(optionId, element) {
            if (reasoningSubmitted) return;
            
            const index = selectedReasonings.indexOf(optionId);
            if (index > -1) {
                selectedReasonings.splice(index, 1);
                element.classList.remove('selected');
            } else {
                selectedReasonings.push(optionId);
                element.classList.add('selected');
            }
            
            DOM.submitReasoningButton.disabled = selectedReasonings.length === 0;
        }

        function evaluateReasoning(company, playerDecision) {
            reasoningSubmitted = true;
            const options = company.reasoningOptions || [];
            
            let correctCount = 0;
            let trapCount = 0;
            let totalCorrect = options.filter(o => o.isCorrect && o.appliesToDecision === playerDecision).length;
            
            // Evaluate each selected option
            selectedReasonings.forEach(selectedId => {
                const option = options.find(o => o.id === selectedId);
                if (option) {
                    if (option.isCorrect && option.appliesToDecision === playerDecision) {
                        correctCount++;
                    } else if (option.isTrap) {
                        trapCount++;
                    }
                }
            });
            
            // Show results on each option
            document.querySelectorAll('.reasoning-option').forEach(el => {
                const optionId = el.dataset.id;
                const option = options.find(o => o.id === optionId);
                if (!option) return;
                
                el.style.pointerEvents = 'none';
                
                if (option.isCorrect && option.appliesToDecision === playerDecision) {
                    el.classList.add('correct-answer');
                    const badge = document.createElement('span');
                    badge.className = 'reasoning-option-badge correct';
                    badge.textContent = 'נכון';
                    el.querySelector('.reasoning-option-text').prepend(badge);
                } else if (option.isTrap) {
                    el.classList.add('trap-answer');
                    const badge = document.createElement('span');
                    badge.className = 'reasoning-option-badge trap';
                    badge.textContent = 'מלכודת';
                    el.querySelector('.reasoning-option-text').prepend(badge);
                } else if (selectedReasonings.includes(optionId)) {
                    el.classList.add('wrong-answer');
                    const badge = document.createElement('span');
                    badge.className = 'reasoning-option-badge wrong';
                    badge.textContent = 'לא מדויק';
                    el.querySelector('.reasoning-option-text').prepend(badge);
                }
            });
            
            // Calculate reasoning bonus
            const feedback = company.feedback?.reasoningFeedback || {};
            let reasoningBonus = 0;
            let feedbackTitle = '';
            let feedbackClass = '';
            
            if (trapCount > 0) {
                feedbackTitle = feedback.fellForTrap || 'נפלת במלכודת!';
                feedbackClass = 'needs-work';
                reasoningBonus = -20 * trapCount;
            } else if (correctCount === totalCorrect && totalCorrect > 0) {
                feedbackTitle = feedback.fullCorrect || 'מצוין! זיהית את כל הנימוקים הנכונים.';
                feedbackClass = 'excellent';
                reasoningBonus = 50;
            } else if (correctCount > 0) {
                feedbackTitle = feedback.partialCorrect || 'טוב, אבל לא זיהית את כל הנימוקים.';
                feedbackClass = 'good';
                reasoningBonus = 20 * correctCount;
            } else {
                feedbackTitle = 'לא נבחרו נימוקים נכונים.';
                feedbackClass = 'needs-work';
            }
            
            // Apply bonus
            GameState.score += reasoningBonus;
            DOM.scoreEl.textContent = GameState.score;
            
            // Show feedback
            const feedbackEl = document.createElement('div');
            feedbackEl.className = 'reasoning-feedback';
            feedbackEl.innerHTML = `
                <div class="reasoning-feedback-title ${feedbackClass}">${feedbackTitle}</div>
                <div class="reasoning-score">
                    ${reasoningBonus >= 0 ? '+' : ''}${reasoningBonus} נקודות על ניתוח הנימוקים
                    ${correctCount > 0 ? `<br>זיהית ${correctCount} מתוך ${totalCorrect} נימוקים נכונים` : ''}
                </div>
            `;
            DOM.reasoningSection.appendChild(feedbackEl);
            
            // Hide submit button, show continue
            DOM.submitReasoningButton.classList.add('hidden');
            DOM.decisionFeedback.classList.remove('hidden');
        }


        // Chart Rendering
        function createDualAxisLinePlot(containerEl, companyData, showProjected = false) {
            containerEl.innerHTML = '';
            const dataToChart = [...(companyData.historicalData || [])];
            if (showProjected && companyData.projectedData) dataToChart.push(...companyData.projectedData.map(d => ({ ...d, projected: true })));
            if (dataToChart.length < 2) { containerEl.innerHTML = `<p style="text-align:center; color:var(--text-muted);">נתונים לא מספיקים.</p>`; return; }

            const margin = { top: 20, right: 50, bottom: 55, left: 55 };
            const rect = containerEl.getBoundingClientRect();
            const width = rect.width - margin.left - margin.right;
            const height = rect.height - margin.top - margin.bottom;
            if (width <= 0 || height <= 0) return;

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "line-plot-svg");
            svg.setAttribute("width", rect.width);
            svg.setAttribute("height", rect.height);
            const plotArea = document.createElementNS("http://www.w3.org/2000/svg", "g");
            plotArea.setAttribute("transform", `translate(${margin.left},${margin.top})`);
            svg.appendChild(plotArea);
            containerEl.appendChild(svg);

            const tooltip = document.createElement('div');
            tooltip.className = 'chart-tooltip';
            containerEl.appendChild(tooltip);

            const years = dataToChart.map(d => d.year);
            const xScale = year => { const i = years.indexOf(year); return years.length === 1 ? width/2 : (i / (years.length - 1)) * width; };

            const revValues = dataToChart.map(d => d.revenue).filter(v => !isNaN(v));
            let minRev = Math.min(0, ...revValues), maxRev = Math.max(...revValues);
            if (minRev === maxRev) { minRev -= 1; maxRev += 1; }
            const y0Scale = v => height - ((v - minRev) / (maxRev - minRev)) * height;

            const fcfValues = dataToChart.map(d => d.fcf).filter(v => !isNaN(v));
            let minFcf = Math.min(0, ...fcfValues), maxFcf = Math.max(...fcfValues);
            if (minFcf === maxFcf) { minFcf -= 1; maxFcf += 1; }
            const y1Scale = v => height - ((v - minFcf) / (maxFcf - minFcf)) * height;

            // Draw axes
            const drawAxis = (scaleFunc, orient, ticks, axisClass, format) => {
                const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                g.setAttribute("class", `axis ${orient}-axis ${axisClass}`);
                if (orient === 'x') g.setAttribute("transform", `translate(0,${height})`);
                else if (axisClass === 'fcf-axis') g.setAttribute("transform", `translate(${width},0)`);
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                orient === 'x' ? (line.setAttribute("x1", 0), line.setAttribute("x2", width)) : (line.setAttribute("y1", 0), line.setAttribute("y2", height));
                g.appendChild(line);
                ticks.forEach(val => {
                    const pos = scaleFunc(val);
                    if (isNaN(pos)) return;
                    const mark = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    if (orient === 'x') {
                        mark.setAttribute("x1", pos); mark.setAttribute("x2", pos); mark.setAttribute("y2", 5);
                        label.setAttribute("x", pos); label.setAttribute("y", 20); label.setAttribute("text-anchor", "middle");
                        label.textContent = val;
                    } else {
                        mark.setAttribute("y1", pos); mark.setAttribute("y2", pos);
                        mark.setAttribute(axisClass === 'revenue-axis' ? "x1" : "x2", axisClass === 'revenue-axis' ? -5 : 5);
                        label.setAttribute("y", pos);
                        label.setAttribute("x", axisClass === 'revenue-axis' ? -10 : 10);
                        label.setAttribute("text-anchor", axisClass === 'revenue-axis' ? "end" : "start");
                        label.setAttribute("alignment-baseline", "middle");
                        label.classList.add(axisClass + '-label');
                        if (axisClass === 'fcf-axis' && val < 0) label.classList.add('negative-value');
                        label.textContent = format(val);
                    }
                    g.appendChild(mark); g.appendChild(label);
                });
                return g;
            };
            plotArea.appendChild(drawAxis(xScale, 'x', years, '', v => v));
            plotArea.appendChild(drawAxis(y0Scale, 'y', [minRev, (minRev+maxRev)/2, maxRev], 'revenue-axis', v => Math.round(v).toLocaleString()));
            plotArea.appendChild(drawAxis(y1Scale, 'y', [minFcf, (minFcf+maxFcf)/2, maxFcf], 'fcf-axis', v => Math.round(v).toLocaleString()));

            // Draw lines
            const drawLine = (data, yScale, cls, proj) => {
                const filtered = data.filter(d => !isNaN(yScale(cls === 'revenue' ? d.revenue : d.fcf)));
                if (filtered.length < 2) return;
                const pathD = filtered.map((d, i) => `${i===0?'M':'L'} ${xScale(d.year)} ${yScale(cls==='revenue'?d.revenue:d.fcf)}`).join(' ');
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("class", `line ${cls}${proj?' projected':''}`);
                path.setAttribute("d", pathD);
                plotArea.appendChild(path);
                filtered.forEach(d => {
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    const val = cls === 'revenue' ? d.revenue : d.fcf;
                    circle.setAttribute("cx", xScale(d.year));
                    circle.setAttribute("cy", yScale(val));
                    circle.setAttribute("r", 5);
                    circle.setAttribute("class", `dot ${cls}${proj?' projected':''}${cls==='fcf'&&val<0?' negative':''}`);
                    circle.addEventListener('mouseenter', e => {
                        tooltip.innerHTML = `<strong>${d.year}</strong><br>${cls==='revenue'?'הכנסות':'FCF'}: ${val.toLocaleString()}`;
                        tooltip.classList.add('show');
                        const r = containerEl.getBoundingClientRect();
                        tooltip.style.left = (e.clientX - r.left - tooltip.offsetWidth/2) + 'px';
                        tooltip.style.top = (e.clientY - r.top - tooltip.offsetHeight - 10) + 'px';
                    });
                    circle.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
                    plotArea.appendChild(circle);
                });
            };
            const hist = dataToChart.filter(d => !d.projected), proj = dataToChart.filter(d => d.projected);
            drawLine(hist, y0Scale, 'revenue', false); drawLine(hist, y1Scale, 'fcf', false);
            if (showProjected && proj.length > 0) {
                const conn = [hist[hist.length-1], ...proj];
                drawLine(conn, y0Scale, 'revenue', true); drawLine(conn, y1Scale, 'fcf', true);
            }
        }

        // Display Functions
        function displayCompany(company) {
            DOM.companyName.textContent = company.name;
            DOM.companySymbol.textContent = company.symbol || 'N/A';
            DOM.companyPrice.textContent = `₪${company.price?.toFixed(2) || '0.00'}`;
            DOM.companySector.textContent = company.sector || '';
            DOM.companyDescription.textContent = company.description || '';
            DOM.companyManagement.textContent = company.management || '';
            DOM.companyMoat.textContent = company.moat || '';
            DOM.companyEvents.textContent = company.events || '';

            const basicMetrics = (company.metrics?.basic || company.basicMetrics || []).filter(m => m && typeof m.name === 'string' && m.value !== undefined);
            const advMetrics = (company.metrics?.advanced || company.advancedMetrics || []).filter(m => m && typeof m.name === 'string' && m.value !== undefined);
            DOM.basicMetricsGrid.innerHTML = basicMetrics.map(m => `<div class="metric"><div class="metric-name">${m.name}</div><div class="metric-value">${m.value}</div></div>`).join('');
            DOM.advancedMetricsGrid.innerHTML = advMetrics.map(m => `<div class="metric"><div class="metric-name">${m.name}</div><div class="metric-value">${m.value}</div></div>`).join('');

            const hintCost = Math.round(company.pointValue * 0.5);
            DOM.companyHintButton.textContent = `רמז (-${hintCost} נק')`; DOM.companyHintButton.disabled = false;
            DOM.unlockProjectionsButton.disabled = false; DOM.unlockProjectionsButton.textContent = 'גלה תחזיות (-200 נק\')';
            DOM.companyHintDisplay.classList.add('hidden'); DOM.decisionFeedback.classList.add('hidden');
            DOM.decisionButtons.style.display = 'flex'; DOM.decisiveSignals.classList.add('hidden');
            // MUST unhide BEFORE chart — getBoundingClientRect returns 0 on hidden elements
            DOM.companyDisplay.classList.remove('hidden'); DOM.specialRoundDisplay.classList.add('hidden');
            // Render chart AFTER container is visible
            requestAnimationFrame(() => createDualAxisLinePlot(DOM.linePlotContainer, company, false));
        }

        function displaySpecialRound(event) {
            DOM.specialTitle.textContent = event.title || '';
            DOM.specialDescription.textContent = event.description || '';
            const hintCost = Math.round(event.pointValue * 0.5);
            DOM.specialHintButton.textContent = `רמז (-${hintCost} נק')`; DOM.specialHintButton.disabled = false;
            DOM.specialHintDisplay.classList.add('hidden'); DOM.specialFeedback.classList.add('hidden');
            DOM.impactButtons.style.display = 'flex';
            DOM.specialRoundDisplay.classList.remove('hidden'); DOM.companyDisplay.classList.add('hidden');
        }

        // Hint Functions
        function handleHintPurchase() {
            const roundData = GameState.gameRounds[GameState.currentRound];
            if (!roundData || GameState.hintUsed) return;
            const isSpecial = roundData.type === 'special';
            const data = roundData.data;
            const hintCost = Math.round(data.pointValue * 0.5);
            showConfirmModal('רכישת רמז', `האם לרכוש רמז תמורת ${hintCost} נקודות?`, () => {
                GameState.hintUsed = true;
                const hints = data.hints || [{ text: data.hint }];
                const hintText = hints[0]?.text || data.hint || 'אין רמז זמין';
                if (isSpecial) { DOM.specialHintText.textContent = hintText; DOM.specialHintDisplay.classList.remove('hidden'); DOM.specialHintButton.disabled = true; }
                else { DOM.companyHintText.textContent = hintText; DOM.companyHintDisplay.classList.remove('hidden'); DOM.companyHintButton.disabled = true; }
            });
        }

        function handleUnlockProjections() {
            if (GameState.projectionsUnlocked) return;
            showConfirmModal('גילוי תחזיות', 'האם לגלות תחזיות תמורת 200 נקודות?', () => {
                GameState.projectionsUnlocked = true;
                GameState.score -= 200;
                DOM.scoreEl.textContent = GameState.score;
                DOM.unlockProjectionsButton.disabled = true;
                DOM.unlockProjectionsButton.textContent = 'תחזיות נפתחו';
                const company = GameState.gameRounds[GameState.currentRound].data;
                createDualAxisLinePlot(DOM.linePlotContainer, company, true);
            });
        }

        // Decision Handlers
        function handleInvestmentDecision(decision) {
            if (GameState.decisionMade || !GameState.gameRounds[GameState.currentRound]) return;
            if (GameState.gameRounds[GameState.currentRound].type === 'special') return;
            GameState.decisionMade = true;
            GameState.lastDecision = decision; // Store for reasoning system
            DOM.companyHintButton.disabled = true; DOM.unlockProjectionsButton.disabled = true;

            const company = GameState.gameRounds[GameState.currentRound].data;
            const correctDecision = company.correctDecision || (company.isGoodValue ? 'buy' : 'pass');
            const isCorrect = decision === correctDecision;
            const potentialPoints = calculatePotentialPoints(company);
            let pointsAwarded = isCorrect ? potentialPoints : 0;

            const feedback = company.feedback || {};
            let explanationText = isCorrect ? (feedback.correctExplanation || feedback.positive || 'החלטה נכונה!') : (feedback.incorrectExplanation || feedback.negative || 'החלטה שגויה.');

            DOM.decisionFeedback.className = 'decision-feedback';
            DOM.decisionTitle.className = 'decision-title';

            if (isCorrect) {
                GameState.correctDecisions++;
                handleCorrectDecisionCombo();
                const comboBonus = calculateComboBonus(pointsAwarded);
                pointsAwarded += comboBonus;
                GameState.score += pointsAwarded;
                let title = `החלטה נכונה! (+${potentialPoints} נק'`;
                if (comboBonus > 0) title += ` + ${comboBonus} בונוס`;
                DOM.decisionTitle.textContent = title + ")";
                DOM.decisionTitle.classList.add('correct');
                DOM.decisionFeedback.classList.add('correct');
            } else {
                resetCombo();
                DOM.decisionTitle.textContent = 'החלטה שגויה';
                DOM.decisionTitle.classList.add('incorrect');
                DOM.decisionFeedback.classList.add('incorrect');
            }

            if (feedback.principle) { DOM.principleBadge.textContent = feedback.principle.name; DOM.principleBadge.classList.remove('hidden'); }
            else DOM.principleBadge.classList.add('hidden');
            DOM.decisionExplanation.textContent = explanationText;
            if (feedback.decisiveSignals?.length > 0) { DOM.decisiveSignalsList.innerHTML = feedback.decisiveSignals.map(s => `<li>${s}</li>`).join(''); DOM.decisiveSignals.classList.remove('hidden'); }
            else DOM.decisiveSignals.classList.add('hidden');

            DOM.correctDecisionsEl.textContent = GameState.correctDecisions;
            DOM.scoreEl.textContent = GameState.score;
            GameState.roundOutcomes[GameState.currentRound] = isCorrect ? 'passed' : 'failed';
            updateProgressStageDisplay();
            
            // Mascot reacts to decision
            if (window.BuffettMascot) {
                try {
                    if (isCorrect) BuffettMascot.onCorrect(GameState.consecutiveCorrect);
                    else BuffettMascot.onIncorrect();
                } catch(e) {}
            }
            
            // Hide decision buttons
            DOM.decisionButtons.style.display = 'none';
            
            // Check if reasoning system should be shown (Tier 3+)
            if (shouldShowReasoning() && company.reasoningOptions && company.reasoningOptions.length > 0) {
                // Show reasoning options, hide feedback until reasoning is complete
                DOM.decisionFeedback.classList.add('hidden');
                displayReasoningOptions(company, decision);
            } else {
                // No reasoning - show feedback directly
                DOM.decisionFeedback.classList.remove('hidden');
            }
            
            DOM.companyDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function handleImpactDecision(impact) {
            if (GameState.decisionMade || !GameState.gameRounds[GameState.currentRound]) return;
            if (GameState.gameRounds[GameState.currentRound].type !== 'special') return;
            GameState.decisionMade = true;
            DOM.specialHintButton.disabled = true;

            const event = GameState.gameRounds[GameState.currentRound].data;
            const isCorrect = impact === event.correctImpact;
            const potentialPoints = calculatePotentialPoints(event);
            let pointsAwarded = isCorrect ? potentialPoints : 0;

            DOM.specialFeedback.className = 'decision-feedback';
            DOM.specialFeedbackTitle.className = 'decision-title';
            const feedback = event.feedback || {};

            if (isCorrect) {
                GameState.correctDecisions++;
                handleCorrectDecisionCombo();
                const comboBonus = calculateComboBonus(pointsAwarded);
                pointsAwarded += comboBonus;
                GameState.score += pointsAwarded;
                let title = `ניתוח נכון! (+${potentialPoints} נק'`;
                if (comboBonus > 0) title += ` + ${comboBonus} בונוס`;
                DOM.specialFeedbackTitle.textContent = title + ")";
                DOM.specialFeedbackTitle.classList.add('correct');
                DOM.specialFeedback.classList.add('correct');
                DOM.specialExplanation.textContent = feedback.correct || 'תשובה נכונה!';
            } else {
                resetCombo();
                DOM.specialFeedbackTitle.textContent = 'ניתוח שגוי';
                DOM.specialFeedbackTitle.classList.add('incorrect');
                DOM.specialFeedback.classList.add('incorrect');
                DOM.specialExplanation.textContent = feedback.incorrect || 'תשובה שגויה.';
            }

            if (feedback.principle) { DOM.specialPrincipleBadge.textContent = feedback.principle.name; DOM.specialPrincipleBadge.classList.remove('hidden'); }
            else DOM.specialPrincipleBadge.classList.add('hidden');

            DOM.correctDecisionsEl.textContent = GameState.correctDecisions;
            DOM.scoreEl.textContent = GameState.score;
            GameState.roundOutcomes[GameState.currentRound] = isCorrect ? 'passed' : 'failed';
            updateProgressStageDisplay();
            
            // Mascot reacts to decision
            if (window.BuffettMascot) {
                try {
                    if (isCorrect) BuffettMascot.onCorrect(GameState.consecutiveCorrect);
                    else BuffettMascot.onIncorrect();
                } catch(e) {}
            }
            
            DOM.specialFeedback.classList.remove('hidden');
            DOM.impactButtons.style.display = 'none';
            DOM.specialFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Game Flow
        function generateGameRounds() {
            const diff = GameState.difficulty;
            const companies = [...(window.BuffettGame?.companies?.[diff] || [])].sort(() => Math.random() - 0.5);
            const events = [...(window.BuffettGame?.specialEvents?.[diff] || [])].sort(() => Math.random() - 0.5);
            const versus = [...(window.BuffettGame?.versusRounds?.[diff] || [])].sort(() => Math.random() - 0.5);
            GameState.gameRounds = [];
            let cIdx = 0, eIdx = 0, vIdx = 0;
            for (let i = 0; i < GameState.totalRounds; i++) {
                // Versus at round 5 (index 4) if available
                if (i === 4 && vIdx < versus.length) {
                    GameState.gameRounds.push({ type: 'versus', data: versus[vIdx++] });
                }
                // Special events at rounds 4 and 8 (indices 3, 7)
                else if ((i === 3 || i === 7) && eIdx < events.length) GameState.gameRounds.push({ type: 'special', data: events[eIdx++] });
                else if (cIdx < companies.length) GameState.gameRounds.push({ type: 'company', data: companies[cIdx++] });
            }
        }

        function loadCurrentRound() {
            if (GameState.currentRound >= GameState.totalRounds || GameState.currentRound >= GameState.gameRounds.length) { endGame(); return; }
            // Clear any lingering effect particles from previous round
            const effectContainer = document.getElementById('buffett-effect-container');
            if (effectContainer) effectContainer.innerHTML = '';
            
            GameState.decisionMade = false; GameState.projectionsUnlocked = false; GameState.hintUsed = false;
            GameState.lastDecision = null;
            
            // Reset reasoning section
            selectedReasonings = [];
            reasoningSubmitted = false;
            DOM.reasoningSection.classList.add('hidden');
            DOM.submitReasoningButton.classList.remove('hidden');
            DOM.submitReasoningButton.disabled = true;
            
            DOM.currentRoundDisplay.textContent = `${GameState.currentRound + 1}/${GameState.totalRounds}`;
            updateProgressStageDisplay();
            const round = GameState.gameRounds[GameState.currentRound];
            if (round.type === 'special') displaySpecialRound(round.data);
            else displayCompany(round.data);
            
            // Mascot reacts to new round
            if (window.BuffettMascot) {
                try { BuffettMascot.onRoundStart(round.type || 'company'); } catch(e) {}
            }
        }

        function continueToNextRound() { GameState.currentRound++; loadCurrentRound(); }

        function startGame() {
            DOM.difficultySelect.classList.add('hidden');
            DOM.scoreContainer.classList.remove('hidden');
            DOM.gameContainer.classList.remove('hidden');
            DOM.progressStagesContainer.classList.remove('hidden');
            
            // Show avatar in score bar
            try {
                if (window.BuffettShop) {
                    const equipped = BuffettShop.getEquipped();
                    const avatar = BuffettShop.getItem('avatars', equipped.avatar);
                    const gameAvatarEl = document.getElementById('game-avatar');
                    if (gameAvatarEl && avatar && !avatar.isDefault) {
                        gameAvatarEl.textContent = avatar.preview || avatar.emoji || '';
                        gameAvatarEl.style.display = 'block';
                    } else if (gameAvatarEl) {
                        gameAvatarEl.style.display = 'none';
                    }
                }
            } catch(e) {}
            
            // Show mascot companion
            if (window.BuffettMascot) {
                try { BuffettMascot.show(); } catch(e) {}
            }
            
            initializeProgressStages();
            generateGameRounds();
            if (GameState.gameRounds.length > 0) loadCurrentRound();
            else endGameWithError("שגיאה ביצירת סיבובים.");
        }

        function endGame() {
            const pct = Math.round((GameState.correctDecisions / GameState.totalRounds) * 100);
            let msg, rating;
            if (pct >= 80) { msg = `מצוין! ${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מומחה"; }
            else if (pct >= 60) { msg = `טוב מאוד! ${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מיומן"; }
            else if (pct >= 40) { msg = `לא רע! ${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מתפתח"; }
            else { msg = `${GameState.correctDecisions}/${GameState.totalRounds} (${pct}%).`; rating = "מתחיל"; }

            // Transfer points to shop
            if (window.BuffettShop && GameState.score > 0) {
                BuffettShop.logic.addPoints(GameState.score);
                const totalPoints = BuffettShop.logic.getPoints();
                DOM.resultMessage.innerHTML = `${msg}<br><br>ניקוד סופי: <strong>${GameState.score}</strong><br>דירוג: <strong>${rating}</strong><br><br>💰 סה"כ נקודות לחנות: <strong>${totalPoints.toLocaleString()}</strong>`;
            } else {
                DOM.resultMessage.innerHTML = `${msg}<br><br>ניקוד סופי: <strong>${GameState.score}</strong><br>דירוג: <strong>${rating}</strong>`;
            }
            
            let unlock = '';
            if (GameState.difficulty === 'easy' && pct >= 60 && Storage.unlockDifficulty('medium')) unlock = '<br><br>🎉 רמת בינוני נפתחה!';
            else if (GameState.difficulty === 'medium' && pct >= 60 && Storage.unlockDifficulty('hard')) unlock = '<br><br>🎉 רמת קשה נפתחה!';
            if (unlock) DOM.resultMessage.innerHTML += unlock;

            DOM.expertFeedback.innerHTML = `<strong>עקרונות באפט:</strong><br>1. הבן את העסק<br>2. חפש Moat<br>3. הנהלה איכותית<br>4. FCF הוא המפתח<br>5. מרווח ביטחון<br>6. חשוב לטווח ארוך`;
            DOM.resultOverlay.classList.remove('hidden');
            DOM.resultOverlay.classList.add('show');
            
            // Play success effect if available
            if (window.BuffettShop && pct >= 60) {
                BuffettShop.effects.playCurrentEffect();
            }
            
            // Mascot reacts to game end
            if (window.BuffettMascot) {
                try { BuffettMascot.onGameEnd(pct); } catch(e) {}
            }
        }

        function endGameWithError(errorMessage) {
            DOM.resultMessage.textContent = errorMessage || "אירעה שגיאה.";
            DOM.expertFeedback.innerHTML = "";
            DOM.scoreEl.textContent = GameState.score;
            DOM.resultOverlay.classList.remove('hidden');
            DOM.resultOverlay.classList.add('show');
            DOM.gameContainer.classList.add('hidden');
        }

        function initGame() {
            // Reset state
            GameState.currentRound = 0;
            GameState.correctDecisions = 0;
            GameState.score = 0;
            GameState.gameRounds = [];
            GameState.decisionMade = false;
            GameState.projectionsUnlocked = false;
            GameState.hintUsed = false;
            resetCombo();

            // Reset UI
            DOM.correctDecisionsEl.textContent = "0";
            DOM.scoreEl.textContent = "0";
            DOM.currentRoundDisplay.textContent = `1/${GameState.totalRounds}`;

            initializeProgressStages();
            updateDifficultyButtonsState();

            // Reset difficulty selection
            [DOM.easyButton, DOM.mediumButton, DOM.hardButton].forEach(btn => btn.classList.remove('selected'));
            updateDifficultyDescription(null);

            // Hide all panels
            [DOM.companyHintDisplay, DOM.specialHintDisplay, DOM.decisionFeedback, 
             DOM.specialFeedback, DOM.resultOverlay, DOM.scoreContainer, 
             DOM.gameContainer, DOM.progressStagesContainer, DOM.companyDisplay, 
             DOM.specialRoundDisplay, DOM.loadingEl].forEach(el => el.classList.add('hidden'));

            DOM.resultOverlay.classList.remove('show');

            // Hide mascot and avatar when returning to menu
            if (window.BuffettMascot) {
                try { BuffettMascot.hide(); } catch(e) {}
            }
            const gameAvatarEl = document.getElementById('game-avatar');
            if (gameAvatarEl) gameAvatarEl.style.display = 'none';

            // Reset buttons
            [DOM.companyHintButton, DOM.specialHintButton].forEach(btn => {
                btn.disabled = true;
                btn.textContent = 'רמז (-?? נק\')';
            });

            // Show difficulty select
            DOM.difficultySelect.classList.remove('hidden');

            // Update menu points display
            if (typeof updateMenuPointsDisplay === 'function') {
                updateMenuPointsDisplay();
            }

            closeModal();
        }

        // ==============================
        // EVENT LISTENERS
        // ==============================
        // Difficulty buttons
        DOM.easyButton.addEventListener('click', () => selectDifficulty('easy'));
        DOM.mediumButton.addEventListener('click', () => selectDifficulty('medium'));
        DOM.hardButton.addEventListener('click', () => selectDifficulty('hard'));

        // Decision buttons
        DOM.buyButton.addEventListener('click', () => handleInvestmentDecision('buy'));
        DOM.passButton.addEventListener('click', () => handleInvestmentDecision('pass'));

        // Impact buttons
        DOM.positiveImpactButton.addEventListener('click', () => handleImpactDecision('positive'));
        DOM.neutralImpactButton.addEventListener('click', () => handleImpactDecision('neutral'));
        DOM.negativeImpactButton.addEventListener('click', () => handleImpactDecision('negative'));

        // Continue buttons
        DOM.continueButton.addEventListener('click', continueToNextRound);
        DOM.specialContinueButton.addEventListener('click', continueToNextRound);

        // Submit reasoning button
        DOM.submitReasoningButton.addEventListener('click', () => {
            const company = GameState.gameRounds[GameState.currentRound]?.data;
            if (company && GameState.lastDecision) {
                evaluateReasoning(company, GameState.lastDecision);
            }
        });

        // Hint buttons
        DOM.companyHintButton.addEventListener('click', handleHintPurchase);
        DOM.specialHintButton.addEventListener('click', handleHintPurchase);

        // Projections
        DOM.unlockProjectionsButton.addEventListener('click', handleUnlockProjections);

        // Restart
        DOM.restartButton.addEventListener('click', initGame);

        // Shop
        const openShopButton = document.getElementById('open-shop-button');
        if (openShopButton) {
            openShopButton.addEventListener('click', () => {
                if (window.BuffettShopUI) {
                    BuffettShopUI.open();
                }
            });
        }
        
        // Menu Shop Button
        const menuShopButton = document.getElementById('menu-shop-button');
        if (menuShopButton) {
            menuShopButton.addEventListener('click', () => {
                if (window.BuffettShopUI) {
                    BuffettShopUI.open();
                }
            });
        }
        
        // Update menu points display
        function updateMenuPointsDisplay() {
            const pointsEl = document.getElementById('menu-points-value');
            if (pointsEl && window.BuffettShop) {
                pointsEl.textContent = BuffettShop.logic.getPoints().toLocaleString();
            }
        }
        
        // Listen for shop equipment changes to update points
        window.addEventListener('buffettShopEquipmentChanged', updateMenuPointsDisplay);

        // Glossary
        DOM.glossaryButton.addEventListener('click', openGlossary);
        DOM.glossaryClose.addEventListener('click', closeGlossary);
        DOM.glossaryOverlay.addEventListener('click', (e) => {
            if (e.target === DOM.glossaryOverlay) closeGlossary();
        });

        // Modal
        DOM.modalOkButton.addEventListener('click', closeModal);
        DOM.modalCancelButton.addEventListener('click', closeModal);
        DOM.modalConfirmButton.addEventListener('click', () => {
            if (typeof currentConfirmCallback === 'function') {
                currentConfirmCallback();
            }
            closeModal();
        });
        DOM.modalOverlay.addEventListener('click', (e) => {
            if (e.target === DOM.modalOverlay) closeModal();
        });

        // ==============================
        // INITIALIZATION
        // ==============================
        window.addEventListener('load', () => {
            // Check if content is loaded
            if (!window.BuffettGame.contentLoaded) {
                console.error('Game content not loaded! Make sure game-content.js is included before game-engine.html');
            }
            
            // Initialize and apply shop cosmetics
            if (window.BuffettShop) {
                BuffettShop.applyEquipped();
                console.log('Shop cosmetics applied');
            }
            
            // Initialize office dashboard
            if (window.BuffettOffice) {
                BuffettOffice.init();
            }
            
            // Initialize mascot
            if (window.BuffettMascot) {
                BuffettMascot.init();
            }
            
            // Update menu points display
            updateMenuPointsDisplay();
            
            initGame();
        });
    