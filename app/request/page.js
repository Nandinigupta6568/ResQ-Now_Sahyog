"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Droplets,
  Utensils,
  Pill,
  Car,
  Home,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import BloodForm from "@/components/request-forms/BloodForm";
import FoodForm from "@/components/request-forms/FoodForm";
import MedicineForm from "@/components/request-forms/MedicineForm";
import TransportForm from "@/components/request-forms/TransportForm";
import ShelterForm from "@/components/request-forms/ShelterForm";

export default function RequestPage() {
  const [category, setCategory] = useState("");
  const router = useRouter();

const [success, setSuccess] = useState(false);
const handleSuccess = () => {
  setSuccess(true);
};

  const categories = [
    {
      id: "blood",
      title: "Blood",
      icon: Droplets,
      color: "bg-red-500",
      light: "bg-red-50",
    },
    {
      id: "food",
      title: "Food",
      icon: Utensils,
      color: "bg-green-500",
      light: "bg-green-50",
    },
    {
      id: "medicine",
      title: "Medicine",
      icon: Pill,
      color: "bg-blue-500",
      light: "bg-blue-50",
    },
    {
      id: "transport",
      title: "Transport",
      icon: Car,
      color: "bg-yellow-500",
      light: "bg-yellow-50",
    },
    {
      id: "shelter",
      title: "Shelter",
      icon: Home,
      color: "bg-purple-500",
      light: "bg-purple-50",
    },
  ];

  const selectedCategory = categories.find(
    (c) => c.id === category
  );
  if (success) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
            <CheckCircle2
              size={60}
              className="text-green-600"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Request Submitted Successfully
        </h1>

        <p className="text-gray-600 mb-8">
          Nearby volunteers and responders have been
          notified. Your request is now being reviewed.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8">
          <p className="text-green-700 font-medium">
            ✓ Emergency request received
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
          >
            Go To Dashboard
          </button>

          <button
            onClick={() => {
              setSuccess(false);
              setCategory("");
            }}
            className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50"
          >
            New Request
          </button>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
            <AlertTriangle
              size={40}
              className="text-red-600"
            />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Request Emergency Help
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select the assistance you need. Nearby
            volunteers and responders will be notified
            immediately.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setCategory(item.id)}
                className={`group rounded-3xl p-6 transition-all duration-300 border shadow-sm hover:shadow-xl hover:-translate-y-2
                ${
                  category === item.id
                    ? `${item.color} text-white border-transparent`
                    : "bg-white"
                }`}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4
                  ${
                    category === item.id
                      ? "bg-white/20"
                      : item.light
                  }`}
                >
                  <Icon size={32} />
                </div>

                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p
                  className={`text-sm mt-2 ${
                    category === item.id
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  Request Assistance
                </p>
              </button>
            );
          })}
        </div>

        {/* Request Form Section */}
        {category && (
          <div className="bg-white rounded-[32px] shadow-2xl border overflow-hidden">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">
                    Complete Your Request
                  </h2>

                  <p className="text-red-100 mt-2">
                    Provide accurate details so nearby
                    responders can assist quickly.
                  </p>
                </div>

                <div className="bg-white/20 px-5 py-3 rounded-2xl">
                  <p className="text-sm text-red-100">
                    Selected Category
                  </p>

                  <p className="font-semibold text-lg">
                    {selectedCategory?.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="px-8 pt-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                  1
                </div>

                <div className="flex-1 h-2 bg-red-200 rounded-full">
                  <div className="h-2 bg-red-600 rounded-full w-full"></div>
                </div>

                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="mx-8 mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex gap-4">
              <ShieldCheck className="text-yellow-600" />

              <div>
                <h3 className="font-semibold text-yellow-800">
                  Emergency Response Notice
                </h3>

                <p className="text-sm text-yellow-700 mt-1">
                  Your request will be visible to nearby
                  volunteers and emergency responders.
                  Ensure all information is accurate.
                </p>
              </div>
            </div>

            {/* Form Container */}
            {/* Form Container */}
<div className="px-8 pb-10">
  <div className="bg-gray-50 rounded-3xl border p-6 md:p-8">
  {category === "blood" && (
    <BloodForm onSuccess={handleSuccess} />
  )}

  {category === "food" && (
    <FoodForm onSuccess={handleSuccess} />
  )}

  {category === "medicine" && (
    <MedicineForm onSuccess={handleSuccess} />
  )}

  {category === "transport" && (
    <TransportForm onSuccess={handleSuccess} />
  )}

  {category === "shelter" && (
    <ShelterForm onSuccess={handleSuccess} />
  )}
</div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}