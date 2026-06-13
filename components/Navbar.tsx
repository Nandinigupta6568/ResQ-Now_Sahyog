"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        setFullName(data?.full_name || "");
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .single();

        setFullName(data?.full_name || "");
      } else {
        setFullName("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    setUser(null);
    setFullName("");
    setMenuOpen(false);

    router.push("/");
    router.refresh();
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/request", label: "Request Help" },
    { href: "/offer", label: "Offer Help" },
    { href: "/resources", label: "Resources" },
    { href: "/volunteer", label: "Volunteers" },
    { href: "/requests", label: "Live Requests" },
    { href: "/map", label: "Map" },
    { href: "/directory", label: "Contacts" },
  ];

  const avatarLetter = (
    fullName?.charAt(0) ||
    user?.email?.charAt(0) ||
    "U"
  ).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold text-red-600">
            ResQ-Now
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/my-requests"
                className={`px-3 py-2 rounded-lg ${
                  pathname === "/my-requests"
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-50"
                }`}
              >
                My Requests
              </Link>

              {user?.email === "admin@gmail.com" && (
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-lg ${
                    pathname.startsWith("/admin")
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  Admin
                </Link>
              )}

              {/* Professional Avatar */}
              <Link
                href="/dashboard"
                title={fullName || user.email}
                className="group"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  {avatarLetter}
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg ${
                pathname === link.href
                  ? "bg-red-600 text-white"
                  : "hover:bg-red-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/my-requests"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-red-50"
              >
                My Requests
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-bold">
                  {avatarLetter}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {fullName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Dashboard
                  </p>
                </div>
              </Link>

              {user?.email === "admin@gmail.com" && (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg hover:bg-red-50"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-left px-4 py-3 text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-red-50"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg bg-red-600 text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}