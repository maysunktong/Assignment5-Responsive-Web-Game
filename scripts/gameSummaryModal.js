import { init, playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";
import { drawScoreboard } from "./scoreboard.js";
import { toggleVisibility } from "./utils.js";

export function showModal(status) {
  toggleVisibility(".modal-overlay", true);
  toggleVisibility("#game-canvas", true);

  if ($(".summary-message")) {
    if (status === "win") {
      $(".summary-message").text(`Congratulations! ${playerName}`);
      $(".total-score").text(`Score is ${playerScore}`);
      $(".game-summary").addClass("game-summary-win");
    } else {
      $(".summary-message").text(`Oh no! You lost, ${playerName}.`);
      $(".total-score").text(`Score is ${playerScore}`);
      $(".game-summary").addClass("game-summary-lose");
    }
    return;
  }
}

function retry() {
  toggleVisibility(".modal-overlay", false);
  toggleVisibility("#game-canvas", true);
  init();
}

function navigateToHome() {
  drawScoreboard();
  window.location.href = "/index.html";
}

modalOverlay.addEventListener("click", (event) => {
  if (event.target === $(".modal-overlay")) {
    retry();
  }
});

$(".retry-button").on("click", retry);
$(".save-quit-button").on("click", navigateToHome);
