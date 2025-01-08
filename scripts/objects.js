import { createImage } from "./utils.js";

const collectibleCoins = "../assets/sprites/collectibles/coins.png";
const collectibleDiamonds = "../assets/sprites/collectibles/diamonds.png";
const collectibleGreenRunes = "../assets/sprites/collectibles/greenRunes.png";
const collectibleRedRunes = "../assets/sprites/collectibles/redRunes.png";
const collectibleRuby = "../assets/sprites/collectibles/ruby.png";
const collectibleStars = "../assets/sprites/collectibles/stars.png";

const bgForest = "../assets/images/backgrounds/bg_forest.png";
const bgNight = "../assets/images/backgrounds/bg_night.png";
const bgSky = "../assets/images/backgrounds/bg_sky.png";

const green1 = "../assets/images/trees/green1.png";
const green2 = "../assets/images/trees/green2.png";
const green3 = "../assets/images/trees/green3.png";

const brown1 = "../assets/images/trees/brown1.png";
const brown2 = "../assets/images/trees/brown2.png";
const brown3 = "../assets/images/trees/brown3.png";

const bush1 = "../assets/images/bushes/Bush1.png";
const bush2 = "../assets/images/bushes/Bush2.png";
const bush3 = "../assets/images/bushes/Bush3.png";
const bush4 = "../assets/images/bushes/Bush4.png";
const bush5 = "../assets/images/bushes/Bush5.png";
const bush6 = "../assets/images/bushes/Bush6.png";
const bush7 = "../assets/images/bushes/Bush7.png";
const bush8 = "../assets/images/bushes/Bush8.png";

const villa = "../assets/images/Environment/villa.png";
const house = "../assets/images/Environment/house.png";
const merchant = "../assets/images/Environment/merchant.png";
const fences = "../assets/images/Environment/fences.png";

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
  bushes: {
    bush1: createImage(bush1),
    bush2: createImage(bush2),
    bush3: createImage(bush3),
    bush4: createImage(bush4),
    bush5: createImage(bush5),
    bush6: createImage(bush6),
    bush7: createImage(bush7),
    bush8: createImage(bush8),
  },
  environments: {
    villa: createImage(villa),
    merchant: createImage(merchant),
    house: createImage(house),
    fences: createImage(fences),
  },
};
