"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import pb from "../../_lib/pb";

const CorporateInformation = () => {
  const [loading, setLoading] = useState(true);
  const [corpInfo, setCorpInfo] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const corpInfoRes = await pb
          .collection("corporate_info")
          .getFullList(200, {
            sort: "sno",
          });

        setCorpInfo(corpInfoRes);
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

  const isActive = pathname === "/investor-relation/corporate-information";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isActive && corpInfo.length > 0 && (
        <>
          <header className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#223972] border-b-2 border-gray-300 pb-2 inline-block">
              Corporate Information
            </h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {corpInfo.map((info) => {
              const addressLines = info.address?.split("\n") || [];
              return (
                <article
                  key={info.id}
                  className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300"
                >
                  <h3 className="text-xl sm:text-2xl text-[#223972] font-semibold underline underline-offset-4 mb-3">
                    {info.title}
                  </h3>
                  <h4 className="text-md text-gray-700 font-medium mb-4">
                    {info.subTitle}
                  </h4>
                  <div className="text-sm text-gray-800 space-y-1 mb-4">
                    {addressLines.length > 0 ? (
                      addressLines.map((line, index) => (
                        <p key={index}>{line.trim()}</p>
                      ))
                    ) : (
                      <p>{info.address}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-semibold">Email:</span> {info.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {info.phone}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default CorporateInformation;
