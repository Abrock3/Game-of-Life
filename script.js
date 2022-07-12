const gameContainer = document.getElementById("game-container");
// this is the object that will store our entire array of cells
let golArray = [];
const initialSize = 20;
// these will be modified as the game progresses so they will continue to point to a constant point.
// this is so we can always update the dots on the board, so the user can track movement.
// maybe we'll add a scrolling animation later, which would serve this purpose
let xTrueZero = Math.floor(initialSize / 2);
let yTrueZero = Math.floor(initialSize / 2);

// generates our initial array; 0 will represent dead cells, 1 represents live cells
for (let i = 0; i < initialSize; i++) {
  golArray[i] = [];
  for (let k = 0; k < initialSize; k++) {
    golArray[i].push(0);
  }
}

function renderGameBoard() {
  // clears the HTML out of the gameContainer so we can recreate it

  let gameTable = document.createElement("figure");
  // iterating through main array
  for (let i = 0; i < golArray.length; i++) {
    // creates a div that will hold a row of cells
    const row = document.createElement("div");
    row.classList.add("row");
    // iterating through each subarray so we can create a cell for each item
    for (let k = 0; k < golArray[i].length; k++) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      //   this adds two custom attributes to each cell, data-x and data-y; this will allow us to detect which
      // one is getting clicked on during the setup phase
      cell.dataset.y = i;
      cell.dataset.x = k;
      //   this if else will add classes to each cell based on the contents of the array;
      //   we'll use this to apply CSS
      if (golArray[i][k] === 0) {
        cell.classList.add("dead");
      } else {
        cell.classList.add("living");
      }
      //   this determines if the cell is 4 away from xTrueZero and yTrueZero; this will produce a grid of
      // periodically spaced elements with a span nested in them; we'll style this span to look like a dot.
      // if the array ends up "moving", this will help the user see that the grid is moving
      if (
        (yTrueZero - i) % 4 === 0 &&
        (xTrueZero - k) % 4 === 0 &&
        (i !== 0) & (k !== 0)
      ) {
        const dot = document.createElement("span");
        dot.classList.add("grid-marker");
        cell.append(dot);
      }
      //   adds this cell to the row
      row.append(cell);
    }
    // adds this row to the gameTable
    gameTable.append(row);
  }
  // wipes gameContainer and appends the gameTable to it
  gameContainer.innerHTML = "";
  gameContainer.append(gameTable);
}

// since the cells are generated dynamically; we need to use event delegation to set an event listener on them
gameContainer.addEventListener("click", (event) => {
  event.stopPropagation;
  //   the "event" object comes with the event listener as its first argument;
  // here, we use it to retrieve the element that was clicked ("event.target")
  const target = event.target;
  //   these retrieve the coordinates of the cell that was clicked
  const yCoord = target.dataset.y;
  const xCoord = target.dataset.x;
  //   since we may click on something other than the cells; this establishes that the coordinate data exists
  // before we proceed. This ensures that we don't cause any errors if something other than a cell is clicked
  if (xCoord && yCoord) {
    if (golArray[yCoord][xCoord] === 0) {
      golArray[yCoord][xCoord] = 1;
    } else {
      golArray[yCoord][xCoord] = 0;
    }
    renderGameBoard();
  }
});

renderGameBoard();
