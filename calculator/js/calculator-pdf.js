// ═══════════════════════════════════════════
// calculator-pdf.js — Branded PDF Report Export
// Requires: html2canvas + jsPDF (loaded via CDN in index.html)
// Gated behind profiles.has_access paywall
// ═══════════════════════════════════════════

window.CalcPDF = (() => {

    // ── Paywall gate ──
    async function requireAccess() {
        if (typeof CalcAI !== 'undefined' && CalcAI.checkAccess) {
            const has = await CalcAI.checkAccess();
            if (!has) {
                if (CalcAI.showUpgradeModal) CalcAI.showUpgradeModal('ייצוא PDF');
                else if (typeof showToast === 'function') showToast('פיצ׳ר זמין לתלמידי הקורס בלבד', 'warning');
                return false;
            }
            return true;
        }
        // Fallback: check directly via CalcDB
        if (typeof CalcDB !== 'undefined' && CalcDB.hasAccess) {
            const has = await CalcDB.hasAccess();
            if (!has) {
                if (typeof showToast === 'function') showToast('ייצוא PDF זמין לתלמידי הקורס בלבד', 'warning');
                return false;
            }
            return true;
        }
        return false;
    }

    // ── Gather current analysis data ──
    function gatherData() {
        const companyName = document.getElementById('company-name')?.value?.trim() || 'חברה ללא שם';
        const modeTab = document.querySelector('.mode-tab.active');
        const mode = modeTab?.dataset?.mode || 'balanced';
        const modeLabels = { growth: '🚀 צמיחה', balanced: '⚖️ מאוזן', value: '💎 ערך' };
        const modeLabel = modeLabels[mode] || 'מאוזן';

        const scoreText = document.querySelector('.gauge-score-text, #gauge-score-text');
        const totalScore = scoreText ? parseInt(scoreText.textContent) : 0;
        const labelText = document.getElementById('gauge-label-text')?.textContent || '';
        const criteriaText = document.getElementById('score-criteria')?.textContent || '';

        // Collect metric values and scores
        const metrics = [];
        const baseMetricEls = typeof baseMetrics !== 'undefined' ? baseMetrics : [];
        
        baseMetricEls.forEach(m => {
            const inp = document.getElementById(m.inputs[0].id);
            const val = inp ? parseFloat(inp.value) : NaN;
            if (isNaN(val)) return;

            const scoreEl = document.querySelector(`#${m.id}-card .metric-score`);
            const score = scoreEl ? parseInt(scoreEl.textContent) : 0;
            const passEl = document.querySelector(`#${m.id}-card .metric-pass`);
            const pass = passEl ? passEl.classList.contains('pass') : score >= 50;

            metrics.push({
                id: m.id,
                name: m.name,
                value: val,
                unit: m.unit || '',
                score,
                pass,
                category: m.category
            });
        });

        // Category scores
        const categories = {};
        ['profitability', 'growth', 'valuation', 'stability'].forEach(cat => {
            const catMetrics = metrics.filter(m => m.category === cat);
            if (catMetrics.length > 0) {
                const avg = Math.round(catMetrics.reduce((s, m) => s + m.score, 0) / catMetrics.length);
                categories[cat] = { score: avg, count: catMetrics.length };
            }
        });

        const notes = document.getElementById('user-notes')?.value?.trim() || '';
        const dateStr = new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });

        return { companyName, mode, modeLabel, totalScore, labelText, criteriaText, metrics, categories, notes, dateStr };
    }

    // ── Score color helper ──
    function scoreColor(score) {
        if (score >= 80) return '#0d9488';
        if (score >= 60) return '#10B981';
        if (score >= 40) return '#F59E0B';
        if (score >= 20) return '#F97316';
        return '#EF4444';
    }

    function scoreLabel(score) {
        if (score >= 80) return 'מעולה';
        if (score >= 60) return 'טוב';
        if (score >= 40) return 'בינוני';
        if (score >= 20) return 'חלש';
        return 'קריטי';
    }

    function catHebrew(cat) {
        const map = { profitability: 'רווחיות', growth: 'צמיחה', valuation: 'הערכת שווי', stability: 'יציבות' };
        return map[cat] || cat;
    }

    function catEmoji(cat) {
        const map = { profitability: '💰', growth: '📈', valuation: '⚖️', stability: '🛡️' };
        return map[cat] || '📊';
    }

    // ── Build the branded HTML report ──
    function buildReportHTML(data) {
        const { companyName, modeLabel, totalScore, metrics, categories, notes, dateStr } = data;
        const clr = scoreColor(totalScore);
        const lbl = scoreLabel(totalScore);

        // Build metric rows grouped by category
        const catOrder = ['profitability', 'growth', 'valuation', 'stability'];
        let metricsHTML = '';

        catOrder.forEach(cat => {
            const catMetrics = metrics.filter(m => m.category === cat);
            if (catMetrics.length === 0) return;
            const catScore = categories[cat]?.score || 0;

            metricsHTML += `
                <tr class="cat-row">
                    <td colspan="4" style="background:#f8fafc;font-weight:700;font-size:11px;color:#475569;padding:6px 10px;border-bottom:1px solid #e2e8f0;">
                        ${catEmoji(cat)} ${catHebrew(cat)}
                        <span style="float:left;color:${scoreColor(catScore)};font-weight:700;">${catScore}%</span>
                    </td>
                </tr>
            `;

            catMetrics.forEach(m => {
                const barW = Math.max(4, m.score);
                metricsHTML += `
                    <tr>
                        <td style="font-size:11px;color:#334155;padding:5px 10px;border-bottom:1px solid #f1f5f9;white-space:nowrap;">${m.name}</td>
                        <td style="text-align:center;font-size:11px;font-weight:600;color:#334155;padding:5px 8px;border-bottom:1px solid #f1f5f9;">${m.value}${m.unit}</td>
                        <td style="padding:5px 8px;border-bottom:1px solid #f1f5f9;">
                            <div style="background:#f1f5f9;border-radius:4px;height:8px;overflow:hidden;">
                                <div style="width:${barW}%;height:100%;background:${scoreColor(m.score)};border-radius:4px;"></div>
                            </div>
                        </td>
                        <td style="text-align:center;font-size:11px;font-weight:700;color:${scoreColor(m.score)};padding:5px 8px;border-bottom:1px solid #f1f5f9;">${m.score}</td>
                    </tr>
                `;
            });
        });

        // Category summary boxes
        let catBoxes = '';
        catOrder.forEach(cat => {
            if (!categories[cat]) return;
            const s = categories[cat].score;
            catBoxes += `
                <div style="flex:1;background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;text-align:center;min-width:0;">
                    <div style="font-size:20px;margin-bottom:2px;">${catEmoji(cat)}</div>
                    <div style="font-size:10px;color:#64748b;font-weight:500;margin-bottom:4px;">${catHebrew(cat)}</div>
                    <div style="font-size:18px;font-weight:800;color:${scoreColor(s)};">${s}%</div>
                </div>
            `;
        });

        // Strengths and weaknesses
        const sorted = [...metrics].sort((a, b) => b.score - a.score);
        const strengths = sorted.filter(m => m.score >= 60).slice(0, 3);
        const weaknesses = sorted.filter(m => m.score < 50).slice(-3).reverse();

        let strengthsHTML = strengths.map(m =>
            `<span style="display:inline-block;background:#f0fdf4;color:#16a34a;font-size:10px;font-weight:600;padding:3px 8px;border-radius:12px;margin:2px;">✓ ${m.name} (${m.score})</span>`
        ).join('');

        let weaknessesHTML = weaknesses.map(m =>
            `<span style="display:inline-block;background:#fef2f2;color:#dc2626;font-size:10px;font-weight:600;padding:3px 8px;border-radius:12px;margin:2px;">✕ ${m.name} (${m.score})</span>`
        ).join('');

        // Notes section
        const notesSection = notes ? `
            <div style="margin-top:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
                <div style="font-size:10px;font-weight:700;color:#475569;margin-bottom:4px;">📝 הערות</div>
                <div style="font-size:10px;color:#64748b;line-height:1.6;white-space:pre-wrap;">${notes.substring(0, 300)}${notes.length > 300 ? '...' : ''}</div>
            </div>
        ` : '';

        return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Rubik', sans-serif; background: white; }
        .page {
            width: 210mm; min-height: 297mm; max-height: 297mm;
            margin: 0 auto; padding: 20mm 18mm 16mm;
            overflow: hidden; position: relative;
        }
        table { width: 100%; border-collapse: collapse; }
    </style>
</head>
<body>
<div class="page">
    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-bottom:12px;border-bottom:2px solid #0d9488;">
        <div>
            <div style="font-size:22px;font-weight:900;color:#0f172a;line-height:1.2;">${companyName}</div>
            <div style="font-size:11px;color:#64748b;margin-top:4px;">דוח בריאות פיננסית · ${modeLabel} · ${dateStr}</div>
        </div>
        <div style="text-align:left;">
            <div style="font-size:10px;font-weight:600;color:#0d9488;letter-spacing:0.5px;">NewGen Finance</div>
            <div style="font-size:8px;color:#94a3b8;">newgenfinance.co.il</div>
        </div>
    </div>

    <!-- Score + Categories Row -->
    <div style="display:flex;gap:12px;margin-bottom:14px;">
        <!-- Big score -->
        <div style="flex:0 0 120px;background:linear-gradient(135deg,${clr}15,${clr}08);border:2px solid ${clr};border-radius:12px;padding:14px;text-align:center;">
            <div style="font-size:36px;font-weight:900;color:${clr};line-height:1;">${totalScore}</div>
            <div style="font-size:10px;color:${clr};font-weight:600;margin-top:2px;">${lbl}</div>
            <div style="font-size:8px;color:#94a3b8;margin-top:4px;">מתוך 100</div>
        </div>
        <!-- Category boxes -->
        <div style="flex:1;display:flex;gap:8px;">
            ${catBoxes}
        </div>
    </div>

    <!-- Strengths / Weaknesses -->
    <div style="display:flex;gap:10px;margin-bottom:12px;">
        <div style="flex:1;">
            <div style="font-size:10px;font-weight:700;color:#16a34a;margin-bottom:4px;">💪 נקודות חוזק</div>
            <div>${strengthsHTML || '<span style="font-size:10px;color:#94a3b8;">—</span>'}</div>
        </div>
        <div style="flex:1;">
            <div style="font-size:10px;font-weight:700;color:#dc2626;margin-bottom:4px;">⚠️ סימני אזהרה</div>
            <div>${weaknessesHTML || '<span style="font-size:10px;color:#94a3b8;">—</span>'}</div>
        </div>
    </div>

    <!-- Metrics Table -->
    <table>
        <thead>
            <tr style="background:#0d9488;">
                <th style="text-align:right;font-size:10px;font-weight:600;color:white;padding:6px 10px;border-radius:0 6px 0 0;">מדד</th>
                <th style="text-align:center;font-size:10px;font-weight:600;color:white;padding:6px 8px;">ערך</th>
                <th style="text-align:center;font-size:10px;font-weight:600;color:white;padding:6px 8px;width:25%;">ביצוע</th>
                <th style="text-align:center;font-size:10px;font-weight:600;color:white;padding:6px 8px;border-radius:6px 0 0 0;width:50px;">ציון</th>
            </tr>
        </thead>
        <tbody>
            ${metricsHTML}
        </tbody>
    </table>

    ${notesSection}

    <!-- Footer -->
    <div style="position:absolute;bottom:16mm;left:18mm;right:18mm;display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #e2e8f0;">
        <div style="font-size:8px;color:#94a3b8;">הופק באמצעות מחשבון הבריאות הפיננסית של NewGen Finance</div>
        <div style="font-size:8px;color:#94a3b8;">www.newgenfinance.co.il · ${dateStr}</div>
    </div>
</div>
</body>
</html>`;
    }

    // ── Generate PDF from HTML ──
    async function generatePDF() {
        // Check access
        const hasAccess = await requireAccess();
        if (!hasAccess) return;

        const data = gatherData();
        if (data.metrics.length === 0) {
            if (typeof showToast === 'function') showToast('הזן לפחות מדד אחד לפני ייצוא', 'warning');
            return;
        }

        // Show loading
        const btn = document.getElementById('pdf-export-btn');
        const origHTML = btn?.innerHTML || '';
        if (btn) {
            btn.innerHTML = '<span class="ai-spinner"></span> מייצר PDF...';
            btn.disabled = true;
        }

        try {
            const html = buildReportHTML(data);

            // Create off-screen iframe
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:210mm;height:297mm;border:none;';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(html);
            iframeDoc.close();

            // Wait for fonts and rendering
            await new Promise(r => setTimeout(r, 800));

            const pageEl = iframeDoc.querySelector('.page');
            if (!pageEl) throw new Error('Report element not found');

            // html2canvas → jsPDF
            const canvas = await html2canvas(pageEl, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: pageEl.scrollWidth,
                height: pageEl.scrollHeight,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfW = pdf.internal.pageSize.getWidth();
            const pdfH = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);

            // Download
            const safeName = data.companyName.replace(/[^א-תa-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-') || 'report';
            pdf.save(`${safeName}-financial-health.pdf`);

            if (typeof showToast === 'function') showToast('📄 דוח PDF הורד בהצלחה!');

            // Cleanup
            document.body.removeChild(iframe);

        } catch (err) {
            console.error('PDF export error:', err);
            if (typeof showToast === 'function') showToast('שגיאה בייצוא: ' + err.message, 'error');
        } finally {
            if (btn) {
                btn.innerHTML = origHTML;
                btn.disabled = false;
            }
        }
    }

    // ── Inject PDF button into toolbar ──
    function injectPDFButton() {
        const analysisGroup = document.getElementById('toolbar-analysis');
        if (!analysisGroup || document.getElementById('pdf-export-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'pdf-export-btn';
        btn.className = 'tool-btn ai-tool-btn';
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>PDF</span>
            <span class="ai-pro-badge">PRO</span>
        `;
        btn.onclick = generatePDF;
        analysisGroup.appendChild(btn);
    }

    // ── Also add PDF button to score panel actions ──
    function injectScorePanelButton() {
        const actions = document.querySelector('.score-actions');
        if (!actions || document.getElementById('pdf-score-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'pdf-score-btn';
        btn.className = 'score-btn secondary';
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            ייצוא דוח PDF
        `;
        btn.onclick = generatePDF;
        actions.appendChild(btn);
    }

    // ── Init ──
    function init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => { injectPDFButton(); injectScorePanelButton(); });
        } else {
            injectPDFButton();
            injectScorePanelButton();
        }
    }

    init();

    return { generatePDF };
})();
