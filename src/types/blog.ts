export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
    publicId: string;
  };
  author: {
    name: string;
    avatarUrl?: string;
  };
  tags: string[];
  status: "draft" | "published";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
