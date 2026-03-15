// ═══════════════════════════════════════════
// calculator-db.js — Supabase Persistence Layer
// Replaces all localStorage usage with Supabase
// ═══════════════════════════════════════════

window.CalcDB = (() => {
    // ── Helpers ──
    let _client = null;

    function getClient() {
        if (_client) return _client;

        // auth-guard.js exposes this
        if (window.__supabase) {
            _client = window.__supabase;
            console.log('CalcDB: using auth-guard Supabase client');
            return _client;
        }

        // Fallback: create from global constants
        if (typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_ANON_KEY !== 'undefined' &&
            typeof supabase !== 'undefined' && supabase.createClient) {
            _client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            window.__supabase = _client;
            console.log('CalcDB: created new Supabase client (fallback)');
            return _client;
        }

        console.warn('CalcDB: Supabase not available');
        return null;
    }

    function getUserId() {
        const client = getClient();
        if (!client) return null;
        try {
            // supabase-config.js typically stores session
            const session = client.auth?.session?.() || null;
            if (session?.user?.id) return session.user.id;
            // Try getUser for newer SDK
            return null; // Will be resolved async
        } catch (e) { return null; }
    }

    async function getUserIdAsync() {
        const client = getClient();
        if (!client) return null;
        try {
            const { data } = await client.auth.getUser();
            return data?.user?.id || null;
        } catch (e) { return null; }
    }

    // ═══════════════════════════════════════════
    // ANALYSES (replaces fh_history_v6)
    // ═══════════════════════════════════════════
    async function saveAnalysis(analysisData) {
        const client = getClient();
        const userId = await getUserIdAsync();
        console.log('CalcDB.saveAnalysis — userId:', userId, '| client:', !!client);
        if (!client || !userId) {
            console.warn('CalcDB: No auth, falling back to localStorage');
            return saveAnalysisLocal(analysisData);
        }

        const row = {
            user_id: userId,
            company: analysisData.company || 'ללא שם',
            mode: analysisData.mode || 'balanced',
            notes: analysisData.notes || '',
            is_advanced: analysisData.isAdv || false,
            custom_thresholds: analysisData.ct || {},
            base_metrics: analysisData.base || {},
            custom_defs: analysisData.customDefs || [],
            custom_vals: analysisData.customVals || {},
            total_score: analysisData.totalScore || 0
        };

        console.log('CalcDB.saveAnalysis — inserting row for:', row.company);

        const { data, error } = await client
            .from('calculator_analyses')
            .insert(row)
            .select()
            .maybeSingle();

        if (error) {
            console.error('CalcDB saveAnalysis error:', error.message, error.details, error.hint);
            return saveAnalysisLocal(analysisData);
        }
        console.log('CalcDB.saveAnalysis — saved successfully:', data?.id);
        return data;
    }

    async function getAnalyses(limit = 20) {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) return getAnalysesLocal();

        const { data, error } = await client
            .from('calculator_analyses')
            .select('*')
            .order('updated_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('CalcDB getAnalyses error:', error);
            return getAnalysesLocal();
        }

        // Transform to match existing format
        return (data || []).map(row => ({
            id: row.id,
            ver: 7, // New version for Supabase
            ts: row.updated_at || row.created_at,
            company: row.company,
            mode: row.mode,
            notes: row.notes,
            isAdv: row.is_advanced,
            ct: row.custom_thresholds || {},
            base: row.base_metrics || {},
            customDefs: row.custom_defs || [],
            customVals: row.custom_vals || {},
            totalScore: row.total_score,
            _supabaseId: row.id
        }));
    }

    async function deleteAnalysis(id) {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) return deleteAnalysisLocal(id);

        const { error } = await client
            .from('calculator_analyses')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('CalcDB deleteAnalysis error:', error);
            return deleteAnalysisLocal(id);
        }
        return true;
    }

    async function updateAnalysis(id, updates) {
        const client = getClient();
        if (!client) return false;

        const row = {};
        if (updates.company !== undefined) row.company = updates.company;
        if (updates.mode !== undefined) row.mode = updates.mode;
        if (updates.notes !== undefined) row.notes = updates.notes;
        if (updates.isAdv !== undefined) row.is_advanced = updates.isAdv;
        if (updates.ct !== undefined) row.custom_thresholds = updates.ct;
        if (updates.base !== undefined) row.base_metrics = updates.base;
        if (updates.customDefs !== undefined) row.custom_defs = updates.customDefs;
        if (updates.customVals !== undefined) row.custom_vals = updates.customVals;
        if (updates.totalScore !== undefined) row.total_score = updates.totalScore;

        const { error } = await client
            .from('calculator_analyses')
            .update(row)
            .eq('id', id);

        if (error) { console.error('CalcDB updateAnalysis error:', error); return false; }
        return true;
    }

    // ═══════════════════════════════════════════
    // CUSTOM METRICS (replaces fh_custom_v3)
    // ═══════════════════════════════════════════
    async function saveCustomMetric(metricDef) {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) {
            saveCustomMetricsLocal(metricDef);
            return metricDef;
        }

        const row = {
            user_id: userId,
            metric_id: metricDef.id,
            name: metricDef.name,
            description: metricDef.description || '',
            threshold: metricDef.threshold,
            compare: metricDef.compare || 'above',
            optimal_value: metricDef.optimalValue,
            worst_value: metricDef.worstValue,
            weights: metricDef.weights || { growth: 1, balanced: 1, value: 1 },
            unit: metricDef.unit || ''
        };

        const { data, error } = await client
            .from('calculator_custom_metrics')
            .insert(row)
            .select()
            .maybeSingle();

        if (error) {
            console.error('CalcDB saveCustomMetric error:', error);
            saveCustomMetricsLocal(metricDef);
        }
        return data || metricDef;
    }

    async function getCustomMetrics() {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) return getCustomMetricsLocal();

        const { data, error } = await client
            .from('calculator_custom_metrics')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('CalcDB getCustomMetrics error:', error);
            return getCustomMetricsLocal();
        }

        return (data || []).map(row => ({
            id: row.metric_id,
            name: row.name,
            description: row.description,
            threshold: Number(row.threshold),
            compare: row.compare,
            optimalValue: Number(row.optimal_value),
            worstValue: Number(row.worst_value),
            weights: row.weights,
            unit: row.unit,
            inputs: [{ id: `${row.metric_id}-value`, step: 0.1, unit: row.unit || undefined }],
            _supabaseId: row.id
        }));
    }

    async function deleteCustomMetric(metricId) {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) return deleteCustomMetricLocal(metricId);

        const { error } = await client
            .from('calculator_custom_metrics')
            .delete()
            .eq('metric_id', metricId);

        if (error) console.error('CalcDB deleteCustomMetric error:', error);
        return !error;
    }

    // ═══════════════════════════════════════════
    // USER PREFERENCES
    // ═══════════════════════════════════════════
    async function savePreferences(prefs) {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) {
            localStorage.setItem('fh_prefs', JSON.stringify(prefs));
            return;
        }

        const row = {
            user_id: userId,
            default_mode: prefs.mode || 'balanced',
            is_advanced: prefs.isAdvanced || false,
            custom_thresholds: prefs.customThresholds || {},
            last_template: prefs.lastTemplate || 'tech'
        };

        const { error } = await client
            .from('calculator_preferences')
            .upsert(row, { onConflict: 'user_id' });

        if (error) {
            console.error('CalcDB savePreferences error:', error);
            localStorage.setItem('fh_prefs', JSON.stringify(prefs));
        }
    }

    async function getPreferences() {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) {
            try { return JSON.parse(localStorage.getItem('fh_prefs')) || {}; }
            catch { return {}; }
        }

        const { data, error } = await client
            .from('calculator_preferences')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

        if (error || !data) {
            try { return JSON.parse(localStorage.getItem('fh_prefs')) || {}; }
            catch { return {}; }
        }

        return {
            mode: data.default_mode,
            isAdvanced: data.is_advanced,
            customThresholds: data.custom_thresholds || {},
            lastTemplate: data.last_template
        };
    }

    // ═══════════════════════════════════════════
    // LOCALSTORAGE FALLBACKS (offline / no auth)
    // ═══════════════════════════════════════════
    const LS_HISTORY = 'fh_history_v6';
    const LS_CUSTOM = 'fh_custom_v3';
    const MAX_HIST = 20;

    function saveAnalysisLocal(data) {
        try {
            const hist = getAnalysesLocal();
            const entry = { ...data, id: `a_${Date.now()}`, ver: 6, ts: new Date().toISOString() };
            hist.unshift(entry);
            localStorage.setItem(LS_HISTORY, JSON.stringify(hist.slice(0, MAX_HIST)));
            return entry;
        } catch (e) { console.warn('localStorage save failed:', e); return null; }
    }

    function getAnalysesLocal() {
        try { return JSON.parse(localStorage.getItem(LS_HISTORY)) || []; }
        catch { return []; }
    }

    function deleteAnalysisLocal(id) {
        try {
            let hist = getAnalysesLocal();
            hist = hist.filter(a => a.id !== id);
            localStorage.setItem(LS_HISTORY, JSON.stringify(hist));
            return true;
        } catch { return false; }
    }

    function saveCustomMetricsLocal(metric) {
        try {
            const arr = getCustomMetricsLocal();
            arr.push(metric);
            localStorage.setItem(LS_CUSTOM, JSON.stringify(arr));
        } catch (e) { console.warn('localStorage custom save failed:', e); }
    }

    function getCustomMetricsLocal() {
        try { return JSON.parse(localStorage.getItem(LS_CUSTOM)) || []; }
        catch { return []; }
    }

    function deleteCustomMetricLocal(id) {
        try {
            let arr = getCustomMetricsLocal();
            arr = arr.filter(m => m.id !== id);
            localStorage.setItem(LS_CUSTOM, JSON.stringify(arr));
            return true;
        } catch { return false; }
    }

    // ═══════════════════════════════════════════
    // MIGRATION: localStorage → Supabase
    // One-time migration for existing users
    // ═══════════════════════════════════════════
    async function migrateFromLocalStorage() {
        const client = getClient();
        const userId = await getUserIdAsync();
        if (!client || !userId) return;

        // Check if already migrated
        const migrated = localStorage.getItem('fh_migrated_to_supabase');
        if (migrated === 'true') return;

        try {
            // Migrate analyses
            const localHist = getAnalysesLocal();
            if (localHist.length > 0) {
                const rows = localHist.map(a => ({
                    user_id: userId,
                    company: a.company || 'ללא שם',
                    mode: a.mode || 'balanced',
                    notes: a.notes || '',
                    is_advanced: a.isAdv || false,
                    custom_thresholds: a.ct || {},
                    base_metrics: a.base || {},
                    custom_defs: a.customDefs || [],
                    custom_vals: a.customVals || {},
                    total_score: 0,
                    created_at: a.ts || new Date().toISOString()
                }));

                const { error } = await client
                    .from('calculator_analyses')
                    .insert(rows);

                if (error) {
                    console.warn('Migration analyses error (non-fatal):', error);
                } else {
                    console.log(`Migrated ${rows.length} analyses to Supabase`);
                }
            }

            // Migrate custom metrics
            const localCustom = getCustomMetricsLocal();
            if (localCustom.length > 0) {
                const rows = localCustom.map(m => ({
                    user_id: userId,
                    metric_id: m.id,
                    name: m.name,
                    description: m.description || '',
                    threshold: m.threshold,
                    compare: m.compare || 'above',
                    optimal_value: m.optimalValue || m.threshold * 2,
                    worst_value: m.worstValue || 0,
                    weights: m.weights || { growth: 1, balanced: 1, value: 1 },
                    unit: m.unit || ''
                }));

                const { error } = await client
                    .from('calculator_custom_metrics')
                    .insert(rows);

                if (error) {
                    console.warn('Migration custom metrics error (non-fatal):', error);
                } else {
                    console.log(`Migrated ${rows.length} custom metrics to Supabase`);
                }
            }

            localStorage.setItem('fh_migrated_to_supabase', 'true');
            console.log('✓ localStorage → Supabase migration complete');
        } catch (e) {
            console.warn('Migration failed (non-fatal):', e);
        }
    }

    // ═══ Public API ═══
    return {
        // Analyses
        saveAnalysis,
        getAnalyses,
        deleteAnalysis,
        updateAnalysis,
        // Custom Metrics
        saveCustomMetric,
        getCustomMetrics,
        deleteCustomMetric,
        // Preferences
        savePreferences,
        getPreferences,
        // Migration
        migrateFromLocalStorage,
        // Utilities
        getUserIdAsync,
        getClient
    };
})();
