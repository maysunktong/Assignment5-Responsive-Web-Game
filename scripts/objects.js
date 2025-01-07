import { createImage } from "./utils.js";

const collectibleCoins = "../assets/sprites/collectibles/coins.png";
const collectibleDiamonds = "../assets/sprites/collectibles/diamonds.png";
const collectibleGreenRunes = "../assets/sprites/collectibles/greenRunes.png";
const collectibleRedRunes = "../assets/sprites/collectibles/redRunes.png";
const collectibleRuby = "../assets/sprites/collectibles/ruby.png";
const collectibleStars = "../assets/sprites/collectibles/stars.png";

const green1 = "../assets/images/trees/green1.png";
const green2 = "../assets/images/trees/green2.png";
const green3 = "../assets/images/trees/green3.png";

const brown1 = "../assets/images/trees/brown1.png";
const brown2 = "../assets/images/trees/brown2.png";
const brown3 = "../assets/images/trees/brown3.png";

const bgForest = "../assets/images/backgrounds/bg_forest.png";
const bgNight = "../assets/images/backgrounds/bg_night.png";
const bgSky = "../assets/images/backgrounds/bg_sky.png";

export const objects = {
  backgrounds: {
    forest: createImage(bgForest),
    night: createImage(bgNight),
    sky: createImage(bgSky),
  },
  collectibles: {
    stars: createImage(collectibleStars),
    coins: createImage(collectibleCoins),
    diamonds: createImage(collectibleDiamonds),
    greenRunes: createImage(collectibleGreenRunes),
    redRunes: createImage(collectibleRedRunes),
    ruby: createImage(collectibleRuby),
  },
  trees: {
    green1: createImage(green1),
    green2: createImage(green2),
    green3: createImage(green3),
    brown1: createImage(brown1),
    brown2: createImage(brown2),
    brown3: createImage(brown3),
  },
};
