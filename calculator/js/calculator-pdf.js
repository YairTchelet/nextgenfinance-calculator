// ═══════════════════════════════════════════
// calculator-pdf.js — Branded PDF Report Export
// Requires: html2canvas + jsPDF (loaded via CDN)
// Gated behind profiles.has_access paywall
// ═══════════════════════════════════════════

window.CalcPDF = (() => {

    async function requireAccess() {
        const client = (typeof CalcDB !== 'undefined' && CalcDB.getClient)
            ? CalcDB.getClient()
            : window.__supabase;
        if (!client) {
            if (typeof showToast === 'function') showToast('ייצוא PDF זמין למשתמשים רשומים — התחברו כדי להמשיך', 'warning');
            return false;
        }
        const { data: { session } } = await client.auth.getSession();
        if (!session) {
            if (typeof showToast === 'function') showToast('ייצוא PDF זמין למשתמשים רשומים — התחברו כדי להמשיך', 'warning');
            return false;
        }
        return true;
    }

    // ── Gather data using ACTUAL DOM element IDs ──
    function gatherData() {
        const companyName = document.getElementById('company-name')?.value?.trim() || 'חברה ללא שם';
        const modeTab = document.querySelector('.mode-tab.active');
        const mode = modeTab?.dataset?.mode || 'balanced';
        const modeLabels = { growth: '🚀 צמיחה', balanced: '⚖️ מאוזן', value: '💎 ערך' };
        const modeLabel = modeLabels[mode] || 'מאוזן';

        // Total score from the gauge SVG text
        const scoreText = document.getElementById('gauge-score-text');
        const totalScore = scoreText ? parseInt(scoreText.textContent) : 0;

        // Collect metrics using actual DOM IDs: {id}-bscore for score, {id}-status for pass/fail
        const metrics = [];
        const baseMetricEls = typeof baseMetrics !== 'undefined' ? baseMetrics : [];

        baseMetricEls.forEach(m => {
            const inp = document.getElementById(m.inputs[0].id);
            const val = inp ? parseFloat(inp.value) : NaN;
            if (isNaN(val)) return;

            // Score from the bar score element
            const bscoreEl = document.getElementById(`${m.id}-bscore`);
            const score = bscoreEl ? parseInt(bscoreEl.textContent) : 0;

            // Pass/fail from the status element class
            const statusEl = document.getElementById(`${m.id}-status`);
            const pass = statusEl ? statusEl.classList.contains('pass') : false;

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

        // Insights text from the insights panel
        let insightsText = '';
        const insightsGroups = document.getElementById('insights-groups');
        if (insightsGroups) {
            const items = insightsGroups.querySelectorAll('.insight-item');
            items.forEach(item => {
                const title = item.querySelector('.insight-title, strong, b')?.textContent || '';
                const desc = item.querySelector('.insight-desc, p, span:last-child')?.textContent || '';
                if (title || desc) insightsText += `• ${title} ${desc}\n`;
            });
        }
        // Fallback: try severity summary
        if (!insightsText) {
            const severity = document.getElementById('severity-summary');
            if (severity && severity.textContent.trim()) {
                insightsText = severity.textContent.trim();
            }
        }

        const notes = document.getElementById('user-notes')?.value?.trim() || '';
        const dateStr = new Date().toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });

        return { companyName, mode, modeLabel, totalScore, metrics, categories, insightsText, notes, dateStr };
    }

    function scoreColor(score) {
        if (score >= 75) return '#0d9488';
        if (score >= 50) return '#10B981';
        if (score >= 25) return '#F59E0B';
        return '#EF4444';
    }

    function scoreLabel(score) {
        if (score >= 75) return 'מצוין';
        if (score >= 50) return 'טוב';
        if (score >= 25) return 'בינוני';
        return 'חלש';
    }

    function catHebrew(cat) {
        return { profitability: 'רווחיות', growth: 'צמיחה', valuation: 'הערכת שווי', stability: 'יציבות' }[cat] || cat;
    }

    function catEmoji(cat) {
        return { profitability: '💰', growth: '📈', valuation: '⚖️', stability: '🛡️' }[cat] || '📊';
    }

    // ── Build HTML report ──
    function buildReportHTML(data) {
        const { companyName, modeLabel, totalScore, metrics, categories, insightsText, notes, dateStr } = data;
        const clr = scoreColor(totalScore);
        const lbl = scoreLabel(totalScore);

        // Category boxes
        const catOrder = ['profitability', 'growth', 'valuation', 'stability'];
        let catBoxes = '';
        catOrder.forEach(cat => {
            const s = categories[cat]?.score || 0;
            const c = scoreColor(s);
            catBoxes += `
                <div style="flex:1;background:white;border:1px solid #e2e8f0;border-radius:8px;padding:10px;text-align:center;">
                    <div style="font-size:18px;">${catEmoji(cat)}</div>
                    <div style="font-size:9px;color:#64748b;font-weight:500;margin:2px 0;">${catHebrew(cat)}</div>
                    <div style="font-size:18px;font-weight:800;color:${c};">${s}%</div>
                </div>`;
        });

        // Metric rows grouped by category
        let metricsHTML = '';
        catOrder.forEach(cat => {
            const catMetrics = metrics.filter(m => m.category === cat);
            if (!catMetrics.length) return;
            const catScore = categories[cat]?.score || 0;

            metricsHTML += `<tr><td colspan="4" style="background:#f0fdf4;font-weight:700;font-size:10px;color:#475569;padding:6px 10px;border-bottom:1px solid #e2e8f0;">
                ${catEmoji(cat)} ${catHebrew(cat)} <span style="float:left;color:${scoreColor(catScore)};font-weight:700;">${catScore}%</span></td></tr>`;

            catMetrics.forEach(m => {
                const barColor = scoreColor(m.score);
                const passIcon = m.pass ? '✓' : '✕';
                const passColor = m.pass ? '#16a34a' : '#dc2626';
                metricsHTML += `<tr>
                    <td style="font-size:10px;color:#334155;padding:5px 10px;border-bottom:1px solid #f1f5f9;">${m.name}</td>
                    <td style="text-align:center;font-size:11px;font-weight:600;color:#334155;padding:5px 6px;border-bottom:1px solid #f1f5f9;">${m.value}${m.unit}</td>
                    <td style="padding:5px 6px;border-bottom:1px solid #f1f5f9;">
                        <div style="background:#f1f5f9;border-radius:3px;height:7px;overflow:hidden;width:100%;">
                            <div style="width:${Math.max(3, m.score)}%;height:100%;background:${barColor};border-radius:3px;"></div>
                        </div>
                    </td>
                    <td style="text-align:center;font-size:10px;font-weight:700;color:${passColor};padding:5px 6px;border-bottom:1px solid #f1f5f9;">${passIcon} ${m.score}</td>
                </tr>`;
            });
        });

        // Strengths and warnings
        const sorted = [...metrics].sort((a, b) => b.score - a.score);
        const strengths = sorted.filter(m => m.pass).slice(0, 4);
        const warnings = sorted.filter(m => !m.pass).reverse().slice(0, 4);

        const strengthsHTML = strengths.length
            ? strengths.map(m => `<span style="display:inline-block;background:#f0fdf4;color:#16a34a;font-size:9px;font-weight:600;padding:2px 7px;border-radius:10px;margin:1px;">✓ ${m.name}</span>`).join('')
            : '<span style="font-size:9px;color:#94a3b8;">—</span>';

        const warningsHTML = warnings.length
            ? warnings.map(m => `<span style="display:inline-block;background:#fef2f2;color:#dc2626;font-size:9px;font-weight:600;padding:2px 7px;border-radius:10px;margin:1px;">✕ ${m.name}</span>`).join('')
            : '<span style="font-size:9px;color:#94a3b8;">—</span>';

        // Insights section
        const insightsSection = insightsText ? `
            <div style="margin-top:10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px 10px;">
                <div style="font-size:9px;font-weight:700;color:#475569;margin-bottom:3px;">💡 תובנות</div>
                <div style="font-size:9px;color:#475569;line-height:1.5;white-space:pre-wrap;">${insightsText}</div>
            </div>` : '';

        // Notes section
        const notesSection = notes ? `
            <div style="margin-top:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px 10px;">
                <div style="font-size:9px;font-weight:700;color:#475569;margin-bottom:3px;">📝 הערות</div>
                <div style="font-size:9px;color:#64748b;line-height:1.5;white-space:pre-wrap;">${notes}</div>
            </div>` : '';

        return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
body{font-family:'Rubik',sans-serif;background:white}
.page{width:210mm;min-height:297mm;margin:0 auto;padding:18mm 16mm 14mm;position:relative}
table{width:100%;border-collapse:collapse}
</style>
</head>
<body>
<div class="page">
    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid #0d9488;">
        <div>
            <div style="font-size:24px;font-weight:900;color:#0f172a;">${companyName}</div>
            <div style="font-size:11px;color:#64748b;margin-top:3px;">דוח בריאות פיננסית · ${modeLabel} · ${dateStr}</div>
        </div>
        <div style="text-align:left;">
            <div style="font-size:10px;font-weight:700;color:#0d9488;">NewGen Finance</div>
            <div style="font-size:8px;color:#94a3b8;">newgenfinance.co.il</div>
        </div>
    </div>

    <!-- Score + Categories -->
    <div style="display:flex;gap:10px;margin-bottom:12px;">
        <div style="flex:0 0 100px;background:linear-gradient(135deg,${clr}18,${clr}08);border:2px solid ${clr};border-radius:12px;padding:12px;text-align:center;">
            <div style="font-size:38px;font-weight:900;color:${clr};line-height:1;">${totalScore}</div>
            <div style="font-size:10px;color:${clr};font-weight:600;">${lbl}</div>
            <div style="font-size:8px;color:#94a3b8;margin-top:2px;">מתוך 100</div>
        </div>
        <div style="flex:1;display:flex;gap:6px;">${catBoxes}</div>
    </div>

    <!-- Strengths / Warnings -->
    <div style="display:flex;gap:8px;margin-bottom:10px;">
        <div style="flex:1;"><div style="font-size:9px;font-weight:700;color:#16a34a;margin-bottom:3px;">💪 נקודות חוזק</div>${strengthsHTML}</div>
        <div style="flex:1;"><div style="font-size:9px;font-weight:700;color:#dc2626;margin-bottom:3px;">⚠️ סימני אזהרה</div>${warningsHTML}</div>
    </div>

    <!-- Metrics Table -->
    <table>
        <thead><tr style="background:#0d9488;">
            <th style="text-align:right;font-size:9px;font-weight:600;color:white;padding:5px 10px;">מדד</th>
            <th style="text-align:center;font-size:9px;font-weight:600;color:white;padding:5px 6px;">ערך</th>
            <th style="text-align:center;font-size:9px;font-weight:600;color:white;padding:5px 6px;width:22%;">ביצוע</th>
            <th style="text-align:center;font-size:9px;font-weight:600;color:white;padding:5px 6px;width:55px;">ציון</th>
        </tr></thead>
        <tbody>${metricsHTML}</tbody>
    </table>

    ${insightsSection}
    ${notesSection}

    <!-- Disclaimer + Footer -->
    <div style="margin-top:16px;padding:10px 12px;background:#fefce8;border:1px solid #fde68a;border-radius:6px;">
        <div style="font-size:8px;font-weight:700;color:#92400e;margin-bottom:2px;">⚠️ גילוי נאות</div>
        <div style="font-size:7px;color:#a16207;line-height:1.5;">כלי זה מיועד למטרות חינוכיות בלבד ואינו מהווה ייעוץ השקעות, המלצה לפעולה, או תחליף לייעוץ מקצועי. מפעיל האתר אינו יועץ השקעות מורשה. כל החלטת השקעה היא באחריות המשתמש בלבד. ביצועי עבר אינם מעידים על תשואות עתידיות.</div>
    </div>
    <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid #e2e8f0;">
        <div style="font-size:7px;color:#94a3b8;">הופק באמצעות מחשבון הבריאות הפיננסית של NewGen Finance</div>
        <div style="font-size:7px;color:#94a3b8;">www.newgenfinance.co.il · ${dateStr}</div>
    </div>
</div>
</body></html>`;
    }

    // ── Generate PDF ──
    async function generatePDF() {
        const hasAccess = await requireAccess();
        if (!hasAccess) return;

        const data = gatherData();
        if (data.metrics.length === 0) {
            if (typeof showToast === 'function') showToast('הזן לפחות מדד אחד לפני ייצוא', 'warning');
            return;
        }

        const btn = document.getElementById('pdf-export-btn');
        const origHTML = btn?.innerHTML || '';
        if (btn) { btn.innerHTML = '<span class="ai-spinner"></span> מייצר PDF...'; btn.disabled = true; }

        try {
            const html = buildReportHTML(data);
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:210mm;height:auto;border:none;';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open(); iframeDoc.write(html); iframeDoc.close();

            await new Promise(r => setTimeout(r, 1000));

            const pageEl = iframeDoc.querySelector('.page');
            if (!pageEl) throw new Error('Report element not found');

            const canvas = await html2canvas(pageEl, {
                scale: 2, useCORS: true, backgroundColor: '#ffffff',
                width: pageEl.scrollWidth, height: pageEl.scrollHeight, logging: false
            });

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfW = pdf.internal.pageSize.getWidth();
            const pdfH = pdf.internal.pageSize.getHeight();

            // Calculate how many pages we need
            const imgW = canvas.width;
            const imgH = canvas.height;
            const ratio = pdfW / imgW;
            const scaledH = imgH * ratio;
            const totalPages = Math.ceil(scaledH / pdfH);

            for (let i = 0; i < totalPages; i++) {
                if (i > 0) pdf.addPage();
                // Slice source canvas for this page
                const srcY = Math.round((i * pdfH / ratio));
                const srcH = Math.min(Math.round(pdfH / ratio), imgH - srcY);
                if (srcH <= 0) break;

                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = imgW;
                pageCanvas.height = srcH;
                const ctx = pageCanvas.getContext('2d');
                ctx.drawImage(canvas, 0, srcY, imgW, srcH, 0, 0, imgW, srcH);

                const pageImg = pageCanvas.toDataURL('image/png');
                const drawH = srcH * ratio;
                pdf.addImage(pageImg, 'PNG', 0, 0, pdfW, drawH);
            }

            const safeName = data.companyName.replace(/[^א-תa-zA-Z0-9\s-]/g, '').trim().replace(/\s+/g, '-') || 'report';
            pdf.save(`${safeName}-financial-health.pdf`);

            if (typeof showToast === 'function') showToast('📄 דוח PDF הורד בהצלחה!');
            document.body.removeChild(iframe);
        } catch (err) {
            console.error('PDF export error:', err);
            if (typeof showToast === 'function') showToast('שגיאה בייצוא: ' + err.message, 'error');
        } finally {
            if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
        }
    }

    function injectPDFButton() {
        const analysisGroup = document.getElementById('toolbar-analysis');
        if (!analysisGroup || document.getElementById('pdf-export-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'pdf-export-btn';
        btn.className = 'tool-btn ai-tool-btn';
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg><span>PDF</span>`;
        btn.onclick = generatePDF;
        analysisGroup.appendChild(btn);
    }

    function injectScorePanelButton() {
        const actions = document.querySelector('.score-actions');
        if (!actions || document.getElementById('pdf-score-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'pdf-score-btn';
        btn.className = 'score-btn secondary';
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> ייצוא דוח PDF`;
        btn.onclick = generatePDF;
        actions.appendChild(btn);
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => { injectPDFButton(); injectScorePanelButton(); });
        } else { injectPDFButton(); injectScorePanelButton(); }
    }

    init();
    return { generatePDF };
})();
