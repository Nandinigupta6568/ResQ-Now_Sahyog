"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Droplets,
  Utensils,
  Pill,
  Car,
  Home,
  Phone,
  Clock3,
  MapPin,
  HeartHandshake,
} from "lucide-react";
type Offer = {
  id: string;
  name: string;
  phone: string;
  category: string;
  address: string;
  description: string;
  availability: string;
  created_at: string;
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOffers();

    const channel = supabase
      .channel("offers-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "offers",
        },
        () => {
          fetchOffers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOffers = async () => {
  try {
    setLoading(true);

    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) throw error;

    setOffers(data || []);
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    setLoading(false);
  }
};

  const filteredOffers =
    filter === "all"
      ? offers
      : offers.filter(
          (offer) => offer.category === filter
        );

  if (loading) {
    return (
      
        <div className="text-center">
  <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>

  <h1 className="text-2xl font-bold text-gray-700">
    Loading Resources...
  </h1>

      </div>
    );
  }
const categoryConfig: any = {
  blood: {
    icon: Droplets,
    color: "bg-red-100 text-red-700",
  },
  food: {
    icon: Utensils,
    color: "bg-green-100 text-green-700",
  },
  medicine: {
    icon: Pill,
    color: "bg-blue-100 text-blue-700",
  },
  transport: {
    icon: Car,
    color: "bg-yellow-100 text-yellow-700",
  },
  shelter: {
    icon: Home,
    color: "bg-purple-100 text-purple-700",
  },
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white mb-8 shadow-xl">
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
      <HeartHandshake size={32} />
    </div>

    <div>
      <h1 className="text-4xl font-bold">
        Available Resources
      </h1>

      <p className="text-green-100 mt-2">
        Volunteers and providers ready to help
        during emergencies.
      </p>
    </div>
  </div>

  <div className="mt-6 bg-white/20 inline-flex px-5 py-3 rounded-2xl">
    <span className="font-semibold">
      {filteredOffers.length} Active Resources
    </span>
  </div>
</div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">

          {[
            "all",
            "blood",
            "food",
            "medicine",
            "transport",
            "shelter",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-xl capitalize ${
                filter === item
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {filteredOffers.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-lg border">
  <HeartHandshake
    size={70}
    className="mx-auto text-gray-300 mb-4"
  />

  <h3 className="text-2xl font-bold text-gray-700">
    No Resources Found
  </h3>

  <p className="text-gray-500 mt-2">
    No volunteers are currently available in
    this category.
  </p>
</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredOffers.map((offer) => {
  const config =
    categoryConfig[
      offer.category as keyof typeof categoryConfig
    ];

  const Icon = config?.icon || HeartHandshake;

  return (
    <div
      key={offer.id}
      className="bg-white rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-5 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${config?.color}`}
          >
            <Icon size={18} />

            <span className="font-semibold capitalize">
              {offer.category}
            </span>
          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            Available
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {offer.name}
          </h2>
        </div>

        <div className="flex gap-2 text-gray-600 text-sm">
          <MapPin size={16} />
          <span>{offer.address}</span>
        </div>

        <div className="flex gap-2 text-gray-500 text-sm">
          <Clock3 size={16} />
          <span>{formatDate(offer.created_at)}</span>
        </div>

        {offer.description && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-sm text-gray-700">
              {offer.description}
            </p>
          </div>
        )}

        <a
          href={`tel:${offer.phone}`}
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >
          <Phone size={18} />
          Contact Provider
        </a>
      </div>
    </div>
  );
})}

          </div>
        )}

      </div>

    </div>
  );
}