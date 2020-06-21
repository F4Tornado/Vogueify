function width(p) {
  return (p) * c.clientWidth
}

function height(p) {
  return (p) * c.clientHeight
}

function diagonal(p) {
  return customLib.diagDist * p;
}

function dist(a, b, c, d) {
  return Math.sqrt(((a - c) * (a - c)) + ((b - d) * (b - d)))
}

const c = document.getElementById("cnv");
const draw = c.getContext("2d")
const print = console.log
let pp = 0;
let t;
let π = Math.PI;

const customLib = {
  drawLoop: () => {
    setTimeout(customLib.drawLoop, 1000 / 60)
    t = performance.now() - pp;
    pp = performance.now();
    drawLoop()
  },
  setup: () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    setup()
    requestAnimationFrame(customLib.drawLoop)
    customLib.diagDist = dist(width(1), height(1), 0, 0)
  },
  diagDist: 0
}

// window.addEventListener("resize", () => {
//   c.width = window.innerWidth;
//   c.height = window.innerHeight;
//   customLib.diagDist = dist(width(1), height(1), 0, 0)
// })

customLib.setup()