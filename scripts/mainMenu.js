import { drawScoreboard } from "./scoreboard.js";

const startGameButton = document.getElementById("play-button");
const mainMenu = document.getElementById("front-page");
const gameCanvas = document.getElementById("game-canvas");
const playerNameInput = document.getElementById("player-name");
const viewScoreboardButton = document.getElementById("scoreboard-button");
const scoreboardPanel = document.getElementById("scoreboard");

const toggleVisibility = (element, isVisible) => {
  element.style.display = isVisible ? "block" : "none";
};

export let playerName = "";

const handleGameStart = () => {
  const enteredName = playerNameInput.value.trim();

  if (!enteredName) {
    alert("Please enter your name to start the game.");
    return;
  }

  playerName = enteredName;

  toggleVisibility(mainMenu, false);
  toggleVisibility(gameCanvas, true);
};

startGameButton.addEventListener("click", handleGameStart);

// click enter after entering name
playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGameStart();
  }
});

const showScoreboard = () => {
  toggleVisibility(mainMenu, false);
  toggleVisibility(scoreboardPanel, true);

  drawScoreboard();
};

viewScoreboardButton.addEventListener("click", showScoreboard);
