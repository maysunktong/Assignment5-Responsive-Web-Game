import { init } from "./gameplay.js";
const modalOverlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(".modal-close");
const gameCanvas = document.getElementById("game-canvas");

export function showModal() {
  modalOverlay.style.display = "block";
  gameCanvas.style.display = "block";
}

function hideModal() {
  modalOverlay.style.display = "none";
  gameCanvas.style.display = "block";
  init();
}

closeModalBtn.addEventListener("click", hideModal);

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    hideModal();
  }
});
