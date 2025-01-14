import { drawScoreboard } from "./scoreboard.js";
import { animate, init } from "./gameplay.js";

const startGameButton = document.getElementById("play-button");
const mainMenu = document.getElementById("main-menu");
const gameCanvas = document.getElementById("game-canvas");
const playerNameInput = document.getElementById("player-name");
const viewScoreboardButton = document.getElementById("scoreboard-button");
const scoreboardPanel = document.getElementById("scoreboard");
const errorInputMessage = document.querySelector(".error-input-message");
const viewCreditsButton = document.getElementById("credits-button");
const creditsPanel = document.querySelector(".modal-credits-overlay");
const closeCreditsButton = document.querySelector(".credits-close-button");

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
    errorInputMessage.textContent = "Your name should only contain letters.";
    return;
  }

  playerName = enteredName;

  toggleVisibility(mainMenu, false);
  toggleVisibility(gameCanvas, true);
  init();
  animate();
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

const showCreditsPanel = () => {
  toggleVisibility(creditsPanel, true);
};

const closeCreditsPandel = () => {
  toggleVisibility(creditsPanel, false);
};

creditsPanel.addEventListener("click", (event) => {
  if (event.target === creditsPanel) {
    toggleVisibility(creditsPanel, false);
  }
});

closeCreditsButton.addEventListener("click", closeCreditsPandel);
viewCreditsButton.addEventListener("click", showCreditsPanel);
viewScoreboardButton.addEventListener("click", showScoreboard);
