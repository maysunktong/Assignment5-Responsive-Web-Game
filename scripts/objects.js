import { createImage } from "./utils.js";

const collectibleCoins = "../assets/sprites/collectibles/coins.png";
const collectibleDiamonds = "../assets/sprites/collectibles/diamonds.png";
const collectibleGreenRunes = "../assets/sprites/collectibles/greenRunes.png";
const collectibleRedRunes = "../assets/sprites/collectibles/redRunes.png";
const collectibleRuby = "../assets/sprites/collectibles/ruby.png";
const collectibleStars = "../assets/sprites/collectibles/stars.png";

const platform = "../assets/images/platforms/1plg.png";
const trees = "../assets/images/objects/Environment/Bottle.png";
const background = "../assets/images/objects/Environment/Bucket.png";
const rocks = "../assets/images/objects/Environment/Decor_Bread.png";

export const objects = {
  platform: createImage(platform),
  trees: createImage(trees),
  background: createImage(background),
  rocks: createImage(rocks),
  collectibles: {
    stars: createImage(collectibleStars),
    coins: createImage(collectibleCoins),
    diamonds: createImage(collectibleDiamonds),
    greenRunes: createImage(collectibleGreenRunes),
    redRunes: createImage(collectibleRedRunes),
    ruby: createImage(collectibleRuby),
  },
};
