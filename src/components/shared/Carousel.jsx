"use client";

import { useState, useEffect, useRef } from "react";

export default function Carousel({ slides = [], slideInterval = 3000 }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const intervalRef = useRef(null);

  const startSlider = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, slideInterval);
  };

  const stopSlider = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (length > 0) startSlider();
    return () => stopSlider();
  }, [length, slideInterval]);

  if (length === 0) return null;

  return (
    <div className="mt-16 max-w-7xl mx-auto pb-4 relative">
      {/* Banner Slider */}
      <div
        className="overflow-hidden"
        onMouseEnter={stopSlider}
        onMouseLeave={startSlider}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-full">
              <img
                src={src}
                alt={`Slide ${index}`}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
