import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ListingCard from "../components/ListingCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch(`/api/list/getAllProperty?offer=true&limit=4`),
          fetch(`/api/list/getAllProperty?type=rent&limit=4`),
          fetch(`/api/list/getAllProperty?type=sale&limit=4`),
        ]);

        const [offerData, rentData, saleData] = await Promise.all([
          offerRes.json(),
          rentRes.json(),
          saleRes.json(),
        ]);

        setOfferListing(offerData || []);
        setRentListing(rentData || []);
        setSaleListing(saleData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Sawaira Estate is the best place to find your next perfect place to
          live. We have a wide range of properties for you to choose from.
        </p>
        <a
          href="https://www.realestate.com.au/"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's get started...
        </a>
      </div>

      {/* Swiper Section */}
      {offerListing.length > 0 ? (
        <Swiper
          key={offerListing.length} // Forces re-render if new data arrives
          navigation
          modules={[Navigation]}
          className="my-5 "
        >
          {offerListing.map((list) => (
            <SwiperSlide key={list._id}>
              {list.imageUrl && list.imageUrl.length > 0 ? (
                <img
                  src={list.imageUrl[0]}
                  alt="Property"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-[500px] flex items-center justify-center bg-gray-300">
                  No Image Available
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">Loading properties...</p>
      )}

      {/* Listings Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {/* Offers */}
        {offerListing.length > 0 && (
          <div>
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to="/search?offer=true"
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offerListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent Listings */}
        {rentListing.length > 0 && (
          <div>
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to="/search?type=rent"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rentListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Sale Listings */}
        {saleListing.length > 0 && (
          <div>
            <div className="my-3 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to="/search?type=sale"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {saleListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
