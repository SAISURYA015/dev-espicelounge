"use client";
import NavBar from "@/components/shared/NavBar";
import React, { useEffect, useState } from "react";
import Footer from "../footer/page";
import pb from "../_lib/pb";
import { X } from "lucide-react";

const Franchise = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    banners: [],
    brands: [],
  });

  // Modal state
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Trigger fade effect
  useEffect(() => {
    setFade(open);
  }, [open]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, brandsRes] = await Promise.all([
          pb.collection("banners").getFullList(200, {
            sort: "sno",
            filter: 'page = "franchise"',
            requestKey: null,
          }),
          pb.collection("brands").getFullList(200, {
            sort: "sno",
            requestKey: null,
          }),
        ]);

        setData({
          banners: bannersRes.map((item) => pb.files.getURL(item, item.image)),
          brands: brandsRes,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save to PocketBase collection (make sure you have a "franchise_requests" collection)
      await pb.collection("franchise_requests").create({
        fullName,
        email,
        phone,
        message,
      });

      alert("Application submitted successfully!");
      setOpen(false);

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Something went wrong, please try again.");
    }
  };

  if (loading)
    return (
      <div className="h-dvh w-dvw flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-[#152768] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div>
      <NavBar />

      <div className="mt-16 max-w-7xl mx-auto mb-4">
        <img className="w-full" src={data.banners[0]} alt="" />
      </div>

      {/* Brand Cards */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.brands.length > 0 ? (
            data.brands.map((brand) => (
              <div
                className="border border-orange-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer ease-in-out transform hover:scale-[1.02] p-4"
                key={brand.id}
              >
                <div className="flex items-center justify-center p-2">
                  <img
                    className="h-24 object-contain"
                    src={pb.files.getURL(brand, brand.logo)}
                    alt=""
                  />
                </div>
                <p className="text-sm text-center">
                  {brand?.aboutDescription.split(" ").slice(0, 18).join(" ")}
                  <span
                    className="text-[#d13b2a] font-semibold cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    ...apply
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No brands...</p>
          )}
        </div>
      </div>

      <Footer />

      {/* Application Modal */}
      {open && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-200 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        >
          <div
            className={`relative bg-white rounded-lg p-6 w-[95%] max-w-lg shadow transform transition-transform duration-200 ${
              fade ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-700 text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">
              Franchise Application
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone (with country code)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+91 9876543210"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full border px-3 py-2 rounded"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#d13b2a] text-white font-semibold rounded hover:bg-[#b03022] transition"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Franchise;
