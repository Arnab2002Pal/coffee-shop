import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { AddProduct, fetchProducts } from "../api/util";
import AddProductModal from "./AddProductModel";

const url = import.meta.env.VITE_BASE_URL;

const ProductCard = ({ coffeeShopId }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    coffeeShopId: coffeeShopId,
    name: "",
    category: "",
    price: "",
  });

  const fetch = async () => {
    const data = await fetchProducts(url, coffeeShopId);
    setProducts(data.data);
  };

  useEffect(() => {
    fetch();
  }, [coffeeShopId]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!categoryFilter || product.category === categoryFilter)
  );

  const handleAddProduct = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmitProduct = async () => {
    try {
      const response = await AddProduct(url, newProduct);
      setProducts([...products, response.data.data.product]);
      setShowModal(false);
      setNewProduct({
        coffeeShopId: coffeeShopId,
        name: "",
        category: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-lg mt-6 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="text"
            placeholder="Search Name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded w-full md:w-auto"
          />
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded w-full md:w-auto"
          >
            <option value="">All Categories</option>
            <option value="Coffee">Coffee</option>
            <option value="Drinks">Drinks</option>
            <option value="Food">Food</option>
          </select>
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 md:mt-0 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-green-600 transition flex flex-row justify-center items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-1">Category: {product.category}</p>
            <p className="text-gray-700">Price: Rs. {product.price}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <AddProductModal
          newProduct={newProduct}
          handleInputChange={handleInputChange}
          handleSubmitProduct={handleSubmitProduct}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default ProductCard;
