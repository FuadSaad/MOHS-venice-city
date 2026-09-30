const fs = require('fs');

const content = fs.readFileSync('D:/map/MOHS-Venice-City-Project-Map-02.svg', 'utf8');

// The 5 plot paths in SVG coordinates:
const testPlots = [
  // Venice Elegant Row (Plots 1, 5, 9)
  { 
    id: 'P-111', 
    num: 'Plot 1', 
    d: 'M 3748 7238 L 3762 7283 L 3820 7298 L 3806 7253 Z' 
  },
  { 
    id: 'P-102', 
    num: 'Plot 5', 
    d: 'M 3868 7270 L 3882 7315 L 3940 7330 L 3926 7285 Z' 
  },
  { 
    id: 'P-093', 
    num: 'Plot 9', 
    d: 'M 3988 7302 L 4002 7347 L 4060 7362 L 4046 7317 Z' 
  },

  // 4 Katha Block Row (Plots 5, 9 in the bottom row 1, 3, 5, 7, 9)
  { 
    id: 'P-103', 
    num: 'Plot 5', 
    d: 'M 3838 7490 L 3856 7562 L 3916 7578 L 3898 7506 Z' 
  },
  { 
    id: 'P-094', 
    num: 'Plot 9', 
    d: 'M 3958 7522 L 3976 7594 L 4036 7610 L 4018 7538 Z' 
  }
];

let plotElements = '<g id="test-plots">';
testPlots.forEach(p => {
  plotElements += `<path id="${p.id}" d="${p.d}" fill="rgba(0, 105, 92, 0.40)" stroke="#00FFCC" stroke-width="2.5" stroke-linejoin="round" />`;
  // calculate centroid
  const coords = p.d.replace(/[MLZ]/g, '').trim().split(/\s+/).map(Number);
  const cx = Math.round((coords[0] + coords[2] + coords[4] + coords[6]) / 4);
  const cy = Math.round((coords[1] + coords[3] + coords[5] + coords[7]) / 4);
  plotElements += `<text x="${cx}" y="${cy}" fill="#FF0055" font-size="14" font-weight="bold" text-anchor="middle">${p.id}</text>`;
});
plotElements += '</g>';

// Extract the inner content of <svg>...</svg>
const innerMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
if (!innerMatch) {
  console.error('Could not match SVG inner content');
  process.exit(1);
}

const croppedSvg = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="1400" height="1600" viewBox="3600 7100 600 700">
  <rect x="3600" y="7100" width="600" height="700" fill="#FFFFFF" />
  ${innerMatch[1]}
  ${plotElements}
</svg>
`;

fs.writeFileSync('D:/MOHS/public/test-crop.svg', croppedSvg, 'utf8');
console.log('Saved D:/MOHS/public/test-crop.svg');
