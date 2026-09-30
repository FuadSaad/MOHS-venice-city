// MOHS Venice City Interactive Masterplan Dataset
// Masterplan coordinate dimensions: 5100 x 3300 (Aspect Ratio: 1.54545)
// STRICT COMPLIANCE: Every plot is an authentic angled SVG <polygon> mapped to the original map lines.

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
    "id": "P-111",
    "plotNo": "P-111",
    "mapPlotNum": "Plot 1",
    "title": "Venice Elegant Plot 1 (P-111)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3600000,
    "location": "Sector 4, Road-6, MOHS Venice City",
    "roadWidth": "30ft Wide Road-6",
    "points": [
      [
        3605,
        1455
      ],
      [
        3642,
        1447
      ],
      [
        3650,
        1417
      ],
      [
        3613,
        1425
      ]
    ],
    "description": "South-facing 4 Katha plot at the entrance of Venice Elegant block, adjacent to 50ft Road-6A.",
    "center": [
      3628,
      1436
    ],
    "priceFormatted": "৳ 36,00,000"
  },
  {
    "id": "P-104",
    "plotNo": "P-104",
    "mapPlotNum": "Plot 3",
    "title": "Venice Elegant Plot 3 (P-104)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 3700000,
    "location": "Sector 4, Road-6, MOHS Venice City",
    "roadWidth": "30ft Wide Road-6",
    "points": [
      [
        3613,
        1425
      ],
      [
        3650,
        1417
      ],
      [
        3658,
        1387
      ],
      [
        3621,
        1395
      ]
    ],
    "description": "Prime residential plot facing 30ft Road-6 with easy access to neighborhood park.",
    "center": [
      3636,
      1406
    ],
    "priceFormatted": "৳ 37,00,000"
  },
  {
    "id": "P-102",
    "plotNo": "P-102",
    "mapPlotNum": "Plot 5",
    "title": "Venice Elegant Plot 5 (P-102)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 3800000,
    "location": "Sector 4, Road-6, MOHS Venice City",
    "roadWidth": "30ft Wide Road-6",
    "points": [
      [
        3621,
        1395
      ],
      [
        3658,
        1387
      ],
      [
        3666,
        1357
      ],
      [
        3629,
        1365
      ]
    ],
    "description": "Central 4 Katha plot on the Venice Elegant boulevard, 100% mutation ready.",
    "center": [
      3644,
      1376
    ],
    "priceFormatted": "৳ 38,00,000"
  },
  {
    "id": "P-095",
    "plotNo": "P-095",
    "mapPlotNum": "Plot 7",
    "title": "Venice Elegant Plot 7 (P-095)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Featured",
    "price": 3900000,
    "location": "Sector 4, Road-6, MOHS Venice City",
    "roadWidth": "30ft Wide Road-6",
    "points": [
      [
        3629,
        1365
      ],
      [
        3666,
        1357
      ],
      [
        3674,
        1327
      ],
      [
        3637,
        1335
      ]
    ],
    "description": "Featured plot with direct frontage along 30ft Road-6.",
    "center": [
      3652,
      1346
    ],
    "priceFormatted": "৳ 39,00,000"
  },
  {
    "id": "P-093",
    "plotNo": "P-093",
    "mapPlotNum": "Plot 9",
    "title": "Venice Elegant Plot 9 (P-093)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4000000,
    "location": "Sector 4, Road-6, MOHS Venice City",
    "roadWidth": "30ft Wide Road-6",
    "points": [
      [
        3637,
        1335
      ],
      [
        3674,
        1327
      ],
      [
        3682,
        1297
      ],
      [
        3645,
        1305
      ]
    ],
    "description": "High-demand 4 Katha residential plot in Venice Elegant block with immediate building clearance.",
    "center": [
      3660,
      1316
    ],
    "priceFormatted": "৳ 40,00,000"
  },
  {
    "id": "P-091",
    "plotNo": "P-091",
    "mapPlotNum": "Plot 11",
    "title": "Venice Elegant Plot 11 (P-091)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 4100000,
    "location": "Sector 4, Road-6, MOHS Venice City",
    "roadWidth": "30ft Wide Road-6",
    "points": [
      [
        3645,
        1305
      ],
      [
        3682,
        1297
      ],
      [
        3690,
        1267
      ],
      [
        3653,
        1275
      ]
    ],
    "description": "Verified residential plot in quiet sector cul-de-sac.",
    "center": [
      3668,
      1286
    ],
    "priceFormatted": "৳ 41,00,000"
  },
  {
    "id": "P-089",
    "plotNo": "P-089",
    "mapPlotNum": "Plot 13",
    "title": "Venice Elegant Plot 13 (P-089)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4200000,
    "location": "Sector 4, Road-6, MOHS Venice City",
    "roadWidth": "30ft Wide Road-6",
    "points": [
      [
        3653,
        1275
      ],
      [
        3690,
        1267
      ],
      [
        3698,
        1237
      ],
      [
        3661,
        1245
      ]
    ],
    "description": "Northern end plot in Venice Elegant block.",
    "center": [
      3676,
      1256
    ],
    "priceFormatted": "৳ 42,00,000"
  },
  {
    "id": "P-112",
    "plotNo": "P-112",
    "mapPlotNum": "Plot 1",
    "title": "Sector 4 Block B Plot 1 (P-112)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Reserved",
    "price": 3750000,
    "location": "Sector 4, Road-4, MOHS Venice City",
    "roadWidth": "30ft Wide Road-4",
    "points": [
      [
        3754,
        1432
      ],
      [
        3794,
        1423
      ],
      [
        3803,
        1393
      ],
      [
        3763,
        1402
      ]
    ],
    "description": "Waterfront adjacent plot next to 6.83 Katha green reservation and Fishing Point.",
    "center": [
      3779,
      1413
    ],
    "priceFormatted": "৳ 37,50,000"
  },
  {
    "id": "P-105",
    "plotNo": "P-105",
    "mapPlotNum": "Plot 3",
    "title": "Sector 4 Block B Plot 3 (P-105)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Available",
    "price": 3850000,
    "location": "Sector 4, Road-4, MOHS Venice City",
    "roadWidth": "30ft Wide Road-4",
    "points": [
      [
        3763,
        1402
      ],
      [
        3803,
        1393
      ],
      [
        3812,
        1363
      ],
      [
        3772,
        1372
      ]
    ],
    "description": "Standard 4 Katha residential parcel facing 30ft Road-4.",
    "center": [
      3788,
      1383
    ],
    "priceFormatted": "৳ 38,50,000"
  },
  {
    "id": "P-103",
    "plotNo": "P-103",
    "mapPlotNum": "Plot 5",
    "title": "Sector 4 Block B Plot 5 (P-103)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Available",
    "price": 3950000,
    "location": "Sector 4, Road-4, MOHS Venice City",
    "roadWidth": "30ft Wide Road-4",
    "points": [
      [
        3772,
        1372
      ],
      [
        3812,
        1363
      ],
      [
        3821,
        1333
      ],
      [
        3781,
        1342
      ]
    ],
    "description": "East-facing 4 Katha plot with excellent morning daylight and road connectivity.",
    "center": [
      3797,
      1353
    ],
    "priceFormatted": "৳ 39,50,000"
  },
  {
    "id": "P-096",
    "plotNo": "P-096",
    "mapPlotNum": "Plot 7",
    "title": "Sector 4 Block B Plot 7 (P-096)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Sold",
    "price": 4050000,
    "location": "Sector 4, Road-4, MOHS Venice City",
    "roadWidth": "30ft Wide Road-4",
    "points": [
      [
        3781,
        1342
      ],
      [
        3821,
        1333
      ],
      [
        3830,
        1303
      ],
      [
        3790,
        1312
      ]
    ],
    "description": "Sold plot on Sector 4 Avenue.",
    "center": [
      3806,
      1323
    ],
    "priceFormatted": "৳ 40,50,000"
  },
  {
    "id": "P-094",
    "plotNo": "P-094",
    "mapPlotNum": "Plot 9",
    "title": "Sector 4 Block B Plot 9 (P-094)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Available",
    "price": 4150000,
    "location": "Sector 4, Road-4, MOHS Venice City",
    "roadWidth": "30ft Wide Road-4",
    "points": [
      [
        3790,
        1312
      ],
      [
        3830,
        1303
      ],
      [
        3839,
        1273
      ],
      [
        3799,
        1282
      ]
    ],
    "description": "Premium East-facing plot located in Sector 4 Block B, mutation complete.",
    "center": [
      3815,
      1293
    ],
    "priceFormatted": "৳ 41,50,000"
  },
  {
    "id": "P-092",
    "plotNo": "P-092",
    "mapPlotNum": "Plot 11",
    "title": "Sector 4 Block B Plot 11 (P-092)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "East",
    "status": "Featured",
    "price": 4250000,
    "location": "Sector 4, Road-4, MOHS Venice City",
    "roadWidth": "30ft Wide Road-4",
    "points": [
      [
        3799,
        1282
      ],
      [
        3839,
        1273
      ],
      [
        3848,
        1243
      ],
      [
        3808,
        1252
      ]
    ],
    "description": "Featured corner-adjacent plot on Road-4.",
    "center": [
      3824,
      1263
    ],
    "priceFormatted": "৳ 42,50,000"
  },
  {
    "id": "P-110",
    "plotNo": "P-110",
    "mapPlotNum": "Plot 2",
    "title": "Venice Elegant Plot 2 (P-110)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3650000,
    "priceFormatted": "৳ 36,50,000",
    "location": "Sector 4, Road-7, MOHS Venice City",
    "roadWidth": "30ft Wide Road-7",
    "points": [
      [
        3568,
        1463
      ],
      [
        3605,
        1455
      ],
      [
        3613,
        1425
      ],
      [
        3576,
        1433
      ]
    ],
    "center": [
      3591,
      1444
    ],
    "description": "Residential plot on Road-7 within the Venice Elegant sector."
  },
  {
    "id": "P-101",
    "plotNo": "P-101",
    "mapPlotNum": "Plot 4",
    "title": "Venice Elegant Plot 4 (P-101)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Reserved",
    "price": 3750000,
    "priceFormatted": "৳ 37,50,000",
    "location": "Sector 4, Road-7, MOHS Venice City",
    "roadWidth": "30ft Wide Road-7",
    "points": [
      [
        3576,
        1433
      ],
      [
        3613,
        1425
      ],
      [
        3621,
        1395
      ],
      [
        3584,
        1403
      ]
    ],
    "center": [
      3599,
      1414
    ],
    "description": "Residential plot on Road-7 within the Venice Elegant sector."
  },
  {
    "id": "P-099",
    "plotNo": "P-099",
    "mapPlotNum": "Plot 6",
    "title": "Venice Elegant Plot 6 (P-099)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 3850000,
    "priceFormatted": "৳ 38,50,000",
    "location": "Sector 4, Road-7, MOHS Venice City",
    "roadWidth": "30ft Wide Road-7",
    "points": [
      [
        3583,
        1403
      ],
      [
        3620,
        1395
      ],
      [
        3628,
        1365
      ],
      [
        3591,
        1373
      ]
    ],
    "center": [
      3606,
      1384
    ],
    "description": "Residential plot on Road-7 within the Venice Elegant sector."
  },
  {
    "id": "P-097",
    "plotNo": "P-097",
    "mapPlotNum": "Plot 8",
    "title": "Venice Elegant Plot 8 (P-097)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Sold",
    "price": 3950000,
    "priceFormatted": "৳ 39,50,000",
    "location": "Sector 4, Road-7, MOHS Venice City",
    "roadWidth": "30ft Wide Road-7",
    "points": [
      [
        3591,
        1373
      ],
      [
        3628,
        1365
      ],
      [
        3636,
        1335
      ],
      [
        3599,
        1343
      ]
    ],
    "center": [
      3614,
      1354
    ],
    "description": "Residential plot on Road-7 within the Venice Elegant sector."
  },
  {
    "id": "P-090",
    "plotNo": "P-090",
    "mapPlotNum": "Plot 10",
    "title": "Venice Elegant Plot 10 (P-090)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Available",
    "price": 4050000,
    "priceFormatted": "৳ 40,50,000",
    "location": "Sector 4, Road-7, MOHS Venice City",
    "roadWidth": "30ft Wide Road-7",
    "points": [
      [
        3598,
        1343
      ],
      [
        3635,
        1335
      ],
      [
        3643,
        1305
      ],
      [
        3606,
        1313
      ]
    ],
    "center": [
      3621,
      1324
    ],
    "description": "Residential plot on Road-7 within the Venice Elegant sector."
  },
  {
    "id": "P-088",
    "plotNo": "P-088",
    "mapPlotNum": "Plot 12",
    "title": "Venice Elegant Plot 12 (P-088)",
    "sector": "Sector 4 (Venice Elegant)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "North",
    "status": "Featured",
    "price": 4150000,
    "priceFormatted": "৳ 41,50,000",
    "location": "Sector 4, Road-7, MOHS Venice City",
    "roadWidth": "30ft Wide Road-7",
    "points": [
      [
        3606,
        1313
      ],
      [
        3643,
        1305
      ],
      [
        3651,
        1275
      ],
      [
        3614,
        1283
      ]
    ],
    "center": [
      3629,
      1294
    ],
    "description": "Residential plot on Road-7 within the Venice Elegant sector."
  },
  {
    "id": "P-109",
    "plotNo": "P-109",
    "mapPlotNum": "Plot 2",
    "title": "Sector 4 Block B Plot 2 (P-109)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "West",
    "status": "Available",
    "price": 3700000,
    "priceFormatted": "৳ 37,00,000",
    "location": "Sector 4, Road-5, MOHS Venice City",
    "roadWidth": "30ft Wide Road-5",
    "points": [
      [
        3714,
        1441
      ],
      [
        3754,
        1432
      ],
      [
        3763,
        1402
      ],
      [
        3723,
        1411
      ]
    ],
    "center": [
      3739,
      1422
    ],
    "description": "West-facing plot directly bordering 30ft Road-5 and Venice Lake canal."
  },
  {
    "id": "P-100",
    "plotNo": "P-100",
    "mapPlotNum": "Plot 4",
    "title": "Sector 4 Block B Plot 4 (P-100)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "West",
    "status": "Reserved",
    "price": 3800000,
    "priceFormatted": "৳ 38,00,000",
    "location": "Sector 4, Road-5, MOHS Venice City",
    "roadWidth": "30ft Wide Road-5",
    "points": [
      [
        3722,
        1411
      ],
      [
        3762,
        1402
      ],
      [
        3771,
        1372
      ],
      [
        3731,
        1381
      ]
    ],
    "center": [
      3747,
      1392
    ],
    "description": "West-facing plot directly bordering 30ft Road-5 and Venice Lake canal."
  },
  {
    "id": "P-098",
    "plotNo": "P-098",
    "mapPlotNum": "Plot 6",
    "title": "Sector 4 Block B Plot 6 (P-098)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "West",
    "status": "Available",
    "price": 3900000,
    "priceFormatted": "৳ 39,00,000",
    "location": "Sector 4, Road-5, MOHS Venice City",
    "roadWidth": "30ft Wide Road-5",
    "points": [
      [
        3731,
        1381
      ],
      [
        3771,
        1372
      ],
      [
        3780,
        1342
      ],
      [
        3740,
        1351
      ]
    ],
    "center": [
      3756,
      1362
    ],
    "description": "West-facing plot directly bordering 30ft Road-5 and Venice Lake canal."
  },
  {
    "id": "P-087",
    "plotNo": "P-087",
    "mapPlotNum": "Plot 8",
    "title": "Sector 4 Block B Plot 8 (P-087)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "West",
    "status": "Sold",
    "price": 4000000,
    "priceFormatted": "৳ 40,00,000",
    "location": "Sector 4, Road-5, MOHS Venice City",
    "roadWidth": "30ft Wide Road-5",
    "points": [
      [
        3739,
        1351
      ],
      [
        3779,
        1342
      ],
      [
        3788,
        1312
      ],
      [
        3748,
        1321
      ]
    ],
    "center": [
      3764,
      1332
    ],
    "description": "West-facing plot directly bordering 30ft Road-5 and Venice Lake canal."
  },
  {
    "id": "P-086",
    "plotNo": "P-086",
    "mapPlotNum": "Plot 10",
    "title": "Sector 4 Block B Plot 10 (P-086)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "West",
    "status": "Featured",
    "price": 4100000,
    "priceFormatted": "৳ 41,00,000",
    "location": "Sector 4, Road-5, MOHS Venice City",
    "roadWidth": "30ft Wide Road-5",
    "points": [
      [
        3747,
        1321
      ],
      [
        3787,
        1312
      ],
      [
        3796,
        1282
      ],
      [
        3756,
        1291
      ]
    ],
    "center": [
      3772,
      1302
    ],
    "description": "West-facing plot directly bordering 30ft Road-5 and Venice Lake canal."
  },
  {
    "id": "P-085",
    "plotNo": "P-085",
    "mapPlotNum": "Plot 12",
    "title": "Sector 4 Block B Plot 12 (P-085)",
    "sector": "Sector 4 (Lakeview Block)",
    "type": "Residential Plot",
    "size": "4 Katha",
    "facing": "West",
    "status": "Available",
    "price": 4200000,
    "priceFormatted": "৳ 42,00,000",
    "location": "Sector 4, Road-5, MOHS Venice City",
    "roadWidth": "30ft Wide Road-5",
    "points": [
      [
        3755,
        1291
      ],
      [
        3795,
        1282
      ],
      [
        3804,
        1252
      ],
      [
        3764,
        1261
      ]
    ],
    "center": [
      3780,
      1272
    ],
    "description": "West-facing plot directly bordering 30ft Road-5 and Venice Lake canal."
  },
  {
    "id": "P-071",
    "plotNo": "P-071",
    "mapPlotNum": "Plot 1",
    "title": "5 Katha Prime Plot 1 (P-071)",
    "sector": "Sector 4 (Commercial Walkway)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 4700000,
    "priceFormatted": "৳ 47,00,000",
    "location": "Sector 4, Road-2A, MOHS Venice City",
    "roadWidth": "30ft Wide Road-2A",
    "points": [
      [
        3916,
        1420
      ],
      [
        3966,
        1408
      ],
      [
        3976,
        1373
      ],
      [
        3926,
        1385
      ]
    ],
    "center": [
      3946,
      1397
    ],
    "description": "Spacious 5 Katha plot adjacent to Venice Super Shop and Venice Business Avenue."
  },
  {
    "id": "P-072",
    "plotNo": "P-072",
    "mapPlotNum": "Plot 3",
    "title": "5 Katha Prime Plot 3 (P-072)",
    "sector": "Sector 4 (Commercial Walkway)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Featured",
    "price": 4800000,
    "priceFormatted": "৳ 48,00,000",
    "location": "Sector 4, Road-2A, MOHS Venice City",
    "roadWidth": "30ft Wide Road-2A",
    "points": [
      [
        3926,
        1385
      ],
      [
        3976,
        1373
      ],
      [
        3986,
        1338
      ],
      [
        3936,
        1350
      ]
    ],
    "center": [
      3956,
      1362
    ],
    "description": "Spacious 5 Katha plot adjacent to Venice Super Shop and Venice Business Avenue."
  },
  {
    "id": "P-073",
    "plotNo": "P-073",
    "mapPlotNum": "Plot 5",
    "title": "5 Katha Prime Plot 5 (P-073)",
    "sector": "Sector 4 (Commercial Walkway)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Reserved",
    "price": 4900000,
    "priceFormatted": "৳ 49,00,000",
    "location": "Sector 4, Road-2A, MOHS Venice City",
    "roadWidth": "30ft Wide Road-2A",
    "points": [
      [
        3935,
        1350
      ],
      [
        3985,
        1338
      ],
      [
        3995,
        1303
      ],
      [
        3945,
        1315
      ]
    ],
    "center": [
      3965,
      1327
    ],
    "description": "Spacious 5 Katha plot adjacent to Venice Super Shop and Venice Business Avenue."
  },
  {
    "id": "P-074",
    "plotNo": "P-074",
    "mapPlotNum": "Plot 7",
    "title": "5 Katha Prime Plot 7 (P-074)",
    "sector": "Sector 4 (Commercial Walkway)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 5000000,
    "priceFormatted": "৳ 50,00,000",
    "location": "Sector 4, Road-2A, MOHS Venice City",
    "roadWidth": "30ft Wide Road-2A",
    "points": [
      [
        3945,
        1315
      ],
      [
        3995,
        1303
      ],
      [
        4005,
        1268
      ],
      [
        3955,
        1280
      ]
    ],
    "center": [
      3975,
      1292
    ],
    "description": "Spacious 5 Katha plot adjacent to Venice Super Shop and Venice Business Avenue."
  },
  {
    "id": "P-075",
    "plotNo": "P-075",
    "mapPlotNum": "Plot 9",
    "title": "5 Katha Prime Plot 9 (P-075)",
    "sector": "Sector 4 (Commercial Walkway)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Available",
    "price": 5100000,
    "priceFormatted": "৳ 51,00,000",
    "location": "Sector 4, Road-2A, MOHS Venice City",
    "roadWidth": "30ft Wide Road-2A",
    "points": [
      [
        3955,
        1280
      ],
      [
        4005,
        1268
      ],
      [
        4015,
        1233
      ],
      [
        3965,
        1245
      ]
    ],
    "center": [
      3985,
      1257
    ],
    "description": "Spacious 5 Katha plot adjacent to Venice Super Shop and Venice Business Avenue."
  },
  {
    "id": "P-076",
    "plotNo": "P-076",
    "mapPlotNum": "Plot 11",
    "title": "5 Katha Prime Plot 11 (P-076)",
    "sector": "Sector 4 (Commercial Walkway)",
    "type": "Residential Plot",
    "size": "5 Katha",
    "facing": "South",
    "status": "Sold",
    "price": 5200000,
    "priceFormatted": "৳ 52,00,000",
    "location": "Sector 4, Road-2A, MOHS Venice City",
    "roadWidth": "30ft Wide Road-2A",
    "points": [
      [
        3964,
        1245
      ],
      [
        4014,
        1233
      ],
      [
        4024,
        1198
      ],
      [
        3974,
        1210
      ]
    ],
    "center": [
      3994,
      1222
    ],
    "description": "Spacious 5 Katha plot adjacent to Venice Super Shop and Venice Business Avenue."
  },
  {
    "id": "CP-01",
    "plotNo": "CP-01",
    "mapPlotNum": "CP-01",
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
        828
      ],
      [
        2565,
        898
      ],
      [
        2460,
        910
      ]
    ],
    "center": [
      2513,
      869
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
  },
  {
    "id": "CP-02",
    "plotNo": "CP-02",
    "mapPlotNum": "CP-02",
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
        818
      ],
      [
        2685,
        888
      ],
      [
        2580,
        900
      ]
    ],
    "center": [
      2633,
      859
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
  },
  {
    "id": "CP-03",
    "plotNo": "CP-03",
    "mapPlotNum": "CP-03",
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
        798
      ],
      [
        2805,
        868
      ],
      [
        2700,
        880
      ]
    ],
    "center": [
      2753,
      839
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
  },
  {
    "id": "CP-04",
    "plotNo": "CP-04",
    "mapPlotNum": "CP-04",
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
        778
      ],
      [
        2925,
        848
      ],
      [
        2820,
        860
      ]
    ],
    "center": [
      2873,
      819
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
  },
  {
    "id": "CP-05",
    "plotNo": "CP-05",
    "mapPlotNum": "CP-05",
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
        758
      ],
      [
        3045,
        828
      ],
      [
        2940,
        840
      ]
    ],
    "center": [
      2993,
      799
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
  },
  {
    "id": "CP-06",
    "plotNo": "CP-06",
    "mapPlotNum": "CP-06",
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
        738
      ],
      [
        3165,
        808
      ],
      [
        3060,
        820
      ]
    ],
    "center": [
      3113,
      779
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
  },
  {
    "id": "CP-07",
    "plotNo": "CP-07",
    "mapPlotNum": "CP-07",
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
        718
      ],
      [
        3285,
        788
      ],
      [
        3180,
        800
      ]
    ],
    "center": [
      3233,
      759
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
  },
  {
    "id": "CP-08",
    "plotNo": "CP-08",
    "mapPlotNum": "CP-08",
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
        698
      ],
      [
        3405,
        768
      ],
      [
        3300,
        780
      ]
    ],
    "center": [
      3353,
      739
    ],
    "description": "High-visibility commercial plot along the northern Balu River boulevard."
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
    "description": "Iconic architectural landmark featuring central dome, marble courtyards, landscaped Eid-Gah grounds, and dedicated prayer halls."
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
    "description": "World-class multidisciplinary university campus and affiliated 500-bed teaching hospital."
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
    "description": "Lush green botanical sanctuary with jogging tracks, wooden gazebos, and native flora."
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
    "description": "Comprehensive family recreational park featuring children playground and cycling trail."
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
    "description": "Scenic waterfront leisure zone with gondola pier and illuminated fountains."
  },
  {
    "id": "FAC-06",
    "name": "Natural Lake & Fishing Pier",
    "category": "Natural Water Body",
    "icon": "Waves",
    "x": 3850,
    "y": 1550,
    "radius": 90,
    "sector": "Central Waterway",
    "capacity": "40 Bigha Natural Lake",
    "description": "Directly bordering Sector 4 with public promenade and recreational fishing jetty."
  },
  {
    "id": "FAC-07",
    "name": "Venice Super Shop & Trade Plaza",
    "category": "Retail & Commerce",
    "icon": "Store",
    "x": 3980,
    "y": 1420,
    "radius": 65,
    "sector": "Sector 4 Commercial Plaza",
    "capacity": "10.04 Katha Multi-level Plaza",
    "description": "Daily fresh grocery bazaar, pharmacy, banking booths, and family dining."
  }
];
