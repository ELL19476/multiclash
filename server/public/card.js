class Card {
    #currentSquare = undefined;
    #cardSprite = undefined;
    #onBoard = false;

    constructor() {
        this.#cardSprite = document.createElement("div");
        this.#cardSprite.classList.add("card");
        let card = this;

        document.getElementById("board").addEventListener("mouseover", function () {
            card.#onBoard = true;
        });
        document.getElementById("board").addEventListener("mouseleave", function () {
            card.#onBoard = false;
        });

        this.#cardSprite.addEventListener("mousedown", function () {
            if(card.#onBoard)
            {
                // Get square under mouse
                document.elementsFromPoint(mousePos.x, mousePos.y).forEach(elem => {
                    if(elem.classList.contains("square"))
                });
            }
        });
    }

    place(square) {
        // get coordinates of square and place card there
        this.#currentSquare = square;
        // TODO: Use sprite as visual not green circle
        this.#cardSprite.classList.remove("card");
        this.#cardSprite.classList.add("placed", "green", "smooth-snapping");
        document.getElementById("canvas").appendChild(this.#cardSprite);

        moveToMouse(this.#cardSprite);
    }
    move(square) {
        // smoothly change position from current to square's
        this.#currentSquare = square;
        moveToELement(this.#cardSprite, square);
    }
    unplace() {
        // from sprite back to card

        this.#currentSquare = undefined;

        // TODO: change sprite instead of class
        this.#cardSprite.classList.remove("placed", "smooth-snapping");
        this.#cardSprite.classList.add("floating", "card");

        moveToMouse(this.#cardSprite);
    }

    confirm() {
        // sprite is placed, play animation
        let square = this.#currentSquare;
        highlight();
        async function highlight() {
            square.classList.add("highlight");

            await onPlace(j, i);
            square.classList.remove("highlight");
        }
    }
    cancel() {
        // lerp card back to inventory position
        // TEST:
        this.#cardSprite.classList.remove("green", "placed");
        this.#cardSprite.classList.add("yellow");
    }
}

// helper functions: 

// centers the card at (offsetTop, offsetLeft) of element
function moveToELement(card, elem) {
    let offset = offset(elem);

    let x = offset.left - card.offsetWidth / 2 + 'px';
    let y = offset.top - card.offsetHeight / 2 + 'px';

    card.style.transform = "translate(" + x + ", " + y + ")";
}
// get position of element relative to document
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
// centers the card at (pageX, pageY) coordinates
function moveToMouse(card) {
    if(mousePos == undefined) return;
    
    let x = mousePos.x - card.offsetWidth / 2 + 'px';
    let y = mousePos.y - card.offsetHeight / 2 + 'px';

    card.style.transform = "translate(" + x + ", " + y + ")";
}