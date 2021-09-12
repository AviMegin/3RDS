


var audioObj = new Audio('music.mp3');
audioObj.volume = 0.2;



function end(){
  let end = document.getElementById("end");
  element.classList.toggle("vis");
}
function nope(){
  location.reload();
}
function play() {
   var element = document.getElementById("intro");
   element.classList.toggle("intro");
   audioObj.play();
   setInterval(end, 22000);
   setInterval(nope, 26000); //after video is finished restart.
}
function stop(){
  var element = document.getElementById("intro")
  element.classList.toggle("intro");
  audioObj.pause();
}
