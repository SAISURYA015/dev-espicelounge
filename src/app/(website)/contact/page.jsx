"use client";
import React, { useEffect, useState } from "react";
import Footer from "../footer/page";
import NavBar from "@/components/shared/NavBar";
import { Mail, MapPin, Phone } from "lucide-react";
import pb from "../_lib/pb";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    banners: [],
    brands: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (hook up backend here 🚀)");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes] = await Promise.all([
          pb.collection("banners").getFullList(200, {
            sort: "sno",
            filter: 'page = "contact"',
            requestKey: null,
          }),
          pb
            .collection("brands")
            .getFullList(200, { sort: "sno", requestKey: null }),
        ]);

        setData({
          banners: bannersRes.map((item) => pb.files.getURL(item, item.image)),
        });

        console.log({
          banners: bannersRes,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <>
        <div className="h-dvh w-dvw flex justify-center items-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-[#152768] rounded-full animate-spin"></div>
        </div>
      </>
    );
  return (
    <div>
      <NavBar />
      <div className="mt-16 w-full max-w-7xl mx-auto">
        <img src={data.banners[0]} alt="" />
      </div>

      <div className="flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
          {/* Left Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-full flex justify-center">
              <img
                src="/images/shared/logos/logo.png"
                alt="Logo"
                className="w-64 h-auto mb-4"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Corparate:
              </h2>

              <div className="flex items-start gap-2 text-gray-700 mb-2">
                <MapPin size={48} />
                <p>
                  Western Dallas Centre, 5th Floor, Survey No.83/1, Knowledge
                  City, Raidurg, Gachibowli, Hyderabad, Telangana - 500032.
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Phone /> <p>+91 63626 72263</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Mail />
                <a
                  href="mailto:info@espicelounge.com"
                  className="text-blue-500 hover:underline"
                >
                  info@espicelounge.com
                </a>
              </div>

              <div className="w-full flex justify-end">
                <button className="px-4 py-2 bg-blue-900 text-white rounded-lg shadow hover:bg-blue-800 transition">
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white p-8 rounded-lg shadow-md flex justify-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center md:text-left">
                GET IN TOUCH
              </h2>
              <p className="text-gray-600 mb-6 text-center md:text-left">
                Our friendly team would love to hear from you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  required
                />

                <div className="flex gap-2">
                  <select className="border rounded-md p-2">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <textarea
                  name="message"
                  rows="4"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
