import { animate, init } from "./gameplay.js";
import { drawScoreboard } from "./scoreboard.js";

const startGameButton = document.getElementById("play-button");
const mainMenu = document.getElementById("main-menu");
const gameCanvas = document.getElementById("game-canvas");
const playerNameInput = document.getElementById("player-name");
const viewScoreboardButton = document.getElementById("scoreboard-button");
const scoreboard = document.getElementById("scoreboard");
const errorInputMessage = document.querySelector(".error-input-message");
const viewCreditsButton = document.getElementById("credits-button");
const creditsPanel = document.querySelector(".modal-credits-overlay");
const closeCreditsButton = document.querySelector(".credits-close-button");
const closeScoreboardButton = document.querySelector(
  ".scoreboard-close-button"
);

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

playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGameStart();
  }
});

const showCreditsPanel = () => {
  toggleVisibility(creditsPanel, true);
};

const closeCreditsPanel = () => {
  toggleVisibility(creditsPanel, false);
};

const showScoreboard = () => {
  toggleVisibility(scoreboard, true);

  drawScoreboard();
};

const closeScoreboardPanel = () => {
  window.location.href = "/index.html";
};

viewCreditsButton.addEventListener("click", showCreditsPanel);
closeCreditsButton.addEventListener("click", closeCreditsPanel);

viewScoreboardButton.addEventListener("click", showScoreboard);
closeScoreboardButton.addEventListener("click", closeScoreboardPanel);
