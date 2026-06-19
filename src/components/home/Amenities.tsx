import {
  UtensilsCrossed,
  Waves,
  Car,
  Luggage,
  Martini,
  ShieldCheck,
} from "lucide-react";

const amenities = [
  {
    icon: UtensilsCrossed,
    title: "Rhythm Of Flavors",
    description:
      "Savor unique delicacies at Clove Garden, our multi-cuisine restaurant.",
  },
  {
    icon: Waves,
    title: "Calmness Unwinds",
    description:
      "It's time to make a splash after a long day of hiking or visits to tourist spots.",
  },
  {
    icon: Car,
    title: "Fun-Filled Activity",
    description:
      "Make lasting memories with fun games and activities with the whole family.",
  },
  {
    icon: Luggage,
    title: "Pick Up & Drop",
    description:
      "However you arrive – we will be at your service to receive you and escort you.",
  },
  {
    icon: Martini,
    title: "Conduct Events",
    description:
      "Pleasure can be mixed with business with our conferencing and meeting facilities.",
  },
  {
    icon: ShieldCheck,
    title: "Totally Secure",
    description:
      "All norms are followed for securing our premises along with safety protocols.",
  },
];

export default function Amenities() {
  return (
    <section className="py-24 bg-[#f8f6f2]">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1f2937] mb-6">
            Experience. Indulge. Delight.
          </h2>

          <p className="text-gray-600 leading-8 text-lg">
            Karapuzha Resort presents a world of opportunity to indulge in the
            romance of nature. Experience scenic views, exceptional hospitality,
            delicious cuisine and unforgettable moments.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {amenities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="text-center group transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <Icon
                    size={64}
                    strokeWidth={1.3}
                    className="text-[#8AA05A] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-8 max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}