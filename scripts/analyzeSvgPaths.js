const fs = require('fs');

const content = fs.readFileSync('D:/map/MOHS-Venice-City-Project-Map-02.svg', 'utf8');

// Parse paths
const regex = /<path\s+d="([^"]+)"/g;
let match;
let count = 0;
let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

const paths = [];

while ((match = regex.exec(content)) !== null) {
  count++;
  const d = match[1];
  // Extract all numbers
  const nums = d.match(/-?\d+/g);
  if (nums && nums.length >= 2) {
    // First point
    const x0 = parseInt(nums[0], 10);
    const y0 = parseInt(nums[1], 10);
    // Find min and max for this path
    let pMinX = Infinity, pMaxX = -Infinity;
    let pMinY = Infinity, pMaxY = -Infinity;
    
    // Quick parse approximate bounds
    let currX = 0, currY = 0;
    // Potrace SVG uses M x y, c dx dy ..., l dx dy ..., z
    // The first command is M X Y (absolute)
    pMinX = Math.min(pMinX, x0);
    pMaxX = Math.max(pMaxX, x0);
    pMinY = Math.min(pMinY, y0);
    pMaxY = Math.max(pMaxY, y0);

    minX = Math.min(minX, x0);
    maxX = Math.max(maxX, x0);
    minY = Math.min(minY, y0);
    maxY = Math.max(maxY, y0);

    if (count <= 10 || count % 2000 === 0) {
      const svgX = x0 * 0.1;
      const svgY = 10200 - y0 * 0.1;
      paths.push({ index: count, raw: [x0, y0], svg: [svgX, svgY], length: d.length });
    }
  }
}

console.log('Total paths parsed:', count);
console.log('Raw X bounds:', minX, 'to', maxX);
console.log('Raw Y bounds:', minY, 'to', maxY);
console.log('SVG X bounds:', minX * 0.1, 'to', maxX * 0.1);
console.log('SVG Y bounds:', 10200 - maxY * 0.1, 'to', 10200 - minY * 0.1);
console.log('Sample paths:', paths);
