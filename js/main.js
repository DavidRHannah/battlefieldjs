const topBar = document.querySelector("#top-bar");
const actionSection = document.querySelector("#action-buttons");
const playerOneGridDiv = document.querySelector("#player-one-grid");
const playerTwoGridDiv = document.querySelector("#player-two-grid");

const gridSize = 10;
let playerOneArray = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));;
let playerTwoArray = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));;

let selectedGridSquare = {
    playerId: 0,
    row: 0,
    col: 0,
};

const handleGridButtonClick = ({playerId, row, col}) => {
    newCoords = `[id='${playerId}-${row}-${col}']`;
    
    const currentSelectedGridSquare = {
        playerId: playerId,
        row: row,
        col: col,
    }

    if (selectedGridSquare !== currentSelectedGridSquare){
        player
        document.querySelector(coords).classList.remove("grid-button-selected");
    }

    console.log(`${playerId}-${row}-${col}`);
    console.log(selectedGridSquare);

}

const initiatePlayerGrids = ({playerId, gridArray, gridDisplayElement}) => {
    (gridArray ?? []).map((_, row) => {
        (gridArray ?? []).map((_, col) => {
            const button = document.createElement('button');
            button.id = `${playerId}-${row}-${col}`;
            button.className = `grid-button`;
            button.textContent = '';
            
            button.addEventListener('click', () => {
                handleGridButtonClick({playerId: playerId, row: row, col: col});
            });

            gridDisplayElement.appendChild(button);
        });
    });
};

initiatePlayerGrids({ playerId: 1, gridArray: playerOneArray, gridDisplayElement: playerOneGridDiv });
initiatePlayerGrids({ playerId: 2, gridArray: playerTwoArray, gridDisplayElement: playerTwoGridDiv });


// Handle Color Selection
const handleActionButtonClick = (event) => {
    let button;
    
    if (event.target.tagName === "IMG"){
        button = event.target.closest("button");
    } else if (event.target.tagName === "BUTTON"){
        button = event.target;
    }

    if (button) {
        const buttons = event.currentTarget.querySelectorAll("button");
        buttons.forEach((btn) => btn.classList.remove("btn-selected"));
        button.classList.add("btn-selected");

        // Change exterior image
        if (event.currentTarget === exteriorColorSection){
            selectedColor = button.querySelector('img').alt;
        }

        // Change interior image
        if (event.currentTarget === interiorColorSection){
            const color = button.querySelector("img").alt;
            interiorImage.src = interiorImages[color];
        }
    }
}

const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle("visible-bar", atTop);
    topBar.classList.toggle("hidden-bar", !atTop);
}

// Event Listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
actionSection.addEventListener("click", handleActionButtonClick);
