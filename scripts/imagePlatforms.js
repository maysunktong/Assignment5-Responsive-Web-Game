import { createImageAsync } from "./utils.js";

const sm = "../assets/images/platforms/level1/sm.png";
const md = "../assets/images/platforms/level1/md.png";
const lg = "../assets/images/platforms/level1/lg.png";

const cl = "../assets/images/platforms/level1/cl.png";
const cr = "../assets/images/platforms/level1/cr.png";

const bsm = "../assets/images/platforms/level1/bsm.png";
const bmd = "../assets/images/platforms/level1/bmd.png";
const blg = "../assets/images/platforms/level1/blg.png";

const psm = "../assets/images/platforms/level1/1psm.png";
const ppsm = "../assets/images/platforms/level1/2psm.png";
const pppsm = "../assets/images/platforms/level1/3psm.png";

const pmd = "../assets/images/platforms/level1/1pmd.png";
const ppmd = "../assets/images/platforms/level1/2pmd.png";
const pppmd = "../assets/images/platforms/level1/3pmd.png";

const plg = "../assets/images/platforms/level1/1plg.png";
const pplg = "../assets/images/platforms/level1/2plg.png";
const ppplg = "../assets/images/platforms/level1/3plg.png";

const tpsm = "../assets/images/platforms/level1/1tpsm.png";
const tppsm = "../assets/images/platforms/level1/2tpsm.png";
const tpppsm = "../assets/images/platforms/level1/3tpsm.png";

const tpmd = "../assets/images/platforms/level1/1tpmd.png";
const tppmd = "../assets/images/platforms/level1/2tpmd.png";
const tpppmd = "../assets/images/platforms/level1/3tpmd.png";

const tplg = "../assets/images/platforms/level1/1tplg.png";
const tpplg = "../assets/images/platforms/level1/2tplg.png";
const tppplg = "../assets/images/platforms/level1/3tplg.png";

const longxl = "../assets/images/platforms/level1/longxl.png";
const hlongxl = "../assets/images/platforms/level1/hlongxl.png";

const lvl2pmd = "../assets/images/platforms/level2/lvl2pmd.png";
const lvl2plg = "../assets/images/platforms/level2/lvl2plg.png";
const lvl2sm = "../assets/images/platforms/level2/lvl2sm.png";
const lvl2md = "../assets/images/platforms/level2/lvl2md.png";
const lvl2lg = "../assets/images/platforms/level2/lvl2lg.png";

const barWood = "../assets/images/platforms/level2/bar_wooden.png";
const barBox = "../assets/images/platforms/level2/bar_box.png";
const barBoxLong = "../assets/images/platforms/level2/bar_box-long.png";

export const imagePlatforms = {
  level1: {
    // grass towers
    sm: await createImageAsync(sm),
    md: await createImageAsync(md),
    lg: await createImageAsync(lg),
    // corners
    cl: await createImageAsync(cl),
    cr: await createImageAsync(cr),
    // stone towers
    bsm: await createImageAsync(bsm),
    bmd: await createImageAsync(bmd),
    blg: await createImageAsync(blg),
    // small platforms
    psm: await createImageAsync(psm),
    ppsm: await createImageAsync(ppsm),
    pppsm: await createImageAsync(pppsm),
    // medium platforms
    pmd: await createImageAsync(pmd),
    ppmd: await createImageAsync(ppmd),
    pppmd: await createImageAsync(pppmd),
    // large platforms
    plg: await createImageAsync(plg),
    pplg: await createImageAsync(pplg),
    ppplg: await createImageAsync(ppplg),
    // trimmed small platforms
    tpsm: await createImageAsync(tpsm),
    tppsm: await createImageAsync(tppsm),
    tpppsm: await createImageAsync(tpppsm),
    // trimmed medium platforms
    tpmd: await createImageAsync(tpmd),
    tppmd: await createImageAsync(tppmd),
    tpppmd: await createImageAsync(tpppmd),
    // trimmed large platforms
    tplg: await createImageAsync(tplg),
    tpplg: await createImageAsync(tpplg),
    tppplg: await createImageAsync(tppplg),
    // extra long platforms
    longxl: await createImageAsync(longxl),
    hlongxl: await createImageAsync(hlongxl),
  },
  level2: {
    // stone platforms
    pmd: await createImageAsync(lvl2pmd),
    plg: await createImageAsync(lvl2plg),
    // stone towers
    sm: await createImageAsync(lvl2sm),
    md: await createImageAsync(lvl2md),
    lg: await createImageAsync(lvl2lg),
    // bars
    barwood: await createImageAsync(barWood),
    barbox: await createImageAsync(barBox),
    barboxlong: await createImageAsync(barBoxLong)
  },
};
