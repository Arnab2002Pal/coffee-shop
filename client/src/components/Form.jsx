import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGeocode } from "../api/service"; // Import the geocode utility
import { registerShop } from "../api/util";
import noImage from "../assets/no-image.jpg";

const url = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

const Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("product-")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedProducts = formData.products.map((product, i) =>
        i === index ? value : product
      );
      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const location = await getGeocode({
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
      });

      const newShop = {
        name: formData.name,
        description: formData.description,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
        },
        location,
        image: formData.image,
      };

      await registerShop(url, newShop);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        {imagePreview ? (
          <>
            <div className="mt-7 mb-7 text-4xl w-full flex justify-center items-center font-bold">
              Image Preview
            </div>
            <div className="flex justify-center items-center">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-4 w-3/4 md:w-2/3 object-contain rounded-lg shadow-md"
              />
            </div>
          </>
        ) : (
          <div className="mt-4 text-gray-500 flex items-center justify-center opacity-25">
            <img src={noImage} alt="No Image" className="w-3/4 md:w-2/3" />
          </div>
        )}
      </div>
      <div className="md:w-1/2 p-4">
        <form
          className="max-w-lg mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg animate-fadeIn"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-800">
              Add Coffee Shop
            </h2>
          </div>
          <div className="mb-3">
            <h4 className="font-semibold mb-2 md:mb-4 text-lg md:text-xl">Basic Info</h4>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shop Name"
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-6">
            <h4 className="font-semibold mb-2 md:mb-4 text-lg md:text-xl">Address</h4>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="State"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Zipcode"
                required
              />
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm p-1.5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-describedby="file_input_help"
                required
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="w-24 md:w-36 py-2 md:py-3 px-4 md:px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
