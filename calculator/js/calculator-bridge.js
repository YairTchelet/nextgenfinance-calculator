// ═══════════════════════════════════════════
// calculator-bridge.js — Integration Layer
// Patches core functions to use Supabase (CalcDB)
// Must load AFTER calculator-core.js and calculator-db.js
// ═══════════════════════════════════════════

(function () {
    'use strict';

    // Wait for DOMContentLoaded to ensure core is loaded
    const patchOnReady = () => {
        // ── Verify dependencies ──
        if (typeof CalcDB === 'undefined') {
            console.warn('CalcDB not loaded — running in localStorage-only mode');
            return;
        }

        console.log('🔌 Calculator Bridge — patching core for Supabase...');

        // ═══════════════════════════════════════════
        // 1. PATCH: saveAnalysis → CalcDB
        // ═══════════════════════════════════════════
        const _originalSaveAnalysis = window.saveAnalysis;
        window.saveAnalysis = async function () {
            const companyName = document.getElementById('company-name')?.value.trim() || 'ללא שם';

            // Gather data (same as original)
            const data = {
                company: companyName,
                mode: currentMode,
                notes: document.getElementById('user-notes')?.value || '',
                isAdv: isAdvancedMode,
                ct: { ...customThresholds },
                base: {},
                customDefs: [...customMetricsData],
                customVals: { ...customMetricInputs },
                totalScore: parseInt(document.getElementById('gauge-score-text')?.textContent || '0')
            };

            baseMetrics.forEach(m => {
                const inp = document.getElementById(m.inputs[0].id);
                if (inp) data.base[m.id] = inp.value;
                if (m.id === 'gross-margin') {
                    const g = document.getElementById('gross-margin-growth-value');
                    if (g) data.base['gross-margin-growth'] = g.value;
                }
            });

            try {
                const result = await CalcDB.saveAnalysis(data);
                if (result) {
                    showToast(`"${companyName}" נשמר בהצלחה ☁️`);
                } else {
                    showToast('שגיאה בשמירה', 'error');
                }
            } catch (e) {
                console.error('Save error:', e);
                // Fallback to original localStorage save
                if (_originalSaveAnalysis) _originalSaveAnalysis();
            }
        };

        // ═══════════════════════════════════════════
        // 2. PATCH: populateHistory → CalcDB
        // ═══════════════════════════════════════════
        const _originalPopulateHistory = window.populateHistory;
        window.populateHistory = async function () {
            const list = document.getElementById('history-list');
            if (!list) return;
            list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">טוען... ☁️</div>';

            try {
                const history = await CalcDB.getAnalyses(20);

                if (!history || history.length === 0) {
                    list.innerHTML = '<div class="no-history">לא נמצאו ניתוחים שמורים.</div>';
                    return;
                }

                list.innerHTML = '';
                history.forEach(a => {
                    const date = new Date(a.ts);
                    const dateStr = date.toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' });
                    const timeStr = date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

                    const item = document.createElement('div');
                    item.className = 'history-item';
                    item.innerHTML = `
                        <div class="history-info" onclick="loadAnalysisBridge('${a._supabaseId || a.id}')">
                            <div class="history-name">${a.company}</div>
                            <div class="history-meta">${dateStr} ${timeStr} · ${a.mode}${a.totalScore ? ` · ציון: ${a.totalScore}` : ''}</div>
                        </div>
                        <button class="history-delete" onclick="deleteAnalysisBridge('${a._supabaseId || a.id}')" title="מחק">
                            ${ICONS.trash}
                        </button>
                    `;
                    list.appendChild(item);
                });
            } catch (e) {
                console.error('populateHistory error:', e);
                // Fallback to original
                if (_originalPopulateHistory) _originalPopulateHistory();
            }
        };

        // ═══════════════════════════════════════════
        // 3. PATCH: loadAnalysis → CalcDB
        // ═══════════════════════════════════════════
        window.loadAnalysisBridge = async function (id) {
            try {
                const history = await CalcDB.getAnalyses(50);
                const a = history.find(x => (x._supabaseId || x.id) === id);

                if (!a) {
                    showToast('ניתוח לא נמצא', 'error');
                    return;
                }

                // Clear custom metrics UI
                document.getElementById('custom-body').innerHTML = '';
                customMetricsData = [];
                customMetricInputs = {};

                // Restore state
                document.getElementById('company-name').value = a.company || '';
                document.getElementById('user-notes').value = a.notes || '';
                isAdvancedMode = a.isAdv || false;
                customThresholds = a.ct || {};

                const toggle = document.getElementById('advanced-toggle');
                if (toggle) {
                    toggle.classList.toggle('active', isAdvancedMode);
                    toggle.setAttribute('aria-checked', isAdvancedMode);
                }
                document.querySelectorAll('.custom-threshold').forEach(el =>
                    el.classList.toggle('visible', isAdvancedMode)
                );

                switchMode(a.mode || 'balanced');
                metricScores = {};

                // Restore base metrics
                baseMetrics.forEach(m => {
                    const inp = document.getElementById(m.inputs[0].id);
                    if (inp) inp.value = a.base[m.id] !== undefined ? a.base[m.id] : '';
                    if (m.id === 'gross-margin') {
                        const g = document.getElementById('gross-margin-growth-value');
                        if (g) g.value = a.base['gross-margin-growth'] !== undefined ? a.base['gross-margin-growth'] : '';
                    }
                });

                // Restore custom metrics
                if (a.customDefs && Array.isArray(a.customDefs)) {
                    customMetricsData = [...a.customDefs];
                    customMetricsData.forEach(cm => {
                        addCustomMetricCard(cm);
                        const inp = document.getElementById(`${cm.id}-value`);
                        if (inp && a.customVals && a.customVals[cm.id] !== undefined) {
                            inp.value = a.customVals[cm.id];
                            customMetricInputs[cm.id] = inp.value;
                        }
                    });
                }

                document.getElementById('topbar-company').textContent = a.company || 'ניתוח חדש';
                updateAllMetrics();
                closeModal('history-modal');
                showToast(`"${a.company}" נטען בהצלחה ☁️`);
            } catch (e) {
                console.error('loadAnalysis error:', e);
                showToast('שגיאה בטעינה', 'error');
            }
        };

        // ═══════════════════════════════════════════
        // 4. PATCH: deleteAnalysis → CalcDB
        // ═══════════════════════════════════════════
        window.deleteAnalysisBridge = async function (id) {
            if (!confirm('למחוק שמירה זו?')) return;
            try {
                await CalcDB.deleteAnalysis(id);
                populateHistory();
                showToast('נמחק ☁️', 'warning');
            } catch (e) {
                console.error('deleteAnalysis error:', e);
                showToast('שגיאה במחיקה', 'error');
            }
        };

        // ═══════════════════════════════════════════
        // 5. PATCH: saveCustomStorage → CalcDB
        // ═══════════════════════════════════════════
        const _originalSaveCustomStorage = window.saveCustomStorage;
        window.saveCustomStorage = async function () {
            // Save to localStorage as fallback (original behavior)
            if (_originalSaveCustomStorage) _originalSaveCustomStorage();

            // Also save each to Supabase
            try {
                for (const cm of customMetricsData) {
                    await CalcDB.saveCustomMetric(cm);
                }
            } catch (e) {
                console.warn('Custom metric Supabase save failed (localStorage fallback active):', e);
            }
        };

        // ═══════════════════════════════════════════
        // 6. PATCH: loadCustomStorage → CalcDB
        // ═══════════════════════════════════════════
        const _originalLoadCustomStorage = window.loadCustomStorage;
        window.loadCustomStorage = async function () {
            try {
                const metrics = await CalcDB.getCustomMetrics();
                if (metrics && metrics.length > 0) {
                    customMetricsData = metrics;
                    metrics.forEach(cm => {
                        if (!cm.optimalValue) cm.optimalValue = cm.threshold * 2;
                        if (!cm.worstValue) cm.worstValue = 0;
                        addCustomMetricCard(cm);
                    });
                    console.log(`Loaded ${metrics.length} custom metrics from Supabase`);
                    return;
                }
            } catch (e) {
                console.warn('Supabase custom metrics load failed, using localStorage:', e);
            }
            // Fallback to localStorage
            if (_originalLoadCustomStorage) _originalLoadCustomStorage();
        };

        // ═══════════════════════════════════════════
        // 7. PATCH: deleteCustomMetric → CalcDB
        // ═══════════════════════════════════════════
        const _originalDeleteCustomMetric = window.deleteCustomMetric;
        window.deleteCustomMetric = async function (id) {
            if (!confirm('למחוק מדד זה?')) return;
            setTimeout(renderOptionalMetricsPicker, 100);

            // Remove from local state
            customMetricsData = customMetricsData.filter(m => m.id !== id);
            delete customMetricInputs[id];
            delete metricScores[id];
            delete customThresholds[id];
            document.getElementById(`${id}-card`)?.remove();

            // Save to both
            try { await CalcDB.deleteCustomMetric(id); } catch (e) { }
            saveCustomStorage();
            updateAllMetrics();
            showToast('המדד נמחק', 'warning');
        };

        // ═══════════════════════════════════════════
        // 8. SAVE PREFERENCES ON MODE CHANGE
        // ═══════════════════════════════════════════
        const _originalSwitchMode = window.switchMode;
        window.switchMode = function (mode) {
            if (_originalSwitchMode) _originalSwitchMode(mode);
            // Save preference
            CalcDB.savePreferences({
                mode: mode,
                isAdvanced: isAdvancedMode,
                customThresholds: customThresholds,
                lastTemplate: activeTemplate
            }).catch(() => { });
        };

        // ═══════════════════════════════════════════
        // 9. LOAD PREFERENCES ON INIT
        // ═══════════════════════════════════════════
        async function loadSavedPreferences() {
            try {
                const prefs = await CalcDB.getPreferences();
                if (prefs && prefs.mode) {
                    switchMode(prefs.mode);
                }
                if (prefs && prefs.isAdvanced) {
                    const toggle = document.getElementById('advanced-toggle');
                    if (toggle && !isAdvancedMode) toggle.click();
                }
                if (prefs && prefs.customThresholds) {
                    Object.assign(customThresholds, prefs.customThresholds);
                }
                if (prefs && prefs.lastTemplate) {
                    activeTemplate = prefs.lastTemplate;
                }
            } catch (e) {
                console.warn('Failed to load preferences:', e);
            }
        }

        // ═══════════════════════════════════════════
        // 10. RUN MIGRATION + LOAD PREFS
        // ═══════════════════════════════════════════
        (async () => {
            try {
                await CalcDB.migrateFromLocalStorage();
                await loadSavedPreferences();
                // Reload custom metrics from Supabase
                await window.loadCustomStorage();
                console.log('✓ Calculator Bridge — ready');
            } catch (e) {
                console.warn('Bridge init partial failure (non-fatal):', e);
            }
        })();
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', patchOnReady);
    } else {
        patchOnReady();
    }
})();
