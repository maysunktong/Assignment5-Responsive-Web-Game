import { createImageAsync } from "./utils.js";

const sm = "../assets/images/platforms/sm.png";
const md = "../assets/images/platforms/md.png";
const lg = "../assets/images/platforms/lg.png";

const cl = "../assets/images/platforms/cl.png";
const cr = "../assets/images/platforms/cr.png";

const bsm = "../assets/images/platforms/bsm.png";
const bmd = "../assets/images/platforms/bmd.png";
const blg = "../assets/images/platforms/blg.png";

const psm = "../assets/images/platforms/1psm.png";
const ppsm = "../assets/images/platforms/2psm.png";
const pppsm = "../assets/images/platforms/3psm.png";

const pmd = "../assets/images/platforms/1pmd.png";
const ppmd = "../assets/images/platforms/2pmd.png";
const pppmd = "../assets/images/platforms/3pmd.png";

const plg = "../assets/images/platforms/1plg.png";
const pplg = "../assets/images/platforms/2plg.png";
const ppplg = "../assets/images/platforms/3plg.png";

const tpsm = "../assets/images/platforms/1tpsm.png";
const tppsm = "../assets/images/platforms/2tpsm.png";
const tpppsm = "../assets/images/platforms/3tpsm.png";

const tpmd = "../assets/images/platforms/1tpmd.png";
const tppmd = "../assets/images/platforms/2tpmd.png";
const tpppmd = "../assets/images/platforms/3tpmd.png";

const tplg = "../assets/images/platforms/1tplg.png";
const tpplg = "../assets/images/platforms/2tplg.png";
const tppplg = "../assets/images/platforms/3tplg.png";

const longxl = "../assets/images/platforms/longxl.png";
const hlongxl = "../assets/images/platforms/hlongxl.png";

export const imagePlatforms = {
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
};
