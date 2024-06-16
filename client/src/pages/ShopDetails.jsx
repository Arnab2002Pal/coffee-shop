import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Map from '../components/Map';

const url = import.meta.env.VITE_BASE_URL;

const ShopDetails = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchShopDetails();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-600">Error: {error.message}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen pt-24">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/2 p-6">
                    <img className="w-full h-64 object-cover mb-6" src={shop.image.url} alt={shop.name} />
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{shop.name}</h2>
                    <p className="text-gray-600 mb-6">{shop.description}</p>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Products:</h3>
                        <ul className="flex flex-wrap gap-2">
                            {shop.products.map((product, index) => (
                                <li key={index} className="px-4 py-2 rounded-full bg-teal-700 text-white hover:bg-teal-800 transition-colors duration-200">
                                    {product}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Address:</h3>
                        <p className="text-gray-600">{`${shop.address.street}, ${shop.address.city}, ${shop.address.state}, ${shop.address.zipcode}`}</p>
                    </div>
                </div>
                <div className="md:w-1/2 h-[400px] md:h-auto">
                    <Map lat={shop.location.lat} lng={shop.location.long} />
                </div>
            </div>
        </div>
    );
};

export default ShopDetails;
