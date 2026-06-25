export interface ISettings {
  resortName: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  bookingConfig: {
    checkInTime: string; // e.g. "14:00"
    checkOutTime: string; // e.g. "11:00"
    taxPercentage: number;
    advancePaymentPercentage: number; // minimum percent to reserve (e.g., 50%)
    cancellationPolicyDays: number; // e.g. 7 days for full refund
  };
  seoConfig?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  updatedAt: Date;
}
