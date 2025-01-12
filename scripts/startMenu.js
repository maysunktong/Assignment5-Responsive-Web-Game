const playButton = document.getElementById("play-button");
const frontPage = document.getElementById("front-page");
const gameCanvas = document.getElementById("game-canvas");
const playerNameInput = document.getElementById("player-name");

playButton.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();

  if (playerName === "") {
    alert("Please enter your name to start the game.");
    return;
  }

  frontPage.style.display = "none";
  gameCanvas.style.display = "block";
});
