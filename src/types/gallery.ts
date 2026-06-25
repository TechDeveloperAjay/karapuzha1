export interface IGalleryImage {
  id: string;
  title?: string;
  category: "rooms" | "resort" | "activities" | "restaurant" | "nature";
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
