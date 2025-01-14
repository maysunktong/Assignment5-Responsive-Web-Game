import { init } from "./gameplay.js";
const modalOverlay = document.querySelector(".modal-overlay");
const retryButton = document.querySelector(".modal-retry");
const gameCanvas = document.getElementById("game-canvas");
const homeButton = document.querySelector(".home-button");

export function showModal(status) {
  modalOverlay.style.display = "block";
  gameCanvas.style.display = "block";

  const modalMessage = document.querySelector(".modal-message");
  if (modalMessage) {
    if (status === "win") {
      modalMessage.textContent = "Congratulations! You won!";
      modalMessage.style.color = "green"; // Optional: set color for win
    } else {
      modalMessage.textContent = "Oh no! You lost.";
      modalMessage.style.color = "red"; // Optional: set color for lose
    }
  }
}

function retry() {
  modalOverlay.style.display = "none";
  gameCanvas.style.display = "block";
  init();
}

function navigateToHome() {
  modalOverlay.style.display = "none";
  gameCanvas.style.display = "none";
  window.location.href = "/index.html";
}

retryButton.addEventListener("click", retry);
homeButton.addEventListener("click", navigateToHome);

// modalOverlay.addEventListener("click", (event) => {
//   if (event.target === modalOverlay) {
//     hideModal();
//   }
// });
