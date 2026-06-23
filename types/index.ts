export type ServiceCategory = "accommodation" | "car" | "security" | "all";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "payment_successful"
  | "completed"
  | "cancelled";

export interface Vendor {
  id: string;
  name: string;
  verified: boolean;
  yearsOnPlatform: number;
  dateRegistered: string;
  availability: "typically_available" | "unavailable";
  phone?: string;
}

export interface Listing {
  id: string;
  type: ServiceCategory;
  title: string;
  images: string[];
  pricePerDay: number;
  location: string;
  vendor: Vendor;
  tags: string[];
  description: string;
  safetyTips?: string[];
  // Accommodation specific
  guests?: number;
  amenities?: string[];
  // Car specific
  color?: string;
  fuel?: string;
  transmission?: string;
  // Security specific
  serviceType?: string;
}

export interface BookingInfo {
  id: string;
  orderId: string;
  status: BookingStatus;
  createdDate: string;
  listing: Listing;
  location: string;
  startDate: string;
  endDate: string;
  pickupTime?: string;
  preference?: string;
  geography?: string;
  numberOfDays: number;
  totalBilling: number;
  checkInDate?: string;
  checkOutDate?: string;
  checkInTime?: string;
  numberOfGuests?: number;
  trackingProgress: TrackingStep[];
  countdown?: number; // seconds remaining
}

export interface TrackingStep {
  key: string;
  label: string;
  time?: string;
  completed: boolean;
}

export interface SearchFilters {
  category: ServiceCategory;
  query: string;
  type?: string;
  priceRange?: [number, number];
  location?: string;
}
