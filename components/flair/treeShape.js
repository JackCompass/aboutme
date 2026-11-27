// Drawing data for the tree. Coordinates are SVG units; VIEW_BOX is the part
// of that space the tree sits in. Its bottom edge sits on the bottom of the
// screen, so the roots rest on the screen edge.
export const VIEW_BOX = { x: 70, y: 26, width: 620, height: 730 };

// A small sprig of 4 pointed leaves, growing from (0, 0). The canopy is made
// of about a thousand of these, overlapping.
export const SPRIG = `
  M 0 0 C -3 -6, -2 -12, 0 -16 C 2 -12, 3 -6, 0 0 Z
  M 0 0 C -8 -3, -13 -7, -15 -11 C -10 -10, -5 -6, 0 0 Z
  M 0 0 C 8 -3, 13 -7, 15 -11 C 10 -10, 5 -6, 0 0 Z
  M 0 2 C -4 6, -5 10, -2 13 C 0 10, 1 6, 0 2 Z`;

// The trunk splits into limbs at the top and spreads into roots at the base.
export const TRUNK = `
  M 168 725
  C 215 718, 255 698, 272 670
  C 286 645, 290 595, 286 530
  C 283 475, 276 440, 245 395
  L 262 385
  C 285 412, 296 435, 304 452
  C 308 422, 310 392, 306 365
  L 332 365
  C 334 398, 336 425, 342 448
  C 365 422, 392 396, 422 378
  L 436 392
  C 402 422, 372 458, 355 495
  C 344 522, 342 575, 348 632
  C 354 678, 388 702, 462 720
  Q 418 718, 398 712
  C 412 728, 426 742, 438 754
  Q 404 736, 374 714
  C 362 710, 345 712, 334 716
  C 338 728, 340 738, 342 748
  Q 320 732, 306 714
  Q 270 726, 232 742
  Q 252 724, 266 712
  Q 218 728, 168 725 Z`;

// Lines on the trunk and roots for the bark.
export const BARK = [
  "M 304 475 C 306 530, 304 595, 298 658",
  "M 320 445 C 324 510, 322 585, 324 670",
  "M 336 490 C 338 555, 340 615, 348 672",
  "M 294 672 C 272 695, 240 712, 198 720",
  "M 314 686 C 300 704, 280 718, 256 730",
  "M 358 682 C 382 702, 405 720, 426 742",
  "M 372 678 C 400 694, 424 706, 448 714",
];

// Short ink strokes shading the right side of the trunk.
export const HATCHING =
  "M 342 525 L 332 538 M 344 548 L 333 562 M 345 572 L 334 586 M 347 596 L 336 610 M 350 620 L 338 634";

// Bits of branch that peek out through gaps in the leaves.
export const INNER_BRANCHES = [
  "M 238 418 C 232 406, 224 398, 212 392 C 224 394, 236 402, 246 414 Z",
  "M 205 335 C 194 318, 182 304, 174 288 C 188 298, 200 312, 214 328 L 236 308 L 222 332 L 244 352 L 214 342 Z",
  "M 344 326 C 340 306, 336 286, 332 268 C 342 282, 348 298, 354 314 L 372 292 L 358 322 Z",
  "M 358 175 C 346 164, 334 156, 322 146 C 336 150, 348 158, 362 168 L 356 144 L 368 172 Z",
  "M 438 308 C 460 295, 482 282, 502 272 C 488 286, 466 302, 444 316 Z",
  "M 498 242 C 516 232, 534 222, 550 214 C 538 226, 520 238, 502 250 Z",
  "M 475 376 C 495 374, 514 374, 532 378 C 514 380, 495 382, 474 385 Z",
];

// Spots where birds sit: on the peeking branches and on top of the canopy.
// There are more spots than birds, so they always have somewhere to go.
export const PERCHES = [
  // Branches that peek through the leaves.
  { x: 505, y: 373 },
  { x: 478, y: 282 },
  { x: 524, y: 226 },

  // Top of the canopy.
  { x: 380, y: 44 },
  { x: 566, y: 208 },
  { x: 224, y: 160 },
  { x: 145, y: 214 },
  { x: 102, y: 266 },
  { x: 636, y: 262 },
];

// Groups of sprigs that together give the canopy its tall, uneven outline:
// [centerX, centerY, radiusX, radiusY, sprigCount, sunlight]. Sunlight (0-1)
// is higher on the upper right, where more sprigs get the brightest lines.
const CLUSTERS = [
  // Top of the crown.
  [375, 78, 38, 32, 34, 0.45],
  [342, 118, 46, 38, 40, 0.35],
  [418, 116, 52, 40, 46, 0.65],
  [488, 148, 44, 32, 36, 0.7],

  // Upper left.
  [265, 148, 42, 34, 34, 0.25],
  [222, 205, 56, 44, 48, 0.25],
  [145, 248, 46, 34, 36, 0.2],
  [102, 295, 38, 30, 28, 0.15],

  // Upper middle.
  [325, 192, 58, 46, 52, 0.35],
  [405, 185, 58, 44, 52, 0.55],
  [478, 208, 54, 42, 48, 0.65],

  // Middle and lower left.
  [168, 332, 54, 42, 46, 0.2],
  [268, 278, 58, 44, 50, 0.3],
  [252, 365, 52, 40, 44, 0.2],
  [145, 408, 46, 34, 34, 0.15],
  [215, 432, 44, 32, 34, 0.18],

  // Middle and outer right.
  [385, 265, 60, 44, 50, 0.45],
  [468, 272, 58, 44, 50, 0.6],
  [565, 252, 56, 42, 48, 0.72],
  [635, 295, 42, 32, 32, 0.78],
  [538, 328, 60, 44, 52, 0.65],
  [625, 356, 48, 36, 38, 0.75],

  // Lower edge of the canopy, around where the trunk splits.
  [325, 355, 54, 38, 44, 0.28],
  [412, 352, 54, 38, 44, 0.45],
  [492, 398, 52, 36, 40, 0.55],
  [575, 406, 44, 32, 34, 0.62],
  [365, 428, 44, 32, 32, 0.25],
];

// Seeded random numbers, so the server and browser draw the same tree.
let seed = 9001;
const random = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const round = value => Math.round(value * 10) / 10;

// Every sprig goes into one of four layers, from back to front:
// deep (behind the trunk), mid (behind the peeking branches), front, and
// highlight (the brightest lines, more common on the sunny side).
export const SPRIGS = { deep: [], mid: [], front: [], highlight: [] };

CLUSTERS.forEach(([cx, cy, rx, ry, count, sunlight]) => {
  for (let i = 0; i < count; i++) {
    const angle = random() * Math.PI * 2;
    const distance = random() ** 0.62; // leans towards the edge, for a ragged look
    const sprig = {
      x: round(cx + Math.cos(angle) * rx * distance),
      y: round(cy + Math.sin(angle) * ry * distance),
      angle: Math.round(random() * 360),
      size: 0.68 + random() * 0.62,
    };
    const roll = random();

    if (roll < 0.26) {
      SPRIGS.deep.push({ ...sprig, size: round(sprig.size * 1.05) });
    } else if (roll < 0.58) {
      SPRIGS.mid.push({ ...sprig, size: round(sprig.size) });
    } else if (roll < 1 - sunlight * 0.42) {
      SPRIGS.front.push({ ...sprig, size: round(sprig.size * 0.95) });
    } else {
      SPRIGS.highlight.push({ ...sprig, size: round(sprig.size * 0.9) });
    }
  }
});
