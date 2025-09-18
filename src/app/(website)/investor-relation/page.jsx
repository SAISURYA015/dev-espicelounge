// "use client";
// import NavBar from "@/components/shared/NavBar";
// import React, { useEffect, useState } from "react";
// import pb from "../_lib/pb";

// // investor Relations icons
// // import cpi from "../../../../public/investor/cpi.png";
// // import ar from "../../../../public/investor/ap.png";
// // import fr from "../../../../public/investor/fr.png";
// // import sr from "../../../../public/investor/sr.png";
// // import cg from "../../../../public/investor/cg.png";
// // import ne from "../../../../public/investor/ne.png";
// // import pol from "../../../../public/investor/pol.png";
// // import mf from "../../../../public/investor/mf.png";
// // import opf from "../../../../public/investor/opf.png";
// // import lsi from "../../../../public/investor/lsi.png";
// // import Footer from "../footer/page";
// // import CorporateInformation from "./corporateInfo/page";

// // const InvestorTabsList = [
// //   // corporate information
// //   {
// //     id: "corporate",
// //     img: "/images/investor/sr.png",
// //     label: "Corporate Information",
// //     title: "Registered Office",
// //     desc: [
// //       "Spice Lounge Food Works Ltd,",
// //       "Western Dallas Centre, 5th Floor,",
// //       "Survey No.83/1, Knowledge City, Raidurg,",
// //       "Gachibowli, Hyderabad, Telangana-500032",
// //       "Mobile No.: +91 63626 72263,",
// //       "Email: info@espicelounge.com",
// //     ],

// //     title1: "Registers & Transfer Agents",
// //     desc1: [
// //       "M/s. Aarthi Consultants Pvt. Ltd,",
// //       "1-2-285, Domalguda, Hyderabad, Telangana. 500029",
// //       "Tel.: 040 - 27638111 / 27634445,",
// //     ],
// //     title2: "Statutory Auditors",
// //     desc2: [
// //       "P C N & Associates.,",
// //       "Chartered Accountants,",
// //       "Plot No. 12, N Heights",
// //       "Ground Floor, Software Layout Unit,",
// //       "Cyberabad, Hyderabad-500081",
// //     ],
// //     title3: "Company Secretary & Compliance Officer",
// //     desc3: ["Surabhi Dayal,", "Ph No. 90300 57374"],
// //     title4: "Key Managerial Personnel",
// //     desc4: [
// //       "JANAKI YARLAGADDA - Whole-time Director",
// //       "VENKATA RAJANI KUMAR VEMURI - CFO(KMP)",
// //       "VENKATA RAJANI KUMAR VEMURI - Whole-time Director",
// //       "NOMULA SRINIVAS - Whole-time Director",
// //       " MAYANK PURAN CHANDRA JOSHI - Director",
// //       "ARUNA GAMINI YANAMANDRA - Director",
// //       "SIVA PRASAD GORTHY - Director",
// //       "MANOJ SANDILYA TELAKAPALLI - Director",
// //       "SURABHI DAYAL - Company Secretary",
// //     ],
// //   },
// //   // reports - pending
// //   {
// //     id: "reports",
// //     img: ar,
// //     label: "Annual Reports",
// //     reportTitle: "View Annual Report 2023-2025",
// //     reports: [
// //       {
// //         documents: [
// //           {
// //             name: "View Annual Reports 2024-25",
// //             url: "/public/docs/annualreports/AnnualReport2022-23.pdf",
// //           },
// //           {
// //             name: "View Annual Reports 2023-24",
// //             url: "/public/docs/annualreports/AnnualReport2022-23.pdf",
// //           },
// //           {
// //             name: "View Annual Reports 2022-23",
// //             url: "/public/docs/annualreports/AnnualReport2022-23.pdf",
// //           },

// //           // Add more as needed
// //         ],
// //       },
// //     ],
// //   },
// //   //financial results - pending
// //   {
// //     id: "financial",
// //     img: fr,
// //     label: "Financial Results",
// //   },
// //   //share holder results - pending
// //   {
// //     id: "shareholder",
// //     img: sr,
// //     label: "Shareholding Pattern",
// //   },
// //   //corporate governence
// //   {
// //     id: "corpgovernance",
// //     img: cg,
// //     label: "Corporate Governance",
// //     content:
// //       "At Spice Lounge, corporate governance is the foundation of our sustainable success. We are committed to maintaining a transparent, accountable, and ethical environment that aligns with international best practices and fosters long-term stakeholder trust",
// //     subheading: "Key Governance Principles:",
// //     governerPoints: [
// //       "Transparency: Clear communication of our goals, decisions, and performance with all stakeholders.",
// //       "Accountability: Defined roles, responsibilities, and performance expectations for our leadership and management teams.",
// //       "Ethical Conduct: A strong code of ethics guiding our operations, ensuring integrity and fairness in every action.",
// //       "Compliance: Adherence to all legal, regulatory, and statutory requirements across regions of operation.",
// //       "Board Oversight: A well-structured and diverse Board of Directors providing strategic direction and risk management.",
// //       "Stakeholder Rights: Respecting the interests of investors, employees, partners, and customers through open engagement.",
// //       "Sustainability Integration: Aligning governance with our environmental and social commitments.",
// //     ],
// //     governerPolicy:
// //       "Corporate governance at Spice Lounge is not just a policy—it's a culture we live by to drive responsible growth and value creation across all our brands.",
// //   },
// //   // disclosure 46
// //   {
// //     id: "disclosure46",
// //     img: sr,
// //     label: "Disclosures under Regulation 46",
// //   },
// //   // disclosure 62
// //   // {
// //   //   id: "disclosure62",
// //   //   img: sr,
// //   //   label: "Disclosures under Regulation 62",
// //   // },
// //   //news events
// //   {
// //     id: "newsevents",
// //     img: ne,
// //     label: "Meetings",
// //     path: "",
// //     newsEvents: [
// //       {
// //         title: "Board Meetings & Outcomes",
// //         documents: [
// //           { name: "02082022-Intimation", url: "/docs/intimation1.pdf" },
// //           { name: "04012022-Intimation", url: "/docs/meeting-minutes.pdf" },
// //         ],
// //       },
// //       {
// //         title: "Closure of Trading Document",
// //         documents: [
// //           {
// //             name: "Closure of Trading Window 31-03-23",
// //             url: "/docs/intimation1.pdf",
// //           },
// //           {
// //             name: "SAL_Closure of Trading Window-MR_31122021",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //         ],
// //       },
// //       {
// //         title: "Investor Complaints",
// //         documents: [
// //           { name: "SAL_IG_31032023", url: "/docs/intimation1.pdf" },
// //           {
// //             name: "Reg 13_Investor Compliants_30-06-2021",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //         ],
// //       },
// //     ],
// //   },
// //   //policies
// //   {
// //     id: "policies",
// //     img: pol,
// //     label: "Policies",
// //     policies: [
// //       {
// //         title: "Code of Conduct",
// //         description:
// //           "Ensures ethical behavior, integrity, and professionalism across all operations and employee interactions.",
// //       },
// //       {
// //         title: "Privacy Policy",
// //         description:
// //           "Outlines how we collect, use, and protect personal data of our customers, partners, and users.",
// //       },
// //       {
// //         title: "Environmental Policy",
// //         description:
// //           "Defines our commitment to eco-friendly practices, waste reduction, and sustainable sourcing.",
// //       },
// //       {
// //         title: "Food Safety & Quality Policy",
// //         description:
// //           "Ensures all our brands meet high standards of hygiene, safety, and consistent food quality.",
// //       },
// //       {
// //         title: "Equal Opportunity Policy",
// //         description:
// //           " Promotes a diverse, inclusive, and discrimination-free workplace.",
// //       },
// //       {
// //         title: "Whistleblower Policy",
// //         description:
// //           " Provides a safe and confidential channel to report any unethical or unlawful behavior within the organization.",
// //       },
// //       {
// //         title: "Corporate Social Responsibility (CSR) Policy",
// //         description:
// //           " Focuses on giving back to the community through social, educational, and environmental initiatives.",
// //       },
// //       {
// //         title: "Investor Relations Policy",
// //         description:
// //           "Ensures fair disclosure of financial and strategic information, fostering trust with stakeholders and investors.",
// //       },
// //       {
// //         title: "Anti-Bribery and Anti-Corruption Policy",
// //         description:
// //           "Ensures fair disclosure of financial and strategic information, fostering trust with stakeholders and investors.",
// //       },
// //       {
// //         title: "Data Security Policy",
// //         description:
// //           " Establishes protocols to safeguard digital infrastructure, customer data, and internal systems from breaches.",
// //       },
// //     ],
// //   },
// //   //misc files- pending
// //   {
// //     id: "miscfiles",
// //     img: mf,
// //     label: "Stock Exchange Filings",
// //     path: "",
// //     miscFiles: [
// //       {
// //         title: "Design Files",
// //         documents: [
// //           {
// //             name: "Design - View Annual Reports 2024-25",
// //             url: "/docs/intimation1.pdf",
// //           },
// //           {
// //             name: "Design - View Annual Reports 2023-24",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //           {
// //             name: "Design - View Annual Reports 2022-23",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //         ],
// //       },
// //       {
// //         title: "Legal Files",
// //         documents: [
// //           {
// //             name: "Legal - View Annual Reports 2024-25",
// //             url: "/docs/intimation1.pdf",
// //           },
// //           {
// //             name: "Legal - View Annual Reports 2023-24",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //           {
// //             name: "Legal - View Annual Reports 2022-23",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //         ],
// //       },
// //       {
// //         title: "Content Files",
// //         documents: [
// //           {
// //             name: "Content - View Annual Reports 2024-25",
// //             url: "/docs/intimation1.pdf",
// //           },
// //           {
// //             name: "Content - View Annual Reports 2023-24",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //           {
// //             name: "Content - View Annual Reports 2022-23",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //         ],
// //       },
// //       {
// //         title: "Reports",
// //         documents: [
// //           {
// //             name: "Reports - View Annual Reports 2024-25",
// //             url: "/docs/intimation1.pdf",
// //           },
// //           {
// //             name: "Reports - View Annual Reports 2023-24",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //           {
// //             name: "Reports - View Annual Reports 2022-23",
// //             url: "/docs/meeting-minutes.pdf",
// //           },
// //         ],
// //       },
// //     ],
// //   },
// //   //open offer - no data
// //   {
// //     id: "openoffer",
// //     img: opf,
// //     label: "Open Offer 2024",
// //     path: "",
// //   },
// //   // live stock - pending
// //   {
// //     id: "livestock",
// //     img: lsi,
// //     label: "Live Stock Info",
// //     path: "",
// //   },
// // ];

// const Investor = () => {
//   const [loading, setLoading] = useState(true);
//   const [tabActive, setTabActive] = useState(InvestorTabsList[0]);

//   const [data, setData] = useState({
//     banners: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [bannersRes] = await Promise.all([
//           pb.collection("banners").getFullList(200, {
//             sort: "sno",
//             filter: 'page = "investor"',
//             requestKey: null,
//           }),
//         ]);

//         setData({
//           banners: bannersRes.map((item) => pb.files.getURL(item, item.image)),
//         });

//         console.log({
//           banners: bannersRes,
         
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleTabClick = (tab) => {
//     setTabActive(tab);
//   };

//   if (loading)
//     return (
//       <>
//         <div className="h-dvh w-dvw flex justify-center items-center">
//           <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-[#152768] rounded-full animate-spin"></div>
//         </div>
//       </>
//     );

//   return (
//     <div>
//       <NavBar />
//       <div className="mt-16 max-w-7xl mx-auto mb-4">
//         <img className="w-full" src={data.banners[0]} alt="" />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-5 lg:p-5">
//         {/* Sidebar */}
//         <div className="bg-white rounded-xl shadow-sm p-4 lg:col-span-1">
//           <ul className="space-y-2">
//             {InvestorTabsList.map((tab) => (
//               <li
//                 key={tab.id}
//                 onClick={() => handleTabClick(tab)}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
//                   tabActive.id === tab.id
//                     ? "bg-[#223972]/10 border-l-4 border-[#223972] text-[#223972] font-semibold"
//                     : "hover:bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 <img src={tab.img} alt={tab.label} className="w-5 h-5" />
//                 <span className="text-sm">{tab.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Content Area */}
//         <div
//           id="investor-tab-content"
//           className="lg:col-span-3 bg-white rounded-xl shadow-sm lg:p-4"
//         >
//           <h2 className="text-xl text-center lg:text-2xl font-bold text-[#223972] mb-4 border-b pb-2">
//             {tabActive.label}
//           </h2>

//           <CorporateInformation tabActive={tabActive} />
//           {/* Render tab content conditionally */}
//           {/* <CorporateInformation tabActive={tabActive} />
//           <ReportsTab tabActive={tabActive} pdfImg={pdfImg} />
//           {["Financial Results"].includes(tabActive.label) && (
//             <FinancialResults tabActive={tabActive} pdfImg={pdfImg} />
//           )}
//           {["Shareholding Pattern"].includes(tabActive.label) && (
//             <ShareHolderResults tabActive={tabActive} pdfImg={pdfImg} />
//           )}

//           <CorporateGovernace tabActive={tabActive} pdfImg={pdfImg} /> */}
//           {/* <Disclosure42 tabActive={tabActive} pdfImg={pdfImg} /> */}
//           {/* {<Disclosure42Copy tabActive={tabActive} pdfImg={pdfImg} />}
//           {["Meetings"].includes(tabActive.label) && (
//             <NewsEvents tabActive={tabActive} pdfImg={pdfImg} />
//           )}
//           <PoliciesList tabActive={tabActive} />
//           <MiscFiles tabActive={tabActive} />
//           <OpenOffer tabActive={tabActive} />
//           <div id="spice-section">
//             {["Live Stock Info"].includes(tabActive.label) && (
//               <SpiceStocks tabActive={tabActive} />
//             )} */}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Investor;
