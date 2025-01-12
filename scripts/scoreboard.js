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
  localStorage.removeItem("scoreboard"); // Remove the scoreboard from localStorage
  scoreLocalStorage = []; // Optionally clear the in-memory scoreboard array
  console.log("Scoreboard cleared!");
  drawScoreboard(); // Redraw the scoreboard after clearing it
};

export const drawScoreboard = (playerName, playerScore) => {
  const scoreboardContainer = document.getElementById("scoreboard");
  console.log("Drawing scoreboard...");

  if (!scoreboardContainer) {
    console.error("Scoreboard container not found!");
    return;
  }

  scoreboardContainer.innerHTML = ""; // Clear any previous content

  // Create and add the "Clear score" button
  const clearScoreButton = document.createElement("button");
  clearScoreButton.innerText = "Clear score";

  // Add the event listener to the button
  clearScoreButton.addEventListener("click", () => {
    clearScoreboard();
  });

  // Add "Scoreboard" heading
  const scoreboardText = document.createElement("h2");
  scoreboardText.innerText = "Scoreboard:";

  // Append the button and the heading to the scoreboard container
  scoreboardContainer.appendChild(clearScoreButton);
  scoreboardContainer.appendChild(scoreboardText);

  // Add player score
  addPlayerScore(playerName, playerScore);

  // Create and append score list
  const scoreList = document.createElement("ul");
  scoreLocalStorage.slice(0, 100).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
    scoreList.appendChild(listItem);
  });
  scoreboardContainer.appendChild(scoreList);

  // Hide canvas and show scoreboard
  gameCanvas.style.display = "none";
  scoreboardContainer.style.display = "block";

  console.log("Scoreboard drawn!");
};
