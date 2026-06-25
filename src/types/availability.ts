export interface IAvailability {
  id: string;
  roomId: string;
  date: string; // YYYY-MM-DD format for easier matching
  isBlocked: boolean;
  blockedReason?: "maintenance" | "seasonal_closure" | "offline_booking" | "other";
  priceOverride?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
