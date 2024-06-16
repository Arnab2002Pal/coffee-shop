import BannerImg from '../assets/banner.jpg';

const Banner = ({ search, handleSearch }) => {
    return (
        <div className="relative h-[90vh]">
            {/* Banner Image with reduced visibility */}
            <div className="absolute inset-0 bg-contain bg-center opacity-70" style={{ backgroundImage: `url(${BannerImg})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Search Box */}
            <div className="relative z-10 flex justify-center items-center h-full w-full">
                <div className="p-2 rounded-lg shadow-lg">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-[40rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleSearch}
                        value={search}
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
