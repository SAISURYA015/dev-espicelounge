"use client";

import { useEffect, useState } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://backend.espicelounge.com");

const YourComponent = () => {
  const [data, setData] = useState({
    banners: [],
    brands: [],
  });

  const [galactive, setGalactive] = useState("img");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, brandsRes] = await Promise.all([
          pb.collection("banners").getFullList({ sort: "-created" }),
          pb.collection("brands").getFullList({ sort: "-created" }),
        ]);

        setData({
          banners: bannersRes,
          brands: brandsRes,
        });

        console.log({
          banners: bannersRes,
          brands: brandsRes,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Banners</h2>
      {data.banners.map((banner) => (
        <img
          key={banner.id}
          src={pb.files.getURL(banner, banner.image)}
          alt={banner.title}
        />
      ))}

      <h2>Brand Logos</h2>
      {data.brands.map((brand) => (
        <img
          key={brand.id}
          src={pb.files.getURL(brand, brand.logo)}
          alt={brand.name}
        />
      ))}
    </div>
  );
};

export default YourComponent;
