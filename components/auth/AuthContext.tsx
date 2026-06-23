"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  initials: string;
}

interface CartItem {
  id: string;
  listingId: string;
  title: string;
  image: string;
  pricePerDay: number;
  type: "accommodation" | "car" | "security";
  location: string;
  // Accommodation
  guests?: number;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  // Car
  startDate?: string;
  endDate?: string;
  days?: number;
  preference?: string;
  geography?: string;
  pickupTime?: string;
}

interface PaidBooking {
  id: string;
  orderId: string;
  listingId: string;
  title: string;
  image: string;
  type: "accommodation" | "car" | "security";
  location: string;
  pricePerDay: number;
  totalBilling: number;
  paidAt: string;
  status: "active" | "completed" | "cancelled";
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  startDate?: string;
  endDate?: string;
  days?: number;
  preference?: string;
  trackingProgress: {
    key: string;
    label: string;
    time: string;
    completed: boolean;
  }[];
}

interface AuthContextType {
  user: User | null;
  cart: CartItem[];
  paidBookings: PaidBooking[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkout: (itemId: string) => PaidBooking;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  id: "user-1",
  email: "user@example.com",
  name: "Adewale Afolabi",
  initials: "AA",
};

const DEMO_PAID: PaidBooking[] = [
  {
    id: "paid-1",
    orderId: "#BKG789012-3A",
    listingId: "apt-4",
    title: "2 Bedroom Apartment",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    type: "accommodation",
    location: "Lekki Peninsula",
    pricePerDay: 97000,
    totalBilling: 194000,
    paidAt: "07 April 2026, 09:30 AM",
    status: "completed",
    checkIn: "07 April 2026",
    checkOut: "09 April 2026",
    nights: 2,
    trackingProgress: [
      { key: "initiated", label: "Booking Initiated", time: "Jan 19, 9:11 AM", completed: true },
      { key: "received", label: "Booking Received by Vendor", time: "Jan 19, 9:11 AM", completed: true },
      { key: "accepted", label: "Booking Accepted", time: "Jan 19, 9:11 AM", completed: true },
      { key: "payment", label: "Payment Successful", time: "Jan 19, 9:15 AM", completed: true },
      { key: "success", label: "Booking Successful", time: "Jan 19, 9:20 AM", completed: true },
    ],
  },
  {
    id: "paid-2",
    orderId: "#BKG123456-2N",
    listingId: "car-1",
    title: "Land Cruiser Prado 2025",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    type: "car",
    location: "Lekki Peninsula",
    pricePerDay: 97000,
    totalBilling: 102000,
    paidAt: "09 April 2026, 10:45 AM",
    status: "active",
    startDate: "09 April 2026",
    endDate: "10 April 2026",
    days: 2,
    preference: "Chauffeur-driven",
    trackingProgress: [
      { key: "initiated", label: "Booking Initiated", time: "Jan 19, 9:11 AM", completed: true },
      { key: "received", label: "Booking Received by Vendor", time: "Jan 19, 9:11 AM", completed: true },
      { key: "accepted", label: "Booking Accepted", time: "Jan 19, 9:11 AM", completed: true },
      { key: "payment", label: "Payment Successful", time: "Jan 19, 9:15 AM", completed: true },
      { key: "success", label: "Booking Successful", time: "Jan 19, 9:20 AM", completed: true },
    ],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paidBookings, setPaidBookings] = useState<PaidBooking[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("lf_user");
      const savedCart = localStorage.getItem("lf_cart");
      const savedPaid = localStorage.getItem("lf_paid");
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedPaid) setPaidBookings(JSON.parse(savedPaid));
      else setPaidBookings(DEMO_PAID);
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage
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
    localStorage.setItem("lf_paid", JSON.stringify(paidBookings));
  }, [paidBookings, hydrated]);

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u = { ...DEMO_USER, email };
    setUser(u);
    if (paidBookings.length === 0) setPaidBookings(DEMO_PAID);
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
      const exists = prev.find((c) => c.listingId === item.listingId);
      if (exists) return prev;
      return [...prev, { ...item, id }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCart = () => setCart([]);

  const checkout = (itemId: string): PaidBooking => {
    const item = cart.find((c) => c.id === itemId);
    if (!item) throw new Error("Item not found");
    const nights = item.nights ?? item.days ?? 1;
    const total = item.pricePerDay * nights;
    const booking: PaidBooking = {
      id: `paid-${Date.now()}`,
      orderId: `#BKG${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      listingId: item.listingId,
      title: item.title,
      image: item.image,
      type: item.type,
      location: item.location,
      pricePerDay: item.pricePerDay,
      totalBilling: total,
      paidAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      }),
      status: "active",
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      nights: item.nights,
      startDate: item.startDate,
      endDate: item.endDate,
      days: item.days,
      preference: item.preference,
      trackingProgress: [
        { key: "initiated", label: "Booking Initiated", time: new Date().toLocaleTimeString(), completed: true },
        { key: "received", label: "Booking Received by Vendor", time: new Date().toLocaleTimeString(), completed: true },
        { key: "accepted", label: "Booking Accepted", time: new Date().toLocaleTimeString(), completed: true },
        { key: "payment", label: "Payment Successful", time: new Date().toLocaleTimeString(), completed: true },
        { key: "success", label: "Booking Successful", time: new Date().toLocaleTimeString(), completed: true },
      ],
    };
    setPaidBookings((prev) => [booking, ...prev]);
    removeFromCart(itemId);
    return booking;
  };

  return (
    <AuthContext.Provider value={{
      user, cart, paidBookings, login, logout,
      addToCart, removeFromCart, clearCart, checkout,
      isLoggedIn: !!user,
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
