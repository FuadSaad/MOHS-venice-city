// MOHS Venice City Interactive Masterplan Dataset
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

export const PLOT_DATASET: PlotItem[] = [
  {
    "id": "P-001",
    "plotNo": "P-001",
    "title": "Sector 1 Prime Plot P-001",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "South",
    "status": "Featured",
    "price": 6500000,
    "priceFormatted": "৳ 65,00,000",
    "location": "Sector 1, Road-1, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        820,
        1470
      ],
      [
        915,
        1470
      ],
      [
        915,
        1540
      ],
      [
        820,
        1540
      ]
    ],
    "center": [
      868,
      1505
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-002",
    "plotNo": "P-002",
    "title": "Sector 1 Prime Plot P-002",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Available",
    "price": 6550000,
    "priceFormatted": "৳ 65,50,000",
    "location": "Sector 1, Road-1, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        935,
        1470
      ],
      [
        1030,
        1470
      ],
      [
        1030,
        1540
      ],
      [
        935,
        1540
      ]
    ],
    "center": [
      983,
      1505
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-003",
    "plotNo": "P-003",
    "title": "Sector 1 Prime Plot P-003",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 6600000,
    "priceFormatted": "৳ 66,00,000",
    "location": "Sector 1, Road-1, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1050,
        1470
      ],
      [
        1145,
        1470
      ],
      [
        1145,
        1540
      ],
      [
        1050,
        1540
      ]
    ],
    "center": [
      1098,
      1505
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-004",
    "plotNo": "P-004",
    "title": "Sector 1 Prime Plot P-004",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 6650000,
    "priceFormatted": "৳ 66,50,000",
    "location": "Sector 1, Road-1, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1165,
        1470
      ],
      [
        1260,
        1470
      ],
      [
        1260,
        1540
      ],
      [
        1165,
        1540
      ]
    ],
    "center": [
      1213,
      1505
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-005",
    "plotNo": "P-005",
    "title": "Sector 1 Prime Plot P-005",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "South",
    "status": "Available",
    "price": 6700000,
    "priceFormatted": "৳ 67,00,000",
    "location": "Sector 1, Road-1, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1280,
        1470
      ],
      [
        1375,
        1470
      ],
      [
        1375,
        1540
      ],
      [
        1280,
        1540
      ]
    ],
    "center": [
      1328,
      1505
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-006",
    "plotNo": "P-006",
    "title": "Sector 1 Prime Plot P-006",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 3500000,
    "priceFormatted": "৳ 35,00,000",
    "location": "Sector 1, Road-2, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        834,
        1560
      ],
      [
        929,
        1560
      ],
      [
        929,
        1620
      ],
      [
        834,
        1620
      ]
    ],
    "center": [
      882,
      1590
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-007",
    "plotNo": "P-007",
    "title": "Sector 1 Prime Plot P-007",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Featured",
    "price": 3550000,
    "priceFormatted": "৳ 35,50,000",
    "location": "Sector 1, Road-2, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        949,
        1560
      ],
      [
        1044,
        1560
      ],
      [
        1044,
        1620
      ],
      [
        949,
        1620
      ]
    ],
    "center": [
      997,
      1590
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-008",
    "plotNo": "P-008",
    "title": "Sector 1 Prime Plot P-008",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 3600000,
    "priceFormatted": "৳ 36,00,000",
    "location": "Sector 1, Road-2, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1064,
        1560
      ],
      [
        1159,
        1560
      ],
      [
        1159,
        1620
      ],
      [
        1064,
        1620
      ]
    ],
    "center": [
      1112,
      1590
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-009",
    "plotNo": "P-009",
    "title": "Sector 1 Prime Plot P-009",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 3650000,
    "priceFormatted": "৳ 36,50,000",
    "location": "Sector 1, Road-2, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1179,
        1560
      ],
      [
        1274,
        1560
      ],
      [
        1274,
        1620
      ],
      [
        1179,
        1620
      ]
    ],
    "center": [
      1227,
      1590
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-010",
    "plotNo": "P-010",
    "title": "Sector 1 Prime Plot P-010",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3700000,
    "priceFormatted": "৳ 37,00,000",
    "location": "Sector 1, Road-2, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1294,
        1560
      ],
      [
        1389,
        1560
      ],
      [
        1389,
        1620
      ],
      [
        1294,
        1620
      ]
    ],
    "center": [
      1342,
      1590
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-011",
    "plotNo": "P-011",
    "title": "Sector 1 Prime Plot P-011",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3600000,
    "priceFormatted": "৳ 36,00,000",
    "location": "Sector 1, Road-3, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        846,
        1640
      ],
      [
        941,
        1640
      ],
      [
        941,
        1700
      ],
      [
        846,
        1700
      ]
    ],
    "center": [
      894,
      1670
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-012",
    "plotNo": "P-012",
    "title": "Sector 1 Prime Plot P-012",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 3650000,
    "priceFormatted": "৳ 36,50,000",
    "location": "Sector 1, Road-3, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        961,
        1640
      ],
      [
        1056,
        1640
      ],
      [
        1056,
        1700
      ],
      [
        961,
        1700
      ]
    ],
    "center": [
      1009,
      1670
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-013",
    "plotNo": "P-013",
    "title": "Sector 1 Prime Plot P-013",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3700000,
    "priceFormatted": "৳ 37,00,000",
    "location": "Sector 1, Road-3, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1076,
        1640
      ],
      [
        1171,
        1640
      ],
      [
        1171,
        1700
      ],
      [
        1076,
        1700
      ]
    ],
    "center": [
      1124,
      1670
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-014",
    "plotNo": "P-014",
    "title": "Sector 1 Prime Plot P-014",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "East",
    "status": "Featured",
    "price": 3750000,
    "priceFormatted": "৳ 37,50,000",
    "location": "Sector 1, Road-3, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1191,
        1640
      ],
      [
        1286,
        1640
      ],
      [
        1286,
        1700
      ],
      [
        1191,
        1700
      ]
    ],
    "center": [
      1239,
      1670
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-015",
    "plotNo": "P-015",
    "title": "Sector 1 Prime Plot P-015",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 3800000,
    "priceFormatted": "৳ 38,00,000",
    "location": "Sector 1, Road-3, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1306,
        1640
      ],
      [
        1401,
        1640
      ],
      [
        1401,
        1700
      ],
      [
        1306,
        1700
      ]
    ],
    "center": [
      1354,
      1670
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-016",
    "plotNo": "P-016",
    "title": "Sector 1 Prime Plot P-016",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 2900000,
    "priceFormatted": "৳ 29,00,000",
    "location": "Sector 1, Road-4, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        858,
        1720
      ],
      [
        953,
        1720
      ],
      [
        953,
        1775
      ],
      [
        858,
        1775
      ]
    ],
    "center": [
      906,
      1748
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-017",
    "plotNo": "P-017",
    "title": "Sector 1 Prime Plot P-017",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 2950000,
    "priceFormatted": "৳ 29,50,000",
    "location": "Sector 1, Road-4, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        973,
        1720
      ],
      [
        1068,
        1720
      ],
      [
        1068,
        1775
      ],
      [
        973,
        1775
      ]
    ],
    "center": [
      1021,
      1748
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-018",
    "plotNo": "P-018",
    "title": "Sector 1 Prime Plot P-018",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 3000000,
    "priceFormatted": "৳ 30,00,000",
    "location": "Sector 1, Road-4, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1088,
        1720
      ],
      [
        1183,
        1720
      ],
      [
        1183,
        1775
      ],
      [
        1088,
        1775
      ]
    ],
    "center": [
      1136,
      1748
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-019",
    "plotNo": "P-019",
    "title": "Sector 1 Prime Plot P-019",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3050000,
    "priceFormatted": "৳ 30,50,000",
    "location": "Sector 1, Road-4, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1203,
        1720
      ],
      [
        1298,
        1720
      ],
      [
        1298,
        1775
      ],
      [
        1203,
        1775
      ]
    ],
    "center": [
      1251,
      1748
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-020",
    "plotNo": "P-020",
    "title": "Sector 1 Prime Plot P-020",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 3100000,
    "priceFormatted": "৳ 31,00,000",
    "location": "Sector 1, Road-4, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1318,
        1720
      ],
      [
        1413,
        1720
      ],
      [
        1413,
        1775
      ],
      [
        1318,
        1775
      ]
    ],
    "center": [
      1366,
      1748
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-021",
    "plotNo": "P-021",
    "title": "Sector 1 Prime Plot P-021",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 2250000,
    "priceFormatted": "৳ 22,50,000",
    "location": "Sector 1, Road-5, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        869,
        1795
      ],
      [
        964,
        1795
      ],
      [
        964,
        1845
      ],
      [
        869,
        1845
      ]
    ],
    "center": [
      917,
      1820
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-022",
    "plotNo": "P-022",
    "title": "Sector 1 Prime Plot P-022",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "East",
    "status": "Available",
    "price": 2300000,
    "priceFormatted": "৳ 23,00,000",
    "location": "Sector 1, Road-5, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        984,
        1795
      ],
      [
        1079,
        1795
      ],
      [
        1079,
        1845
      ],
      [
        984,
        1845
      ]
    ],
    "center": [
      1032,
      1820
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-023",
    "plotNo": "P-023",
    "title": "Sector 1 Prime Plot P-023",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Available",
    "price": 2350000,
    "priceFormatted": "৳ 23,50,000",
    "location": "Sector 1, Road-5, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1099,
        1795
      ],
      [
        1194,
        1795
      ],
      [
        1194,
        1845
      ],
      [
        1099,
        1845
      ]
    ],
    "center": [
      1147,
      1820
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-024",
    "plotNo": "P-024",
    "title": "Sector 1 Prime Plot P-024",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 2400000,
    "priceFormatted": "৳ 24,00,000",
    "location": "Sector 1, Road-5, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1214,
        1795
      ],
      [
        1309,
        1795
      ],
      [
        1309,
        1845
      ],
      [
        1214,
        1845
      ]
    ],
    "center": [
      1262,
      1820
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-025",
    "plotNo": "P-025",
    "title": "Sector 1 Prime Plot P-025",
    "sector": "Sector 1 (West Zone)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Available",
    "price": 2450000,
    "priceFormatted": "৳ 24,50,000",
    "location": "Sector 1, Road-5, MOHS Venice City",
    "roadWidth": "40ft Wide Avenue",
    "points": [
      [
        1329,
        1795
      ],
      [
        1424,
        1795
      ],
      [
        1424,
        1845
      ],
      [
        1329,
        1845
      ]
    ],
    "center": [
      1377,
      1820
    ],
    "description": "Fully demarkated residential plot with direct access to Ayanpur-Purbachal link road and neighborhood school."
  },
  {
    "id": "P-026",
    "plotNo": "P-026",
    "title": "Lakeview Luxury Plot P-026",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Featured",
    "price": 7200000,
    "priceFormatted": "৳ 72,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1460,
        2160
      ],
      [
        1550,
        2160
      ],
      [
        1550,
        2230
      ],
      [
        1460,
        2230
      ]
    ],
    "center": [
      1505,
      2195
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-027",
    "plotNo": "P-027",
    "title": "Lakeview Luxury Plot P-027",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Reserved",
    "price": 7275000,
    "priceFormatted": "৳ 72,75,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1570,
        2180
      ],
      [
        1660,
        2180
      ],
      [
        1660,
        2250
      ],
      [
        1570,
        2250
      ]
    ],
    "center": [
      1615,
      2215
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-028",
    "plotNo": "P-028",
    "title": "Lakeview Luxury Plot P-028",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 7350000,
    "priceFormatted": "৳ 73,50,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1680,
        2193
      ],
      [
        1770,
        2193
      ],
      [
        1770,
        2263
      ],
      [
        1680,
        2263
      ]
    ],
    "center": [
      1725,
      2228
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-029",
    "plotNo": "P-029",
    "title": "Lakeview Luxury Plot P-029",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 7425000,
    "priceFormatted": "৳ 74,25,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1790,
        2194
      ],
      [
        1880,
        2194
      ],
      [
        1880,
        2264
      ],
      [
        1790,
        2264
      ]
    ],
    "center": [
      1835,
      2229
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-030",
    "plotNo": "P-030",
    "title": "Lakeview Luxury Plot P-030",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Featured",
    "price": 7500000,
    "priceFormatted": "৳ 75,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1900,
        2184
      ],
      [
        1990,
        2184
      ],
      [
        1990,
        2254
      ],
      [
        1900,
        2254
      ]
    ],
    "center": [
      1945,
      2219
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-031",
    "plotNo": "P-031",
    "title": "Lakeview Luxury Plot P-031",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 3900000,
    "priceFormatted": "৳ 39,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1460,
        2250
      ],
      [
        1550,
        2250
      ],
      [
        1550,
        2315
      ],
      [
        1460,
        2315
      ]
    ],
    "center": [
      1505,
      2283
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-032",
    "plotNo": "P-032",
    "title": "Lakeview Luxury Plot P-032",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 3975000,
    "priceFormatted": "৳ 39,75,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1570,
        2270
      ],
      [
        1660,
        2270
      ],
      [
        1660,
        2335
      ],
      [
        1570,
        2335
      ]
    ],
    "center": [
      1615,
      2303
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-033",
    "plotNo": "P-033",
    "title": "Lakeview Luxury Plot P-033",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "Lake Facing",
    "status": "Reserved",
    "price": 4050000,
    "priceFormatted": "৳ 40,50,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1680,
        2283
      ],
      [
        1770,
        2283
      ],
      [
        1770,
        2348
      ],
      [
        1680,
        2348
      ]
    ],
    "center": [
      1725,
      2316
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-034",
    "plotNo": "P-034",
    "title": "Lakeview Luxury Plot P-034",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 4125000,
    "priceFormatted": "৳ 41,25,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1790,
        2284
      ],
      [
        1880,
        2284
      ],
      [
        1880,
        2349
      ],
      [
        1790,
        2349
      ]
    ],
    "center": [
      1835,
      2317
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-035",
    "plotNo": "P-035",
    "title": "Lakeview Luxury Plot P-035",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "Lake Facing",
    "status": "Sold",
    "price": 4200000,
    "priceFormatted": "৳ 42,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1900,
        2274
      ],
      [
        1990,
        2274
      ],
      [
        1990,
        2339
      ],
      [
        1900,
        2339
      ]
    ],
    "center": [
      1945,
      2307
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-036",
    "plotNo": "P-036",
    "title": "Lakeview Luxury Plot P-036",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 3850000,
    "priceFormatted": "৳ 38,50,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1460,
        2335
      ],
      [
        1550,
        2335
      ],
      [
        1550,
        2400
      ],
      [
        1460,
        2400
      ]
    ],
    "center": [
      1505,
      2368
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-037",
    "plotNo": "P-037",
    "title": "Lakeview Luxury Plot P-037",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3925000,
    "priceFormatted": "৳ 39,25,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1570,
        2355
      ],
      [
        1660,
        2355
      ],
      [
        1660,
        2420
      ],
      [
        1570,
        2420
      ]
    ],
    "center": [
      1615,
      2388
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-038",
    "plotNo": "P-038",
    "title": "Lakeview Luxury Plot P-038",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4000000,
    "priceFormatted": "৳ 40,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1680,
        2368
      ],
      [
        1770,
        2368
      ],
      [
        1770,
        2433
      ],
      [
        1680,
        2433
      ]
    ],
    "center": [
      1725,
      2401
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-039",
    "plotNo": "P-039",
    "title": "Lakeview Luxury Plot P-039",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 4075000,
    "priceFormatted": "৳ 40,75,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1790,
        2369
      ],
      [
        1880,
        2369
      ],
      [
        1880,
        2434
      ],
      [
        1790,
        2434
      ]
    ],
    "center": [
      1835,
      2402
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-040",
    "plotNo": "P-040",
    "title": "Lakeview Luxury Plot P-040",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 4150000,
    "priceFormatted": "৳ 41,50,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1900,
        2359
      ],
      [
        1990,
        2359
      ],
      [
        1990,
        2424
      ],
      [
        1900,
        2424
      ]
    ],
    "center": [
      1945,
      2392
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-041",
    "plotNo": "P-041",
    "title": "Lakeview Luxury Plot P-041",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3800000,
    "priceFormatted": "৳ 38,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1460,
        2420
      ],
      [
        1550,
        2420
      ],
      [
        1550,
        2485
      ],
      [
        1460,
        2485
      ]
    ],
    "center": [
      1505,
      2453
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-042",
    "plotNo": "P-042",
    "title": "Lakeview Luxury Plot P-042",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 3875000,
    "priceFormatted": "৳ 38,75,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1570,
        2440
      ],
      [
        1660,
        2440
      ],
      [
        1660,
        2505
      ],
      [
        1570,
        2505
      ]
    ],
    "center": [
      1615,
      2473
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-043",
    "plotNo": "P-043",
    "title": "Lakeview Luxury Plot P-043",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3950000,
    "priceFormatted": "৳ 39,50,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1680,
        2453
      ],
      [
        1770,
        2453
      ],
      [
        1770,
        2518
      ],
      [
        1680,
        2518
      ]
    ],
    "center": [
      1725,
      2486
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-044",
    "plotNo": "P-044",
    "title": "Lakeview Luxury Plot P-044",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4025000,
    "priceFormatted": "৳ 40,25,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1790,
        2454
      ],
      [
        1880,
        2454
      ],
      [
        1880,
        2519
      ],
      [
        1790,
        2519
      ]
    ],
    "center": [
      1835,
      2487
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-045",
    "plotNo": "P-045",
    "title": "Lakeview Luxury Plot P-045",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Featured",
    "price": 4100000,
    "priceFormatted": "৳ 41,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1900,
        2444
      ],
      [
        1990,
        2444
      ],
      [
        1990,
        2509
      ],
      [
        1900,
        2509
      ]
    ],
    "center": [
      1945,
      2477
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-046",
    "plotNo": "P-046",
    "title": "Lakeview Luxury Plot P-046",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Available",
    "price": 3100000,
    "priceFormatted": "৳ 31,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1460,
        2505
      ],
      [
        1550,
        2505
      ],
      [
        1550,
        2565
      ],
      [
        1460,
        2565
      ]
    ],
    "center": [
      1505,
      2535
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-047",
    "plotNo": "P-047",
    "title": "Lakeview Luxury Plot P-047",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Available",
    "price": 3175000,
    "priceFormatted": "৳ 31,75,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1570,
        2525
      ],
      [
        1660,
        2525
      ],
      [
        1660,
        2585
      ],
      [
        1570,
        2585
      ]
    ],
    "center": [
      1615,
      2555
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-048",
    "plotNo": "P-048",
    "title": "Lakeview Luxury Plot P-048",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Reserved",
    "price": 3250000,
    "priceFormatted": "৳ 32,50,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1680,
        2538
      ],
      [
        1770,
        2538
      ],
      [
        1770,
        2598
      ],
      [
        1680,
        2598
      ]
    ],
    "center": [
      1725,
      2568
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-049",
    "plotNo": "P-049",
    "title": "Lakeview Luxury Plot P-049",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Available",
    "price": 3325000,
    "priceFormatted": "৳ 33,25,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1790,
        2539
      ],
      [
        1880,
        2539
      ],
      [
        1880,
        2599
      ],
      [
        1790,
        2599
      ]
    ],
    "center": [
      1835,
      2569
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-050",
    "plotNo": "P-050",
    "title": "Lakeview Luxury Plot P-050",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 3400000,
    "priceFormatted": "৳ 34,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1900,
        2529
      ],
      [
        1990,
        2529
      ],
      [
        1990,
        2589
      ],
      [
        1900,
        2589
      ]
    ],
    "center": [
      1945,
      2559
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-051",
    "plotNo": "P-051",
    "title": "Lakeview Luxury Plot P-051",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "West",
    "status": "Reserved",
    "price": 2400000,
    "priceFormatted": "৳ 24,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1460,
        2585
      ],
      [
        1550,
        2585
      ],
      [
        1550,
        2640
      ],
      [
        1460,
        2640
      ]
    ],
    "center": [
      1505,
      2613
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-052",
    "plotNo": "P-052",
    "title": "Lakeview Luxury Plot P-052",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "West",
    "status": "Available",
    "price": 2475000,
    "priceFormatted": "৳ 24,75,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1570,
        2605
      ],
      [
        1660,
        2605
      ],
      [
        1660,
        2660
      ],
      [
        1570,
        2660
      ]
    ],
    "center": [
      1615,
      2633
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-053",
    "plotNo": "P-053",
    "title": "Lakeview Luxury Plot P-053",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "West",
    "status": "Available",
    "price": 2550000,
    "priceFormatted": "৳ 25,50,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1680,
        2618
      ],
      [
        1770,
        2618
      ],
      [
        1770,
        2673
      ],
      [
        1680,
        2673
      ]
    ],
    "center": [
      1725,
      2646
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-054",
    "plotNo": "P-054",
    "title": "Lakeview Luxury Plot P-054",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "West",
    "status": "Reserved",
    "price": 2625000,
    "priceFormatted": "৳ 26,25,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1790,
        2619
      ],
      [
        1880,
        2619
      ],
      [
        1880,
        2674
      ],
      [
        1790,
        2674
      ]
    ],
    "center": [
      1835,
      2647
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-055",
    "plotNo": "P-055",
    "title": "Lakeview Luxury Plot P-055",
    "sector": "Sector 2 (Lakeview)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "West",
    "status": "Sold",
    "price": 2700000,
    "priceFormatted": "৳ 27,00,000",
    "location": "Sector 2, Lakeview Promenade, MOHS Venice City",
    "roadWidth": "50ft Waterfront Boulevard",
    "points": [
      [
        1900,
        2609
      ],
      [
        1990,
        2609
      ],
      [
        1990,
        2664
      ],
      [
        1900,
        2664
      ]
    ],
    "center": [
      1945,
      2637
    ],
    "description": "Exclusive waterfront plot overlooking the central Venice natural lake with uninterrupted breeze and scenic views."
  },
  {
    "id": "P-056",
    "plotNo": "P-056",
    "title": "Central Prestige Plot P-056",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4100000,
    "priceFormatted": "৳ 41,00,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2020,
        1480
      ],
      [
        2120,
        1480
      ],
      [
        2120,
        1545
      ],
      [
        2020,
        1545
      ]
    ],
    "center": [
      2070,
      1513
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-057",
    "plotNo": "P-057",
    "title": "Central Prestige Plot P-057",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 4160000,
    "priceFormatted": "৳ 41,60,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2140,
        1494
      ],
      [
        2240,
        1494
      ],
      [
        2240,
        1559
      ],
      [
        2140,
        1559
      ]
    ],
    "center": [
      2190,
      1527
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-058",
    "plotNo": "P-058",
    "title": "Central Prestige Plot P-058",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Featured",
    "price": 4220000,
    "priceFormatted": "৳ 42,20,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2260,
        1509
      ],
      [
        2360,
        1509
      ],
      [
        2360,
        1574
      ],
      [
        2260,
        1574
      ]
    ],
    "center": [
      2310,
      1542
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-059",
    "plotNo": "P-059",
    "title": "Central Prestige Plot P-059",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4280000,
    "priceFormatted": "৳ 42,80,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2380,
        1523
      ],
      [
        2480,
        1523
      ],
      [
        2480,
        1588
      ],
      [
        2380,
        1588
      ]
    ],
    "center": [
      2430,
      1556
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-060",
    "plotNo": "P-060",
    "title": "Central Prestige Plot P-060",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4340000,
    "priceFormatted": "৳ 43,40,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2500,
        1538
      ],
      [
        2600,
        1538
      ],
      [
        2600,
        1603
      ],
      [
        2500,
        1603
      ]
    ],
    "center": [
      2550,
      1571
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-061",
    "plotNo": "P-061",
    "title": "Central Prestige Plot P-061",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 4200000,
    "priceFormatted": "৳ 42,00,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2020,
        1565
      ],
      [
        2120,
        1565
      ],
      [
        2120,
        1630
      ],
      [
        2020,
        1630
      ]
    ],
    "center": [
      2070,
      1598
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-062",
    "plotNo": "P-062",
    "title": "Central Prestige Plot P-062",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 4260000,
    "priceFormatted": "৳ 42,60,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2140,
        1579
      ],
      [
        2240,
        1579
      ],
      [
        2240,
        1644
      ],
      [
        2140,
        1644
      ]
    ],
    "center": [
      2190,
      1612
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-063",
    "plotNo": "P-063",
    "title": "Central Prestige Plot P-063",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4320000,
    "priceFormatted": "৳ 43,20,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2260,
        1594
      ],
      [
        2360,
        1594
      ],
      [
        2360,
        1659
      ],
      [
        2260,
        1659
      ]
    ],
    "center": [
      2310,
      1627
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-064",
    "plotNo": "P-064",
    "title": "Central Prestige Plot P-064",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4380000,
    "priceFormatted": "৳ 43,80,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2380,
        1608
      ],
      [
        2480,
        1608
      ],
      [
        2480,
        1673
      ],
      [
        2380,
        1673
      ]
    ],
    "center": [
      2430,
      1641
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-065",
    "plotNo": "P-065",
    "title": "Central Prestige Plot P-065",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 4440000,
    "priceFormatted": "৳ 44,40,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2500,
        1623
      ],
      [
        2600,
        1623
      ],
      [
        2600,
        1688
      ],
      [
        2500,
        1688
      ]
    ],
    "center": [
      2550,
      1656
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-066",
    "plotNo": "P-066",
    "title": "Central Prestige Plot P-066",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 7800000,
    "priceFormatted": "৳ 78,00,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2020,
        1650
      ],
      [
        2120,
        1650
      ],
      [
        2120,
        1720
      ],
      [
        2020,
        1720
      ]
    ],
    "center": [
      2070,
      1685
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-067",
    "plotNo": "P-067",
    "title": "Central Prestige Plot P-067",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "North",
    "status": "Available",
    "price": 7860000,
    "priceFormatted": "৳ 78,60,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2140,
        1664
      ],
      [
        2240,
        1664
      ],
      [
        2240,
        1734
      ],
      [
        2140,
        1734
      ]
    ],
    "center": [
      2190,
      1699
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-068",
    "plotNo": "P-068",
    "title": "Central Prestige Plot P-068",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "North",
    "status": "Available",
    "price": 7920000,
    "priceFormatted": "৳ 79,20,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2260,
        1679
      ],
      [
        2360,
        1679
      ],
      [
        2360,
        1749
      ],
      [
        2260,
        1749
      ]
    ],
    "center": [
      2310,
      1714
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-069",
    "plotNo": "P-069",
    "title": "Central Prestige Plot P-069",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 7980000,
    "priceFormatted": "৳ 79,80,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2380,
        1693
      ],
      [
        2480,
        1693
      ],
      [
        2480,
        1763
      ],
      [
        2380,
        1763
      ]
    ],
    "center": [
      2430,
      1728
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-070",
    "plotNo": "P-070",
    "title": "Central Prestige Plot P-070",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 8040000,
    "priceFormatted": "৳ 80,40,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2500,
        1708
      ],
      [
        2600,
        1708
      ],
      [
        2600,
        1778
      ],
      [
        2500,
        1778
      ]
    ],
    "center": [
      2550,
      1743
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-071",
    "plotNo": "P-071",
    "title": "Central Prestige Plot P-071",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3300000,
    "priceFormatted": "৳ 33,00,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2020,
        1740
      ],
      [
        2120,
        1740
      ],
      [
        2120,
        1800
      ],
      [
        2020,
        1800
      ]
    ],
    "center": [
      2070,
      1770
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-072",
    "plotNo": "P-072",
    "title": "Central Prestige Plot P-072",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Featured",
    "price": 3360000,
    "priceFormatted": "৳ 33,60,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2140,
        1754
      ],
      [
        2240,
        1754
      ],
      [
        2240,
        1814
      ],
      [
        2140,
        1814
      ]
    ],
    "center": [
      2190,
      1784
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-073",
    "plotNo": "P-073",
    "title": "Central Prestige Plot P-073",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 3420000,
    "priceFormatted": "৳ 34,20,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2260,
        1769
      ],
      [
        2360,
        1769
      ],
      [
        2360,
        1829
      ],
      [
        2260,
        1829
      ]
    ],
    "center": [
      2310,
      1799
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-074",
    "plotNo": "P-074",
    "title": "Central Prestige Plot P-074",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 3480000,
    "priceFormatted": "৳ 34,80,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2380,
        1783
      ],
      [
        2480,
        1783
      ],
      [
        2480,
        1843
      ],
      [
        2380,
        1843
      ]
    ],
    "center": [
      2430,
      1813
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-075",
    "plotNo": "P-075",
    "title": "Central Prestige Plot P-075",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3540000,
    "priceFormatted": "৳ 35,40,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2500,
        1798
      ],
      [
        2600,
        1798
      ],
      [
        2600,
        1858
      ],
      [
        2500,
        1858
      ]
    ],
    "center": [
      2550,
      1828
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-076",
    "plotNo": "P-076",
    "title": "Central Prestige Plot P-076",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "East",
    "status": "Available",
    "price": 2600000,
    "priceFormatted": "৳ 26,00,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2020,
        1820
      ],
      [
        2120,
        1820
      ],
      [
        2120,
        1875
      ],
      [
        2020,
        1875
      ]
    ],
    "center": [
      2070,
      1848
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-077",
    "plotNo": "P-077",
    "title": "Central Prestige Plot P-077",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 2660000,
    "priceFormatted": "৳ 26,60,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2140,
        1834
      ],
      [
        2240,
        1834
      ],
      [
        2240,
        1889
      ],
      [
        2140,
        1889
      ]
    ],
    "center": [
      2190,
      1862
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-078",
    "plotNo": "P-078",
    "title": "Central Prestige Plot P-078",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "East",
    "status": "Reserved",
    "price": 2720000,
    "priceFormatted": "৳ 27,20,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2260,
        1849
      ],
      [
        2360,
        1849
      ],
      [
        2360,
        1904
      ],
      [
        2260,
        1904
      ]
    ],
    "center": [
      2310,
      1877
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-079",
    "plotNo": "P-079",
    "title": "Central Prestige Plot P-079",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "East",
    "status": "Available",
    "price": 2780000,
    "priceFormatted": "৳ 27,80,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2380,
        1863
      ],
      [
        2480,
        1863
      ],
      [
        2480,
        1918
      ],
      [
        2380,
        1918
      ]
    ],
    "center": [
      2430,
      1891
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-080",
    "plotNo": "P-080",
    "title": "Central Prestige Plot P-080",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "East",
    "status": "Featured",
    "price": 2840000,
    "priceFormatted": "৳ 28,40,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2500,
        1878
      ],
      [
        2600,
        1878
      ],
      [
        2600,
        1933
      ],
      [
        2500,
        1933
      ]
    ],
    "center": [
      2550,
      1906
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-081",
    "plotNo": "P-081",
    "title": "Central Prestige Plot P-081",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Sold",
    "price": 8200000,
    "priceFormatted": "৳ 82,00,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2020,
        1895
      ],
      [
        2120,
        1895
      ],
      [
        2120,
        1970
      ],
      [
        2020,
        1970
      ]
    ],
    "center": [
      2070,
      1933
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-082",
    "plotNo": "P-082",
    "title": "Central Prestige Plot P-082",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Reserved",
    "price": 8260000,
    "priceFormatted": "৳ 82,60,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2140,
        1909
      ],
      [
        2240,
        1909
      ],
      [
        2240,
        1984
      ],
      [
        2140,
        1984
      ]
    ],
    "center": [
      2190,
      1947
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-083",
    "plotNo": "P-083",
    "title": "Central Prestige Plot P-083",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 8320000,
    "priceFormatted": "৳ 83,20,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2260,
        1924
      ],
      [
        2360,
        1924
      ],
      [
        2360,
        1999
      ],
      [
        2260,
        1999
      ]
    ],
    "center": [
      2310,
      1962
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-084",
    "plotNo": "P-084",
    "title": "Central Prestige Plot P-084",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 8380000,
    "priceFormatted": "৳ 83,80,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2380,
        1938
      ],
      [
        2480,
        1938
      ],
      [
        2480,
        2013
      ],
      [
        2380,
        2013
      ]
    ],
    "center": [
      2430,
      1976
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-085",
    "plotNo": "P-085",
    "title": "Central Prestige Plot P-085",
    "sector": "Sector 3 (Central Hub)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "Lake Facing",
    "status": "Sold",
    "price": 8440000,
    "priceFormatted": "৳ 84,40,000",
    "location": "Sector 3, University Road, MOHS Venice City",
    "roadWidth": "60ft Central Avenue",
    "points": [
      [
        2500,
        1953
      ],
      [
        2600,
        1953
      ],
      [
        2600,
        2028
      ],
      [
        2500,
        2028
      ]
    ],
    "center": [
      2550,
      1991
    ],
    "description": "Prime central location adjacent to MOHS International University, Central Mosque, and the Diplomatic Zone corridor."
  },
  {
    "id": "P-086",
    "plotNo": "P-086",
    "title": "Airport Express Plot P-086",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4500000,
    "priceFormatted": "৳ 45,00,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2800,
        1080
      ],
      [
        2895,
        1080
      ],
      [
        2895,
        1140
      ],
      [
        2800,
        1140
      ]
    ],
    "center": [
      2848,
      1110
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-087",
    "plotNo": "P-087",
    "title": "Airport Express Plot P-087",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 4555000,
    "priceFormatted": "৳ 45,55,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2920,
        1106
      ],
      [
        3015,
        1106
      ],
      [
        3015,
        1166
      ],
      [
        2920,
        1166
      ]
    ],
    "center": [
      2968,
      1136
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-088",
    "plotNo": "P-088",
    "title": "Airport Express Plot P-088",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4610000,
    "priceFormatted": "৳ 46,10,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3040,
        1133
      ],
      [
        3135,
        1133
      ],
      [
        3135,
        1193
      ],
      [
        3040,
        1193
      ]
    ],
    "center": [
      3088,
      1163
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-089",
    "plotNo": "P-089",
    "title": "Airport Express Plot P-089",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4665000,
    "priceFormatted": "৳ 46,65,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3160,
        1159
      ],
      [
        3255,
        1159
      ],
      [
        3255,
        1219
      ],
      [
        3160,
        1219
      ]
    ],
    "center": [
      3208,
      1189
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-090",
    "plotNo": "P-090",
    "title": "Airport Express Plot P-090",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 4720000,
    "priceFormatted": "৳ 47,20,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3280,
        1186
      ],
      [
        3375,
        1186
      ],
      [
        3375,
        1246
      ],
      [
        3280,
        1246
      ]
    ],
    "center": [
      3328,
      1216
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-091",
    "plotNo": "P-091",
    "title": "Airport Express Plot P-091",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4775000,
    "priceFormatted": "৳ 47,75,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3400,
        1212
      ],
      [
        3495,
        1212
      ],
      [
        3495,
        1272
      ],
      [
        3400,
        1272
      ]
    ],
    "center": [
      3448,
      1242
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-092",
    "plotNo": "P-092",
    "title": "Airport Express Plot P-092",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Featured",
    "price": 4830000,
    "priceFormatted": "৳ 48,30,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3520,
        1238
      ],
      [
        3615,
        1238
      ],
      [
        3615,
        1298
      ],
      [
        3520,
        1298
      ]
    ],
    "center": [
      3568,
      1268
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-093",
    "plotNo": "P-093",
    "title": "Airport Express Plot P-093",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 4885000,
    "priceFormatted": "৳ 48,85,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3640,
        1265
      ],
      [
        3735,
        1265
      ],
      [
        3735,
        1325
      ],
      [
        3640,
        1325
      ]
    ],
    "center": [
      3688,
      1295
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-094",
    "plotNo": "P-094",
    "title": "Airport Express Plot P-094",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4940000,
    "priceFormatted": "৳ 49,40,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3760,
        1291
      ],
      [
        3855,
        1291
      ],
      [
        3855,
        1351
      ],
      [
        3760,
        1351
      ]
    ],
    "center": [
      3808,
      1321
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-095",
    "plotNo": "P-095",
    "title": "Airport Express Plot P-095",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 4600000,
    "priceFormatted": "৳ 46,00,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2800,
        1160
      ],
      [
        2895,
        1160
      ],
      [
        2895,
        1220
      ],
      [
        2800,
        1220
      ]
    ],
    "center": [
      2848,
      1190
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-096",
    "plotNo": "P-096",
    "title": "Airport Express Plot P-096",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 4655000,
    "priceFormatted": "৳ 46,55,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2920,
        1186
      ],
      [
        3015,
        1186
      ],
      [
        3015,
        1246
      ],
      [
        2920,
        1246
      ]
    ],
    "center": [
      2968,
      1216
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-097",
    "plotNo": "P-097",
    "title": "Airport Express Plot P-097",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4710000,
    "priceFormatted": "৳ 47,10,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3040,
        1213
      ],
      [
        3135,
        1213
      ],
      [
        3135,
        1273
      ],
      [
        3040,
        1273
      ]
    ],
    "center": [
      3088,
      1243
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-098",
    "plotNo": "P-098",
    "title": "Airport Express Plot P-098",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4765000,
    "priceFormatted": "৳ 47,65,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3160,
        1239
      ],
      [
        3255,
        1239
      ],
      [
        3255,
        1299
      ],
      [
        3160,
        1299
      ]
    ],
    "center": [
      3208,
      1269
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-099",
    "plotNo": "P-099",
    "title": "Airport Express Plot P-099",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 4820000,
    "priceFormatted": "৳ 48,20,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3280,
        1266
      ],
      [
        3375,
        1266
      ],
      [
        3375,
        1326
      ],
      [
        3280,
        1326
      ]
    ],
    "center": [
      3328,
      1296
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-100",
    "plotNo": "P-100",
    "title": "Airport Express Plot P-100",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 4875000,
    "priceFormatted": "৳ 48,75,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3400,
        1292
      ],
      [
        3495,
        1292
      ],
      [
        3495,
        1352
      ],
      [
        3400,
        1352
      ]
    ],
    "center": [
      3448,
      1322
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-101",
    "plotNo": "P-101",
    "title": "Airport Express Plot P-101",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4930000,
    "priceFormatted": "৳ 49,30,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3520,
        1318
      ],
      [
        3615,
        1318
      ],
      [
        3615,
        1378
      ],
      [
        3520,
        1378
      ]
    ],
    "center": [
      3568,
      1348
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-102",
    "plotNo": "P-102",
    "title": "Airport Express Plot P-102",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 4985000,
    "priceFormatted": "৳ 49,85,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3640,
        1345
      ],
      [
        3735,
        1345
      ],
      [
        3735,
        1405
      ],
      [
        3640,
        1405
      ]
    ],
    "center": [
      3688,
      1375
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-103",
    "plotNo": "P-103",
    "title": "Airport Express Plot P-103",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 5040000,
    "priceFormatted": "৳ 50,40,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3760,
        1371
      ],
      [
        3855,
        1371
      ],
      [
        3855,
        1431
      ],
      [
        3760,
        1431
      ]
    ],
    "center": [
      3808,
      1401
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-104",
    "plotNo": "P-104",
    "title": "Airport Express Plot P-104",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3700000,
    "priceFormatted": "৳ 37,00,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2800,
        1240
      ],
      [
        2895,
        1240
      ],
      [
        2895,
        1295
      ],
      [
        2800,
        1295
      ]
    ],
    "center": [
      2848,
      1268
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-105",
    "plotNo": "P-105",
    "title": "Airport Express Plot P-105",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Featured",
    "price": 3755000,
    "priceFormatted": "৳ 37,55,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2920,
        1266
      ],
      [
        3015,
        1266
      ],
      [
        3015,
        1321
      ],
      [
        2920,
        1321
      ]
    ],
    "center": [
      2968,
      1294
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-106",
    "plotNo": "P-106",
    "title": "Airport Express Plot P-106",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3810000,
    "priceFormatted": "৳ 38,10,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3040,
        1293
      ],
      [
        3135,
        1293
      ],
      [
        3135,
        1348
      ],
      [
        3040,
        1348
      ]
    ],
    "center": [
      3088,
      1321
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-107",
    "plotNo": "P-107",
    "title": "Airport Express Plot P-107",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3865000,
    "priceFormatted": "৳ 38,65,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3160,
        1319
      ],
      [
        3255,
        1319
      ],
      [
        3255,
        1374
      ],
      [
        3160,
        1374
      ]
    ],
    "center": [
      3208,
      1347
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-108",
    "plotNo": "P-108",
    "title": "Airport Express Plot P-108",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 3920000,
    "priceFormatted": "৳ 39,20,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3280,
        1346
      ],
      [
        3375,
        1346
      ],
      [
        3375,
        1401
      ],
      [
        3280,
        1401
      ]
    ],
    "center": [
      3328,
      1374
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-109",
    "plotNo": "P-109",
    "title": "Airport Express Plot P-109",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3975000,
    "priceFormatted": "৳ 39,75,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3400,
        1372
      ],
      [
        3495,
        1372
      ],
      [
        3495,
        1427
      ],
      [
        3400,
        1427
      ]
    ],
    "center": [
      3448,
      1400
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-110",
    "plotNo": "P-110",
    "title": "Airport Express Plot P-110",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 4030000,
    "priceFormatted": "৳ 40,30,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3520,
        1398
      ],
      [
        3615,
        1398
      ],
      [
        3615,
        1453
      ],
      [
        3520,
        1453
      ]
    ],
    "center": [
      3568,
      1426
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-111",
    "plotNo": "P-111",
    "title": "Airport Express Plot P-111",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 4085000,
    "priceFormatted": "৳ 40,85,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3640,
        1425
      ],
      [
        3735,
        1425
      ],
      [
        3735,
        1480
      ],
      [
        3640,
        1480
      ]
    ],
    "center": [
      3688,
      1453
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-112",
    "plotNo": "P-112",
    "title": "Airport Express Plot P-112",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4140000,
    "priceFormatted": "৳ 41,40,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3760,
        1451
      ],
      [
        3855,
        1451
      ],
      [
        3855,
        1506
      ],
      [
        3760,
        1506
      ]
    ],
    "center": [
      3808,
      1479
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-113",
    "plotNo": "P-113",
    "title": "Airport Express Plot P-113",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Available",
    "price": 2800000,
    "priceFormatted": "৳ 28,00,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2800,
        1315
      ],
      [
        2895,
        1315
      ],
      [
        2895,
        1365
      ],
      [
        2800,
        1365
      ]
    ],
    "center": [
      2848,
      1340
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-114",
    "plotNo": "P-114",
    "title": "Airport Express Plot P-114",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 2855000,
    "priceFormatted": "৳ 28,55,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2920,
        1341
      ],
      [
        3015,
        1341
      ],
      [
        3015,
        1391
      ],
      [
        2920,
        1391
      ]
    ],
    "center": [
      2968,
      1366
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-115",
    "plotNo": "P-115",
    "title": "Airport Express Plot P-115",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 2910000,
    "priceFormatted": "৳ 29,10,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3040,
        1368
      ],
      [
        3135,
        1368
      ],
      [
        3135,
        1418
      ],
      [
        3040,
        1418
      ]
    ],
    "center": [
      3088,
      1393
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-116",
    "plotNo": "P-116",
    "title": "Airport Express Plot P-116",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Available",
    "price": 2965000,
    "priceFormatted": "৳ 29,65,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3160,
        1394
      ],
      [
        3255,
        1394
      ],
      [
        3255,
        1444
      ],
      [
        3160,
        1444
      ]
    ],
    "center": [
      3208,
      1419
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-117",
    "plotNo": "P-117",
    "title": "Airport Express Plot P-117",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 3020000,
    "priceFormatted": "৳ 30,20,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3280,
        1421
      ],
      [
        3375,
        1421
      ],
      [
        3375,
        1471
      ],
      [
        3280,
        1471
      ]
    ],
    "center": [
      3328,
      1446
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-118",
    "plotNo": "P-118",
    "title": "Airport Express Plot P-118",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3075000,
    "priceFormatted": "৳ 30,75,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3400,
        1447
      ],
      [
        3495,
        1447
      ],
      [
        3495,
        1497
      ],
      [
        3400,
        1497
      ]
    ],
    "center": [
      3448,
      1472
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-119",
    "plotNo": "P-119",
    "title": "Airport Express Plot P-119",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3130000,
    "priceFormatted": "৳ 31,30,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3520,
        1473
      ],
      [
        3615,
        1473
      ],
      [
        3615,
        1523
      ],
      [
        3520,
        1523
      ]
    ],
    "center": [
      3568,
      1498
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-120",
    "plotNo": "P-120",
    "title": "Airport Express Plot P-120",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Featured",
    "price": 3185000,
    "priceFormatted": "৳ 31,85,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3640,
        1500
      ],
      [
        3735,
        1500
      ],
      [
        3735,
        1550
      ],
      [
        3640,
        1550
      ]
    ],
    "center": [
      3688,
      1525
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-121",
    "plotNo": "P-121",
    "title": "Airport Express Plot P-121",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "3 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3240000,
    "priceFormatted": "৳ 32,40,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3760,
        1526
      ],
      [
        3855,
        1526
      ],
      [
        3855,
        1576
      ],
      [
        3760,
        1576
      ]
    ],
    "center": [
      3808,
      1551
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-122",
    "plotNo": "P-122",
    "title": "Airport Express Plot P-122",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Available",
    "price": 8900000,
    "priceFormatted": "৳ 89,00,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2800,
        1385
      ],
      [
        2895,
        1385
      ],
      [
        2895,
        1455
      ],
      [
        2800,
        1455
      ]
    ],
    "center": [
      2848,
      1420
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-123",
    "plotNo": "P-123",
    "title": "Airport Express Plot P-123",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Reserved",
    "price": 8955000,
    "priceFormatted": "৳ 89,55,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        2920,
        1411
      ],
      [
        3015,
        1411
      ],
      [
        3015,
        1481
      ],
      [
        2920,
        1481
      ]
    ],
    "center": [
      2968,
      1446
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-124",
    "plotNo": "P-124",
    "title": "Airport Express Plot P-124",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Available",
    "price": 9010000,
    "priceFormatted": "৳ 90,10,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3040,
        1438
      ],
      [
        3135,
        1438
      ],
      [
        3135,
        1508
      ],
      [
        3040,
        1508
      ]
    ],
    "center": [
      3088,
      1473
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-125",
    "plotNo": "P-125",
    "title": "Airport Express Plot P-125",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 9065000,
    "priceFormatted": "৳ 90,65,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3160,
        1464
      ],
      [
        3255,
        1464
      ],
      [
        3255,
        1534
      ],
      [
        3160,
        1534
      ]
    ],
    "center": [
      3208,
      1499
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-126",
    "plotNo": "P-126",
    "title": "Airport Express Plot P-126",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Reserved",
    "price": 9120000,
    "priceFormatted": "৳ 91,20,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3280,
        1491
      ],
      [
        3375,
        1491
      ],
      [
        3375,
        1561
      ],
      [
        3280,
        1561
      ]
    ],
    "center": [
      3328,
      1526
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-127",
    "plotNo": "P-127",
    "title": "Airport Express Plot P-127",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Available",
    "price": 9175000,
    "priceFormatted": "৳ 91,75,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3400,
        1517
      ],
      [
        3495,
        1517
      ],
      [
        3495,
        1587
      ],
      [
        3400,
        1587
      ]
    ],
    "center": [
      3448,
      1552
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-128",
    "plotNo": "P-128",
    "title": "Airport Express Plot P-128",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Available",
    "price": 9230000,
    "priceFormatted": "৳ 92,30,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3520,
        1543
      ],
      [
        3615,
        1543
      ],
      [
        3615,
        1613
      ],
      [
        3520,
        1613
      ]
    ],
    "center": [
      3568,
      1578
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-129",
    "plotNo": "P-129",
    "title": "Airport Express Plot P-129",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Reserved",
    "price": 9285000,
    "priceFormatted": "৳ 92,85,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3640,
        1570
      ],
      [
        3735,
        1570
      ],
      [
        3735,
        1640
      ],
      [
        3640,
        1640
      ]
    ],
    "center": [
      3688,
      1605
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "P-130",
    "plotNo": "P-130",
    "title": "Airport Express Plot P-130",
    "sector": "Sector 4 (Airport Express)",
    "type": "Residential Plot",
    "size": "10 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 9340000,
    "priceFormatted": "৳ 93,40,000",
    "location": "Sector 4, Avenue 8, MOHS Venice City",
    "roadWidth": "50ft Sector Road",
    "points": [
      [
        3760,
        1596
      ],
      [
        3855,
        1596
      ],
      [
        3855,
        1666
      ],
      [
        3760,
        1666
      ]
    ],
    "center": [
      3808,
      1631
    ],
    "description": "Rapid-growth sector 3 KM from Kuril 300 Feet Road and directly connecting to the 100ft Airport Highway."
  },
  {
    "id": "CP-01",
    "plotNo": "CP-01",
    "title": "Riverfront Commercial Plot CP-01",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 12000000,
    "priceFormatted": "৳ 1,20,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        2460,
        840
      ],
      [
        2565,
        840
      ],
      [
        2565,
        910
      ],
      [
        2460,
        910
      ]
    ],
    "center": [
      2513,
      875
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-02",
    "plotNo": "CP-02",
    "title": "Riverfront Commercial Plot CP-02",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Reserved",
    "price": 12500000,
    "priceFormatted": "৳ 1,25,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        2580,
        830
      ],
      [
        2685,
        830
      ],
      [
        2685,
        900
      ],
      [
        2580,
        900
      ]
    ],
    "center": [
      2633,
      865
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-03",
    "plotNo": "CP-03",
    "title": "Riverfront Commercial Plot CP-03",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 12500000,
    "priceFormatted": "৳ 1,25,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        2700,
        810
      ],
      [
        2805,
        810
      ],
      [
        2805,
        880
      ],
      [
        2700,
        880
      ]
    ],
    "center": [
      2753,
      845
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-04",
    "plotNo": "CP-04",
    "title": "Riverfront Commercial Plot CP-04",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Featured",
    "price": 13000000,
    "priceFormatted": "৳ 1,30,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        2820,
        790
      ],
      [
        2925,
        790
      ],
      [
        2925,
        860
      ],
      [
        2820,
        860
      ]
    ],
    "center": [
      2873,
      825
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-05",
    "plotNo": "CP-05",
    "title": "Riverfront Commercial Plot CP-05",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 13500000,
    "priceFormatted": "৳ 1,35,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        2940,
        770
      ],
      [
        3045,
        770
      ],
      [
        3045,
        840
      ],
      [
        2940,
        840
      ]
    ],
    "center": [
      2993,
      805
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-06",
    "plotNo": "CP-06",
    "title": "Riverfront Commercial Plot CP-06",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Sold",
    "price": 14000000,
    "priceFormatted": "৳ 1,40,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3060,
        750
      ],
      [
        3165,
        750
      ],
      [
        3165,
        820
      ],
      [
        3060,
        820
      ]
    ],
    "center": [
      3113,
      785
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-07",
    "plotNo": "CP-07",
    "title": "Riverfront Commercial Plot CP-07",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 14500000,
    "priceFormatted": "৳ 1,45,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3180,
        730
      ],
      [
        3285,
        730
      ],
      [
        3285,
        800
      ],
      [
        3180,
        800
      ]
    ],
    "center": [
      3233,
      765
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-08",
    "plotNo": "CP-08",
    "title": "Riverfront Commercial Plot CP-08",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Featured",
    "price": 15000000,
    "priceFormatted": "৳ 1,50,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3300,
        710
      ],
      [
        3405,
        710
      ],
      [
        3405,
        780
      ],
      [
        3300,
        780
      ]
    ],
    "center": [
      3353,
      745
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-09",
    "plotNo": "CP-09",
    "title": "Riverfront Commercial Plot CP-09",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 15500000,
    "priceFormatted": "৳ 1,55,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3420,
        690
      ],
      [
        3525,
        690
      ],
      [
        3525,
        760
      ],
      [
        3420,
        760
      ]
    ],
    "center": [
      3473,
      725
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-10",
    "plotNo": "CP-10",
    "title": "Riverfront Commercial Plot CP-10",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 16000000,
    "priceFormatted": "৳ 1,60,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3260,
        620
      ],
      [
        3370,
        620
      ],
      [
        3370,
        685
      ],
      [
        3260,
        685
      ]
    ],
    "center": [
      3315,
      653
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-11",
    "plotNo": "CP-11",
    "title": "Riverfront Commercial Plot CP-11",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Reserved",
    "price": 16500000,
    "priceFormatted": "৳ 1,65,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3385,
        605
      ],
      [
        3495,
        605
      ],
      [
        3495,
        670
      ],
      [
        3385,
        670
      ]
    ],
    "center": [
      3440,
      638
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-12",
    "plotNo": "CP-12",
    "title": "Riverfront Commercial Plot CP-12",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 17000000,
    "priceFormatted": "৳ 1,70,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3510,
        590
      ],
      [
        3620,
        590
      ],
      [
        3620,
        655
      ],
      [
        3510,
        655
      ]
    ],
    "center": [
      3565,
      623
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-13",
    "plotNo": "CP-13",
    "title": "Riverfront Commercial Plot CP-13",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Featured",
    "price": 17500000,
    "priceFormatted": "৳ 1,75,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3340,
        535
      ],
      [
        3450,
        535
      ],
      [
        3450,
        600
      ],
      [
        3340,
        600
      ]
    ],
    "center": [
      3395,
      568
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-14",
    "plotNo": "CP-14",
    "title": "Riverfront Commercial Plot CP-14",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Sold",
    "price": 18000000,
    "priceFormatted": "৳ 1,80,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3465,
        520
      ],
      [
        3575,
        520
      ],
      [
        3575,
        585
      ],
      [
        3465,
        585
      ]
    ],
    "center": [
      3520,
      553
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "CP-15",
    "plotNo": "CP-15",
    "title": "Riverfront Commercial Plot CP-15",
    "sector": "Commercial Riverfront",
    "type": "Commercial Plot",
    "size": "10 Katha",
    "facing": "River Facing",
    "status": "Available",
    "price": 18500000,
    "priceFormatted": "৳ 1,85,00,000",
    "location": "Venice Riverfront Boulevard, MOHS Venice City",
    "roadWidth": "100ft Riverfront Boulevard",
    "points": [
      [
        3590,
        505
      ],
      [
        3700,
        505
      ],
      [
        3700,
        570
      ],
      [
        3590,
        570
      ]
    ],
    "center": [
      3645,
      538
    ],
    "description": "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  {
    "id": "F-101",
    "plotNo": "F-101",
    "title": "Venice Riverfront Tower A - 4B",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "2,450 Sq.Ft",
    "facing": "River Facing",
    "status": "Available",
    "price": 16500000,
    "priceFormatted": "৳ 1,65,00,000",
    "location": "Venice Riverfront Tower A - 4B, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        3650,
        550
      ],
      [
        3765,
        550
      ],
      [
        3765,
        650
      ],
      [
        3650,
        650
      ]
    ],
    "center": [
      3708,
      600
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  },
  {
    "id": "F-102",
    "plotNo": "F-102",
    "title": "Venice Riverfront Tower A - 8A",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "2,800 Sq.Ft",
    "facing": "River Facing",
    "status": "Featured",
    "price": 19500000,
    "priceFormatted": "৳ 1,95,00,000",
    "location": "Venice Riverfront Tower A - 8A, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        3780,
        535
      ],
      [
        3895,
        535
      ],
      [
        3895,
        635
      ],
      [
        3780,
        635
      ]
    ],
    "center": [
      3838,
      585
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  },
  {
    "id": "F-103",
    "plotNo": "F-103",
    "title": "Venice Blue Riverpark Tower 1",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "1,950 Sq.Ft",
    "facing": "River Facing",
    "status": "Reserved",
    "price": 13500000,
    "priceFormatted": "৳ 1,35,00,000",
    "location": "Venice Blue Riverpark Tower 1, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        3915,
        520
      ],
      [
        4030,
        520
      ],
      [
        4030,
        620
      ],
      [
        3915,
        620
      ]
    ],
    "center": [
      3973,
      570
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  },
  {
    "id": "F-104",
    "plotNo": "F-104",
    "title": "Venice Blue Riverpark Tower 2",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "2,150 Sq.Ft",
    "facing": "North",
    "status": "Available",
    "price": 14800000,
    "priceFormatted": "৳ 1,48,00,000",
    "location": "Venice Blue Riverpark Tower 2, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        4050,
        505
      ],
      [
        4165,
        505
      ],
      [
        4165,
        605
      ],
      [
        4050,
        605
      ]
    ],
    "center": [
      4108,
      555
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  },
  {
    "id": "F-105",
    "plotNo": "F-105",
    "title": "Airport Gateway Residency 5B",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "1,750 Sq.Ft",
    "facing": "East",
    "status": "Available",
    "price": 11800000,
    "priceFormatted": "৳ 1,18,00,000",
    "location": "Airport Gateway Residency 5B, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        4000,
        1150
      ],
      [
        4120,
        1150
      ],
      [
        4120,
        1240
      ],
      [
        4000,
        1240
      ]
    ],
    "center": [
      4060,
      1195
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  },
  {
    "id": "F-106",
    "plotNo": "F-106",
    "title": "Airport Gateway Residency 9C",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "2,200 Sq.Ft",
    "facing": "South",
    "status": "Featured",
    "price": 15200000,
    "priceFormatted": "৳ 1,52,00,000",
    "location": "Airport Gateway Residency 9C, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        4000,
        1260
      ],
      [
        4120,
        1260
      ],
      [
        4120,
        1350
      ],
      [
        4000,
        1350
      ]
    ],
    "center": [
      4060,
      1305
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  },
  {
    "id": "F-107",
    "plotNo": "F-107",
    "title": "Lakeview Heights Tower Alpha",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "2,300 Sq.Ft",
    "facing": "Lake Facing",
    "status": "Available",
    "price": 15800000,
    "priceFormatted": "৳ 1,58,00,000",
    "location": "Lakeview Heights Tower Alpha, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        1720,
        2020
      ],
      [
        1830,
        2020
      ],
      [
        1830,
        2105
      ],
      [
        1720,
        2105
      ]
    ],
    "center": [
      1775,
      2063
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  },
  {
    "id": "F-108",
    "plotNo": "F-108",
    "title": "Lakeview Heights Tower Beta",
    "sector": "Apartment Towers",
    "type": "Flat / Apartment",
    "size": "1,850 Sq.Ft",
    "facing": "Lake Facing",
    "status": "Sold",
    "price": 12600000,
    "priceFormatted": "৳ 1,26,00,000",
    "location": "Lakeview Heights Tower Beta, MOHS Venice City",
    "roadWidth": "100ft Waterfront Avenue",
    "points": [
      [
        1850,
        2020
      ],
      [
        1960,
        2020
      ],
      [
        1960,
        2105
      ],
      [
        1850,
        2105
      ]
    ],
    "center": [
      1905,
      2063
    ],
    "description": "Luxury condominium apartment with panoramic river/lake views, private parking, double-height lobby, and rooftop infinity pool."
  }
];

export const FACILITIES_DATASET: FacilityItem[] = [
  {
    "id": "FAC-01",
    "name": "Central Mosque & Eid-Gah Complex",
    "category": "Religious & Cultural",
    "icon": "Mosque",
    "x": 1320,
    "y": 1530,
    "radius": 70,
    "sector": "Sector 1 & 2 Center",
    "capacity": "5,000+ worshippers",
    "description": "Iconic architectural landmark featuring central dome, marble courtyards, landscaped Eid-Gah grounds, and dedicated women prayer hall."
  },
  {
    "id": "FAC-02",
    "name": "MOHS International University & Medical College",
    "category": "Education & Healthcare",
    "icon": "GraduationCap",
    "x": 1720,
    "y": 1860,
    "radius": 95,
    "sector": "Central Civic Zone",
    "capacity": "12.50 Bigha Campus",
    "description": "World-class multidisciplinary university campus and affiliated 500-bed teaching hospital serving residents of Uttara and Purbachal."
  },
  {
    "id": "FAC-03",
    "name": "Venice Garden Park",
    "category": "Green Park & Eco-Zone",
    "icon": "Trees",
    "x": 2540,
    "y": 770,
    "radius": 80,
    "sector": "Riverfront Corridor",
    "capacity": "4.68 Bigha Ecological Park",
    "description": "Lush green botanical sanctuary with jogging tracks, wooden gazebos, native flora, and open air amphitheater."
  },
  {
    "id": "FAC-04",
    "name": "Venice Harmony Park",
    "category": "Green Park & Playground",
    "icon": "Trees",
    "x": 2980,
    "y": 650,
    "radius": 80,
    "sector": "Riverfront Corridor",
    "capacity": "4.80 Bigha Family Park",
    "description": "Comprehensive family recreational park featuring children playground, cycling trail, sports courts, and lakeside cafeteria."
  },
  {
    "id": "FAC-05",
    "name": "Crystal River Park",
    "category": "Waterfront Recreation",
    "icon": "Waves",
    "x": 3380,
    "y": 480,
    "radius": 75,
    "sector": "Riverfront Corridor",
    "capacity": "4.01 Bigha River Park",
    "description": "Scenic waterfront leisure zone with gondola pier, illuminated river fountains, and promenade dining."
  },
  {
    "id": "FAC-06",
    "name": "Venice Blue Riverfront Promenade",
    "category": "Waterfront Promenade",
    "icon": "Ship",
    "x": 3820,
    "y": 450,
    "radius": 85,
    "sector": "North-East Waterfront",
    "capacity": "2.5 KM Riverwalk",
    "description": "Continuous pedestrian waterfront walkway with seating decks, decorative lighting, and river-cruise terminal."
  },
  {
    "id": "FAC-07",
    "name": "Primary & High School Complex",
    "category": "Education",
    "icon": "BookOpen",
    "x": 950,
    "y": 2020,
    "radius": 65,
    "sector": "Sector 1 West",
    "capacity": "Nursery to Grade 12",
    "description": "English medium institution with modern science labs, auditorium, athletics track, and safe pedestrian drop-off zones."
  },
  {
    "id": "FAC-08",
    "name": "Natural Lake & Marina Pier",
    "category": "Natural Water Body",
    "icon": "Waves",
    "x": 1850,
    "y": 2600,
    "radius": 110,
    "sector": "Central Waterway",
    "capacity": "40 Bigha Natural Lake",
    "description": "Preserved ecological water body providing natural cooling, rainwater harvesting, boating, and scenic waterfront living."
  },
  {
    "id": "FAC-09",
    "name": "Venice Town Center & Green Bazar",
    "category": "Retail & Commerce",
    "icon": "Store",
    "x": 3250,
    "y": 1350,
    "radius": 80,
    "sector": "Sector 4 Civic Hub",
    "capacity": "Multi-level Shopping Hub",
    "description": "Daily fresh bazaar, gourmet supermarket, banking booths, pharmacies, and rooftop community club."
  },
  {
    "id": "FAC-10",
    "name": "Police Station & Security Headquarters",
    "category": "Civic & Emergency",
    "icon": "Shield",
    "x": 2880,
    "y": 1650,
    "radius": 60,
    "sector": "Sector 3 & 4 Nexus",
    "capacity": "24/7 Rapid Response Unit",
    "description": "Dedicated law enforcement outpost with 24/7 CCTV surveillance room monitoring all entrance gates and sector roads."
  },
  {
    "id": "FAC-11",
    "name": "Central Water Treatment Plant",
    "category": "Utility Infrastructure",
    "icon": "Droplets",
    "x": 1180,
    "y": 2750,
    "radius": 70,
    "sector": "South Utility Zone",
    "capacity": "10 Million Liters/Day",
    "description": "State-of-the-art water purification facility providing 24/7 pressurized potable water to all township sectors."
  },
  {
    "id": "FAC-12",
    "name": "Gas Station & EV Charging Hub",
    "category": "Transport & Fuel",
    "icon": "Fuel",
    "x": 4250,
    "y": 1100,
    "radius": 65,
    "sector": "100ft Airport Highway",
    "capacity": "Multi-Fuel & Rapid EV Hub",
    "description": "Comprehensive fueling hub on the 100ft Airport Highway with convenience store and automated car wash."
  }
];
