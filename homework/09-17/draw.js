var ctx = document.querySelector("#canvas").getContext("2d");

ctx.beginPath();
ctx.arc(400, 300, 50, 0, Math.PI*2); 
ctx.closePath();
ctx.fill();