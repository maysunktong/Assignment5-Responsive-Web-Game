import { init, playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";
import { drawScoreboard } from "./scoreboard.js";

const modalOverlay = document.querySelector(".modal-overlay");
const retryButton = document.querySelector(".retry-button");
const gameCanvas = document.getElementById("game-canvas");
const saveExitButton = document.querySelector(".home-button");
const modalMessage = document.querySelector(".summary-message");
const totalScore = document.querySelector(".total-score");
const gameSummaryContainer = document.querySelector(".game-summary");

export function showModal(status) {
  modalOverlay.style.display = "block";
  gameCanvas.style.display = "block";

  if (modalMessage) {
    if (status === "win") {
      modalMessage.textContent = `Congratulations! ${playerName}`;
      totalScore.textContent = `Score is ${playerScore}`;
      gameSummaryContainer.classList.add("game-summary-win");
    } else {
      modalMessage.textContent = `Oh no! You lost, ${playerName}.`;
      totalScore.textContent = `Score is ${playerScore}`;
      gameSummaryContainer.classList.add("game-summary-lose");
    }
  }
}

function retry() {
  modalOverlay.style.display = "none";
  gameCanvas.style.display = "block";
  init();
}

function navigateToHome() {
  drawScoreboard();
  window.location.href = "/index.html";
}

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    retry();
  }
});

retryButton.addEventListener("click", retry);
saveExitButton.addEventListener("click", navigateToHome);
