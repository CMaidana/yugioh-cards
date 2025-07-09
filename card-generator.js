// card-generator.js
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

const loadImageToCanvas = async (imagenPath, ctx) => {
  const img = await loadImage(imagenPath);

  // Área disponible en la carta
  const ART_W = 336;
  const ART_H = 246;

  // Crear canvas temporal para recorte si es necesario
  let imgToDraw;

  if (img.width > ART_W || img.height > ART_H) {
    const tempCanvas = createCanvas(ART_W, ART_H);
    const tempCtx = tempCanvas.getContext('2d');

    // Calcular escalado manteniendo relación de aspecto
    const aspectRatio = img.width / img.height;
    let newW = ART_W;
    let newH = Math.floor(ART_W / aspectRatio);

    if (newH < ART_H) {
      newH = ART_H;
      newW = Math.floor(ART_H * aspectRatio);
    }

    // Centrado de recorte
    const offsetX = Math.floor((newW - ART_W) / 2);
    const offsetY = Math.floor((newH - ART_H) / 2);

    // Dibujar imagen redimensionada en canvas temporal
    tempCtx.drawImage(img, -offsetX, -offsetY, newW, newH);
    imgToDraw = tempCanvas;
  } else {
    imgToDraw = img;
  }

  // Dibujar imagen final en la carta
  ctx.drawImage(imgToDraw, 43, 100, ART_W, ART_H);

}

export default async function generarCarta({ nombre, tipo, efecto, atk, def, imagenPath, outputPath }) {
  const WIDTH = 421;
  const HEIGHT = 614;

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  const template = await loadImage('./assets/template-2.jpg');
  ctx.drawImage(template, 0, 0, WIDTH, HEIGHT);

  await loadImageToCanvas(imagenPath, ctx);
  // const img = await loadImage(imagenPath);
  // ctx.drawImage(img, 43, 100, 336, 246); // zona del arte

  ctx.font = 'bold 22px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(nombre, 46, 50);

  ctx.font = '16px Arial';
  ctx.fillText(`[${tipo}]`, 46, 375);

  ctx.font = '14px Arial';
  const efectoLines = dividirTexto(efecto, 40);
  efectoLines.forEach((line, i) => {
    ctx.fillText(line, 46, 400 + i * 18);
  });

  ctx.font = 'bold 16px Arial';
  ctx.fillText(`ATK/${atk} DEF/${def}`, 230, 585);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Carta generada en: ${outputPath}`);
}

function dividirTexto(texto, maxPalabras) {
  const palabras = texto.split(' ');
  const lineas = [];
  while (palabras.length) {
    lineas.push(palabras.splice(0, maxPalabras).join(' '));
  }
  return lineas;
}
