/* course-bg.js — Animated background for course lesson pages */
(function () {
    'use strict';

    /* ── TICKER TAPE ──────────────────────────────────────────── */
    var SYMBOLS = [
        'AAPL','MSFT','GOOGL','AMZN','NVDA','TSLA','META','BRK.B',
        'JPM','V','JNJ','WMT','PG','MA','HD','DIS','NFLX','ADBE',
        'CRM','COST','KO','PEP','INTC','AMD'
    ];

    function seededRand(seed) {
        var s = seed;
        return function () {
            s = (s * 1664525 + 1013904223) & 0xffffffff;
            return (s >>> 0) / 4294967296;
        };
    }

    function shuffleWithSeed(arr, seed) {
        var r = seededRand(seed);
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(r() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function buildTicker(containerId, seed) {
        var el = document.getElementById(containerId);
        if (!el) return;
        var r = seededRand(seed);
        var symbols = shuffleWithSeed(SYMBOLS, seed);
        var items = symbols.map(function (sym) {
            var price = (r() * 400 + 50).toFixed(2);
            var chg = (r() * 6 - 2).toFixed(2);
            var up = parseFloat(chg) >= 0;
            return '<span class="ticker-item">'
                + '<span class="symbol">' + sym + '</span>'
                + '<span class="price">$' + price + '</span>'
                + '<span class="change ' + (up ? 'up' : 'down') + '">'
                + (up ? '▲' : '▼') + ' ' + Math.abs(chg) + '%'
                + '</span></span>';
        });
        var html = items.join('') + items.join(''); // doubled for seamless loop
        var track = document.createElement('div');
        track.className = 'ticker-track';
        track.innerHTML = html;
        el.appendChild(track);
    }

    /* ── CANVAS CHART LINES ───────────────────────────────────── */
    var canvas = document.getElementById('courseBgCharts');
    var ctx = canvas ? canvas.getContext('2d') : null;

    var LINES = [
        { baseRatio: 0.25, color: 'rgba(22,128,160,ALPHA)',  momentum: 0, pts: [] },
        { baseRatio: 0.50, color: 'rgba(40,150,175,ALPHA)',  momentum: 0, pts: [] },
        { baseRatio: 0.75, color: 'rgba(80,170,190,ALPHA)',  momentum: 0, pts: [] }
    ];
    var STEP = 4;       // px per data point
    var SCROLL = 1;     // px scrolled per frame
    var frameCount = 0;
    var raf = null;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        LINES.forEach(function (line) {
            var needed = Math.ceil(canvas.width / STEP) + 4;
            if (line.pts.length === 0) {
                line.momentum = 0;
                for (var i = 0; i < needed; i++) line.pts.push(0);
            } else if (line.pts.length < needed) {
                while (line.pts.length < needed) line.pts.push(line.pts[line.pts.length - 1]);
            }
        });
    }

    function nextY(line) {
        var last = line.pts[line.pts.length - 1];
        var noise = (Math.random() - 0.48) * 14;  // slight upward bias
        var revert = -last * 0.04;                  // mean reversion
        line.momentum = line.momentum * 0.7 + noise * 0.3;
        var dy = line.momentum + revert + 0.3;      // +0.3 upward trend
        line.pts.push(last + dy);
    }

    function drawLines() {
        if (!ctx) return;
        var W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        LINES.forEach(function (line) {
            var base = H * line.baseRatio;
            var range = H * 0.12;
            var pts = line.pts;
            var numPts = Math.ceil(W / STEP) + 2;
            var start = Math.max(0, pts.length - numPts);

            // normalise Y values over visible window
            var slice = pts.slice(start);
            var minY = Math.min.apply(null, slice);
            var maxY = Math.max.apply(null, slice);
            var span = Math.max(maxY - minY, 1);

            function toScreenY(v) {
                return base + ((v - minY) / span - 0.5) * range;
            }

            ctx.beginPath();
            slice.forEach(function (v, i) {
                var x = i * STEP;
                var y = toScreenY(v);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });

            // fill below line
            var lastX = (slice.length - 1) * STEP;
            var lastY = toScreenY(slice[slice.length - 1]);
            ctx.lineTo(lastX, H);
            ctx.lineTo(0, H);
            ctx.closePath();
            ctx.fillStyle = line.color.replace('ALPHA', '0.05');
            ctx.fill();

            // draw line
            ctx.beginPath();
            slice.forEach(function (v, i) {
                var x = i * STEP;
                var y = toScreenY(v);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = line.color.replace('ALPHA', '0.13');
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });
    }

    function tick() {
        frameCount++;
        // scroll: shift out old points every SCROLL px
        if (frameCount % Math.round(STEP / SCROLL) === 0) {
            LINES.forEach(function (line) {
                line.pts.shift();
                nextY(line);
            });
        }
        drawLines();
        raf = requestAnimationFrame(tick);
    }

    /* ── MOBILE TAP CARDS ────────────────────────────────────── */
    function initCardTaps() {
        document.querySelectorAll('.course-card, .course-card-dark').forEach(function (card) {
            card.addEventListener('touchstart', function () {
                card.classList.add('tapped');
            }, { passive: true });
            card.addEventListener('touchend', function () {
                setTimeout(function () { card.classList.remove('tapped'); }, 300);
            }, { passive: true });
        });
    }

    /* ── INIT ────────────────────────────────────────────────── */
    function init() {
        buildTicker('ticker1', 42);
        buildTicker('ticker2', 137);
        buildTicker('ticker3', 256);

        if (ctx) {
            resizeCanvas();
            LINES.forEach(function (line) {
                var needed = Math.ceil(canvas.width / STEP) + 4;
                for (var i = 0; i < needed; i++) nextY(line);
            });
            raf = requestAnimationFrame(tick);
        }

        initCardTaps();

        window.addEventListener('resize', function () {
            resizeCanvas();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
