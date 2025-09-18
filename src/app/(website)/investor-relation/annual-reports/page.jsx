"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import pb from "../../_lib/pb";
import { FiFileText } from "react-icons/fi";

const Annual = () => {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [annualReports, setAnnualReports] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const annualReportRes = await pb
          .collection("annual_reports")
          .getFullList(200, {
            sort: "sno",
          });

        setAnnualReports(annualReportRes);
        // console.log("Annual Reports:", annualReportRes);
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
      <div className="h-dvh w-dvw flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-[#152768] rounded-full animate-spin"></div>
      </div>
    );

  const isActive = pathname === "/investor-relation/annual-reports";
  const visibleDocs = expanded ? annualReports : annualReports.slice(0, 3);

  return (
    <div>
      {isActive && annualReports.length > 0 && (
        <>
          <div className="p-4 space-y-6">
            <h2 className="text-2xl text-center font-bold text-[#223972] border-b-2 border-grey-500 pb-2">
              Annual Reports
            </h2>
          </div>
          <div className="lg:flex lg:flex-col gap-4 max-w-fit px-5">
            {visibleDocs.map((report) => (
              <a
                key={report.id}
                href={pb.files.getURL(report, report.file)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-red-500 text-red-500 rounded-full px-5 py-3 hover:bg-red-50 transition-colors"
              >
                <FiFileText className="w-5 h-5" />
                <span className="font-medium">{report.title}</span>
              </a>
            ))}
          </div>

          {annualReports.length > 1 && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="self-start text-sm font-medium text-blue-600 hover:underline p-5"
            >
              {expanded ? "View Less" : "View More Files"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Annual;
