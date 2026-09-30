const fs = require('fs');
const path = require('path');

function formatBDT(val) {
  return '৳ ' + val.toLocaleString('en-IN');
}

const plots = [];
let pIndex = 1;

// 1. Sector 1 (West Zone)
const sector1Rows = [
  { y: 1470, h: 70, size: '10 Katha', price: 6500000, facing: 'South' },
  { y: 1560, h: 60, size: '5 Katha', price: 3500000, facing: 'North' },
  { y: 1640, h: 60, size: '5 Katha', price: 3600000, facing: 'South' },
  { y: 1720, h: 55, size: '4 Katha', price: 2900000, facing: 'North' },
  { y: 1795, h: 50, size: '3 Katha', price: 2250000, facing: 'South' }
];

const sector1Cols = [
  { x: 820, w: 95 },
  { x: 935, w: 95 },
  { x: 1050, w: 95 },
  { x: 1165, w: 95 },
  { x: 1280, w: 95 }
];

sector1Rows.forEach((row, rIdx) => {
  sector1Cols.forEach((col, cIdx) => {
    const id = 'P-' + String(pIndex).padStart(3, '0');
    const status = (pIndex === 1 || pIndex === 7 || pIndex === 14) ? 'Featured' : 
                   (pIndex % 4 === 0) ? 'Sold' : 
                   (pIndex % 3 === 0) ? 'Reserved' : 'Available';
    
    const skew = (row.y - 1470) * 0.15;
    const x1 = Math.round(col.x + skew);
    const y1 = Math.round(row.y);
    const x2 = Math.round(x1 + col.w);
    const y2 = Math.round(y1);
    const x3 = Math.round(x1 + col.w);
    const y3 = Math.round(y1 + row.h);
    const x4 = Math.round(x1);
    const y4 = Math.round(y1 + row.h);

    plots.push({
      id,
      plotNo: id,
      title: 'Sector 1 Prime Plot ' + id,
      sector: 'Sector 1 (West Zone)',
      type: 'Residential Plot',
      size: row.size,
      facing: (cIdx % 2 === 0) ? row.facing : (row.facing === 'North' ? 'South' : 'East'),
      status,
      price: row.price + (cIdx * 50000),
      priceFormatted: formatBDT(row.price + (cIdx * 50000)),
      location: 'Sector 1, Road-' + (rIdx + 1) + ', MOHS Venice City',
      roadWidth: '40ft Wide Avenue',
      points: [[x1, y1], [x2, y2], [x3, y3], [x4, y4]],
      center: [Math.round((x1 + x2) / 2), Math.round((y1 + y3) / 2)],
      description: 'Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school.'
    });
    pIndex++;
  });
});

// 2. Sector 2 (Lakeview Sector)
const sector2Rows = [
  { y: 2160, h: 70, size: '10 Katha', price: 7200000, facing: 'Lake Facing' },
  { y: 2250, h: 65, size: '5 Katha', price: 3900000, facing: 'Lake Facing' },
  { y: 2335, h: 65, size: '5 Katha', price: 3850000, facing: 'South' },
  { y: 2420, h: 65, size: '5 Katha', price: 3800000, facing: 'North' },
  { y: 2505, h: 60, size: '4 Katha', price: 3100000, facing: 'East' },
  { y: 2585, h: 55, size: '3 Katha', price: 2400000, facing: 'West' }
];

const sector2Cols = [
  { x: 1460, w: 90 },
  { x: 1570, w: 90 },
  { x: 1680, w: 90 },
  { x: 1790, w: 90 },
  { x: 1900, w: 90 }
];

sector2Rows.forEach((row, rIdx) => {
  sector2Cols.forEach((col, cIdx) => {
    const id = 'P-' + String(pIndex).padStart(3, '0');
    const status = (pIndex === 26 || pIndex === 30 || pIndex === 45) ? 'Featured' : 
                   (pIndex % 5 === 0) ? 'Sold' : 
                   (pIndex % 3 === 0) ? 'Reserved' : 'Available';

    const curve = Math.sin(cIdx * 0.6) * 35;
    const x1 = Math.round(col.x);
    const y1 = Math.round(row.y + curve);
    const x2 = Math.round(x1 + col.w);
    const y2 = Math.round(y1);
    const x3 = Math.round(x1 + col.w);
    const y3 = Math.round(y1 + row.h);
    const x4 = Math.round(x1);
    const y4 = Math.round(y1 + row.h);

    plots.push({
      id,
      plotNo: id,
      title: 'Lakeview Luxury Plot ' + id,
      sector: 'Sector 2 (Lakeview)',
      type: 'Residential Plot',
      size: row.size,
      facing: row.facing,
      status,
      price: row.price + (cIdx * 75000),
      priceFormatted: formatBDT(row.price + (cIdx * 75000)),
      location: 'Sector 2, Lakeview Promenade, MOHS Venice City',
      roadWidth: '50ft Waterfront Boulevard',
      points: [[x1, y1], [x2, y2], [x3, y3], [x4, y4]],
      center: [Math.round((x1 + x2) / 2), Math.round((y1 + y3) / 2)],
      description: 'Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views.'
    });
    pIndex++;
  });
});

// 3. Sector 3 (Central Prestige Sector)
const sector3Rows = [
  { y: 1480, h: 65, size: '5 Katha', price: 4100000, facing: 'North' },
  { y: 1565, h: 65, size: '5 Katha', price: 4200000, facing: 'South' },
  { y: 1650, h: 70, size: '10 Katha', price: 7800000, facing: 'North' },
  { y: 1740, h: 60, size: '4 Katha', price: 3300000, facing: 'South' },
  { y: 1820, h: 55, size: '3 Katha', price: 2600000, facing: 'East' },
  { y: 1895, h: 75, size: '10 Katha', price: 8200000, facing: 'Lake Facing' }
];

const sector3Cols = [
  { x: 2020, w: 100 },
  { x: 2140, w: 100 },
  { x: 2260, w: 100 },
  { x: 2380, w: 100 },
  { x: 2500, w: 100 }
];

sector3Rows.forEach((row, rIdx) => {
  sector3Cols.forEach((col, cIdx) => {
    const id = 'P-' + String(pIndex).padStart(3, '0');
    const status = (pIndex === 58 || pIndex === 72 || pIndex === 80) ? 'Featured' : 
                   (pIndex % 4 === 1) ? 'Sold' : 
                   (pIndex % 4 === 2) ? 'Reserved' : 'Available';

    const tilt = (col.x - 2020) * 0.12;
    const x1 = Math.round(col.x);
    const y1 = Math.round(row.y + tilt);
    const x2 = Math.round(x1 + col.w);
    const y2 = Math.round(y1);
    const x3 = Math.round(x1 + col.w);
    const y3 = Math.round(y1 + row.h);
    const x4 = Math.round(x1);
    const y4 = Math.round(y1 + row.h);

    plots.push({
      id,
      plotNo: id,
      title: 'Central Prestige Plot ' + id,
      sector: 'Sector 3 (Central Hub)',
      type: 'Residential Plot',
      size: row.size,
      facing: row.facing,
      status,
      price: row.price + (cIdx * 60000),
      priceFormatted: formatBDT(row.price + (cIdx * 60000)),
      location: 'Sector 3, University Road, MOHS Venice City',
      roadWidth: '60ft Central Avenue',
      points: [[x1, y1], [x2, y2], [x3, y3], [x4, y4]],
      center: [Math.round((x1 + x2) / 2), Math.round((y1 + y3) / 2)],
      description: 'Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor.'
    });
    pIndex++;
  });
});

// 4. Sector 4 (East Prime Sector)
const sector4Cols = [
  { x: 2800, w: 95 },
  { x: 2920, w: 95 },
  { x: 3040, w: 95 },
  { x: 3160, w: 95 },
  { x: 3280, w: 95 },
  { x: 3400, w: 95 },
  { x: 3520, w: 95 },
  { x: 3640, w: 95 },
  { x: 3760, w: 95 }
];

const sector4Rows = [
  { y: 1080, h: 60, size: '5 Katha', price: 4500000, facing: 'North' },
  { y: 1160, h: 60, size: '5 Katha', price: 4600000, facing: 'South' },
  { y: 1240, h: 55, size: '4 Katha', price: 3700000, facing: 'North' },
  { y: 1315, h: 50, size: '3 Katha', price: 2800000, facing: 'South' },
  { y: 1385, h: 70, size: '10 Katha', price: 8900000, facing: 'East' }
];

sector4Rows.forEach((row, rIdx) => {
  sector4Cols.forEach((col, cIdx) => {
    const id = 'P-' + String(pIndex).padStart(3, '0');
    const status = (pIndex === 92 || pIndex === 105 || pIndex === 120) ? 'Featured' : 
                   (pIndex % 5 === 0) ? 'Sold' : 
                   (pIndex % 3 === 0) ? 'Reserved' : 'Available';

    const roadTilt = (col.x - 2800) * 0.22;
    const x1 = Math.round(col.x);
    const y1 = Math.round(row.y + roadTilt);
    const x2 = Math.round(x1 + col.w);
    const y2 = Math.round(y1);
    const x3 = Math.round(x1 + col.w);
    const y3 = Math.round(y1 + row.h);
    const x4 = Math.round(x1);
    const y4 = Math.round(y1 + row.h);

    plots.push({
      id,
      plotNo: id,
      title: 'Airport Express Plot ' + id,
      sector: 'Sector 4 (Airport Express)',
      type: 'Residential Plot',
      size: row.size,
      facing: row.facing,
      status,
      price: row.price + (cIdx * 55000),
      priceFormatted: formatBDT(row.price + (cIdx * 55000)),
      location: 'Sector 4, Avenue 8, MOHS Venice City',
      roadWidth: '50ft Sector Road',
      points: [[x1, y1], [x2, y2], [x3, y3], [x4, y4]],
      center: [Math.round((x1 + x2) / 2), Math.round((y1 + y3) / 2)],
      description: 'Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway.'
    });
    pIndex++;
  });
});

// 5. Commercial plots CP-01 to CP-15
const cpData = [
  { id: 'CP-01', x: 2460, y: 840, w: 105, h: 70, size: '10 Katha', price: 12000000, facing: 'River Facing', status: 'Available' },
  { id: 'CP-02', x: 2580, y: 830, w: 105, h: 70, size: '10 Katha', price: 12500000, facing: 'River Facing', status: 'Reserved' },
  { id: 'CP-03', x: 2700, y: 810, w: 105, h: 70, size: '10 Katha', price: 12500000, facing: 'River Facing', status: 'Available' },
  { id: 'CP-04', x: 2820, y: 790, w: 105, h: 70, size: '10 Katha', price: 13000000, facing: 'River Facing', status: 'Featured' },
  { id: 'CP-05', x: 2940, y: 770, w: 105, h: 70, size: '10 Katha', price: 13500000, facing: 'River Facing', status: 'Available' },
  { id: 'CP-06', x: 3060, y: 750, w: 105, h: 70, size: '10 Katha', price: 14000000, facing: 'River Facing', status: 'Sold' },
  { id: 'CP-07', x: 3180, y: 730, w: 105, h: 70, size: '10 Katha', price: 14500000, facing: 'River Facing', status: 'Available' },
  { id: 'CP-08', x: 3300, y: 710, w: 105, h: 70, size: '10 Katha', price: 15000000, facing: 'River Facing', status: 'Featured' },
  { id: 'CP-09', x: 3420, y: 690, w: 105, h: 70, size: '10 Katha', price: 15500000, facing: 'River Facing', status: 'Available' },
  { id: 'CP-10', x: 3260, y: 620, w: 110, h: 65, size: '10 Katha', price: 16000000, facing: 'River Facing', status: 'Available' },
  { id: 'CP-11', x: 3385, y: 605, w: 110, h: 65, size: '10 Katha', price: 16500000, facing: 'River Facing', status: 'Reserved' },
  { id: 'CP-12', x: 3510, y: 590, w: 110, h: 65, size: '10 Katha', price: 17000000, facing: 'River Facing', status: 'Available' },
  { id: 'CP-13', x: 3340, y: 535, w: 110, h: 65, size: '10 Katha', price: 17500000, facing: 'River Facing', status: 'Featured' },
  { id: 'CP-14', x: 3465, y: 520, w: 110, h: 65, size: '10 Katha', price: 18000000, facing: 'River Facing', status: 'Sold' },
  { id: 'CP-15', x: 3590, y: 505, w: 110, h: 65, size: '10 Katha', price: 18500000, facing: 'River Facing', status: 'Available' }
];

cpData.forEach(cp => {
  plots.push({
    id: cp.id,
    plotNo: cp.id,
    title: 'Riverfront Commercial Plot ' + cp.id,
    sector: 'Commercial Riverfront',
    type: 'Commercial Plot',
    size: cp.size,
    facing: cp.facing,
    status: cp.status,
    price: cp.price,
    priceFormatted: formatBDT(cp.price),
    location: 'Venice Riverfront Boulevard, MOHS Venice City',
    roadWidth: '100ft Riverfront Boulevard',
    points: [[cp.x, cp.y], [cp.x + cp.w, cp.y], [cp.x + cp.w, cp.y + cp.h], [cp.x, cp.y + cp.h]],
    center: [Math.round(cp.x + cp.w / 2), Math.round(cp.y + cp.h / 2)],
    description: 'High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes.'
  });
});

// 6. Modern Flats / Apartments
const flatData = [
  { id: 'F-101', name: 'Venice Riverfront Tower A - 4B', x: 3650, y: 550, w: 115, h: 100, size: '2,450 Sq.Ft', price: 16500000, facing: 'River Facing', status: 'Available' },
  { id: 'F-102', name: 'Venice Riverfront Tower A - 8A', x: 3780, y: 535, w: 115, h: 100, size: '2,800 Sq.Ft', price: 19500000, facing: 'River Facing', status: 'Featured' },
  { id: 'F-103', name: 'Venice Blue Riverpark Tower 1', x: 3915, y: 520, w: 115, h: 100, size: '1,950 Sq.Ft', price: 13500000, facing: 'River Facing', status: 'Reserved' },
  { id: 'F-104', name: 'Venice Blue Riverpark Tower 2', x: 4050, y: 505, w: 115, h: 100, size: '2,150 Sq.Ft', price: 14800000, facing: 'North', status: 'Available' },
  { id: 'F-105', name: 'Airport Gateway Residency 5B', x: 4000, y: 1150, w: 120, h: 90, size: '1,750 Sq.Ft', price: 11800000, facing: 'East', status: 'Available' },
  { id: 'F-106', name: 'Airport Gateway Residency 9C', x: 4000, y: 1260, w: 120, h: 90, size: '2,200 Sq.Ft', price: 15200000, facing: 'South', status: 'Featured' },
  { id: 'F-107', name: 'Lakeview Heights Tower Alpha', x: 1720, y: 2020, w: 110, h: 85, size: '2,300 Sq.Ft', price: 15800000, facing: 'Lake Facing', status: 'Available' },
  { id: 'F-108', name: 'Lakeview Heights Tower Beta', x: 1850, y: 2020, w: 110, h: 85, size: '1,850 Sq.Ft', price: 12600000, facing: 'Lake Facing', status: 'Sold' }
];

flatData.forEach(fl => {
  plots.push({
    id: fl.id,
    plotNo: fl.id,
    title: fl.name,
    sector: 'Apartment Towers',
    type: 'Flat / Apartment',
    size: fl.size,
    facing: fl.facing,
    status: fl.status,
    price: fl.price,
    priceFormatted: formatBDT(fl.price),
    location: fl.name + ', MOHS Venice City',
    roadWidth: '100ft Waterfront Avenue',
    points: [[fl.x, fl.y], [fl.x + fl.w, fl.y], [fl.x + fl.w, fl.y + fl.h], [fl.x, fl.y + fl.h]],
    center: [Math.round(fl.x + fl.w / 2), Math.round(fl.y + fl.h / 2)],
    description: 'Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool.'
  });
});

const facilities = [
  {
    id: 'FAC-01',
    name: 'Central Mosque & Eid-Gah Complex',
    category: 'Religious & Cultural',
    icon: 'Mosque',
    x: 1320,
    y: 1530,
    radius: 70,
    sector: 'Sector 1 & 2 Center',
    capacity: '5,000+ worshippers',
    description: 'Iconic architectural landmark featuring central dome, marble courtyards, landscaped Eid-Gah grounds, and dedicated women prayer hall.'
  },
  {
    id: 'FAC-02',
    name: 'MOHS International University & Medical College',
    category: 'Education & Healthcare',
    icon: 'GraduationCap',
    x: 1720,
    y: 1860,
    radius: 95,
    sector: 'Central Civic Zone',
    capacity: '12.50 Bigha Campus',
    description: 'World-class multidisciplinary university campus and affiliated 500-bed teaching hospital serving residents of Uttara and Purbachal.'
  },
  {
    id: 'FAC-03',
    name: 'Venice Garden Park',
    category: 'Green Park & Eco-Zone',
    icon: 'Trees',
    x: 2540,
    y: 770,
    radius: 80,
    sector: 'Riverfront Corridor',
    capacity: '4.68 Bigha Ecological Park',
    description: 'Lush green botanical sanctuary with jogging tracks, wooden gazebos, native flora, and open air amphitheater.'
  },
  {
    id: 'FAC-04',
    name: 'Venice Harmony Park',
    category: 'Green Park & Playground',
    icon: 'Trees',
    x: 2980,
    y: 650,
    radius: 80,
    sector: 'Riverfront Corridor',
    capacity: '4.80 Bigha Family Park',
    description: 'Comprehensive family recreational park featuring children playground, cycling trail, sports courts, and lakeside cafeteria.'
  },
  {
    id: 'FAC-05',
    name: 'Crystal River Park',
    category: 'Waterfront Recreation',
    icon: 'Waves',
    x: 3380,
    y: 480,
    radius: 75,
    sector: 'Riverfront Corridor',
    capacity: '4.01 Bigha River Park',
    description: 'Scenic waterfront leisure zone with gondola pier, illuminated river fountains, and promenade dining.'
  },
  {
    id: 'FAC-06',
    name: 'Venice Blue Riverfront Promenade',
    category: 'Waterfront Promenade',
    icon: 'Ship',
    x: 3820,
    y: 450,
    radius: 85,
    sector: 'North-East Waterfront',
    capacity: '2.5 KM Riverwalk',
    description: 'Continuous pedestrian waterfront walkway with seating decks, decorative lighting, and river-cruise terminal.'
  },
  {
    id: 'FAC-07',
    name: 'Primary & High School Complex',
    category: 'Education',
    icon: 'BookOpen',
    x: 950,
    y: 2020,
    radius: 65,
    sector: 'Sector 1 West',
    capacity: 'Nursery to Grade 12',
    description: 'English medium institution with modern science labs, auditorium, athletics track, and safe pedestrian drop-off zones.'
  },
  {
    id: 'FAC-08',
    name: 'Natural Lake & Marina Pier',
    category: 'Natural Water Body',
    icon: 'Waves',
    x: 1850,
    y: 2600,
    radius: 110,
    sector: 'Central Waterway',
    capacity: '40 Bigha Natural Lake',
    description: 'Preserved ecological water body providing natural cooling, rainwater harvesting, boating, and scenic waterfront living.'
  },
  {
    id: 'FAC-09',
    name: 'Venice Town Center & Green Bazar',
    category: 'Retail & Commerce',
    icon: 'Store',
    x: 3250,
    y: 1350,
    radius: 80,
    sector: 'Sector 4 Civic Hub',
    capacity: 'Multi-level Shopping Hub',
    description: 'Daily fresh bazaar, gourmet supermarket, banking booths, pharmacies, and rooftop community club.'
  },
  {
    id: 'FAC-10',
    name: 'Police Station & Security Headquarters',
    category: 'Civic & Emergency',
    icon: 'Shield',
    x: 2880,
    y: 1650,
    radius: 60,
    sector: 'Sector 3 & 4 Nexus',
    capacity: '24/7 Rapid Response Unit',
    description: 'Dedicated law enforcement outpost with 24/7 CCTV surveillance room monitoring all entrance gates and sector roads.'
  },
  {
    id: 'FAC-11',
    name: 'Central Water Treatment Plant',
    category: 'Utility Infrastructure',
    icon: 'Droplets',
    x: 1180,
    y: 2750,
    radius: 70,
    sector: 'South Utility Zone',
    capacity: '10 Million Liters/Day',
    description: 'State-of-the-art water purification facility providing 24/7 pressurized potable water to all township sectors.'
  },
  {
    id: 'FAC-12',
    name: 'Gas Station & EV Charging Hub',
    category: 'Transport & Fuel',
    icon: 'Fuel',
    x: 4250,
    y: 1100,
    radius: 65,
    sector: '100ft Airport Highway',
    capacity: 'Multi-Fuel & Rapid EV Hub',
    description: 'Comprehensive fueling hub on the 100ft Airport Highway with convenience store and automated car wash.'
  }
];

const fileContent = `// MOHS Venice City Interactive Masterplan Dataset
// Masterplan coordinate dimensions: 5100 x 3300 (Aspect Ratio: 1.54545)

export interface PlotItem {
  id: string;
  plotNo: string;
  title: string;
  sector: string;
  type: "Residential Plot" | "Flat / Apartment" | "Commercial Plot";
  size: string;
  facing: "North" | "South" | "East" | "West" | "Lake Facing" | "River Facing";
  status: "Available" | "Reserved" | "Sold" | "Featured";
  price: number;
  priceFormatted: string;
  location: string;
  roadWidth: string;
  points: [number, number][];
  center: [number, number];
  description: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  x: number;
  y: number;
  radius: number;
  sector: string;
  capacity: string;
  description: string;
}

export const MAP_DIMENSIONS = {
  width: 5100,
  height: 3300,
  aspectRatio: 5100 / 3300,
};

export const STATUS_COLORS = {
  Available: {
    fill: "#00695C",
    stroke: "#004D40",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  Reserved: {
    fill: "#D6A84F",
    stroke: "#B8860B",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    dot: "bg-amber-500",
  },
  Sold: {
    fill: "#EF4444",
    stroke: "#DC2626",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    badgeBorder: "border-rose-200",
    dot: "bg-rose-500",
  },
  Featured: {
    fill: "#159ED0",
    stroke: "#0284C7",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    badgeBorder: "border-sky-200",
    dot: "bg-sky-500",
  },
};

export const PLOT_DATASET: PlotItem[] = ${JSON.stringify(plots, null, 2)};

export const FACILITIES_DATASET: FacilityItem[] = ${JSON.stringify(facilities, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../data/interactiveMapData.ts'), fileContent, 'utf8');
console.log('Successfully generated interactiveMapData.ts with ' + plots.length + ' plots and ' + facilities.length + ' facilities.');
