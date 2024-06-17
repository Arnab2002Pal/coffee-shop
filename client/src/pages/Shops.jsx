import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";

const url = import.meta.env.VITE_BASE_URL;

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
    navigate(`/shops/${id}`);
  };

  return (
    <div className=" min-h-screen">
      <Banner search={search} handleSearch={handleSearch} />
      <div className="text-center mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-28">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Featured Coffee Shops</h1>
        {shops.length === 0 ? (
          <div className="text-center text-lg md:text-xl text-gray-500">No data found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">{shop.name}</h2>
                  <p className="text-gray-600 mb-4">{shop.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shops;
