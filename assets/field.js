// Dipole field lines behind the hero. The field turns toward the pointer.
(function () {
  const canvas = document.getElementById("field");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const css = getComputedStyle(document.documentElement);
  const NORTH = css.getPropertyValue("--north").trim() || "#9A4E2A";
  const SOUTH = css.getPropertyValue("--south").trim() || "#2F4A3A";
  const GRID = css.getPropertyValue("--graticule").trim() || "#D9B98A";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, dpr, cx, cy, scale;
  let angle = (11 * Math.PI) / 180; // a gentle declination to start
  let target = angle;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const narrow = w < 720;
    cx = narrow ? w * 0.62 : w * 0.68;
    cy = narrow ? h * 0.36 : h * 0.46;
    scale = Math.min(w, h) * (narrow ? 0.5 : 0.62);
    draw();
  }

  function grid() {
    ctx.strokeStyle = GRID;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    const step = 56;
    ctx.beginPath();
    for (let x = (cx % step); x < w; x += step) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
    for (let y = (cy % step); y < h; y += step) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    grid();
    const sin = Math.sin(angle), cos = Math.cos(angle);
    // Gradient runs along the dipole axis: north end red, south end blue.
    const ax = sin * scale, ay = -cos * scale;
    const grad = ctx.createLinearGradient(cx + ax * 0.6, cy + ay * 0.6, cx - ax * 0.6, cy - ay * 0.6);
    grad.addColorStop(0, NORTH);
    grad.addColorStop(1, SOUTH);
    ctx.strokeStyle = grad;
    ctx.lineCap = "round";

    const shells = [0.12, 0.2, 0.3, 0.42, 0.56, 0.72, 0.9, 1.1, 1.34, 1.62];
    shells.forEach((L, i) => {
      ctx.lineWidth = i < 3 ? 1.6 : 1.1;
      ctx.globalAlpha = 0.85 - i * 0.055;
      for (const side of [1, -1]) {
        ctx.beginPath();
        for (let t = 0.04; t <= Math.PI - 0.04; t += 0.02) {
          const r = L * Math.sin(t) ** 2;
          const lx = side * r * Math.sin(t);
          const ly = -r * Math.cos(t);
          const x = cx + (lx * cos - ly * sin) * scale;
          const y = cy + (lx * sin + ly * cos) * scale;
          t === 0.04 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;

    // Compass needle at the core
    const n = Math.max(22, scale * 0.11), wN = n * 0.26;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.fillStyle = NORTH;
    ctx.beginPath(); ctx.moveTo(0, -n); ctx.lineTo(wN, 0); ctx.lineTo(-wN, 0); ctx.fill();
    ctx.fillStyle = SOUTH;
    ctx.beginPath(); ctx.moveTo(0, n); ctx.lineTo(wN, 0); ctx.lineTo(-wN, 0); ctx.fill();
    ctx.restore();
  }

  let raf = null;
  function tick() {
    let d = target - angle;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    if (Math.abs(d) < 0.001) { angle = target; draw(); raf = null; return; }
    angle += d * 0.08;
    draw();
    raf = requestAnimationFrame(tick);
  }

  function aim(px, py) {
    const r = canvas.getBoundingClientRect();
    target = Math.atan2(px - r.left - cx, -(py - r.top - cy));
    if (reduce) { angle = target; draw(); return; }
    if (!raf) raf = requestAnimationFrame(tick);
  }

  window.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientY > r.bottom) return;
    aim(e.clientX, e.clientY);
  });
  canvas.addEventListener("pointerdown", (e) => aim(e.clientX, e.clientY));
  window.addEventListener("resize", resize);
  if (document.fonts) document.fonts.ready.then(resize);
  resize();
})();
