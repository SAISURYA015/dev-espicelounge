import NavBar from "@/components/shared/NavBar";
import Sidebar from "../_components/SideBar";
import pb from "../_lib/pb";
import Footer from "../footer/page";

export const metadata = {
  title: "Investor Relation | Spice Lounge",
  description: "Investor relation page of Spice Lounge.",
};

export default async function RootLayout({ children }) {
  const banners = await pb.collection("banners").getFullList(200, {
    sort: "sno",
    filter: 'page = "investor"',
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />

      {/* Banner Section */}
      {banners.length > 0 && (
        <div className="mt-16 max-w-7xl mx-auto mb-6 px-4 sm:px-6 lg:px-8">
          <img
            src={pb.files.getURL(banners[0], banners[0].image)}
            alt="Investor banner"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 lg:flex lg:gap-6 lg:min-w-[768px]">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <Sidebar />
        </div>

        <main className="flex-1 bg-white rounded-xl shadow-sm overflow-y-auto no-scrollbar p-4">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
