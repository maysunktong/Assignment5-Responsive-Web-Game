const playButton = document.getElementById("play-button");
const frontPage = document.getElementById("front-page");
const gameCanvas = document.getElementById("game-canvas");
const playerNameInput = document.getElementById("player-name");

export let playerName = ""; 
export function setPlayerName(name) {
  playerName = name;
}

const handleGameStart= () => {
  const enteredName = playerNameInput.value.trim();

  if (enteredName === "") {
    alert("Please enter your name to start the game.");
    return;
  }
  setPlayerName(enteredName);

  frontPage.style.display = "none";
  gameCanvas.style.display = "block";
};

playButton.addEventListener("click", handleGameStart);

playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGameStart();
  }
});
