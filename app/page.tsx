import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import { Poppins, Barlow } from "next/font/google";

// Load Poppins and Barlow fonts
const poppins = Poppins({ weight: ["200", "800"], subsets: ["latin"] });
const barlow = Barlow({ weight: ["400"], subsets: ["latin"] });

function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <hr />

      {/* Hero Section */}
      <div className="relative w-full max-w-7xxl mx-auto">
        {/* Hero Image */}
        <Image
          src="/home.png"
          alt="Healthy Meal Delivery"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          priority
        />

        {/* Left Content - Overlapping Image */}
        <div
          className={`absolute top-1/2 left-16 transform -translate-y-1/2 lg:w-1/2 ${poppins.className}`}
        >
          <h1 className="text-[60px] font-extrabold text-[#75A957] leading-tight">
            HEALTHY <br />{" "}
            <span
              style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: "80px",
              }}
            >
              MEAL
            </span>
          </h1>
          <p className="text-[24px] font-light text-[#38303D] mt-2">
            at your doorstep
          </p>

          {/* CTA Button */}
          <button
            className={`mt-8 px-20 py-3 bg-[#75A957] text-white text-[24px] rounded-md shadow-md hover:bg-[#84B966] transition`}
            style={{
              fontFamily: '"Barlow", sans-serif',
              fontWeight: "bold",
            }}
          >
            <a href="./login">Order Now</a>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
