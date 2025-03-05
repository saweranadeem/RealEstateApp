import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Loader from "../auth/Loader";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Listing = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listingData, setListingData] = useState(null);
  const [copied, setCopied] = useState(false); // Added missing state


  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);

        const listingId = params.id;
        const res = await fetch(`/api/list/getLists/${listingId}`);

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (data.success === false) {
          console.error("Error:", data.message);
          setError(true);
          return;
        }

        setListingData(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  return (
    <>
      <main>
        {loading && <Loader />}
        {error && <p>Failed to fetch listing. Please try again.</p>}
        {listingData && !loading && !error && (
          <>
            {/* Image Swiper */}
            <Swiper navigation modules={[Navigation]}>
              {listingData.imageUrl?.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Share Button */}
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>

            {/* Copy Link Message */}
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                Link copied!
              </p>
            )}

            {/* Listing Details */}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listingData.name} - ${" "}
                {listingData.offer
                  ? listingData.discountPrice.toLocaleString("en-US")
                  : listingData.regularPrice.toLocaleString("en-US")}
                {listingData.type === "rent" && " / month"}
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listingData.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listingData.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listingData.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ${+listingData.regularPrice - +listingData.discountPrice}{" "}
                    OFF
                  </p>
                )}
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {listingData.description}
              </p>
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {listingData.bedrooms > 1
                    ? `${listingData.bedrooms} beds `
                    : `${listingData.bedrooms} bed `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {listingData.bathrooms > 1
                    ? `${listingData.bathrooms} baths `
                    : `${listingData.bathrooms} bath `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listingData.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {listingData.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Listing;
