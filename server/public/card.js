class Card {
    place(square) {
        // get coordinates of square and place card there
    }
    move(square) {
        // smoothly change position from current to square's
    }
    unplace() {
        // from sprite back to card
    }

    confirm() {
        // sprite is placed, play animation
    }
    cancel() {
        // lerp card back to inventory position
    }
}