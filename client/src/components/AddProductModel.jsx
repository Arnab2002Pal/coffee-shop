import React from "react";

const AddProductModal = ({
  newProduct,
  handleInputChange,
  handleSubmitProduct,
  setShowModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 border rounded w-full"
        >
          <option value="">Select Category</option>
          <option value="Coffee">Coffee</option>
          <option value="Drinks">Drinks</option>
          <option value="Food">Food</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitProduct}
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
