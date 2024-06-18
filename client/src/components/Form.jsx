import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGeocode } from "../api/service";
import { registerShop } from "../api/util";
import { FileInput, ImagePreview, InputField, TextAreaField } from "./CustomInput";

const url = import.meta.env.VITE_BASE_URL;

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
  const [loading, setLoading] = useState(false);

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col md:flex-row">
      <ImagePreview imagePreview={imagePreview} />
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
          <InputField
            label="Basic Info"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Shop Name"
          />
          <TextAreaField
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <InputField
            label="Address"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <InputField
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            <InputField
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <InputField
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              placeholder="Zipcode"
            />
            <FileInput onChange={handleImageChange} />
          </div>
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="w-24 md:w-36 py-2 md:py-3 px-4 md:px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;