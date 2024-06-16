import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGeocode } from '../api/service'; // Import the geocode utility
import { registerShop } from '../api/util';

const url = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY

const Form = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        image: '',
        products: ['']
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
        if (name.startsWith('product-')) {
            const index = parseInt(name.split('-')[1], 10);
            const updatedProducts = formData.products.map((product, i) =>
                i === index ? value : product
            );
            setFormData({ ...formData, products: updatedProducts });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddProduct = () => {
        setFormData({ ...formData, products: [...formData.products, ''] });
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData({ ...formData, products: updatedProducts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const location = await getGeocode({
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipcode: formData.zipcode
            }, apiKey);

            const newShop = {
                name: formData.name,
                description: formData.description,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipcode: formData.zipcode
                },
                location,
                image: formData.image,
                products: formData.products
            };

            await registerShop(url, newShop);
            navigate('/shops');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='grid grid-cols-2'>
            <div className='ml-10'>
                {imagePreview ? (
                    <>
                        <img src={imagePreview} alt="Image Preview" className="mt-4 w-full object-contain rounded-lg shadow-md" />
                        <div className='mt-4 text-4xl w-full flex flex-row justify-center items-center font-semibold'>
                            Image Preview
                        </div>
                    </>
                ) : (
                    <div className="mt-4 text-gray-500 text-center">
                        No image uploaded yet
                    </div>
                )}
            </div>
            <div>
                <form className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg animate-fadeIn" onSubmit={handleSubmit}>
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add Coffee Shop</h2>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Zipcode</label>
                            <input
                                type="text"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm p-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-describedby="file_input_help"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Products</label>
                        {formData.products.map((product, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    name={`product-${index}`}
                                    value={product}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Product name"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveProduct(index)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddProduct}
                            className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                        >
                            + Add Product
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Form;
