import { playerScore } from "./gameplay.js";
import { playerName } from "./mainMenu.js";
import { toggleVisibility } from "./utils.js";

let scoreLocalStorage = JSON.parse(localStorage.getItem("scoreboard")) || [];

export const saveScoreboard = () => {
  localStorage.setItem("scoreboard", JSON.stringify(scoreLocalStorage));
};

const addPlayerScore = (name, score) => {
  const existingPlayer = scoreLocalStorage.find((entry) => entry.name === name);

  if (existingPlayer) {
    if (existingPlayer.score < score) {
      existingPlayer.score = score;
      existingPlayer.date = new Date().toISOString();
    }
  } else {
    scoreLocalStorage.push({ name, score, date: new Date().toISOString() });
  }
  scoreLocalStorage.sort((a, b) => b.score - a.score);

  saveScoreboard();
};

const clearScoreboard = () => {
  localStorage.removeItem("scoreboard");
  scoreLocalStorage = [];
  drawScoreboard();
};

const closeScoreboardPanel = () => {
  window.location.href = "/index.html";
};

$(".clear-score-button").on("click", clearScoreboard);
$(".scoreboard-close-button").on("click", closeScoreboardPanel);

// executing scoreboard
export const drawScoreboard = () => {
  const $scoreboard = $("#scoreboard");
  $scoreboard.empty();
  
  toggleVisibility(".modal-scoreboard-overlay", true);

  const $scoreboardText = $("<h2>").text("Your top 5 best scores");
  const $scoreList = $("<ul>");

  $scoreboard.append($scoreboardText);
  $scoreboard.append($scoreList);

  addPlayerScore(playerName, playerScore);

  scoreLocalStorage.slice(0, 5).forEach((entry, index) => {
    const formattedDate = new Date(entry.date).toLocaleDateString();
    const $listItem = $("<li>").text(
      `${index + 1}. ${entry.name}: ${entry.score} --- (Date: ${formattedDate})`
    );
    $scoreList.append($listItem);
  });

  if ($scoreboard.length === 0) {
    console.error("Scoreboard container not found!");
    return;
  }
};
