"use client";
import React, { useEffect, useState } from "react";

// investor Relations icons
// import cpi from "../../../../public/investor/cpi.png";
// import ar from "../../../../public/investor/ap.png";
// import fr from "../../../../public/investor/fr.png";
// import sr from "../../../../public/investor/sr.png";
// import cg from "../../../../public/investor/cg.png";
// import ne from "../../../../public/investor/ne.png";
// import pol from "../../../../public/investor/pol.png";
// import mf from "../../../../public/investor/mf.png";
// import opf from "../../../../public/investor/opf.png";
// import lsi from "../../../../public/investor/lsi.png";
// import Footer from "../footer/page";
// import CorporateInformation from "./corporateInfo/page";

import { usePathname } from "next/navigation";
const menuItems = [
  {
    title: "Corporate Information",
    href: "/investor-relation/corporate-information",
    icon: "cp1 }",
  },

  {
    title: "Annual Reports",
    href: "/investor-relation/annual-reports",
    icon: "ar",
  },

  {
    title: "Financial Results",
    href: "/investor-relation/financial-results",
    icon: "fr",
  },

  {
    title: "Shareholding Pattern",
    href: "/investor-relation/shareholder-pattern",
    icon: "sr",
  },
  {
    title: "Corporate Governance",
    href: "/investor-relation/corporate-governance",
    icon: "cg",
  },

  {
    title: "Disclosures under Regulation 46",
    href: "/investor-relation/disclosure-regulation46",
    icon: "sr",
  },

  {
    title: "Meetings",
    href: "/investor-relation/meetings",
    icon: "ne",
  },
  //policies
  {
    title: "Policies",
    href: "/investor-relation/policies",
    icon: "pol",
  },
  //misc files- pending
  {
    title: "Stock Exchange Filings",
    href: "/investor-relation/stock-exchange",
    icon: "mf",
  },
  //open offer - no data
  {
    title: "Open Offer 2024",
    href: "/investor-relation/openoffer",
    icon: "opf",
  },
  // live stock - pending
  {
    title: "Live Stock Info",
    href: "/investor-relation/livestock",
    icon: "lsi",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="w-96 text-gray-600 flex flex-col border-r-[1.5px] z-40">
        <div className="bg-white rounded-xl shadow-sm p-4 lg:col-span-1">
          <ul className="space-y-2">
            {menuItems.map((tab) => (
              <li key={tab.title}>
                <a
                  href={tab.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        pathname.includes(tab.href.toLowerCase())
                          ? "bg-[#223972]/10 border-l-4 border-[#223972] text-[#223972] font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                >
                  {/* <img src={tab.img} alt={tab.label} className="w-5 h-5" /> */}
                  <span className="text-sm lg:text-lg">{tab.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
