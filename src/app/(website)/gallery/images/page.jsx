"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/components/shared/NavBar";
import Footer from "../../footer/page";
import dynamic from "next/dynamic"; // ⬅️ add this
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import pb from "../../_lib/pb";

// Dynamically import Slider so it only runs on the client
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [imgFade, setImgFade] = useState(false);
  const [imgOpen, setImgOpen] = useState("");

  const [videoOpen, setVideoOpen] = useState("");
  const [videoFade, setVideoFade] = useState(false);

  useEffect(() => setVideoFade(!!videoOpen), [videoOpen]);

  // Trigger fade when image modal opens
  useEffect(() => {
    if (imgOpen) {
      setImgFade(true);
    } else {
      setImgFade(false);
    }
  }, [imgOpen]);

  const [data, setData] = useState({
    banners: [],
    brands: [],
    images: [],
    videos: [],
  });

  const handlePrev = (e) => {
    e.stopPropagation();
    if (data.images.length === 0) return;

    const newIndex =
      currentIndex === 0 ? data.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setImgOpen(
      `${pb.files.getURL(
        data.images[newIndex],
        data.images[newIndex].image
      )}?thumb=1024x0`
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (data.images.length === 0) return;

    const newIndex =
      currentIndex === data.images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setImgOpen(
      `${pb.files.getURL(
        data.images[newIndex],
        data.images[newIndex].image
      )}?thumb=1024x0`
    );
  };

  const sliderSettings = {
    autoplay: true,
    dots: false,
    infinite: true,
    autoplaySpeed: 2500,
    speed: 1000,
    slidesToShow: 5, // Default for desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const [galactive, setGalactive] = useState("img");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, brandsRes, imagesRes, videosRes] = await Promise.all(
          [
            pb.collection("banners").getFullList(200, {
              sort: "sno",
              filter: 'page = "gallery"',
              requestKey: null,
            }),
            pb
              .collection("brands")
              .getFullList(200, { sort: "sno", requestKey: null }),
            pb.collection("gallery").getFullList(200, {
              sort: "sno",
              filter: 'type = "image"',
              requestKey: null,
            }),
            pb.collection("gallery").getFullList(200, {
              sort: "sno",
              filter: 'type = "video"',
              requestKey: null,
            }),
          ]
        );

        setData({
          banners: bannersRes.map((item) => pb.files.getURL(item, item.image)),
          brands: brandsRes,
          images: imagesRes,
          videos: videosRes,
        });

        console.log({
          banners: bannersRes,
          brands: brandsRes,
          images: imagesRes,
          videos: videosRes,
        });
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
      <>
        <div className="h-dvh w-dvw flex justify-center items-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-[#152768] rounded-full animate-spin"></div>
        </div>
      </>
    );

  return (
    <div>
      <NavBar />
      <div className="mt-16 max-w-7xl mx-auto mb-4">
        <img className="w-full" src={data.banners[0]} alt={data.banners.page} />
      </div>
      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <h2 className="text-[#152768] text-2xl font-bold text-center">
          GALLERY
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
          <div
            className={
              galactive == "img"
                ? "bg-[#152768] text-white px-3 py-2 rounded cursor-pointer"
                : "hover:bg-[#152768] hover:text-white px-3 py-2 rounded border border-[#152768] cursor-pointer"
            }
            onClick={() => {
              setGalactive("img");
            }}
          >
            Images
          </div>
          <div
            className={
              galactive == "vid"
                ? "bg-[#152768] text-white px-3 py-2 rounded cursor-pointer"
                : "hover:bg-[#152768] hover:text-white px-3 py-2 rounded border border-[#152768] cursor-pointer"
            }
            onClick={() => {
              setGalactive("vid");
            }}
          >
            Videos
          </div>
          <div
            className={
              galactive == "soc"
                ? "bg-[#152768] text-white px-3 py-2 rounded cursor-pointer"
                : "hover:bg-[#152768] hover:text-white px-3 py-2 rounded border border-[#152768] cursor-pointer"
            }
            onClick={() => {
              setGalactive("soc");
            }}
          >
            Social Media
          </div>
          <div
            className={
              galactive == "del"
                ? "bg-[#152768] text-white px-3 py-2 rounded cursor-pointer"
                : "hover:bg-[#152768] hover:text-white px-3 py-2 rounded border border-[#152768] cursor-pointer"
            }
            onClick={() => {
              setGalactive("del");
            }}
          >
            Delivery Platforms
          </div>
        </div>

        {galactive == "img" ? (
          <>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images && data.images.length > 0 ? (
                data.images.map((image) => (
                  <div
                    key={image.id}
                    className="flex items-center justify-center border border-gray-300 rounded-2xl"
                  >
                    <img
                      src={pb.files.getURL(image, image.image)}
                      className="object-cover w-full h-64"
                      alt="preview"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(
                          data.images.findIndex((img) => img.id === image.id)
                        );
                        setImgOpen(
                          `${pb.files.getURL(image, image.image)}?thumb=1024x0`
                        );
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>Loading images...</p>
              )}
            </div>
          </>
        ) : galactive == "vid" ? (
          <>
            <div className="mt-4 max-w-7xl">
              {data.videos && data.videos.length > 0 ? (
                <Slider {...sliderSettings}>
                  {data.videos.map((video) => (
                    <div key={video.id} className="px-2">
                      <video
                        className="w-full h-64 object-cover rounded-md"
                        crossOrigin="anonymous"
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoOpen(pb.files.getURL(video, video.video));
                        }}
                      >
                        <source
                          src={pb.files.getURL(video, video.video)}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </Slider>
              ) : (
                <p>Loading videos...</p>
              )}
            </div>
          </>
        ) : galactive == "soc" ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h2 className="text-2xl text-center">Follow Our brands</h2>
            <p className="text-center my-4">
              Explore all of our unique brands across your favourite platform
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
              {data.brands.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white border border-yellow-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col items-center"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    {brand.name}
                  </h2>
                  <div className="flex space-x-4 text-2xl text-gray-600">
                    <a
                      href={brand.facebook ? brand.facebook : "#"}
                      target="_blank"
                    >
                      <img
                        className="h-6 w-6 rounded object-cover hover:scale-110"
                        src="/images/home/so/facebook.png"
                        alt="Facebook"
                      />
                    </a>
                    <a
                      href={brand.instagram ? brand.instagram : "#"}
                      target="_blank"
                    >
                      <img
                        className="h-6 w-6 rounded object-cover hover:scale-110"
                        src="/images/home/so/instagram.png"
                        alt="Instagram"
                      />
                    </a>
                    <a href={brand.google ? brand.google : "#"} target="_blank">
                      <img
                        className="h-6 w-6 rounded object-cover hover:scale-110"
                        src="/images/home/so/google-logo.png"
                        alt="Google"
                      />
                    </a>
                    <a
                      href={brand.youtube ? brand.youtube : "#"}
                      target="_blank"
                    >
                      <img
                        className="h-6 w-6 rounded object-cover hover:scale-110"
                        src="/images/home/so/youtube.png"
                        alt="Google"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : galactive == "del" ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h2 className="text-2xl text-center">Order Your Favourite Food</h2>
            <p className="text-center">
              Order from Our Unique Brands on Your Favorite Delivery Apps
            </p>
            <div className="mt-8 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
              {data.brands.map((brand) => {
                if (
                  brand.name.toUpperCase() === "ETOUCH" ||
                  brand.name.toUpperCase() === "TEKSOFT"
                ) {
                  return null; // Skip rendering this brand
                } else {
                  return (
                    <div
                      key={brand.id}
                      className="bg-white border border-yellow-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col items-center"
                    >
                      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center capitalize">
                        {brand.name}
                      </h2>
                      <div className="flex space-x-4 text-2xl text-gray-600">
                        {brand.own_delivery_icon ? (
                          <a
                            href={brand.own_delivery ? brand.own_delivery : "#"}
                          >
                            <img
                              className="h-8 w-8 rounded object-cover"
                              src={pb.files.getURL(
                                brand,
                                brand.own_delivery_icon
                              )}
                              alt="swiggy"
                            />
                          </a>
                        ) : (
                          <></>
                        )}
                        <a
                          href={brand.swiggy ? brand.swiggy : "#"}
                          target="_blank"
                        >
                          <img
                            className="h-8 w-8 rounded object-cover"
                            src="/images/home/dp/swiggy.jpg"
                            alt="swiggy"
                          />
                        </a>
                        <a
                          href={brand.zomato ? brand.zomato : "#"}
                          target="_blank"
                        >
                          <img
                            className="h-8 w-8 rounded object-cover"
                            src="/images/home/dp/zomato.jpg"
                            alt="zomato"
                          />
                        </a>
                        <a
                          href={brand.dunzo ? brand.dunzo : "#"}
                          target="_blank"
                        >
                          <img
                            className="h-8 w-8 rounded object-cover"
                            src="/images/home/dp/dunzo.jpg"
                            alt="dunzo"
                          />
                        </a>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {imgOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black/80 transition-opacity duration-100 ${
            imgFade ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setImgOpen("")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex items-center justify-center rounded w-[80dvw] md:w-[85dvw] md:h-[90dvh] transform transition-transform duration-100 ${
              imgFade ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
            }`}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white px-3 py-2 rounded-r-lg cursor-pointer"
            >
              <ChevronLeft size={64} />
            </button>

            {/* Image */}
            <img
              src={imgOpen}
              alt="preview"
              className="w-full h-full object-contain"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white px-3 py-2 rounded-l-lg cursor-pointer"
            >
              <ChevronRight size={64} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setImgOpen("")}
              className="absolute top-0 right-8 p-1 rounded-bl-xl bg-red-600 text-white cursor-pointer"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {/* Preview */}
      {videoOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black/80 transition-opacity duration-100 ${
            videoFade ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setVideoOpen("")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex items-center justify-center rounded w-[80dvw] md:w-[85dvw] md:h-[90dvh] transform transition-transform duration-100 ${
              videoFade
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }`}
            // className={`relative rounded w-[80dvw] md:w-auto md:h-[70dvh] transform transition-transform duration-100 ${
            //   videoFade
            //     ? "translate-y-0 opacity-100"
            //     : "-translate-y-5 opacity-0"
            // }`}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white px-3 py-2 rounded-r-lg cursor-pointer"
            >
              <ChevronLeft size={64} />
            </button>

            <video
              src={videoOpen}
              controls
              className="w-full h-full object-contain"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white px-3 py-2 rounded-l-lg cursor-pointer"
            >
              <ChevronRight size={64} />
            </button>

            <button
              onClick={() => setVideoOpen("")}
              className="absolute top-0 right-8 p-1 rounded-bl-xl bg-red-600 text-white"
            >
              <X />
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Gallery;
