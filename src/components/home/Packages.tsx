import Image from "next/image";
import Link from "next/link";

const packages = [
    {
        title: "Corporate Retreat",
        description:
            "Perfect for team outings, conferences and executive stays amidst nature.",
        image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
        title: "Honeymoon Escape",
        description:
            "Romantic experiences crafted for unforgettable moments together.",
        image:
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    },
    {
        title: "Nature Trails",
        description:
            "Explore waterfalls, forests and breathtaking viewpoints around Wayanad.",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
        title: "Adventure Package",
        description:
            "Trekking, camping and thrilling outdoor experiences await.",
        image:
            "https://images.unsplash.com/photo-1522163182402-834f871fd851",
    },
    {
        title: "Romantic Getaway",
        description:
            "Luxury accommodation, candlelight dining and private experiences.",
        image:
            "/assets/images/lakeside_villa.png",
            // src: "/assets/images/lakeside_villa.png,
    },
    {
        title: "Weekend Escape",
        description:
            "Relax, recharge and reconnect with nature over a perfect weekend.",
        image:
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
    },
];

export default function Packages() {
    return (
        <section className="py-24 bg-[#faf7f2]">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="uppercase tracking-[0.25em] text-[#B8965A] text-sm font-medium">
                        Special Experiences
                    </span>

                    <h2 className="text-5xl font-serif text-[#1C2B1E] mt-4 mb-6">
                        Delightful Family Getaways
                    </h2>

                    <p className="text-gray-600 leading-8">
                        Experience memorable escapes crafted for couples, families,
                        adventure seekers and corporate teams amidst the beauty of Wayanad.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl shadow-lg"
                        >
                            <div className="relative h-[420px]">
                                <Image
                                    src={pkg.image}
                                    alt={pkg.title}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <h3 className="text-3xl font-serif mb-3">
                                        {pkg.title}
                                    </h3>

                                    <p className="text-white/80 mb-6">
                                        {pkg.description}
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center px-6 py-3 bg-[#B8965A] text-white rounded-full hover:scale-105 transition"
                                    >
                                        Explore Package
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}