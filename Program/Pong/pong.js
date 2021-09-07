


var context;
var x=100;
var y=200;
var dx=5;
var dy=5;

function init()
{
  context= pong.getContext('2d');
  setInterval(draw,20);
}

function draw()
{
  context.clearRect(0,0, 600,400);
  context.beginPath();
  context.fillStyle="pink";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  //barsss


  // Boundary Logic
if( x<0 || x>600) dx=-dx;
if( y<0 || y>400) dy=-dy;
x+=dx;
y+=dy;
}
