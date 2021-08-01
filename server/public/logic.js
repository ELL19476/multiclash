var selectedCard = undefined;
// TMP:
selectedCard = new Card();

//#region GENERATE BOARD
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
            square.classList.add("square", black ? "black" : "white");
            black = !black;
            row.appendChild(square);

            square.addEventListener("click", () => {
            });
        }

        black = !tmp;
    }
}
//#endregion GENERATE BOARD

//#region TRACK MOUSE POSITION
var mousePos;

document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    mousePos = {
        x: event.pageX,
        y: event.pageY
    };
}
//#endregion TRACK MOUSE POSITION