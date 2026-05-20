import "dotenv/config";

const BANNER_WIDTH = 2560;
const BANNER_HEIGHT = 1440;
const TRAIN_WIDTH = 1546;
const TRAIN_HEIGHT = 423;
const SPLOTCH_WIDTH = 31;
const SPLOTCH_HEIGHT = 43;
const POPULATION_ORDER = [
  101, 400, 394, 78, 127, 58, 74, 343, 70, 245, 15, 487, 374, 41, 181, 22, 30,
  314, 468, 257, 168, 143, 208, 246, 95, 218, 255, 473, 290, 180, 73, 328, 353,
  88, 86, 27, 467, 69, 125, 85, 23, 387, 51, 401, 423, 426, 470, 64, 142, 259,
  215, 94, 97, 7, 497, 293, 356, 322, 422, 157, 330, 179, 173, 154, 178, 1, 331,
  49, 280, 177, 341, 460, 458, 12, 172, 342, 167, 364, 391, 349, 335, 469, 475,
  10, 121, 52, 152, 336, 378, 327, 40, 248, 222, 196, 221, 67, 403, 117, 160,
  68, 232, 105, 190, 37, 3, 54, 91, 270, 316, 81, 217, 432, 271, 360, 359, 82,
  307, 194, 289, 279, 274, 454, 115, 424, 405, 21, 437, 362, 291, 348, 481, 114,
  136, 445, 346, 388, 479, 384, 198, 138, 254, 272, 163, 354, 261, 56, 275, 410,
  457, 352, 144, 317, 323, 408, 237, 451, 407, 60, 367, 29, 119, 36, 480, 80,
  126, 355, 419, 99, 380, 371, 249, 13, 153, 162, 185, 299, 44, 211, 224, 17,
  463, 107, 478, 462, 135, 404, 496, 358, 193, 4, 436, 267, 256, 448, 483, 443,
  186, 83, 494, 315, 92, 150, 402, 459, 486, 333, 90, 310, 409, 84, 376, 466,
  420, 357, 238, 484, 50, 165, 418, 0, 440, 108, 446, 223, 319, 298, 182, 199,
  288, 251, 300, 253, 24, 8, 413, 370, 26, 321, 421, 441, 226, 132, 278, 489,
  311, 112, 240, 345, 247, 216, 302, 201, 265, 490, 351, 324, 149, 455, 100,
  212, 263, 130, 32, 395, 42, 427, 175, 435, 11, 124, 46, 392, 301, 308, 38,
  334, 137, 176, 266, 373, 229, 495, 140, 87, 312, 118, 326, 213, 396, 297, 45,
  244, 429, 439, 202, 472, 498, 369, 286, 31, 2, 76, 109, 411, 161, 268, 389,
  491, 206, 219, 350, 444, 195, 434, 164, 14, 191, 425, 111, 417, 145, 220, 159,
  465, 48, 188, 269, 235, 361, 170, 203, 171, 59, 169, 471, 243, 303, 189, 485,
  477, 43, 33, 412, 329, 102, 313, 116, 287, 456, 452, 368, 236, 398, 277, 200,
  39, 390, 158, 131, 264, 19, 304, 430, 146, 260, 89, 55, 449, 141, 129, 488,
  372, 365, 147, 482, 71, 66, 174, 339, 183, 464, 241, 192, 72, 450, 294, 156,
  62, 61, 492, 104, 309, 406, 207, 283, 320, 63, 103, 205, 134, 318, 166, 382,
  366, 184, 258, 227, 28, 47, 230, 53, 122, 306, 75, 6, 282, 120, 397, 476, 197,
  285, 305, 214, 233, 16, 381, 337, 9, 79, 210, 5, 209, 499, 148, 375, 25, 383,
  65, 225, 110, 262, 332, 18, 428, 325, 204, 234, 139, 35, 155, 281, 431, 151,
  438, 295, 284, 276, 377, 20, 77, 133, 493, 113, 447, 242, 385, 273, 292, 231,
  123, 338, 347, 296, 416, 442, 415, 474, 453, 399, 228, 363, 461, 379, 106, 34,
  344, 386, 393, 252, 93, 128, 96, 414, 239, 57, 250, 340, 187, 433, 98,
];

import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import fetch from "node-fetch";
import { getSubscriberCount } from "./get-subscribers.js";
import { uploadBanner } from "./upload-banner.js";
import { uploadBannerToSpaces } from "./spaces-uploader.js";

registerFont("fonts/runescape_uf.ttf", {
  family: "RuneScape",
});

const canvas = createCanvas(2560, 1440);
const ctx = canvas.getContext("2d");
const ACCESS_TOKEN = process.env.YOUTUBE_KEY;

async function drawBanner(subs) {
  let SUB_COUNT = subs;

  let bg = await loadImage("images/space.png");
  ctx.drawImage(bg, 0, 0);

  let train = await loadImage("images/train.png");
  ctx.drawImage(train, 0, 0);

  let splotch = await loadImage("images/blue-screen-31x43.png");
  let splotch_0_x = BANNER_WIDTH / 2 - TRAIN_WIDTH / 2;
  let splotch_0_y = BANNER_HEIGHT / 2 - TRAIN_HEIGHT / 2;
  let splotch_50_x = splotch_0_x + TRAIN_WIDTH - SPLOTCH_WIDTH;
  let splotch_10_y = splotch_0_y + TRAIN_HEIGHT - SPLOTCH_HEIGHT;
  ctx.drawImage(splotch, splotch_0_x, splotch_0_y);
  ctx.drawImage(splotch, splotch_50_x, splotch_0_y);
  ctx.drawImage(splotch, splotch_0_x, splotch_10_y);
  ctx.drawImage(splotch, splotch_50_x, splotch_10_y);
  for (let sub = 0; sub < 500 - SUB_COUNT; sub++) {
    let coord = POPULATION_ORDER[sub];
    let x = coord % 50;
    let y = Math.floor(coord / 50);
    let splotch_x = splotch_0_x + x * SPLOTCH_WIDTH;
    let splotch_y = splotch_0_y + y * SPLOTCH_HEIGHT;
    ctx.drawImage(splotch, splotch_x, splotch_y);
  }

  // x% of Hype Train complete!
  ctx.font = "bold 48px RuneScape";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 6;
  let percentage = ((100 * SUB_COUNT) / 500).toFixed(1);
  let message = `${percentage}% of Hype Train complete!`;
  ctx.strokeText(message, splotch_0_x + 25, splotch_0_y + 50);
  ctx.fillStyle = "yellow";
  ctx.fillText(message, splotch_0_x + 25, splotch_0_y + 50);

  // x% of Hype Train complete!
  message = `${SUB_COUNT} / 500 subscribers`;
  ctx.strokeText(message, splotch_0_x + 25, splotch_0_y + 100);
  ctx.fillText(message, splotch_0_x + 25, splotch_0_y + 100);

  // as of
  ctx.font = "bold 24px RuneScape";
  ctx.lineWidth = 3;
  message = `As of: ${new Date().toUTCString()}`;
  ctx.strokeText(message, splotch_0_x + 25, splotch_0_y + 130);
  ctx.fillText(message, splotch_0_x + 25, splotch_0_y + 130);

  let out = fs.createWriteStream(`banner.png`);
  let stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("Image has been processed."));

  //   out = fs.createWriteStream(`banner.png`);
  //   stream = canvas.createPNGStream();
  //   stream.pipe(out);
  //   out.on("finish", () => console.log("Image has been processed."));

  return canvas.toBuffer("image/png");
}

async function updateBanner() {
  let subs = await getSubscriberCount();
  let canvas = await drawBanner(subs);
  //   let url = await uploadBannerToSpaces(canvas);
  await uploadBanner();
}

updateBanner();

// function shuffleArray(n) {
//   const arr = Array.from({ length: n }, (_, i) => i);

//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }

//   return arr;
// }

// const result = shuffleArray(500);

// fs.writeFileSync("shuffled.json", JSON.stringify(result));
