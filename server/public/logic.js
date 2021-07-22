function generateBoard(rows, columns) {
    var board = document.getElementById("board");
    board.innerHTML = "";
    
    var squareSize = board.clientWidth / columns;
    
    let black = false;
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        row.style.height = squareSize + "px";
        row.style.width = (squareSize * columns) + "px";
        board.appendChild(row);
    
        let tmp = black;
    
        for (let j = 0; j < columns; j++) {
            let square = document.createElement("div");
            square.classList.add("square", black?"black":"white");
            black = !black;
            row.appendChild(square);
    
            square.addEventListener("click", () => { 
                highlight();
                async function highlight () {
                    square.classList.add("highlight");

                    place(square, color);

                    await onPlace(j, i);
                    square.classList.remove("highlight");
                }
            });
        }
    
        black = !tmp;
    }
}

function place(square, color) {
    let placed = document.createElement("div");
    placed.classList.add("placed", color);
    square.appendChild(placed);
}