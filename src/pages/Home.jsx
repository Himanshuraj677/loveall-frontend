import React, { useEffect, useContext, useState } from "react";
import LoyaltyCard from "../components/LoyaltyCard";
import CategoryIcon from "../components/CategoryIcon";
import LoveAllRecommendedBrands from "../components/LoveAllRecommendedBrands";
import PopularNow from "../components/PopularNow";
import TrendingOffers from "../components/TrendingOffers";
import Enquiry from "../components/Enquiry";
import {
  FiStar,
  FiShoppingBag,
  FiShoppingCart,
  FiCoffee,
  FiFilm,
  FiMap,
  FiMoreHorizontal,
} from "react-icons/fi";
import Login from "../components/Login";
import PopUpContext from "../context/PopUpContext";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { showLoginPopup, setShowLoginPopup } = useContext(PopUpContext);
  console.log("Authentication: " + isAuthenticated);
  const homeApi = `${process.env.REACT_APP_API_URL}/user/home`;
  const [brandData, setBrandData] = useState({});
  const [featuredData, setFeaturedData] = useState({});
  const [offerData, setOfferData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHomeData = async () => {
    try {
      const response = await fetch(homeApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setOfferData(result.data.offers);
        setFeaturedData(result.data.featureOffers);
        setBrandData(result.data.brand);
        setError(result.error);
        console.log(result.data);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  // Conditional rendering: show loading spinner until data is fetched
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!showLoginPopup) {
  //       setShowLoginPopup(true);
  //     }
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [showLoginPopup, setShowLoginPopup])
  return (
    <>
      {showLoginPopup && !isAuthenticated && (
        <div
          className={`w-screen h-screen flex justify-center items-center fixed top-[60px] z-[20]`}
        >
          <Login className="bg-white" />
        </div>
      )}
      <div className="min-h-screen flex flex-col font-poppins">
        <div className="bg-gradient-to-b from-[#71012D] to-[#971132] relative overflow-hidden">
          {/* <HeaderBackground /> */}
          {/* <Header /> */}
          <main className="container mx-auto px-4 py-8 relative z-10">
            <section className="mb-12 flex flex-wrap items-center justify-between">
              <div className="w-full lg:w-1/2 text-white mb-8 lg:mb-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 font-poppins">
                  WHAT IS A SOCIAL LOYALTY CARD?
                </h1>
                <p className="mb-4 text-sm sm:text-base">
                  The Atria LoveAll Social Loyalty Card is designed to reward
                  your loyalty and spread the love!
                  <br />
                  Redeem your points for exclusive rewards, discounts, and
                  special experiences, our way of thanking you for being part of
                  the Atria community.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-[#20B2AA] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base hover:bg-[#3CCBC5] transition-colors duration-300 cursor-pointer" onClick={() => navigate('/volunteer')}>
                    Volunteer
                  </button>
                  <button className="bg-[#20B2AA] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base hover:bg-[#3CCBC5] transition-colors duration-300" onClick={() => navigate('/donation')}>
                    Donate
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <LoyaltyCard />
              </div>
            </section>
          </main>
          {/* <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-auto">
              <path fill="#FFFFFF" fillOpacity="1" d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>*/}
        </div>
        <div className="bg-white flex-grow">
          <div className="container mx-auto px-4 py-2">
            <div className="category-section mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                <CategoryIcon Icon={FiStar} label="New" />
                <CategoryIcon Icon={FiCoffee} label="Food" />
                <CategoryIcon Icon={FiShoppingBag} label="Shopping" />
                <CategoryIcon Icon={FiShoppingBag} label="Fashion" />
                <CategoryIcon Icon={FiShoppingCart} label="Restaurants" />
                <CategoryIcon Icon={FiFilm} label="Entertainment" />
                <CategoryIcon Icon={FiMap} label="Travel" />
                <CategoryIcon Icon={FiMoreHorizontal} label="More" />
              </div>
            </div>

            <LoveAllRecommendedBrands data={brandData} error={error} />
            <PopularNow data={offerData} error={error} />
            <TrendingOffers data={featuredData} error={error} />
            <Enquiry />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
}
