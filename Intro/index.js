


var audioObj = new Audio('music.mp3');
audioObj.volume = 0.5;


function nope(){
  location.reload();
}
function play() {
   var element = document.getElementById("intro");
   element.classList.toggle("intro");
   audioObj.play();
   setInterval(nope, 26000); //after video is finished restart.
}
function stop(){
  var element = document.getElementById("intro")
  element.classList.toggle("intro");
  audioObj.pause();
}
