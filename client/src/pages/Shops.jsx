import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { getAllShops } from "../api/util";
const url = import.meta.env.VITE_BASE_URL

const Shops = () => {
  const [search, setSearch] = useState("");
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getAll = async (search) => {
    try {
      const res = await axios.get(`${url}?search=${search}`);
      const data = await res.data.data;
      setShops(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getAll(search);
  }, [search]);

  const handleCardClick = (id) => {
     navigate(`/shops/${id}`)
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Banner search={search} handleSearch={handleSearch} />
      <div className="text-center mt-4">
        <h1 className="text-3xl font-bold mb-8">Featured Coffee Shops</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(shop._id)}
            >
              <img
                className="w-full h-48 object-cover"
                src={shop.image.url}
                alt={shop.name}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{shop.name}</h2>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Products:</h3>
                <ul className="flex flex-wrap items-center justify-center gap-2">
                  {shop.products.map((product, index) => (
                    <li key={index} className="px-4 py-2 rounded-full text-white bg-teal-700 hover:bg-teal-800 transition-colors duration-200">
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shops;
