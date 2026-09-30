const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting MOHS Venice City Database Seeder...");

  // 1. Create or update Admin User
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mohs.com" },
    update: {
      passwordHash: adminPasswordHash,
      name: "MOHS Venice City Admin",
      role: "ADMIN",
    },
    create: {
      name: "MOHS Venice City Admin",
      email: "admin@mohs.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user ready: admin@mohs.com / admin123");

  // 2. Main Project
  const project = await prisma.project.upsert({
    where: { slug: "mohs-venice-city-uttara-purbachal" },
    update: {},
    create: {
      title: "MOHS Venice City Mega Township",
      slug: "mohs-venice-city-uttara-purbachal",
      tagline: "Eco-Friendly Waterfront Living along Uttara - Purbachal Extension",
      description:
        "MOHS Venice City is a premier planned satellite city strategically located at the intersection of Uttara and Purbachal. Designed with serene internal canals, vast green parks, 40-80 ft wide arterial avenues, and world-class civic infrastructure, it offers pristine residential plots and luxury apartments.",
      location: "Uttara - Purbachal Link Road, Dhaka",
      totalArea: "620+ Bighas Planned Greenery & Residential Sectors",
      heroImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      layoutMapUrl:
        "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
      locationMapUrl:
        "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80",
      brochureUrl: "#",
      isFeatured: true,
    },
  });

  // Clear existing properties and related tables for clean re-seeding
  await prisma.propertyFeature.deleteMany({});
  await prisma.propertyImage.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.galleryItem.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.siteVisit.deleteMany({});

  // 3. SEED PLOTS (Residential Plots ONLY)
  const plotsData = [
    {
      title: "5 Katha Prime Residential Ready Plot - Sector 3",
      slug: "5-katha-prime-residential-plot-sector-3",
      propertyType: "PLOT",
      status: "AVAILABLE",
      location: "Sector 3, MOHS Venice City",
      address: "Road 12, Sector 3, Uttara - Purbachal Corridor",
      price: 7500000,
      priceFormatted: "৳ 75,00,000",
      description:
        "Fully demarcated, solid high-land ready plot situated in Sector 3 of MOHS Venice City. Close proximity to central lake, wide 40ft connecting road, and immediate registration & mutation facilities.",
      overview:
        "An exceptional investment and residential living opportunity for building your dream family duplex or multi-story home. 100% dispute-free land with Rajuk approved master plan clearance.",
      isFeatured: true,
      isReady: true,
      isCorner: false,
      plotKatha: 5.0,
      plotRoadWidth: "40 Feet",
      facing: "South Facing",
      landCategory: "Residential",
      sectorBlock: "Sector 3, Block B",
      featuredImage:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "100% High Land (No filling required)",
        "40ft Wide Front Road",
        "Direct South Facing with great natural airflow",
        "Electricity, Water, and Fiber Internet ready",
        "Instant Handover with Immediate Mutation",
        "2 Minutes Walk to Venice Central Canal Walkway",
      ],
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "3 Katha Lake-Facing Ready Plot - Sector 1",
      slug: "3-katha-lake-facing-ready-plot-sector-1",
      propertyType: "PLOT",
      status: "AVAILABLE",
      location: "Sector 1, MOHS Venice City",
      address: "Lakeside Boulevard, Sector 1, MOHS Venice City",
      price: 5200000,
      priceFormatted: "৳ 52,00,000",
      description:
        "Scenic 3 Katha residential plot facing the main Venice canal and walking track. Peaceful neighborhood with rapid residential construction underway.",
      overview:
        "Perfect for families seeking peaceful waterfront living within 15 minutes of Hazrat Shahjalal International Airport and Uttara Sector 18.",
      isFeatured: true,
      isReady: true,
      isCorner: true,
      plotKatha: 3.0,
      plotRoadWidth: "50 Feet",
      facing: "North-East",
      landCategory: "Residential",
      sectorBlock: "Sector 1, Block A",
      featuredImage:
        "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "Direct Venice Lake View Frontage",
        "Corner Plot with Dual Road Access",
        "Clear Legal Title & CS/SA/RS/BS Khatiyan verified",
        "Ready Boundary Demarcation Pillars",
        "Underground Drainage System Installed",
      ],
      images: [
        "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "10 Katha Premium Corner Estate Plot - VIP Zone",
      slug: "10-katha-premium-corner-estate-plot-vip-zone",
      propertyType: "PLOT",
      status: "AVAILABLE",
      location: "VIP Zone, MOHS Venice City",
      address: "Avenue 1, VIP Sector, MOHS Venice City",
      price: 16500000,
      priceFormatted: "৳ 1,65,00,000",
      description:
        "Prestigious 10 Katha corner estate plot on an 80-foot grand boulevard. Ideal for bespoke luxury villa or twin-bungalow development.",
      overview:
        "The flagship residential plot offering in MOHS Venice City with maximum frontage, landscaped borders, and top-tier security surveillance.",
      isFeatured: true,
      isReady: true,
      isCorner: true,
      plotKatha: 10.0,
      plotRoadWidth: "80 Feet Grand Avenue",
      facing: "South-East Corner",
      landCategory: "Residential",
      sectorBlock: "VIP Zone, Block Exclusive",
      featuredImage:
        "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "Massive 80ft Grand Avenue Frontage",
        "VIP Sector with Underground Utilities",
        "Dual Entry/Exit Gate Suitability",
        "Immediate Registration and Namzari",
        "Close to Proposed International School & Club",
      ],
      images: [
        "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "7.5 Katha Waterfront Residential Plot - Sector 2",
      slug: "7-5-katha-waterfront-residential-plot-sector-2",
      propertyType: "PLOT",
      status: "RESERVED",
      location: "Sector 2, MOHS Venice City",
      address: "Venice Canal Road, Sector 2",
      price: 11500000,
      priceFormatted: "৳ 1,15,00,000",
      description:
        "Spacious 7.5 Katha waterfront plot with scenic water views, lush tree canopy, and direct road connectivity to 300ft Expressway.",
      overview:
        "A rare plot category offering generous front width and serene environmental surroundings.",
      isFeatured: false,
      isReady: true,
      isCorner: false,
      plotKatha: 7.5,
      plotRoadWidth: "50 Feet",
      facing: "South Facing",
      landCategory: "Residential",
      sectorBlock: "Sector 2, Block C",
      featuredImage:
        "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "Waterfront Panorama",
        "South Facing Breeze",
        "50ft Road Connection",
        "Bank Loan Support Available",
      ],
      images: [
        "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ];

  for (const plot of plotsData) {
    const { features, images, ...rest } = plot;
    const created = await prisma.property.create({
      data: {
        ...rest,
        features: {
          create: features.map((f) => ({ name: f, category: "SPEC" })),
        },
        images: {
          create: images.map((url, idx) => ({ url, sortOrder: idx })),
        },
      },
    });
    console.log(`  Added Plot: ${created.title}`);
  }

  // 4. SEED FLATS / APARTMENTS (Flats ONLY)
  const flatsData = [
    {
      title: "3 Bedroom Luxury Lake-View Flat - Venice Grand Tower 1",
      slug: "3-bedroom-luxury-lake-view-flat-venice-grand-tower-1",
      propertyType: "FLAT",
      status: "AVAILABLE",
      location: "Tower 1, Sector 2, MOHS Venice City",
      address: "Venice Grand Tower 1, Level 7, MOHS Venice City",
      price: 13500000,
      priceFormatted: "৳ 1,35,00,000",
      description:
        "Exquisitely crafted 1,650 sq ft 3-bedroom apartment with panoramic lake views from all three balconies. Features imported Spanish tiles, European sanitary fittings, and high-speed OTIS passenger lifts.",
      overview:
        "Experience modern luxury apartment living surrounded by natural breezes and canal waters. 24/7 power backup, grand reception lounge, rooftop garden, and dedicated basement car parking.",
      isFeatured: true,
      isReady: true,
      isCorner: true,
      flatSizeSqft: 1650,
      bedrooms: 3,
      bathrooms: 3,
      floorNumber: "7th Floor (Apartment 7B)",
      parkingAvailable: true,
      handoverStatus: "Ready for Handover",
      facing: "South-East",
      featuredImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "1,650 Sq Ft Spacious Floor Plan",
        "3 Large Bedrooms with 3 Attached Bathrooms",
        "3 Wide Balconies overlooking Venice Lake",
        "Dedicated Basement Covered Car Parking",
        "Full Generator Backup with 2 High-Speed Lifts",
        "Rooftop Community Hall & Infinity BBQ Lounge",
      ],
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "4 Bedroom Signature Penthouse Apartment - Venice Royal Heights",
      slug: "4-bedroom-signature-penthouse-venice-royal-heights",
      propertyType: "FLAT",
      status: "AVAILABLE",
      location: "Royal Heights, Sector 1, MOHS Venice City",
      address: "Top Floor Penthouse, Venice Royal Heights, Sector 1",
      price: 24000000,
      priceFormatted: "৳ 2,40,00,000",
      description:
        "Ultra-premium 2,450 sq ft duplex-style penthouse with double-height ceiling in the formal living room, 4 lavish master suites, open-air terrace garden, and private elevator access code.",
      overview:
        "Designed for the discerning buyer who appreciates architectural elegance, privacy, and expansive sky views across Uttara and the Purbachal skyline.",
      isFeatured: true,
      isReady: true,
      isCorner: true,
      flatSizeSqft: 2450,
      bedrooms: 4,
      bathrooms: 4,
      floorNumber: "12th & 13th Duplex Floor",
      parkingAvailable: true,
      handoverStatus: "Handover Ready",
      facing: "South Facing",
      featuredImage:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "2,450 Sq Ft Ultra-Luxury Penthouse",
        "Private 400 Sq Ft Sky Terrace",
        "Double Height Living Hall with Floor-to-Ceiling Glass",
        "2 Reserved Covered Car Parking Spaces",
        "Separate Servant Quarter with Washroom",
        "Smart Home Automation Pre-Wired",
      ],
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "3 Bedroom Modern Executive Apartment - Block A",
      slug: "3-bedroom-modern-executive-apartment-block-a",
      propertyType: "FLAT",
      status: "AVAILABLE",
      location: "Block A, MOHS Venice City",
      address: "Road 4, Block A, MOHS Venice City",
      price: 11000000,
      priceFormatted: "৳ 1,10,00,000",
      description:
        "Smartly designed 1,450 sq ft 3-bedroom apartment optimizing space, ventilation, and family functionality. High quality marble flooring and modern kitchen cabinets included.",
      overview:
        "A highly popular apartment layout with low maintenance cost, earthquake resistant structure, and family-friendly community amenities.",
      isFeatured: false,
      isReady: true,
      isCorner: false,
      flatSizeSqft: 1450,
      bedrooms: 3,
      bathrooms: 3,
      floorNumber: "5th Floor (Unit 5A)",
      parkingAvailable: true,
      handoverStatus: "Immediate Handover",
      facing: "East Facing",
      featuredImage:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "1,450 Sq Ft Efficient Layout",
        "3 Bed, 3 Bath, 2 Balconies",
        "Spacious Dining and Living Separation",
        "Modern Fire Fighting System",
        "24-Hour CCTV Surveillance",
      ],
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "2 Bedroom Smart Living Flat - Venice Green Residence",
      slug: "2-bedroom-smart-living-flat-venice-green-residence",
      propertyType: "FLAT",
      status: "AVAILABLE",
      location: "Sector 3, MOHS Venice City",
      address: "Venice Green Residence, Unit 3B",
      price: 7800000,
      priceFormatted: "৳ 78,00,000",
      description:
        "Cozy and contemporary 1,080 sq ft 2-bedroom flat ideal for young professionals and small families seeking peaceful living in an integrated township.",
      overview:
        "Affordable entry into premium gated community living with all municipal amenities and central playground access.",
      isFeatured: false,
      isReady: true,
      isCorner: false,
      flatSizeSqft: 1080,
      bedrooms: 2,
      bathrooms: 2,
      floorNumber: "3rd Floor",
      parkingAvailable: true,
      handoverStatus: "Ready to Move",
      facing: "North Facing",
      featuredImage:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      projectId: project.id,
      features: [
        "1,080 Sq Ft Compact Layout",
        "2 Bed, 2 Bath, 1 Verandah",
        "Covered Car Parking Option",
        "Solar Energy Backup for Common Areas",
      ],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ];

  for (const flat of flatsData) {
    const { features, images, ...rest } = flat;
    const created = await prisma.property.create({
      data: {
        ...rest,
        features: {
          create: features.map((f) => ({ name: f, category: "SPEC" })),
        },
        images: {
          create: images.map((url, idx) => ({ url, sortOrder: idx })),
        },
      },
    });
    console.log(`  Added Flat: ${created.title}`);
  }

  // 5. SEED GALLERY
  const galleryItems = [
    {
      title: "Venice Grand Lake Boulevard",
      category: "LOCATION",
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      caption: "Serene lakeside walking boulevard inside MOHS Venice City",
    },
    {
      title: "Planned Residential Plots Demarcation",
      category: "PLOTS",
      imageUrl: "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
      caption: "Demarcated 5 Katha and 3 Katha plots with 40ft wide roads",
    },
    {
      title: "Venice Royal Heights Apartment Tower",
      category: "FLATS",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      caption: "Architectural rendering of completed luxury apartment complex",
    },
    {
      title: "Internal Living Room Design - Model Flat",
      category: "FLATS",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      caption: "3-Bedroom show apartment living hall with natural daylight",
    },
    {
      title: "Township Masterplan & Sector Layout",
      category: "PROJECTS",
      imageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80",
      caption: "Full master layout map of MOHS Venice City township",
    },
    {
      title: "Central Green Park & Children Playground",
      category: "AMENITIES",
      imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80",
      caption: "Lush eco-park and outdoor recreational zone",
    },
    {
      title: "Wide Internal Avenue & Drainage Construction",
      category: "CONSTRUCTION",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",
      caption: "Paved 60ft arterial road and stormwater drainage system",
    },
    {
      title: "Lake Bridge & Waterfront Promenade",
      category: "LOCATION",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      caption: "Venice-themed waterway bridge connecting Sector 1 and 2",
    },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log(`✅ Seeded ${galleryItems.length} gallery items.`);

  // 6. SEED REVIEWS
  const reviewsData = [
    {
      name: "Engr. Tanvir Ahmed",
      roleOrLocation: "Plot Owner, Sector 3",
      rating: 5,
      comment:
        "Buying our 5 Katha residential plot in MOHS Venice City was completely transparent. The legal mutation and registration process went smoothly without any hassle. The location near Uttara 3rd phase is unbeatable.",
      propertyPurchased: "5 Katha South-Facing Plot",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Dr. Nusrat Jahan",
      roleOrLocation: "Apartment Buyer, Venice Tower 1",
      rating: 5,
      comment:
        "The lake-view balcony and tranquil atmosphere are exactly what my family looked for. Away from city chaos yet only 20 minutes from Uttara. High build quality and honest customer service.",
      propertyPurchased: "1,650 Sq Ft 3-Bed Apartment",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Kazi Farhan Chowdhury",
      roleOrLocation: "Resident, Sector 1",
      rating: 5,
      comment:
        "Unlike many real estate projects that make empty promises, MOHS Venice City has actual high ground, wide paved roads, and clear demarcation. We have already started our home construction.",
      propertyPurchased: "3 Katha Lake-Facing Plot",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  ];

  for (const rev of reviewsData) {
    await prisma.review.create({ data: rev });
  }
  console.log(`✅ Seeded ${reviewsData.length} client reviews.`);

  // 7. SEED INITIAL SAMPLE ENQUIRIES & SITE VISITS
  await prisma.enquiry.create({
    data: {
      name: "Mahfuzur Rahman",
      phone: "+880 1819-234567",
      email: "mahfuz.rahman@gmail.com",
      propertyType: "PLOT",
      preferredLocation: "Sector 3, Uttara - Purbachal",
      budget: "৳ 70 Lakh - 80 Lakh",
      message: "Interested in visiting the 5 Katha south-facing plot this Friday with my family.",
      status: "NEW",
    },
  });

  await prisma.siteVisit.create({
    data: {
      name: "Farzana Yasmin",
      phone: "+880 1712-345678",
      email: "farzana.y@outlook.com",
      preferredDate: "2026-10-05",
      preferredTime: "Morning (10:00 AM - 12:00 PM)",
      message: "Would like to see 3-bedroom ready flats in Venice Grand Tower 1.",
      status: "CONFIRMED",
    },
  });

  console.log("✅ Seeded sample enquiries and site visit requests.");
  console.log("🚀 MOHS Venice City Database seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
