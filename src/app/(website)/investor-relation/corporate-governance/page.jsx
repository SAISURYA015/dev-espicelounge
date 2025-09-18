"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import pb from "../../_lib/pb";

const CorporateGovernance = () => {
  const [loading, setLoading] = useState(true);
  const [governanceData, setGovernanceData] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pb.collection("corporate_governance").getFullList(1, {
          sort: "updated",
        });

        if (res.length > 0) {
          setGovernanceData(res[0]);
        }
      } catch (error) {
        console.error("Error fetching corporate governance:", error);
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

  const isActive = pathname === "/investor-relation/corporate-governance";

  if (!isActive || !governanceData) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#223972] border-b-2 border-gray-300 pb-2 inline-block">
          Corporate Governance
        </h2>
      </header>
      <div className="space-y-6 text-gray-700">
        <p>{governanceData.description1}</p>
        <p>{governanceData.description2}</p>

        <div>
          <h3 className="text-xl font-semibold text-[#223972] mb-4">
            Our Principles
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {governanceData.principles.map((principle, index) => (
              <li key={index}>{principle}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CorporateGovernance;
