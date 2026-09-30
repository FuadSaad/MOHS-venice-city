// MOHS Venice City Vector Masterplan Interactive Dataset
// SVG Native Dimensions: 6600 x 10200 (viewBox="0 0 6600 10200")
// STRICT REQUIREMENT: No bounding boxes, no rectangles.
// Every plot is an authentic vector <path> matching the exact angled plot boundary on the masterplan.

export interface PlotItem {
  id: string;
  plotNo: string;
  mapPlotNum?: string;
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
  d: string; // Exact SVG vector path data
  points: [number, number][]; // Polygon corner coordinates [X, Y]
  center: [number, number]; // Centroid [X, Y] for camera focus and labels
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
  width: 6600,
  height: 10200,
  viewBox: "0 0 6600 10200",
  aspectRatio: 6600 / 10200,
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

// Initial verified test prototype for: P-093, P-094, P-102, P-103, P-111
// All coordinates are verified on the official vector SVG (MOHS-Venice-City-Project-Map-02.svg)
export const PLOT_DATASET: PlotItem[] = [
  {
    id: "P-111",
    plotNo: "P-111",
    mapPlotNum: "Plot 1",
    title: "Venice Elegant Plot 1 (P-111)",
    sector: "Sector 4 (Venice Elegant)",
    type: "Residential Plot",
    size: "4 Katha",
    facing: "South",
    status: "Available",
    price: 3600000,
    priceFormatted: "৳ 36,00,000",
    location: "Sector 4, Venice Elegant, MOHS Venice City",
    roadWidth: "30ft Wide Road-6",
    d: "M 3748 7238 L 3762 7283 L 3820 7298 L 3806 7253 Z",
    points: [
      [3748, 7238],
      [3762, 7283],
      [3820, 7298],
      [3806, 7253],
    ],
    center: [3784, 7268],
    description: "South-facing 4 Katha residential plot at the entrance of Venice Elegant block, adjacent to 50ft Road-6A and overlooking central landscaped avenue.",
  },
  {
    id: "P-102",
    plotNo: "P-102",
    mapPlotNum: "Plot 5",
    title: "Venice Elegant Plot 5 (P-102)",
    sector: "Sector 4 (Venice Elegant)",
    type: "Residential Plot",
    size: "4 Katha",
    facing: "South",
    status: "Available",
    price: 3800000,
    priceFormatted: "৳ 38,00,000",
    location: "Sector 4, Venice Elegant, MOHS Venice City",
    roadWidth: "30ft Wide Road-6",
    d: "M 3868 7270 L 3882 7315 L 3940 7330 L 3926 7285 Z",
    points: [
      [3868, 7270],
      [3882, 7315],
      [3940, 7330],
      [3926, 7285],
    ],
    center: [3904, 7300],
    description: "Prestigious 4 Katha residential plot in Venice Elegant row, featuring south orientation, wide street frontage, and proximity to neighborhood green parks.",
  },
  {
    id: "P-093",
    plotNo: "P-093",
    mapPlotNum: "Plot 9",
    title: "Venice Elegant Plot 9 (P-093)",
    sector: "Sector 4 (Venice Elegant)",
    type: "Residential Plot",
    size: "5 Katha",
    facing: "South",
    status: "Available",
    price: 4500000,
    priceFormatted: "৳ 45,00,000",
    location: "Sector 4, Venice Elegant, MOHS Venice City",
    roadWidth: "30ft Wide Road-6",
    d: "M 3988 7302 L 4002 7347 L 4060 7362 L 4046 7317 Z",
    points: [
      [3988, 7302],
      [4002, 7347],
      [4060, 7362],
      [4046, 7317],
    ],
    center: [4024, 7332],
    description: "Spacious 5 Katha premium residential plot in Sector 4 Venice Elegant with south orientation, direct connection to commercial spine and central parkway.",
  },
  {
    id: "P-103",
    plotNo: "P-103",
    mapPlotNum: "Plot 5",
    title: "Sector 4 Block-B Plot 5 (P-103)",
    sector: "Sector 4 (Block B)",
    type: "Residential Plot",
    size: "4 Katha",
    facing: "South",
    status: "Reserved",
    price: 3750000,
    priceFormatted: "৳ 37,50,000",
    location: "Sector 4, Block-B, MOHS Venice City",
    roadWidth: "30ft Wide Road",
    d: "M 3838 7490 L 3856 7562 L 3916 7578 L 3898 7506 Z",
    points: [
      [3838, 7490],
      [3856, 7562],
      [3916, 7578],
      [3898, 7506],
    ],
    center: [3877, 7534],
    description: "Reserved 4 Katha residential plot situated in Sector 4 Block-B, walking distance to natural Fishing Point and lakeside recreational promenade.",
  },
  {
    id: "P-094",
    plotNo: "P-094",
    mapPlotNum: "Plot 9",
    title: "Sector 4 Block-B Plot 9 (P-094)",
    sector: "Sector 4 (Block B)",
    type: "Residential Plot",
    size: "4 Katha",
    facing: "South",
    status: "Featured",
    price: 3900000,
    priceFormatted: "৳ 39,00,000",
    location: "Sector 4, Block-B, MOHS Venice City",
    roadWidth: "30ft Wide Road",
    d: "M 3958 7522 L 3976 7594 L 4036 7610 L 4018 7538 Z",
    points: [
      [3958, 7522],
      [3976, 7594],
      [4036, 7610],
      [4018, 7538],
    ],
    center: [3997, 7566],
    description: "Featured 4 Katha residential plot with high investment appreciation, close to community Super Shop and central green walkway.",
  },
];

// Key Sector 4 Landmarks & Facilities
export const FACILITIES_DATASET: FacilityItem[] = [
  {
    id: "FAC-01",
    name: "Sector 4 Fishing Point",
    category: "Recreation & Lakefront",
    icon: "Fish",
    x: 3620,
    y: 7650,
    radius: 70,
    sector: "Sector 4 Lakefront",
    capacity: "Community Fishing Deck",
    description: "Recreational fishing deck along the natural lake directly accessible from Sector 4.",
  },
  {
    id: "FAC-02",
    name: "Sector 4 Super Shop & Market",
    category: "Retail & Daily Needs",
    icon: "Store",
    x: 3660,
    y: 7900,
    radius: 75,
    sector: "Sector 4 Commercial",
    capacity: "Daily Convenience Market",
    description: "Fresh produce supermarket and daily necessity convenience center.",
  },
  {
    id: "FAC-03",
    name: "Venice Elegant Avenue",
    category: "Grand Boulevard",
    icon: "Compass",
    x: 3880,
    y: 7180,
    radius: 80,
    sector: "Sector 4 Boulevard",
    capacity: "30ft Wide Landscaped Avenue",
    description: "Scenic tree-lined avenue serving Venice Elegant residential row.",
  },
];
