import { playerScore } from './gameplay.js';
import { playerName } from "./startMenu.js";

const gameCanvas = document.getElementById("game-canvas");

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
  scoreLocalStorage = []
  console.log("Scoreboard cleared!");
  drawScoreboard();
};

export const drawScoreboard = () => {
  const scoreboardContainer = document.getElementById("scoreboard");

  if (!scoreboardContainer) {
    console.error("Scoreboard container not found!");
    return;
  }

  scoreboardContainer.innerHTML = "";

  const clearScoreButton = document.createElement("button");
  clearScoreButton.innerText = "Clear score";

  clearScoreButton.addEventListener("click", () => {
    clearScoreboard();
  });

  const scoreboardText = document.createElement("h2");
  scoreboardText.innerText = "Scoreboard:";

  scoreboardContainer.appendChild(clearScoreButton);
  scoreboardContainer.appendChild(scoreboardText);

  addPlayerScore(playerName, playerScore);

  const scoreList = document.createElement("ul");
  scoreLocalStorage.slice(0, 100).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
    scoreList.appendChild(listItem);
  });
  scoreboardContainer.appendChild(scoreList);

  gameCanvas.style.display = "none";
  scoreboardContainer.style.display = "block";
};
