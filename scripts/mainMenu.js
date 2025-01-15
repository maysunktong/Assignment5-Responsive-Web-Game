import { animate, init } from "./gameplay.js";
import { drawScoreboard } from "./scoreboard.js";
import { toggleVisibility } from "./utils.js";

const LETTER_REGEX = /^[a-zæøåäöÆØÅÄÖ]+$/i;

const handleGameStart = () => {
  const enteredName = $.trim($("#player-name").val());
  if (enteredName === "") {
    $(".error-input-message").text("Please input your name.");
    return;
  }

  if (!LETTER_REGEX.test(enteredName)) {
    $(".error-input-message").text("Your name should only contain letters.");
    return;
  }

  playerName = enteredName;

  toggleVisibility("#main-menu", false);
  toggleVisibility("#game-canvas", true);
  init();
  animate();
};

const showCreditsPanel = () => {
  toggleVisibility(".modal-credits-overlay", true);
};

const closeCreditsPanel = () => {
  toggleVisibility(".modal-credits-overlay", false);
};

const showScoreboard = () => {
  toggleVisibility("#scoreboard", true);
  drawScoreboard();
};

$(".play-button").on("click", handleGameStart);

$("#player-name").on("keydown", (event) => {
  if (event.key === "Enter") {
    handleGameStart();
  }
});

$(".credits-button").on("click", showCreditsPanel);
$(".credits-close-button").on("click", closeCreditsPanel);
$(".scoreboard-button").on("click", showScoreboard);

// export name to use in gameplay
export let playerName = "";
