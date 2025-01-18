import { animate, init } from "./gameplay.js";
import { drawScoreboard } from "./scoreboard.js";
import { toggleVisibility } from "./utils.js";

const LETTER_REGEX = /^[a-zæøåäöÆØÅÄÖ]+$/i;

export const handleGameStart = () => {
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

const showHowToPlayPanel = () => {
  toggleVisibility(".modal-howtoplay-overlay", true);
};

const showScoreboard = () => {
  toggleVisibility("#scoreboard", true);
  drawScoreboard();
};

const closeCreditsPanel = () => {
  toggleVisibility(".modal-credits-overlay", false);
};

const closeHowToPlayPanel = () => {
  toggleVisibility(".modal-howtoplay-overlay", false);
};

$(".play-button").on("click", handleGameStart);

$("#player-name").on("keydown", (event) => {
  if (event.key === "Enter") {
    handleGameStart();
  }
});

$(".scoreboard-button").on("click", showScoreboard);
$(".howtoplay-button").on("click", showHowToPlayPanel);
$(".credits-button").on("click", showCreditsPanel);

$(".credits-close-button").on("click", closeCreditsPanel);
$(".howtoplay-close-button").on("click", closeHowToPlayPanel);

// export name to use in gameplay
export let playerName = "";
