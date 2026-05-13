function lerpColor(startHex, endHex, amount) {
  const start = parseInt(startHex.replace('#', ''), 16);
  const startR = start >> 16;
  const startG = (start >> 8) & 0xff;
  const startB = start & 0xff;
  const end = parseInt(endHex.replace('#', ''), 16);
  const endR = end >> 16;
  const endG = (end >> 8) & 0xff;
  const endB = end & 0xff;
  const nextR = startR + amount * (endR - startR);
  const nextG = startG + amount * (endG - startG);
  const nextB = startB + amount * (endB - startB);

  return `#${((1 << 24) + (nextR << 16) + (nextG << 8) + nextB | 0).toString(16).slice(1)}`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function drawGradientBlob(ctx, x, y, radius, color) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  const rgb = hexToRgb(color);

  gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
  gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

export function createFluidRenderer(canvas, getTargetColors) {
  const ctx = canvas.getContext('2d');
  let frameId = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let time = 0;
  let currentColors = [...getTargetColors()];

  const resize = () => {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
  };

  const render = () => {
    time += 0.005;

    const targetColors = getTargetColors();
    currentColors = currentColors.map((color, index) => lerpColor(color, targetColors[index], 0.02));

    ctx.fillStyle = currentColors[0];
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawGradientBlob(ctx, canvasWidth * 0.3 + Math.sin(time) * 100, canvasHeight * 0.4 + Math.cos(time * 0.8) * 100, canvasWidth * 0.6, currentColors[1]);
    drawGradientBlob(ctx, canvasWidth * 0.7 + Math.cos(time * 1.2) * 150, canvasHeight * 0.7 + Math.sin(time * 0.5) * 100, canvasWidth * 0.7, currentColors[2]);

    frameId = window.requestAnimationFrame(render);
  };

  resize();
  window.addEventListener('resize', resize);
  frameId = window.requestAnimationFrame(render);

  return {
    stop() {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    },
  };
}