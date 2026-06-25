import { IBlog } from "@/types/blog";

export const dummyBlogs: IBlog[] = [
  {
    id: "blog_01",
    title: "10 Must-Visit Places in Wayanad Near Karapuzha Dam",
    slug: "must-visit-places-wayanad-karapuzha",
    excerpt: "Discover the hidden gems, waterfalls, and adventure activities located just a stone's throw away from our waterfront resort.",
    content: "<p>Wayanad is a green paradise in Kerala, and the area surrounding Karapuzha Dam is particularly spectacular. When you stay with us, there are numerous attractions to explore...</p><h3>1. Karapuzha Adventure Park</h3><p>Located right next to the dam reservoir, this adventure hub offers standard zip-lining, human slingshot, and high-rope activities...</p>",
    coverImage: {
      url: "https://images.unsplash.com/photo-1545244040-112429607f43?q=80&w=800",
      publicId: "resort/blog/wayanad_tourism_1"
    },
    author: {
      name: "Ajay Dev",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
    },
    tags: ["Wayanad Travel Guide", "Sightseeing", "Adventure"],
    status: "published",
    publishedAt: new Date("2026-05-15"),
    createdAt: new Date("2026-05-10"),
    updatedAt: new Date("2026-05-15")
  },
  {
    id: "blog_02",
    title: "Unwinding at Wayanad: The Ultimate Resort Staycation Guide",
    slug: "unwinding-at-wayanad-staycation-guide",
    excerpt: "Stressed out? Learn how to plan the perfect wellness weekend with yoga by the reservoir and customized spa treatments.",
    content: "<p>The fast pace of modern life calls for dedicated pauses. A waterfront staycation in Wayanad is the ideal prescription to reset your body and mind...</p><h3>Yoga by the Reservoir</h3><p>Every morning at Karapuzha Water Scapes, we host calm yoga sessions as the sun rises over the mist-laden lake...</p>",
    coverImage: {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
      publicId: "resort/blog/wellness_staycation"
    },
    author: {
      name: "Meera Nair",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
    },
    tags: ["Wellness", "Staycation Guide", "Yoga"],
    status: "published",
    publishedAt: new Date("2026-06-01"),
    createdAt: new Date("2026-05-28"),
    updatedAt: new Date("2026-06-01")
  },
  {
    id: "blog_03",
    title: "Exploring Culinary Wonders: Authentic Wayanad Delicacies",
    slug: "authentic-wayanad-culinary-guide",
    excerpt: "Take a deep dive into the traditional spices and dishes of Wayanad, from Kerala parotta and beef fry to bamboo biryani.",
    content: "<p>The cuisine of Wayanad is defined by locally harvested spices like black pepper, cardamom, and fresh coconut...</p>",
    coverImage: {
      url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800",
      publicId: "resort/blog/kerala_food"
    },
    author: {
      name: "Chef George",
      avatarUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=150"
    },
    tags: ["Food & Drink", "Traditional Cuisine", "Spices"],
    status: "published",
    publishedAt: new Date("2026-06-22"),
    createdAt: new Date("2026-06-20"),
    updatedAt: new Date("2026-06-22")
  }
];
