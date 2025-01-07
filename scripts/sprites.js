import { createImage } from "./utils";

const swordsManIdleRight = "../assets/sprites/Swordsman/Idle.png";
const swordsManIdleLeft = "../assets/sprites/Swordsman/left/Idle_left.png";
const swordsManRunLeft = "../assets/sprites/Swordsman/left/Run_left.png";
const swordsManRunRight = "../assets/sprites/Swordsman/Run.png";

const wizardIdleRight = "../assets/sprites/Wizard/Idle.png";
const wizardIdleLeft = "../assets/sprites/Wizard/left/Idle_left.png";
const wizardRunLeft = "../assets/sprites/Wizard/left/Run_left.png";
const wizardRunRight = "../assets/sprites/Wizard/Run.png";

const musketeerIdleRight = "../assets/sprites/Musketeer/Idle.png";
const musketeerIdleLeft = "../assets/sprites/Musketeer/left/Idle_left.png";
const musketeerRunLeft = "../assets/sprites/Musketeer/left/Run_left.png";
const musketeerRunRight = "../assets/sprites/Musketeer/Run.png";

const archerIdleRight = "../assets/sprites/Archer/Idle.png";
const archerIdleLeft = "../assets/sprites/Archer/left/Idle_left.png";
const archerRunLeft = "../assets/sprites/Archer/left/Run_left.png";
const archerRunRight = "../assets/sprites/Archer/Run.png";

const blackWolfWalkLeft = "../assets/sprites/Werewolf/walk_left.png";
const blackWolfWalkRight = "../assets/sprites/Werewolf/walk_right.png";

const redWolfRunLeft = "../assets/sprites/Werewolf/run_left.png";
const redWolfRunRight = "../assets/sprites/Werewolf/run_right.png";

const whiteWolfAttackLeft = "../assets/sprites/Werewolf/attack_left.png";
const whiteWolfAttackRight = "../assets/sprites/Werewolf/attack_right.png";

const explosionBlue = "../assets/sprites/explosion/explosion_blue.png";
const explosionBrown = "../assets/sprites/explosion/explosion_brown.png";
const explosionGreen = "../assets/sprites/explosion/explosion_green.png";

export const sprites = {
  swordsman: {
    idle: {
      right: createImage(swordsManIdleRight),
      left: createImage(swordsManIdleLeft),
    },
    run: {
      right: createImage(swordsManRunRight),
      left: createImage(swordsManRunLeft),
    },
  },
  wizard: {
    idle: {
      right: createImage(wizardIdleRight),
      left: createImage(wizardIdleLeft),
    },
    run: {
      right: createImage(wizardRunRight),
      left: createImage(wizardRunLeft),
    },
  },
  musketeer: {
    idle: {
      right: createImage(musketeerIdleRight),
      left: createImage(musketeerIdleLeft),
    },
    run: {
      right: createImage(musketeerRunRight),
      left: createImage(musketeerRunLeft),
    },
  },
  archer: {
    idle: {
      right: createImage(archerIdleRight),
      left: createImage(archerIdleLeft),
    },
    run: {
      right: createImage(archerRunRight),
      left: createImage(archerRunLeft),
    },
  },
  werewolf: {
    walk: {
      right: createImage(blackWolfWalkRight),
      left: createImage(blackWolfWalkLeft),
      explosion: createImage(explosionBlue),
    },
    run: {
      right: createImage(redWolfRunRight),
      left: createImage(redWolfRunLeft),
      explosion: createImage(explosionBrown),
    },
    attack: {
      right: createImage(whiteWolfAttackRight),
      left: createImage(whiteWolfAttackLeft),
      explosion: createImage(explosionGreen),
    },
  },
};
