import React from "react";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      // Menggunakan gambar dari Unsplash sebagai placeholder sementara
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay Gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Konten Hero */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          Design Your Kitchen <br className="hidden md:block" /> with the
          Experts
        </h1>

        <p className="text-sm md:text-base text-gray-200 mb-8 max-w-lg drop-shadow-md">
          <span className="font-bold text-yellow-500">$150 deposit</span> <br />
          3D Design & Measurement
        </p>

        <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-yellow-500 hover:text-white transition duration-300">
          VISIT SHOW ROOM →
        </button>

        {/* Pagination Dots Placeholder */}
        <div className="flex gap-2 mt-16">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
