var audioObj = new Audio('music.mp3');
audioObj.volume = 0.5;

function play() {
   var element = document.getElementById("intro");
   element.classList.toggle("intro");
   audioObj.play();

}
function stop(){
  var element = document.getElementById("intro")
  element.classList.toggle("intro");
  audioObj.pause();
}
