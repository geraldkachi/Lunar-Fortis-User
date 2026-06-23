"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  initials: string;
}

export interface CartItem {
  id: string;
  listingId: string;
  title: string;
  image: string;
  pricePerDay: number;
  type: "accommodation" | "car" | "security";
  location: string;
  guests?: number;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  startDate?: string;
  endDate?: string;
  days?: number;
  preference?: string;
  geography?: string;
  pickupTime?: string;
}

export type BookingStatus =
  | "pending"       // just booked, waiting for vendor approval
  | "approved"      // vendor accepted — user can now pay
  | "payment_pending" // user clicked pay, processing
  | "active"        // fully paid and confirmed
  | "completed"     // service has been rendered
  | "cancelled"     // user cancelled
  | "declined";     // vendor declined

export interface TrackingStep {
  key: string;
  label: string;
  time: string;
  completed: boolean;
  failed?: boolean;
}

export interface Booking {
  id: string;
  orderId: string;
  listingId: string;
  title: string;
  image: string;
  type: "accommodation" | "car" | "security";
  location: string;
  pricePerDay: number;
  totalBilling: number;
  bookedAt: string;
  paidAt?: string;
  status: BookingStatus;
  // Accommodation
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  amenities?: string;
  // Car
  startDate?: string;
  endDate?: string;
  days?: number;
  preference?: string;
  geography?: string;
  pickupTime?: string;
  // Progress
  trackingProgress: TrackingStep[];
  countdown?: number; // seconds
}

interface AuthContextType {
  user: User | null;
  cart: CartItem[];
  bookings: Booking[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  placeBooking: (itemId: string) => Booking;
  cancelBooking: (bookingId: string) => void;
  payBooking: (bookingId: string) => Promise<Booking>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  id: "user-1",
  email: "user@example.com",
  name: "Adewale Afolabi",
  initials: "AA",
};

function makePendingSteps(): TrackingStep[] {
  const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return [
    { key: "initiated",  label: "Booking Initiated",          time: `Jan 19, ${now}`, completed: true },
    { key: "received",   label: "Booking Received by Vendor", time: `Jan 19, ${now}`, completed: true },
    { key: "accepted",   label: "Booking Accepted",           time: "",               completed: false },
    { key: "payment",    label: "Payment Successful",         time: "",               completed: false },
    { key: "success",    label: "Booking Successful",         time: "",               completed: false },
  ];
}

function makeApprovedSteps(): TrackingStep[] {
  const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return [
    { key: "initiated",  label: "Booking Initiated",          time: `Jan 19, 9:11 AM`, completed: true },
    { key: "received",   label: "Booking Received by Vendor", time: `Jan 19, 9:11 AM`, completed: true },
    { key: "accepted",   label: "Booking Accepted",           time: `Jan 19, 9:11 AM`, completed: true },
    { key: "payment",    label: "Payment Successful",         time: "",               completed: false },
    { key: "success",    label: "Booking Successful",         time: "",               completed: false },
  ];
}

function makeCompletedSteps(): TrackingStep[] {
  return [
    { key: "initiated",  label: "Booking Initiated",          time: "Jan 19, 9:11 AM", completed: true },
    { key: "received",   label: "Booking Received by Vendor", time: "Jan 19, 9:11 AM", completed: true },
    { key: "accepted",   label: "Booking Accepted",           time: "Jan 19, 9:11 AM", completed: true },
    { key: "payment",    label: "Payment Successful",         time: "Jan 19, 9:15 AM", completed: true },
    { key: "success",    label: "Booking Successful",         time: "Jan 19, 9:20 AM", completed: true },
  ];
}

function makeCancelledSteps(): TrackingStep[] {
  return [
    { key: "initiated",  label: "Booking Initiated",  time: "Jan 19, 9:11 AM", completed: true },
    { key: "cancelled",  label: "Booking Canceled",   time: "Jan 19, 9:11 AM", completed: true, failed: true },
  ];
}

function makeDeclinedSteps(): TrackingStep[] {
  return [
    { key: "initiated",  label: "Booking Initiated",          time: "Jan 19, 9:11 AM", completed: true },
    { key: "received",   label: "Booking Received by Vendor", time: "Jan 19, 9:11 AM", completed: true },
    { key: "declined",   label: "Booking Declined",           time: "Jan 19, 9:11 AM", completed: true, failed: true },
    { key: "payment",    label: "Payment Successful",         time: "",                 completed: false },
    { key: "success",    label: "Booking Successful",         time: "",                 completed: false },
  ];
}

const DEMO_BOOKINGS: Booking[] = [
  {
    id: "b-demo-1",
    orderId: "#BKG789012-3A",
    listingId: "apt-4",
    title: "2 Bedroom Apartment",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    amenities: "2 Guests • Wifi • 24hr Light • Air Condition",
    type: "accommodation",
    location: "Lekki Peninsula",
    pricePerDay: 97000,
    totalBilling: 194000,
    bookedAt: "07 April 2026, 09:30 AM",
    paidAt: "07 April 2026, 09:45 AM",
    status: "completed",
    checkIn: "09 April 2026",
    checkOut: "10 April 2026",
    nights: 2,
    trackingProgress: makeCompletedSteps(),
  },
  {
    id: "b-demo-2",
    orderId: "#BKG123456-2N",
    listingId: "car-1",
    title: "Land Cruiser Prado 2025",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    type: "car",
    location: "Lekki Peninsula",
    pricePerDay: 97000,
    totalBilling: 102000,
    bookedAt: "09 April 2026, 10:45 AM",
    status: "approved",          // vendor approved → user can pay
    startDate: "09 April 2026",
    endDate: "10 April 2026",
    days: 2,
    preference: "Chauffeur-driven",
    geography: "Interstate",
    pickupTime: "12:00 PM",
    countdown: 7198,
    trackingProgress: makeApprovedSteps(),
  },
  {
    id: "b-demo-3",
    orderId: "#BKG555777-1B",
    listingId: "apt-1",
    title: "3 Bedroom Apartment",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    amenities: "6 Guests • Wifi • Automatic",
    type: "accommodation",
    location: "Lekki",
    pricePerDay: 97000,
    totalBilling: 291000,
    bookedAt: "10 April 2026, 08:00 AM",
    status: "pending",           // waiting for vendor
    checkIn: "12 April 2026",
    checkOut: "15 April 2026",
    nights: 3,
    countdown: 7198,
    trackingProgress: makePendingSteps(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("lf_user");
      const savedCart = localStorage.getItem("lf_cart");
      const savedBookings = localStorage.getItem("lf_bookings");
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedCart) setCart(JSON.parse(savedCart));
      setBookings(savedBookings ? JSON.parse(savedBookings) : DEMO_BOOKINGS);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem("lf_user", JSON.stringify(user));
    else localStorage.removeItem("lf_user");
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("lf_cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("lf_bookings", JSON.stringify(bookings));
  }, [bookings, hydrated]);

  const login = async (email: string, _pw: string) => {
    await new Promise((r) => setTimeout(r, 800));
    setUser({ ...DEMO_USER, email });
    const saved = localStorage.getItem("lf_bookings");
    if (!saved) setBookings(DEMO_BOOKINGS);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("lf_user");
    localStorage.removeItem("lf_cart");
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    const id = `cart-${Date.now()}`;
    setCart((prev) => {
      if (prev.find((c) => c.listingId === item.listingId)) return prev;
      return [...prev, { ...item, id }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));

  // Place booking — creates a PENDING booking, removes from cart
  const placeBooking = (itemId: string): Booking => {
    const item = cart.find((c) => c.id === itemId);
    if (!item) throw new Error("Item not found in cart");
    const nights = item.nights ?? item.days ?? 1;
    const total = item.pricePerDay * nights;
    const booking: Booking = {
      id: `b-${Date.now()}`,
      orderId: `#BKG${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      listingId: item.listingId,
      title: item.title,
      image: item.image,
      type: item.type,
      location: item.location,
      pricePerDay: item.pricePerDay,
      totalBilling: total,
      bookedAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      }),
      status: "pending",
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      nights: item.nights,
      amenities: item.type === "accommodation" ? `${item.guests} Guests` : undefined,
      startDate: item.startDate,
      endDate: item.endDate,
      days: item.days,
      preference: item.preference,
      geography: item.geography,
      pickupTime: item.pickupTime,
      countdown: 7198,
      trackingProgress: makePendingSteps(),
    };
    setBookings((prev) => [booking, ...prev]);
    removeFromCart(itemId);
    return booking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: "cancelled", trackingProgress: makeCancelledSteps() }
          : b
      )
    );
  };

  // Pay booking — only works if status is "approved"
  const payBooking = async (bookingId: string): Promise<Booking> => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "approved") throw new Error("Booking not yet approved by vendor");
    await new Promise((r) => setTimeout(r, 2000));
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const updated: Booking = {
      ...booking,
      status: "active",
      paidAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      }),
      trackingProgress: [
        { key: "initiated", label: "Booking Initiated",          time: "Jan 19, 9:11 AM", completed: true },
        { key: "received",  label: "Booking Received by Vendor", time: "Jan 19, 9:11 AM", completed: true },
        { key: "accepted",  label: "Booking Accepted",           time: "Jan 19, 9:11 AM", completed: true },
        { key: "payment",   label: "Payment Successful",         time: `Jan 19, ${now}`,  completed: true },
        { key: "success",   label: "Booking Successful",         time: `Jan 19, ${now}`,  completed: true },
      ],
    };
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)));
    return updated;
  };

  return (
    <AuthContext.Provider value={{
      user, cart, bookings, login, logout,
      addToCart, removeFromCart, placeBooking,
      cancelBooking, payBooking, isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
