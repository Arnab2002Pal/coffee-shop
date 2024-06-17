import BannerImg from "../assets/banner.jpg";

const Banner = ({ search, handleSearch }) => {
  return (
    <div className="relative h-[360px] md:h-[360px] lg:h-[360px]">
      <div
        className="absolute inset-0 bg-contain bg-center opacity-70"
        style={{
          backgroundImage: `url(${BannerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center pt-20 h-full w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-bold text-teal-800">
            Spot the Ultimate <span className="text-white">Coffee</span> Hangouts
          </h1>
        </div>
        <div className="p-2 rounded-lg shadow-lg mt-7 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={search}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
