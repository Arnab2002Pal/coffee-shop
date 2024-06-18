import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditShopForm from '../components/EditShopForm';
import Map from '../components/Map';
import ProductCard from '../components/ProductCard';
import { Error, Loading, ShopDetailsContent } from '../components/ShopDetailComponents';

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

  const handleEdit = () => setShowEditForm(true);
  const handleCloseEditForm = () => setShowEditForm(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/${id}`);
      navigate('/');
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl h-full mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <ShopDetailsContent shop={shop} handleEdit={handleEdit} handleDelete={handleDelete} />
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
