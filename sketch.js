const palette = {
  background: () => {
    return "rgb(235, 235, 235)"
  },
  foreground: () => {
    return "rgb(51, 51, 51)"
  }
}

const effects = document.getElementById("effects");
const eDraw = effects.getContext("2d");

const colorCurves = document.getElementById("colorCurves");
const ccDraw = colorCurves.getContext("2d");

colorCurves.width = window.innerHeight / 8 * 3;
colorCurves.height = window.innerHeight / 8;

let data;
let pixels;

let colorCurve;

let img = new Image();
let canDrawImage = false;

let canDrag = false;

let dragDirection = "x"

let imgX = 0;
let imgY = 0;

function setup() {

}

// 1.536

function drawLoop() {

  if (document.getElementById("import").value) {
    document.getElementById("newFont").href = document.getElementById("import").value;
  }

  if (canDrawImage) {
    colorCurve = {
      redB: parseFloat(document.getElementById("redB").value),
      greenB: parseFloat(document.getElementById("greenB").value),
      blueB: parseFloat(document.getElementById("blueB").value),
      redE: parseFloat(document.getElementById("redE").value),
      greenE: parseFloat(document.getElementById("greenE").value),
      blueE: parseFloat(document.getElementById("blueE").value),
      redExp: parseFloat(document.getElementById("redExp").value),
      greenExp: parseFloat(document.getElementById("greenExp").value),
      blueExp: parseFloat(document.getElementById("blueExp").value),
    }

    ccDraw.fillRect(0, 0, colorCurves.width, colorCurves.height);

    ccDraw.strokeStyle = "#ff0000";
    ccDraw.beginPath();
    ccDraw.moveTo(0, map(colorCurve.redB, 0, 1, colorCurves.height, 0));
    for (let i = 0; i < colorCurves.width / 3; i++) {
      let v = (i / (colorCurves.width / 3)) ** colorCurve.redExp;
      ccDraw.lineTo(i, map(map(v, 0, 1, colorCurve.redB, colorCurve.redE), 0, 1, colorCurves.height, 0));
    }
    ccDraw.stroke();

    ccDraw.strokeStyle = "#00ff00";
    ccDraw.beginPath();
    ccDraw.moveTo(colorCurves.width / 3, map(colorCurve.greenB, 0, 1, colorCurves.height, 0));
    for (let i = 0; i < colorCurves.width / 3; i++) {
      let v = (i / (colorCurves.width / 3)) ** colorCurve.greenExp;
      ccDraw.lineTo(i + colorCurves.width / 3, map(map(v, 0, 1, colorCurve.greenB, colorCurve.greenE), 0, 1, colorCurves.height, 0));
    }
    ccDraw.stroke();

    ccDraw.strokeStyle = "#0000ff";
    ccDraw.beginPath();
    ccDraw.moveTo(colorCurves.width / 3 * 2, map(colorCurve.blueB, 0, 1, colorCurves.height, 0));
    for (let i = 0; i < colorCurves.width / 3; i++) {
      let v = (i / (colorCurves.width / 3)) ** colorCurve.blueExp;
      ccDraw.lineTo(i + colorCurves.width / 3 * 2, map(map(v, 0, 1, colorCurve.blueB, colorCurve.blueE), 0, 1, colorCurves.height, 0));
    }
    ccDraw.stroke();

    if (img.height < window.innerHeight * 0.75) {
      if (img.width * 1.536 > img.height) {
        c.width = img.height / 1.536;
        c.height = img.height;
        document.getElementById("cnv").style = "cursor: ew-resize";
        draw.drawImage(effects, imgX, imgY, img.height / 1.536, img.height, 0, 0, img.height / 1.536, img.height);

        let text = document.getElementById("text").value;
        let font = document.getElementById("font").value;

        draw.fillStyle = document.getElementById("textColor").value;
        draw.font = `${textWidth(text, font)}px ${font}`;
        draw.textAlign = "center";
        draw.textBaseline = "top";
        draw.fillText(text, c.width / 2, 0);

        dragDirection = "x";
      } else {
        c.width = img.width;
        c.height = img.width * 1.536;
        document.getElementById("cnv").style = "cursor: ns-resize";
        draw.drawImage(effects, imgX, imgY, img.width, img.width * 1.536, 0, 0, img.width, img.width * 1.536);

        let text = document.getElementById("text").value;
        let font = document.getElementById("font").value;

        draw.fillStyle = document.getElementById("textColor").value;
        draw.font = `${textWidth(text, font)}px ${font}`;
        draw.textAlign = "center";
        draw.textBaseline = "top";
        draw.fillText(text, c.width / 2, 0);

        dragDirection = "y";
      }
    } else {
      c.width = window.innerHeight * 0.75 / 1.536;
      c.height = window.innerHeight * 0.75;
      if (img.width * 1.536 > img.height) {
        dragDirection = "x";
        document.getElementById("cnv").style = "cursor: ew-resize";
        draw.drawImage(effects, imgX, imgY, img.height / 1.536, img.height, 0, 0, window.innerHeight * 0.75 / 1.536, window.innerHeight * 0.75);

      } else {
        dragDirection = "y";
        document.getElementById("cnv").style = "cursor: ns-resize";
        draw.drawImage(effects, imgX, imgY, img.width, img.width * 1.536, 0, 0, window.innerHeight * 0.75 / 1.536, window.innerHeight * 0.75);
      }

      let text = document.getElementById("text").value;
      let font = document.getElementById("font").value;

      draw.fillStyle = document.getElementById("textColor").value;
      draw.font = `${textWidth(text, font)}px ${font}`;
      draw.textAlign = "center";
      draw.textBaseline = "top";
      draw.fillText(text, c.width / 2, 0);
    }
  }
}

function upload(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    canDrawImage = false;

    reader.onload = (e) => {
      img.src = e.target.result;
      canDrawImage = true;

      effects.width = img.width;
      effects.height = img.height;

      eDraw.drawImage(img, 0, 0);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

document.getElementById("cnv").onmousedown = () => {
  canDrag = true;
}

document.onmouseup = () => {
  canDrag = false;
}

document.onmousemove = (e) => {
  if (canDrag) {
    if (dragDirection == "x") {
      imgX -= e.movementX;
    } else {
      imgY -= e.movementY;
    }
  }
}

function download() {
  if (img.width * 1.536 > img.height) {
    c.width = img.height / 1.536;
    c.height = img.height;
    draw.drawImage(effects, imgX, imgY, img.height / 1.536, img.height, 0, 0, img.height / 1.536, img.height);

    let text = document.getElementById("text").value;
    let font = document.getElementById("font").value;

    draw.fillStyle = document.getElementById("textColor").value;
    draw.font = `${textWidth(text, font)}px ${font}`;
    draw.textAlign = "center";
    draw.textBaseline = "top";
    draw.fillText(text, c.width / 2, 0);
  } else {
    c.width = img.width;
    c.height = img.width * 1.536;
    draw.drawImage(effects, imgX, imgY, img.width, img.width * 1.536, 0, 0, img.width, img.width * 1.536);

    let text = document.getElementById("text").value;
    let font = document.getElementById("font").value;

    draw.fillStyle = document.getElementById("textColor").value;
    draw.font = `${textWidth(text, font)}px ${font}`;
    draw.textAlign = "center";
    draw.textBaseline = "top";
    draw.fillText(text, c.width / 2, 0);
  }

  window.open(c.toDataURL("img/png"))
}

function applyEffects() {
  effects.width = img.width;
  effects.height = img.height;

  eDraw.drawImage(img, 0, 0);

  data = eDraw.getImageData(0, 0, effects.width, effects.height);
  pixels = data.data;

  let saturation = document.getElementById("saturation").value;

  for (let i = pixels.length - 4; i >= 0; i -= 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    // let v = (i / (colorCurves.width / 3)) ** colorCurve.greenExp;
    // ccDraw.lineTo(i + colorCurves.width / 3, map(map(v, 0, 1, colorCurve.greenB, colorCurve.greenE), 0, 1, colorCurves.height, 0));

    r = map((r / 255) ** colorCurve.redExp, 0, 1, colorCurve.redB, colorCurve.redE) * 255;
    g = map((g / 255) ** colorCurve.greenExp, 0, 1, colorCurve.greenB, colorCurve.greenE) * 255;
    b = map((b / 255) ** colorCurve.blueExp, 0, 1, colorCurve.blueB, colorCurve.blueE) * 255;

    let HSL = rgbToHsl(r, g, b);

    let s;

    if (saturation > 0.5) {
      s = map(saturation, 0.5, 1, HSL.s, 1);
    } else {
      s = map(saturation, 0, 0.5, 0, HSL.s);
    }

    let rgb = hslToRgb(HSL.h * 360, s, HSL.l);

    pixels[i] = rgb[0] * 255;
    pixels[i + 1] = rgb[1] * 255;
    pixels[i + 2] = rgb[2] * 255;
  }

  eDraw.putImageData(data, 0, 0);
}

function textWidth(text, font) {
  document.getElementById("measureText").innerHTML = text;
  let fontSize = 12;
  let test = document.getElementById("measureText");
  test.style.fontSize = fontSize;
  test.style.fontFamily = font;
  let width = test.clientWidth + 1;
  return (c.width / width) * 13;
}

function hslToRgb(h, s, l) {
  let a = s * Math.min(l, 1 - l);
  let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  var HSL = new Object();
  HSL['h'] = h;
  HSL['s'] = s;
  HSL['l'] = l;
  return HSL;
}

function map(v, min1, max1, min2, max2) {
  return ((v - min1) / (max1 - min1)) * (max2 - min2) + min2;
}