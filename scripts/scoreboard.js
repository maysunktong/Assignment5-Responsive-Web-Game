import { playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";
const mainMenu = document.getElementById("front-page");

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


const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", () => {
  window.location.href = "index.html";
  gameCanvas.style.display = "none";
  scoreboardPanel.style.display = "none";
});

export const drawScoreboard = () => {
  const scoreboardPanel = document.getElementById("scoreboard");

  const scoreboardText = document.createElement("h2");
  scoreboardText.innerText = "Scoreboard:";
  scoreboardPanel.appendChild(scoreboardText);

  addPlayerScore(playerName, playerScore);

  gameCanvas.style.display = "none";
  scoreboardPanel.style.display = "block";
  const scoreList = document.createElement("ul");
  scoreLocalStorage.slice(0, 5).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
    scoreList.appendChild(listItem);
  });
  scoreboardPanel.appendChild(scoreList);
  scoreboardPanel.appendChild(closeButton);
};
