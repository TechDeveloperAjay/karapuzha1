import { IBooking } from "@/types/booking";

export const dummyBookings: IBooking[] = [
  {
    id: "book_01",
    bookingReference: "KWS-20260620-8B9",
    room: "room_02", // Luxury Waterfront Villa
    guestDetails: {
      fullName: "Amit Sharma",
      email: "amit.sharma@example.com",
      phone: "+91 98765 43210",
      idProof: {
        type: "aadhaar",
        number: "1234-5678-9012"
      }
    },
    checkInDate: new Date("2026-07-10"),
    checkOutDate: new Date("2026-07-13"),
    totalGuests: { adults: 2, children: 1 },
    pricing: {
      baseAmount: 34500, // 11500 * 3 nights
      extraGuestsAmount: 0,
      discountAmount: 1500,
      totalAmount: 33000,
      paidAmount: 16500 // 50% advance
    },
    status: "confirmed",
    paymentStatus: "partially_paid",
    paymentDetails: {
      gateway: "razorpay",
      orderId: "order_KWS1029",
      paymentId: "pay_AMIT8392"
    },
    notes: "Requires flower decorations for anniversary celebration.",
    createdAt: new Date("2026-06-20")
  },
  {
    id: "book_02",
    bookingReference: "KWS-20260622-4D1",
    room: "room_01", // Deluxe Lake View Room
    guestDetails: {
      fullName: "Priyanka Sen",
      email: "priyanka.sen@example.com",
      phone: "+91 99887 76655",
      idProof: {
        type: "passport",
        number: "Z9876543"
      }
    },
    checkInDate: new Date("2026-07-15"),
    checkOutDate: new Date("2026-07-17"),
    totalGuests: { adults: 2, children: 0 },
    pricing: {
      baseAmount: 11000, // 5500 * 2 nights
      extraGuestsAmount: 0,
      discountAmount: 0,
      totalAmount: 11000,
      paidAmount: 11000 // Fully paid
    },
    status: "confirmed",
    paymentStatus: "paid",
    paymentDetails: {
      gateway: "razorpay",
      orderId: "order_KWS1108",
      paymentId: "pay_PRIY2910"
    },
    notes: "Requesting a room on a higher floor if possible.",
    createdAt: new Date("2026-06-22")
  },
  {
    id: "book_03",
    bookingReference: "KWS-20260623-1A5",
    room: "room_04", // Presidential Family Suite
    guestDetails: {
      fullName: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 91234 56789"
    },
    checkInDate: new Date("2026-07-01"),
    checkOutDate: new Date("2026-07-05"),
    totalGuests: { adults: 4, children: 2 },
    pricing: {
      baseAmount: 66000, // 16500 * 4 nights
      extraGuestsAmount: 0,
      discountAmount: 3000,
      totalAmount: 63000,
      paidAmount: 0 // Payment pending
    },
    status: "pending",
    paymentStatus: "pending",
    notes: "Checking in late at 8:00 PM.",
    createdAt: new Date("2026-06-23")
  },
  {
    id: "book_04",
    bookingReference: "KWS-20260618-9F2",
    room: "room_03", // Lake View Cottage
    guestDetails: {
      fullName: "Rohan Matthews",
      email: "rohan.matthews@example.com",
      phone: "+91 94444 88888",
      idProof: {
        type: "driving_licence",
        number: "KL-12-2015-00034"
      }
    },
    checkInDate: new Date("2026-06-18"),
    checkOutDate: new Date("2026-06-20"),
    totalGuests: { adults: 1, children: 0 },
    pricing: {
      baseAmount: 15000, // 7500 * 2 nights
      extraGuestsAmount: 0,
      discountAmount: 1000,
      totalAmount: 14000,
      paidAmount: 14000
    },
    status: "completed",
    paymentStatus: "paid",
    paymentDetails: {
      gateway: "offline_cash"
    },
    createdAt: new Date("2026-06-10")
  },
  {
    id: "book_05",
    bookingReference: "KWS-20260615-5C8",
    room: "room_02", // Luxury Waterfront Villa
    guestDetails: {
      fullName: "Siddharth Verma",
      email: "siddharth@example.com",
      phone: "+91 97777 22222"
    },
    checkInDate: new Date("2026-06-24"),
    checkOutDate: new Date("2026-06-26"),
    totalGuests: { adults: 2, children: 0 },
    pricing: {
      baseAmount: 23000, // 11500 * 2 nights
      extraGuestsAmount: 0,
      discountAmount: 0,
      totalAmount: 23000,
      paidAmount: 0
    },
    status: "cancelled",
    paymentStatus: "pending",
    notes: "Guest requested cancellation due to flight change.",
    createdAt: new Date("2026-06-15")
  }
];
