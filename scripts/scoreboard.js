import { playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";

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
  const scoreboardContainer = document.getElementById("scoreboard");

  if (!scoreboardContainer) {
    console.error("Scoreboard container not found!");
    return;
  }

  scoreboardContainer.innerHTML = "";

  const clearScoreButton = document.createElement("button");
  const closeScoreboardButton = document.createElement("button");
  const scoreboardText = document.createElement("h2");
  const scoreList = document.createElement("ul");

  clearScoreButton.innerText = "Clear score";
  scoreboardText.innerText = "Scoreboard:";
  closeScoreboardButton.innerText = "Close";

  clearScoreButton.addEventListener("click", () => {
    clearScoreboard();
  });

  addPlayerScore(playerName, playerScore);

  scoreLocalStorage.slice(0, 100).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
    scoreList.appendChild(listItem);
  });

  scoreboardContainer.appendChild(clearScoreButton);
  scoreboardContainer.appendChild(scoreboardText);
  scoreboardContainer.appendChild(scoreList);
  scoreboardContainer.appendChild(closeScoreboardButton);



  function hideModal() {
    scoreboardContainer.style.display = "none";
    window.location.href = "/index.html";
  }
  closeScoreboardButton.addEventListener("click", hideModal);
};
