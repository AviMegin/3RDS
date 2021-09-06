//wall=0
//dot=1
//background=2
//pacman=3
map();

function map(){
  let state = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];

  //fetch the div
  let map = document.getElementById('map')
  //add tiles to map

  for (var y = 0; y < state.length; y++) {

    for (var x = 0; x < state.length; x++) {
      console.log(state[y][x]);
      let currentile = state[y][x];

      if (currentile === 0){
        map.innerHTML += '<div class="tile wall"></div>';
      }
      if (currentile === 1){
        map.innerHTML += '<div class="tile dot"></div>';
      }
      if (currentile === 2){
        map.innerHTML += '<div class="tile bg"></div>';
      }
      if (currentile === 3){
        map.innerHTML += '<div class="tile pacman"></div>';
      }


    }
    map.innerHTML += '<br>';

  }



}
