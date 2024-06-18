import noImage from '../assets/no-image.jpg'

export const ImagePreview = ({ imagePreview }) => (
    <div className="md:w-1/2 p-4">
        {imagePreview ? (
            <>
                <div className="mt-7 mb-7 text-4xl w-full flex justify-center items-center font-bold">
                    Image Preview
                </div>
                <div className="flex justify-center items-center">
                    <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="mt-4 w-3/4 md:w-2/3 object-contain rounded-lg shadow-md"
                    />
                </div>
            </>
        ) : (
            <div className="mt-4 text-gray-500 flex items-center justify-center opacity-25">
                <img src={noImage} alt="No Image" className="w-3/4 md:w-2/3" />
            </div>
        )}
    </div>
);

export const InputField = ({ id, name, label, value, onChange, placeholder, type = "text" }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        {type === "textarea" ? (
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        ) : (
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
        )}
    </div>
);

export const TextAreaField = ({ name, value, onChange, placeholder }) => (
    <div className="mb-6">
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            required
        />
    </div>
);

export const FileInput = ({ onChange }) => (
    <div>
        <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="block w-full mt-1 text-sm p-1.5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
    </div>
);