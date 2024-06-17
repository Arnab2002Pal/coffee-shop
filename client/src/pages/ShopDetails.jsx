import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditShopForm from '../components/EditShopForm';
import Map from '../components/Map';
import ProductCard from '../components/ProductCard';

const url = import.meta.env.VITE_BASE_URL;

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchShopDetails = async () => {
    try {
      const response = await axios.get(`${url}/${id}`);
      setShop(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/${id}`);
      navigate('/');
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl h-full mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-6">
          <div className="relative">
            <img className="w-full rounded-lg h-64 md:h-auto object-cover mb-6" src={shop.image.url} alt={shop.name} />
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800">{shop.name}</h2>
          <p className="text-gray-600 mb-6">{shop.description}</p>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Address:</h3>
            <p className="text-gray-600">
              {`${shop.address.street}, ${shop.address.city}, ${shop.address.state}, ${shop.address.zipcode}`}
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-auto z-10">
          <Map lat={shop.location.lat} lng={shop.location.long} />
        </div>
      </div>
      {showEditForm && (
        <EditShopForm
          shopData={shop}
          handleClose={handleCloseEditForm}
          refreshShopData={fetchShopDetails}
        />
      )}
      <ProductCard coffeeShopId={id} />
    </div>
  );
};

export default ShopDetails;
