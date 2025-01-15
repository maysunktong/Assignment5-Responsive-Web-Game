import { playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";
import { toggleVisibility } from "./utils.js";

const scoreboard = document.getElementById("scoreboard");
const clearScoreButton = document.querySelector(".clear-score-button");
const closeScoreboardButton = document.querySelector(
  ".scoreboard-close-button"
);
const modalScoreboardOverlay = document.querySelector(
  ".modal-scoreboard-overlay"
);

// Local storage for scoreboard
let scoreLocalStorage = JSON.parse(localStorage.getItem("scoreboard")) || [];

export const saveScoreboard = () => {
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

const closeScoreboardPanel = () => {
  window.location.href = "/index.html";
};

clearScoreButton.addEventListener("click", clearScoreboard);
closeScoreboardButton.addEventListener("click", closeScoreboardPanel);

// executing scoreboard
export const drawScoreboard = () => {
  toggleVisibility(modalScoreboardOverlay, true);
  scoreboard.innerHTML = "";

  const scoreboardText = document.createElement("h2");
  const scoreList = document.createElement("ul");

  scoreboardText.innerText = "Your top 5 best scores";
  scoreboard.appendChild(scoreboardText);
  scoreboard.appendChild(scoreList);

  addPlayerScore(playerName, playerScore);

  if (scoreLocalStorage.length === 0) {
    const placeholder = document.createElement("li");
    placeholder.innerText = "No scores recorded.";
    scoreList.appendChild(placeholder);
  } else {
    scoreLocalStorage.slice(0, 5).forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
      scoreList.appendChild(listItem);
    });
  }

  if (!scoreboard) {
    console.error("Scoreboard container not found!");
    return;
  }
};
