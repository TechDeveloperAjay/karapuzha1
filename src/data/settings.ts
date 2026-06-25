import { ISettings } from "@/types/settings";

export const dummySettings: ISettings = {
  resortName: "Karapuzha Water Scapes",
  contactEmail: "reservations@karapuzhawaterscapes.com",
  contactPhone: "+91 94954 60000",
  whatsappNumber: "+919495460000",
  address: {
    street: "Near Karapuzha Dam, Kakkayam Road",
    city: "Ambalavayal, Wayanad",
    state: "Kerala",
    zipCode: "673593",
    coordinates: {
      lat: 11.6212,
      lng: 76.2235
    }
  },
  socialLinks: {
    facebook: "https://facebook.com/karapuzhawaterscapes",
    instagram: "https://instagram.com/karapuzhawaterscapes",
    youtube: "https://youtube.com/c/karapuzhawaterscapes"
  },
  bookingConfig: {
    checkInTime: "14:00",
    checkOutTime: "11:00",
    taxPercentage: 12, // 12% GST
    advancePaymentPercentage: 50, // 50% down-payment
    cancellationPolicyDays: 7
  },
  seoConfig: {
    metaTitle: "Karapuzha Water Scapes – Luxury Waterfront Resort in Wayanad",
    metaDescription: "Experience the epitome of luxury at our waterfront resort in Wayanad, overlooking the gorgeous Karapuzha Reservoir. Featuring private pools, garden-to-lake views, and premium services.",
    keywords: ["Wayanad Resort", "Waterfront Villa Wayanad", "Luxury Stay Wayanad", "Resorts near Karapuzha Dam", "Kerala Tourism"]
  },
  updatedAt: new Date("2026-06-23")
};
