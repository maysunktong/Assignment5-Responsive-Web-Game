import { drawScoreboard } from "./scoreboard.js";

const startGameButton = document.getElementById("play-button");
const mainMenu = document.getElementById("front-page");
const gameCanvas = document.getElementById("game-canvas");
const playerNameInput = document.getElementById("player-name");
const viewScoreboardButton = document.getElementById("scoreboard-button");
const scoreboardPanel = document.getElementById("scoreboard");
const errorInputMessage = document.querySelector(".error-input-message");
const LETTER_REGEX = /^[a-zæøåäöÆØÅÄÖ]+$/i;

const toggleVisibility = (element, isVisible) => {
  element.style.display = isVisible ? "block" : "none";
};

const handleGameStart = () => {
  const enteredName = playerNameInput.value.trim();

  if (enteredName === "") {
    errorInputMessage.textContent = "Please input your name.";
    return;
  }

  if (!LETTER_REGEX.test(enteredName)) {
    errorInputMessage.textContent =
      "Your name should only contain letters.";
    return;
  }

  playerName = enteredName;

  toggleVisibility(mainMenu, false);
  toggleVisibility(gameCanvas, true);
};

export let playerName = "";

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
