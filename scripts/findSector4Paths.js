const fs = require('fs');

const content = fs.readFileSync('D:/map/MOHS-Venice-City-Project-Map-02.svg', 'utf8');

// In this SVG: viewBox="0 0 6600 10200"
// Transform: translate(0, 10200) scale(0.1, -0.1)
// Let's inspect paths around the bottom area near Airport road (Y in SVG around 7000 to 8500, X around 4000 to 5500)
// Let's find all paths whose bounding boxes fall into this region

const regex = /<path\s+d="([^"]+)"/g;
let match;
let index = 0;
const sectorPaths = [];

while ((match = regex.exec(content)) !== null) {
  index++;
  const d = match[1];
  const nums = d.match(/-?\d+/g);
  if (!nums || nums.length < 2) continue;

  let x = parseInt(nums[0], 10);
  let y = parseInt(nums[1], 10);
  let minX = x, maxX = x, minY = y, maxY = y;

  for (let i = 2; i < nums.length; i += 2) {
    // Note: in potrace, c / l commands use relative coordinates
    // but we can get approximate min/max
    const dx = parseInt(nums[i], 10);
    const dy = parseInt(nums[i + 1] || '0', 10);
    x += dx;
    y += dy;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  // Convert to SVG coordinates
  // X_svg = raw_X * 0.1
  // Y_svg = 10200 - raw_Y * 0.1
  const svgMinX = minX * 0.1;
  const svgMaxX = maxX * 0.1;
  const svgMinY = 10200 - maxY * 0.1;
  const svgMaxY = 10200 - minY * 0.1;

  // Let's check width and height of this path in SVG coordinates
  const w = svgMaxX - svgMinX;
  const h = svgMaxY - svgMinY;

  // If path is in the Sector 4 area (X: 4500-6000, Y: 6000-8000)
  if (svgMinX >= 4200 && svgMaxX <= 5800 && svgMinY >= 6500 && svgMaxY <= 8500) {
    sectorPaths.push({
      index,
      bbox: [Math.round(svgMinX), Math.round(svgMinY), Math.round(w), Math.round(h)],
      dLen: d.length,
      sampleD: d.slice(0, 80)
    });
  }
}

console.log('Total paths in Sector 4 region:', sectorPaths.length);
console.log('First 20 paths:', sectorPaths.slice(0, 20));
