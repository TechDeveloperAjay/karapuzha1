import { IMessage } from "@/types/message";

export const dummyMessages: IMessage[] = [
  {
    id: "msg_01",
    fullName: "Karan Johar",
    email: "karan@example.com",
    phone: "+91 99999 11111",
    subject: "Corporate Retreat Booking Query",
    message: "Hello, we are planning a corporate retreat for 25 people in mid-September. Do you offer packages including all meals and trekking excursions? Please share a quote.",
    status: "unread",
    createdAt: new Date("2026-06-23T14:30:00Z")
  },
  {
    id: "msg_02",
    fullName: "Anjali Rao",
    email: "anjali.rao@example.com",
    phone: "+91 98888 22222",
    subject: "Honeymoon Special Requests",
    message: "Hi, I have booked a Luxury Waterfront Villa for July 12th. I wanted to ask if we could arrange a candlelight dinner on the deck. Let me know the additional charges.",
    status: "read",
    createdAt: new Date("2026-06-22T09:15:00Z")
  },
  {
    id: "msg_03",
    fullName: "David Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 019-2834",
    subject: "Airport Pick Up Facility",
    message: "Greetings, we are flying into Calicut (CCJ) airport on August 4. Do you provide airport transfers, and what is the rate for a family of four?",
    status: "replied",
    repliedAt: new Date("2026-06-21T11:00:00Z"),
    replyMessage: "Yes, David, we provide private airport pickups via premium SUV. The rate from Calicut Airport is ₹3,500. We have updated your booking files with this request.",
    createdAt: new Date("2026-06-20T17:40:00Z")
  }
];
