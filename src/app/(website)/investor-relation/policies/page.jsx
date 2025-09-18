"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import pb from "../../_lib/pb";

const Policies = () => {
  const [loading, setLoading] = useState(true);
  const [policiesInfo, setPoliciesInfo] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const policiesInfoRes = await pb
          .collection("meetings_policies_stock_exchange_open_offer")
          .getFullList(200, {
            sort: "sno",
            filter: 'page = "policies"',
          });

        setPoliciesInfo(policiesInfoRes);
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

  const isActive = pathname === "/investor-relation/policies";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isActive && policiesInfo.length > 0 && (
        <>
          <header className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#223972] border-b-2 border-gray-300 pb-2 inline-block">
              Policies
            </h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {policiesInfo.map((info) => {
              const fileUrl = pb.files.getUrl(info, info.file);
              return (
                <div key={info.id} className="text-red-600 font-medium">
                  {info.title} –{" "}
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-800"
                  >
                    Click Here
                  </a>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Policies;
