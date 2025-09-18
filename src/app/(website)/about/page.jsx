"use client";
import NavBar from "@/components/shared/NavBar";
import React, { useEffect, useState } from "react";
import Footer from "../footer/page";
import pb from "../_lib/pb";

const Loader = () => (
  <div className="h-dvh w-dvw flex justify-center items-center">
    <div className="w-20 h-20 border-4 border-gray-300 border-t-[#152768] rounded-full animate-spin"></div>
  </div>
);

const About = () => {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState({
    banners: [],
    brands: [],
    leaders: [],
  });

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      try {
        const [bannersRes, brandsRes, leadersRes] = await Promise.all([
          pb.collection("banners").getFullList(200, {
            sort: "sno",
            filter: 'page = "about"',
            requestKey: null,
          }),
          pb.collection("brands").getFullList(200, {
            sort: "sno",
            requestKey: null,
          }),
          pb.collection("leaders").getFullList(200, {
            sort: "sno",
            filter: 'page = "about"',
            requestKey: null,
          }),
        ]);

        setData({
          banners: bannersRes.map((item) => pb.files.getURL(item, item.image)),
          brands: brandsRes,
          leaders: leadersRes,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isClient) {
    return (
      <div className="h-dvh w-dvw flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-[#152768] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div>
      <NavBar />

      {/* Banner */}
      <div className="mt-16 max-w-7xl mx-auto mb-4">
        {data.banners[0] && (
          <img
            className="w-full rounded-lg shadow-md"
            src={data.banners[0]}
            alt="About Banner"
          />
        )}
      </div>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-orange-200/50">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 tracking-wide text-center uppercase">
          <span className="text-[#d13b2a]">Our </span>
          <span className="text-[#152768]">Mission & </span>
          <br className="md:hidden" />
          <span className="text-[#152768]">Vision</span>
        </h2>
        <p className="text-justify">
          At <span className="text-[#d13b2a]">Spice </span>
          <span className="text-[#152768]">Lounge</span>, we bring together
          global dining and lifestyle experiences under one banner. From U.S.
          brands like Buffalo Wild Wings and Wing Zone, to Middle Eastern
          flavors with Blaze Kebabs, and premium pubs and nightlife concepts
          like Xora, Salud, and Sunburn Union we deliver taste and entertainment
          at scale. Our vision is to build a multi category food and beverage
          powerhouse driven by culinary innovation, vibrant pub culture, and
          technology platforms like eTouch and TekSoft. With 8 powerful brands,
          we are redefining hospitality and empowering entrepreneurs through
          sustainable, scalable franchise models.
        </p>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 tracking-wide">
          OWNED / REPRESENTED BY <span className="text-[#d13b2a]">SPICE </span>
          <span className="text-[#152768]">LOUNGE</span>
        </h2>
        <p className="text-justify">
          A family of bold and diverse brands, spanning food, pubs, nightlife,
          and technology, united by flavor and fueled by innovation. Each
          reflects our passion for quality, scalability, and unforgettable
          experiences.
        </p>

        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 items-center gap-4">
          {data.brands.length > 0 ? (
            data.brands.map((brand) => (
              <div
                key={brand.id}
                className="flex items-center justify-center border border-gray-200 rounded-2xl p-2 hover:shadow-md transition"
              >
                {brand.logo && (
                  <img
                    className="h-20 object-contain"
                    src={pb.files.getURL(brand, brand.logo)}
                    alt={brand?.name || "Brand"}
                  />
                )}
              </div>
            ))
          ) : (
            <p>Loading brands...</p>
          )}
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 tracking-wide text-center uppercase">
          <span className="text-[#d13b2a]">Our </span>
          <span className="text-[#d13b2a]">Visionary </span>
          <span className="text-[#152768]">Leadership</span>
        </h2>
        <p className="text-justify">
          At <span className="font-semibold text-[#d13b2a]">SPICE</span>
          <span className="font-semibold text-[#152768]"> LOUNGE</span>, our
          leadership team brings together decades of experience in hospitality,
          culinary innovation, and global food service management. Each member
          of our leadership team shares a common goal: to elevate the Spice
          Lounge brand through strategic growth, quality excellence, and
          customer-first thinking.
        </p>

        {data.leaders.length > 0 ? (
          data.leaders.map((leader) => (
            <div key={leader.id} className="mt-8 lg:flex gap-12">
              <div className="lg:w-1/4 border rounded-3xl hover:shadow-xl transition-all duration-300 group cursor-pointer ease-in-out transform hover:scale-[1.02]">
                {leader.image && (
                  <img
                    className="h-64 w-full object-contain rounded-3xl"
                    src={pb.files.getURL(leader, leader.image)}
                    alt={leader?.name}
                  />
                )}
              </div>
              <p className="lg:w-3/4 text-justify mt-4 lg:mt-0">
                <span className="text-[#152768] font-bold">{leader?.name}</span>{" "}
                - {leader?.role}
                <br /> <br />
                {leader?.description}
              </p>
            </div>
          ))
        ) : (
          <p>Loading leader members...</p>
        )}
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 tracking-wide text-center uppercase">
          <span className="text-[#d13b2a]">Our Core </span>
          <span className="text-[#152768]">Values</span>
        </h2>
        <p className="text-justify">
          We stand for innovation, integrity, customer delight, operational
          excellence, and sustainable growth—driving every decision we make
          across all our brands.
        </p>

        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "/images/about/core/idea.png",
                text: "Innovation in every bite",
              },
              {
                icon: "/images/about/core/settings.png",
                text: "Operational excellence",
              },
              {
                icon: "/images/about/core/customer.png",
                text: "Customer-first mindset",
              },
              {
                icon: "/images/about/core/collaborate.png",
                text: "Integrity and transparency",
              },
              {
                icon: "/images/about/core/handshake.png",
                text: "Growth through collaboration",
              },
              {
                icon: "/images/about/core/building.png",
                text: "Infrastructural Excellence",
              },
            ].map((val, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] p-6"
              >
                <div className="flex items-center justify-center mb-3">
                  <img
                    className="w-12 h-12 object-contain"
                    src={val.icon}
                    alt={val.text}
                  />
                </div>
                <p className="text-lg font-semibold">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
