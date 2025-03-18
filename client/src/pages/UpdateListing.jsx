import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../auth/Loader";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]); // Store uploaded image URLs
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setformData] = useState({
    imageUrl: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: "false",
    furnished: "false",
    offer: "false",
    bedrooms: "1",
    bathrooms: "1",
    regularPrice: "50",
    discountPrice: "50",
  });
  //   console.log(formData.imageUrl);
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;
      //   alert(JSON.stringify(listingId));
      const res = await fetch(`/api/list/getLists/${listingId}`);
      const data = await res.json();
      alert(JSON.stringify(data));
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setformData({ ...data, imageUrl: data.imageUrl || [] });
    };

    fetchListing();
  }, []);
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setformData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setformData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setformData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Convert FileList to an array
  };
  const imgData = new FormData();
  files.forEach((file) => {
    imgData.append("images", file);
  });

  const handleImageUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one image.");
      return;
    }
    setUploading(true);

    try {
      const imgData = new FormData();
      files.forEach((file) => imgData.append("images", file));

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: imgData,
      });

      const data = await response.json();
      setUploading(false);

      if (!data.imageUrls || data.imageUrls.length === 0) {
        setError("Image upload failed.");
        return;
      }

      setImageUrls(data.imageUrls);

      // Ensure formData is also updated
      setformData((prevData) => ({
        ...prevData,
        imageUrl: data.imageUrls, // Correctly updating the imageUrl field
      }));
    } catch (error) {
      setUploading(false);
      setError("Error in uploading file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrl.length < 1) {
      setError("You must upload at least one image.");
      return;
    }

    if (+formData.regularPrice < +formData.discountPrice) {
      setError("Discount price must be lower than regular price.");
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(`/api/list/updateList/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser?._id }),
      });

      const data = await response.json();
      //   alert(JSON.stringify(data));
      setUploading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setUploading(false);
      setError("Error creating listing. Please try again.");
      console.error("Error creating listing:", error);
    }
  };

  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        {uploading && <Loader />}
        <h1 className="text-3xl font-semibold text-center my-7">
          Update Listing
        </h1>
        <form
          className="flex flex-col sm:flex-row gap-4 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              value={formData.name}
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              value={formData.description}
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              value={formData.address}
              required
              onChange={handleChange}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  value={formData.type}
                  checked={formData.type === "sale"}
                  onChange={handleChange}
                  className="w-5"
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  checked={formData.type === "rent"}
                  value={formData.type}
                  onChange={handleChange}
                  className="w-5"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  value={formData.parking}
                  className="w-5"
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  className="w-5"
                  value={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  onChange={handleChange}
                  value={formData.offer}
                  className="w-5"
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                  value={formData.bedrooms}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                  value={formData.bathrooms}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  onChange={handleChange}
                  min="50"
                  value={formData.regularPrice}
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>

                  <span className="text-xs">($ / month)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  onChange={handleChange}
                  min="50"
                  value={formData.discountPrice}
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>

                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4 ">
              <input
                onChange={handleFileChange}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                name="imageUrl"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {formData.imageUrl && formData.imageUrl.length > 0 ? (
              formData.imageUrl.map((url, index) => (
                <div
                  key={index}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt={`Listing ${index + 1}`}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No images uploaded</p>
            )}

            <button
              className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              disabled={uploading}
            >
              {uploading ? "Updating List" : "Update Listing"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateListing;
