"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import pb from "../../_lib/pb";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Meetings = () => {
  const [loading, setLoading] = useState(true);
  const [meetingsInfo, setMeetingsInfo] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // accordion state
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meetingsInfoRes = await pb
          .collection("meetings_policies_stock_exchange_open_offer")
          .getFullList(200, {
            sort: "sno",
            filter: 'page = "meetings"',
          });

        setMeetingsInfo(meetingsInfoRes);
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

  const isActive = pathname === "/investor-relation/meetings";

  // toggle accordion
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isActive && meetingsInfo.length > 0 && (
        <>
          <header className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#223972] border-b-2 border-gray-300 pb-2 inline-block">
              Meetings
            </h2>
          </header>

          <div className="space-y-4">
            {meetingsInfo.map((info, index) => {
              const fileUrl = pb.files.getUrl(info, info.file);

              return (
                <div
                  key={info.id}
                  className="border rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-lg bg-white hover:bg-gray-50"
                  >
                    <span>{info.title}</span>
                    {openIndex === index ? (
                      <FiChevronUp className="text-gray-600" />
                    ) : (
                      <FiChevronDown className="text-gray-600" />
                    )}
                  </button>

                  {/* Accordion Content */}
                  {openIndex === index && (
                    <div className="bg-gray-50 px-4 py-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
                        <span className="truncate text-gray-800 font-medium">
                          {info.title}
                        </span>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 font-medium hover:text-red-800"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Meetings;
