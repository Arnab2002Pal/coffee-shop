import { useState } from "react";
import { getGeocode } from "../api/service";
import { editShop } from "../api/util";
import { InputField } from "./CustomInput";

const url = import.meta.env.VITE_BASE_URL;

const EditShopForm = ({ shopData, handleClose, refreshShopData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: shopData.name,
    description: shopData.description,
    address: {
      street: shopData.address.street,
      city: shopData.address.city,
      state: shopData.address.state,
      zipcode: shopData.address.zipcode,
    },
    location: shopData.location,
    ratings: shopData.ratings,
    image: shopData.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const location = await getGeocode({
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        zipcode: formData.address.zipcode,
      });

      const editedShop = {
        name: formData.name,
        description: formData.description,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipcode: formData.address.zipcode,
        },
        location,
        image: formData.image,
      };
      await editShop(url, shopData._id, editedShop);
      refreshShopData();
      handleClose();
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Shop</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            type="textarea"
          />
          <InputField
            id="street"
            name="street"
            label="Street"
            value={formData.address.street}
            onChange={handleAddressChange}
          />
          <InputField
            id="city"
            name="city"
            label="City"
            value={formData.address.city}
            onChange={handleAddressChange}
          />
          <InputField
            id="state"
            name="state"
            label="State"
            value={formData.address.state}
            onChange={handleAddressChange}
          />
          <InputField
            id="zipcode"
            name="zipcode"
            label="Zipcode"
            value={formData.address.zipcode}
            onChange={handleAddressChange}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShopForm;
