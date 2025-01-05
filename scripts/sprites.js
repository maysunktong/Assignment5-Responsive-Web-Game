import swordsManIdleRight from "../assets/sprites/Swordsman/Idle.png";
import swordsManIdleLeft from "../assets/sprites/Swordsman/left/Idle_left.png";
import swordsManRunLeft from "../assets/sprites/Swordsman/left/Run_left.png";
import swordsManRunRight from "../assets/sprites/Swordsman/Run.png";

import wizardIdleRight from "../assets/sprites/Wizard/Idle.png";
import wizardIdleLeft from "../assets/sprites/Wizard/left/Idle_left.png";
import wizardRunLeft from "../assets/sprites/Wizard/left/Run_left.png";
import wizardRunRight from "../assets/sprites/Wizard/Run.png";

import musketeerIdleRight from "../assets/sprites/Musketeer/Idle.png";
import musketeerIdleLeft from "../assets/sprites/Musketeer/left/Idle_left.png";
import musketeerRunLeft from "../assets/sprites/Musketeer/left/Run_left.png";
import musketeerRunRight from "../assets/sprites/Musketeer/Run.png";

import archerIdleRight from "../assets/sprites/Archer/Idle.png";
import archerIdleLeft from "../assets/sprites/Archer/left/Idle_left.png";
import archerRunLeft from "../assets/sprites/Archer/left/Run_left.png";
import archerRunRight from "../assets/sprites/Archer/Run.png";

import blackWolfWalkLeft from "../assets/sprites/Werewolf/walk_left.png";
import blackWolfWalkRight from "../assets/sprites/Werewolf/walk_right.png";

import redWolfRunLeft from "../assets/sprites/Werewolf/run_left.png";
import redWolfRunRight from "../assets/sprites/Werewolf/run_right.png";

import whiteWolfAttackLeft from "../assets/sprites/Werewolf/attack_left.png";
import whiteWolfAttackRight from "../assets/sprites/Werewolf/attack_right.png";

import explosionBlue from "../assets/sprites/explosion/explosion_blue.png";
import explosionBrown from "../assets/sprites/explosion/explosion_brown.png";
import explosionGreen from "../assets/sprites/explosion/explosion_green.png";

export const sprites = {
  swordsman: {
    idle: {
      right: swordsManIdleRight,
      left: swordsManIdleLeft,
    },
    run: {
      right: swordsManRunRight,
      left: swordsManRunLeft,
    },
  },
  wizard: {
    idle: {
      right: wizardIdleRight,
      left: wizardIdleLeft,
    },
    run: {
      right: wizardRunRight,
      left: wizardRunLeft,
    },
  },
  musketeer: {
    idle: {
      right: musketeerIdleRight,
      left: musketeerIdleLeft,
    },
    run: {
      right: musketeerRunRight,
      left: musketeerRunLeft,
    },
  },
  archer: {
    idle: {
      right: archerIdleRight,
      left: archerIdleLeft,
    },
    run: {
      right: archerRunRight,
      left: archerRunLeft,
    },
  },
  werewolf: {
    walk: {
      right: blackWolfWalkRight,
      left: blackWolfWalkLeft,
      explosion: explosionBlue,
    },
    run: {
      right: redWolfRunRight,
      left: redWolfRunLeft,
      explosion: explosionBrown,
    },
    attack: {
      right: whiteWolfAttackRight,
      left: whiteWolfAttackLeft,
      explosion: explosionGreen,
    },
  },
};
