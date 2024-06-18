import { FaEdit, FaTrash } from 'react-icons/fa';

export const ShopImage = ({ shop, handleEdit, handleDelete }) => (
    <div className="relative">
        <img
            className="w-full rounded-lg h-64 md:h-auto object-cover mb-6 shadow-lg"
            src={shop.image.url}
            alt={shop.name}
        />
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
);


export const ShopDetailsContent = ({ shop, handleEdit, handleDelete }) => (
    <div className="w-full md:w-1/2 p-6">
        <ShopImage shop={shop} handleEdit={handleEdit} handleDelete={handleDelete} />
        <h2 className="text-3xl font-semibold text-gray-800">{shop.name}</h2>
        <p className="text-gray-600 mb-6">{shop.description}</p>
        <div>
            <h3 className="text-xl font-semibold text-gray-700">Address:</h3>
            <p className="text-gray-600">
                {`${shop.address.street}, ${shop.address.city}, ${shop.address.state}, ${shop.address.zipcode}`}
            </p>
        </div>
    </div>
);

export const Loading = () => (
    <div className="flex justify-center items-center h-screen">Loading...</div>
);

export const Error = ({ message }) => (
    <div className="flex justify-center items-center h-screen text-red-600">Error: {message}</div>
);
