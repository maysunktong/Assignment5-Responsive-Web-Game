import { animate, init } from "./gameplay.js";
import { drawScoreboard } from "./scoreboard.js";
import { toggleVisibility } from './utils.js';

const startGameButton = document.querySelector(".play-button");
const mainMenu = document.getElementById("main-menu");
const gameCanvas = document.getElementById("game-canvas");
const playerNameInput = document.getElementById("player-name");
const viewScoreboardButton = document.querySelector(".scoreboard-button");
const scoreboard = document.getElementById("scoreboard");
const errorInputMessage = document.querySelector(".error-input-message");
const viewCreditsButton = document.querySelector(".credits-button");
const creditsPanel = document.querySelector(".modal-credits-overlay");
const closeCreditsButton = document.querySelector(".credits-close-button");

const LETTER_REGEX = /^[a-zæøåäöÆØÅÄÖ]+$/i;

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

startGameButton.addEventListener("click", handleGameStart);

playerNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGameStart();
  }
});

viewCreditsButton.addEventListener("click", showCreditsPanel);
closeCreditsButton.addEventListener("click", closeCreditsPanel);
viewScoreboardButton.addEventListener("click", showScoreboard);

export let playerName = "";
