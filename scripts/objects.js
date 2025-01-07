import { createImage } from "./utils";

import collectibleCoins from "../assets/sprites/collectibles/coins.png";
import collectibleDiamonds from "../assets/sprites/collectibles/diamonds.png";
import collectibleGreenRunes from "../assets/sprites/collectibles/greenRunes.png";
import collectibleRedRunes from "../assets/sprites/collectibles/redRunes.png";
import collectibleRuby from "../assets/sprites/collectibles/ruby.png";
import collectibleStars from "../assets/sprites/collectibles/stars.png";

export const objects = {
  collectibles: {
    stars: createImage(collectibleStars),
    coins: createImage(collectibleCoins),
    diamonds: createImage(collectibleDiamonds),
    greenRunes: createImage(collectibleGreenRunes),
    redRunes: createImage(collectibleRedRunes),
    ruby: createImage(collectibleRuby),
  },
};
