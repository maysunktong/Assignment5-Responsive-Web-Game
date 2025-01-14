import { playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";

const modalScoreboardOverlay = document.querySelector(
  ".modal-scoreboard-overlay"
);
const clearScoreButton = document.querySelector(".clear-score-button");
const closeScoreboardButton = document.querySelector(
  ".scoreboard-close-button"
);

let scoreLocalStorage = JSON.parse(localStorage.getItem("scoreboard")) || [];

const saveScoreboard = () => {
  localStorage.setItem("scoreboard", JSON.stringify(scoreLocalStorage));
};

const addPlayerScore = (name, score) => {
  const existingPlayer = scoreLocalStorage.find((entry) => entry.name === name);

  if (existingPlayer) {
    if (existingPlayer.score < score) {
      existingPlayer.score = score;
    }
  } else {
    scoreLocalStorage.push({ name, score });
  }
  scoreLocalStorage.sort((a, b) => b.score - a.score);

  saveScoreboard();
};

const clearScoreboard = () => {
  localStorage.removeItem("scoreboard");
  scoreLocalStorage = [];
  console.log("Scoreboard cleared!");
  drawScoreboard();
};

export const drawScoreboard = () => {
  modalScoreboardOverlay.style.display = "block";

  const scoreboard = document.getElementById("scoreboard");

  if (!scoreboard) {
    console.error("Scoreboard container not found!");
    return;
  }

  scoreboard.innerHTML = "";

  // const clearScoreButton = document.createElement("button");
  // const closeScoreboardButton = document.createElement("button");
  const scoreboardText = document.createElement("h2");
  const scoreList = document.createElement("ul");

  // closeScoreboardButton.innerText = "Close";
  // clearScoreButton.innerText = "Clear score";
  scoreboardText.innerText = "Scoreboard:";

  clearScoreButton.addEventListener("click", () => {
    clearScoreboard();
  });

  addPlayerScore(playerName, playerScore);

  scoreLocalStorage.slice(0, 100).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
    scoreList.appendChild(listItem);
  });

  // scoreboard.appendChild(closeScoreboardButton);
  // scoreboard.appendChild(clearScoreButton);
  scoreboard.appendChild(scoreboardText);
  scoreboard.appendChild(scoreList);

  function hideModal() {
    scoreboard.style.display = "none";
    window.location.href = "/index.html";
  }

  closeScoreboardButton.addEventListener("click", hideModal);
};
