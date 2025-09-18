"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import pb from "../../_lib/pb";

const DisclosureReg = () => {
  const [loading, setLoading] = useState(true);
  const [disclosureReg, setDisclosureReg] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disclosureRes = await pb
          .collection("disclosures")
          .getFullList(200, {
            sort: "sno",
          });

        setDisclosureReg(disclosureRes);
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
      <div className="h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-700 rounded-full animate-spin"></div>
      </div>
    );

  const isActive = pathname === "/investor-relation/disclosure-regulation46";

  if (!isActive || disclosureReg.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-2">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#223972] border-b-2 border-gray-300 pb-2 inline-block">
          Disclosures under Regulation 46
        </h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border text-left">S.No</th>
              <th className="py-3 px-4 border text-left">Description</th>
              <th className="py-3 px-4 border text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {disclosureReg.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border">{index + 1}</td>
                <td className="py-3 px-4 border">{item.title}</td>
                <td className="py-3 px-4 border">
                  <button className="px-4 py-2 bg-[#223972] text-white rounded hover:bg-blue-800 transition">
                    Click Here
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DisclosureReg;
