let canvas = document.getElementById("energyCanvas");

let ctx = ctx.getContext("2d");


let fps=60


function energy() {
  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.arc(260, h - 50, 40, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}


let interval = setInterval(() => {
  clearScreen()
  energy()
  
}, 1000 / fps);

function clearScreen() {
  ctx.clearRect(0, 0, w, h);
}