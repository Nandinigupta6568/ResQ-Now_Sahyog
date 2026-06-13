"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Shield,
} from "lucide-react";

export default function Signup() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (authError) {
      alert(authError.message);
      return;
    }

    const user = authData?.user;

    if (!user) {
      alert("Signup failed");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          full_name: fullName,
          phone,
          role,
        },
      ]);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Account created successfully!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-100 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Shield className="text-red-600" size={32} />
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            Join ResQ-Now
          </h1>

          <p className="text-gray-500 mt-2">
            Help communities during emergencies
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Full Name */}
          <div className="relative">
            <User
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-xl pl-10 p-3 focus:ring-2 focus:ring-red-500 outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-xl pl-10 p-3 focus:ring-2 focus:ring-red-500 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl pl-10 p-3 focus:ring-2 focus:ring-red-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-xl pl-10 pr-12 p-3 focus:ring-2 focus:ring-red-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl pl-10 p-3 focus:ring-2 focus:ring-red-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose Your Role
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`border rounded-xl p-3 text-center ${
                  role === "user"
                    ? "border-red-600 bg-red-50"
                    : ""
                }`}
              >
                User
              </button>

              <button
                type="button"
                onClick={() => setRole("volunteer")}
                className={`border rounded-xl p-3 text-center ${
                  role === "volunteer"
                    ? "border-red-600 bg-red-50"
                    : ""
                }`}
              >
                Volunteer
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Create Account
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}