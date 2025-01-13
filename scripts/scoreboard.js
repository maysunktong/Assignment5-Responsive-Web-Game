import { playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";

const gameCanvas = document.getElementById("game-canvas");

let scoreLocalStorage =
  JSON.parse(localStorage.getItem("scoreboardPanel")) || [];
const saveScoreboard = () => {
  localStorage.setItem("scoreboardPanel", JSON.stringify(scoreLocalStorage));
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
  localStorage.removeItem("scoreboardPanel");
  scoreLocalStorage = [];
  drawScoreboard();
};

export const drawScoreboard = () => {
  const scoreboardPanel = document.getElementById("scoreboard");

  scoreboardPanel.innerHTML = "";

  const clearScoreButton = document.createElement("button");
  clearScoreButton.innerText = "Clear score";

  clearScoreButton.addEventListener("click", () => {
    clearScoreboard();
  });

  const scoreboardText = document.createElement("h2");
  scoreboardText.innerText = "Scoreboard:";

  scoreboardPanel.appendChild(clearScoreButton);
  scoreboardPanel.appendChild(scoreboardText);

  addPlayerScore(playerName, playerScore);

  const scoreList = document.createElement("ul");
  scoreLocalStorage.slice(0, 5).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
    scoreList.appendChild(listItem);
  });
  scoreboardPanel.appendChild(scoreList);

  gameCanvas.style.display = "none";
  scoreboardPanel.style.display = "block";
};
