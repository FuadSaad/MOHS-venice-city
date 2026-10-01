export type MapPolygon = {
  id: string;
  plotId: string;
  points: string; // e.g., "10.5,20.1 15.2,25.6 12.1,30.0" in percentages or pixels
  status: "AVAILABLE" | "SOLD" | "BOOKED";
  size?: string;
  price?: string;
  type?: string;
};

// Initial empty data. The admin will trace and populate this.
export const initialPolygons: MapPolygon[] = [
  // Example data format (we use percentage-based coordinates so it scales on all devices)
  // {
  //   id: "1",
  //   plotId: "CP-04",
  //   points: "45.2,60.1 48.5,60.1 48.5,65.3 45.2,65.3", 
  //   status: "AVAILABLE",
  //   size: "10 Katha",
  //   price: "৳ 1,30,00,000",
  //   type: "Residential"
  // }
];
