export type PropertyType = "PLOT" | "FLAT";
export type PropertyStatus = "AVAILABLE" | "SOLD" | "RESERVED" | "HIDDEN";

export interface PropertyFeature {
  id: string;
  propertyId: string;
  name: string;
  category: string;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  caption?: string | null;
  sortOrder: number;
}

export interface PropertyItem {
  id: string;
  title: string;
  slug: string;
  propertyType: "PLOT" | "FLAT" | string;
  status: "AVAILABLE" | "SOLD" | "RESERVED" | "HIDDEN" | string;
  location: string;
  address?: string | null;
  price: number;
  priceFormatted: string;
  description: string;
  overview?: string | null;
  isFeatured: boolean;
  isReady: boolean;
  isCorner: boolean;

  // Plot specific
  plotKatha?: number | null;
  plotRoadWidth?: string | null;
  facing?: string | null;
  landCategory?: string | null;
  sectorBlock?: string | null;

  // Flat specific
  flatSizeSqft?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  floorNumber?: string | null;
  parkingAvailable?: boolean | null;
  handoverStatus?: string | null;

  // Media
  featuredImage: string;
  layoutMapUrl?: string | null;
  locationMapUrl?: string | null;
  brochureUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;

  projectId?: string | null;
  project?: {
    id: string;
    title: string;
    slug: string;
  } | null;

  images?: PropertyImage[];
  features?: PropertyFeature[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  propertyId?: string | null;
  property?: {
    title: string;
    slug: string;
  } | null;
  propertyType?: string | null;
  preferredLocation?: string | null;
  budget?: string | null;
  message: string;
  status: "NEW" | "CONTACTED" | "RESOLVED" | string;
  createdAt: string | Date;
}

export interface SiteVisitItem {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  propertyId?: string | null;
  property?: {
    title: string;
    slug: string;
  } | null;
  preferredDate: string;
  preferredTime: string;
  message?: string | null;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | string;
  createdAt: string | Date;
}

export interface ReviewItem {
  id: string;
  name: string;
  roleOrLocation: string;
  rating: number;
  comment: string;
  avatarUrl?: string | null;
  propertyPurchased?: string | null;
  isApproved: boolean;
}

export interface GalleryItemType {
  id: string;
  title: string;
  category: "PROJECTS" | "PLOTS" | "FLATS" | "AMENITIES" | "LOCATION" | "CONSTRUCTION" | string;
  imageUrl: string;
  caption?: string | null;
  sortOrder: number;
}
