document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8; //number of columns and rows
  const squares = []; //every div that is created

  const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];
  //Create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      //making each square draggable and giving id to each square
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      //giving a random color or number to the div being created
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();
  //Drag the candies: adding 6 inbuilt functions

  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingReplaced;
  let squareIdBeingDragged;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart)); //for each element in squares array,when that element has an event listener,there are 6 functions we can invoke
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged);
    console.log(this.id, "dragstart");
  }
  //dragging over a different square
  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }
  //dragging while entering a square
  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragenter");
  }

  function dragLeave() {
    console.log(this.id, "dragleave");
  }

  function dragDrop() {
    console.log(this.id, "dragdrop");
    colorBeingReplaced = this.style.backgroundColor; //storing the color of the square it is being moved to
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced; //background color of the square id will be changed with the color being replaced
  }

  //defining a valid move
  function dragEnd() {
    console.log(this.id, "dragend");
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged + 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced); //if the id of the square being replaced is included in the validMoves then it will be stored in validMove

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
  }
});
