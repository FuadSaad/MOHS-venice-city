const fs = require('fs');

// Our verified 5100x3300 coordinates from earlier:
const testPlots5100 = {
  "P-111": [
    [3605, 1455],
    [3642, 1447],
    [3650, 1417],
    [3613, 1425],
  ],
  "P-102": [
    [3621, 1395],
    [3658, 1387],
    [3666, 1357],
    [3629, 1365],
  ],
  "P-093": [
    [3637, 1335],
    [3674, 1327],
    [3682, 1297],
    [3645, 1305],
  ],
  "P-103": [
    [3772, 1372],
    [3812, 1363],
    [3821, 1333],
    [3781, 1342],
  ],
  "P-094": [
    [3790, 1312],
    [3830, 1303],
    [3839, 1273],
    [3799, 1282],
  ]
};

// Convert to SVG coordinates:
// X_svg = 6600 - (Y_5100 * 2)
// Y_svg = X_5100 * 2

const svgPlots = {};
for (const [id, pts] of Object.entries(testPlots5100)) {
  svgPlots[id] = pts.map(([x51, y51]) => [
    Math.round(6600 - (y51 * 2)),
    Math.round(x51 * 2)
  ]);
}

console.log('Converted SVG Coordinates:');
console.log(JSON.stringify(svgPlots, null, 2));

// Now let's calculate the bounding box in the SVG system for each plot
for (const [id, pts] of Object.entries(svgPlots)) {
  const xs = pts.map(p => p[0]);
  const ys = pts.map(p => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  console.log(`${id}: SVG X=[${minX}..${maxX}], Y=[${minY}..${maxY}], center=(${Math.round((minX+maxX)/2)}, ${Math.round((minY+maxY)/2)})`);
}
