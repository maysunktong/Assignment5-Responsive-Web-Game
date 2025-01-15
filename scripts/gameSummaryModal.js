import { init } from "./gameplay.js";
import { drawScoreboard } from "./scoreboard.js";
import { playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";

const modalOverlay = document.querySelector(".modal-overlay");
const retryButton = document.querySelector(".retry-button");
const gameCanvas = document.getElementById("game-canvas");
const homeButton = document.querySelector(".home-button");

export function showModal(status) {
  modalOverlay.style.display = "block";
  gameCanvas.style.display = "block";

  const modalMessage = document.querySelector(".modal-message");
  if (modalMessage) {
    if (status === "win") {
      modalMessage.textContent = "Congratulations! You won!";
    } else {
      modalMessage.textContent = "Oh no! You lost.";
    }
  }
}

function retry() {
  modalOverlay.style.display = "none";
  gameCanvas.style.display = "block";
  init();
}

function navigateToHome() {
  drawScoreboard()
  modalOverlay.style.display = "none";
  gameCanvas.style.display = "none";
  window.location.href = "/index.html";
}

retryButton.addEventListener("click", retry);
homeButton.addEventListener("click", navigateToHome);

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    retry();
  }
});
