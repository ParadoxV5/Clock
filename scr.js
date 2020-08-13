const strs = [];
let
  div = document.getElementsByTagName("div")[0],
  c = 0,
  node
;
for(; c < 9;) strs.push((++c).toString());
strs.push('↊', '↋', '0');

const Pi6 = Math.PI/6;
let pos = function(f, n) { return f(Pi6 * (n - 2)) * 150 + 250 + 'px'; }
for(c = 0; c < 12; ++c) {
  node = document.createElement("span");
  node.appendChild(document.createTextNode(strs[c]));
  node.style.left = pos(Math.cos, c);
  node.style.top = pos(Math.sin, c);
  div.appendChild(node);
}

let canvas = document.getElementsByTagName("canvas")[0];
var radius = canvas.height / 2;
const Ctx = canvas.getContext("2d");
Ctx.translate(200, 200);
const Pi30 = Math.PI/30;
var now, s, m;

function draw() {
  Ctx.clearRect(-200, -200, 400, 400);
  now = new Date();
  s = now.getSeconds()*Pi30 + now.getMilliseconds()/30000*Math.PI;
  drawHand(s, 150, 5);
  m = now.getMinutes()*Pi30 + s/60;
  drawHand(m, 125, 12.5);
  drawHand(now.getHours()%12*Pi6 + m/12, 75, 15);
}
function drawHand(theta, length, width) {
  Ctx.beginPath();
  Ctx.lineCap = "round";
  Ctx.lineWidth = width;
  Ctx.moveTo(0, 0);
  Ctx.rotate(theta);
  Ctx.lineTo(0, -length);
  Ctx.stroke();
  Ctx.rotate(-theta);
}
setInterval(draw, 50); // 20FPS