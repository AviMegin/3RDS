console.log("Hello Hacman");

// Object to store x and y position of pacman
let position = {
    x: 2,
    y: 2
}

// Possible values in the map 2D array:
// wall   = 0,
// dot    = 1,
// bg     = 2,
// hacman = 3,
// ...add more later
let map = [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,3,1,1,1,1,2,2,2,0],
    [0,2,2,2,2,1,2,2,2,2,0],
    [0,2,1,1,1,1,1,1,1,1,0],
    [0,2,1,2,1,2,1,2,1,1,0],
    [0,2,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0]
]

function generateMap() {

    // fetch the big div from our html page so we can insert into it
    let myMap = document.getElementById("grid");

    // before we draw/redraw the map, make sure the div is empty so
    // we don't keep appending maps
    myMap.innerHTML = "";

    // outer for loop to iterate through all the rows of the map
    for (let y = 0; y < map.length; y++) {

        // inner for loop to iterate through every column of the
        // current row
        for (let x = 0; x < map[y].length; x++) {

            // read the value of the current tile
            let currentTile = map[y][x];

            // insert appropriate tile depending on the value
            if (currentTile === 0) {
                myMap.innerHTML += '<div class="tile wall"></div>';
            }

            if (currentTile === 1) {
                myMap.innerHTML += '<div class="tile dot"></div>';
            }

            if (currentTile === 2) {
                myMap.innerHTML += '<div class="tile bg"></div>';
            }

            if (currentTile === 3) {
                myMap.innerHTML += '<div class="tile hacman"></div>';
            }

        }

        // insert a line break after every row to move to next line
        myMap.innerHTML += '<br>';
    }
}

// Input handling function takes a single parameter which is the
// event that got triggered
function handleKeyDown(event) {

    // find out which key was pressed down
    let currentKey = event.code;

    // Update the map depending on which key weas pressed
    switch (currentKey) {
        case 'ArrowUp':
            // Check if where we want to move is not a wall
            // (wall = 0)
            if (map[position.y-1][position.x] != 0)
            {
                // It is not a wall, so we can move.
                // Update the old location of pacman with empty bg
                // (bg = 2)
                map[position.y][position.x] = 2;
                // update pacman position to new location
                position.y--;
                // update new location with pacman
                // (pacman = 3)
                map[position.y][position.x] = 3;
            }
            break;
        case 'ArrowDown':
            if (map[position.y+1][position.x] != 0)
            {
                map[position.y][position.x] = 2;
                position.y++
                map[position.y][position.x] = 3;
            }
            break;
        case 'ArrowRight':
            if (map[position.y][position.x + 1] != 0)
            {
                map[position.y][position.x] = 2;
                position.x++;
                map[position.y][position.x] = 3;
            }
            break;
        case 'ArrowLeft':
            if (map[position.y][position.x - 1] != 0)
            {
                map[position.y][position.x] = 2;
                position.x--;
                map[position.y][position.x] = 3;
            }
            break;
        default:
            break;
    }
    // after updating the map and location of pacman, we need to redraw the map
    generateMap();
}


//Execution starts here
//create an event listener. When a key is pressed down, call handleKeyDown function
document.addEventListener("keydown", handleKeyDown);
//call generateMap to draw the initial starting map
generateMap();
