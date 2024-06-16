import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserOption = () => {
  const navigate = useNavigate();

  const buttonVariants = {
    hover: {
      backgroundColor: "#CDE8E5",
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    }
  };

  const arrowVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 gap-4">
          <motion.div
            className="flex items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => navigate('/register')}
          >
            <span className="text-teal-800">Create Store</span>
            <motion.span
              className="ml-2"
              variants={arrowVariants}
              initial="initial"
              animate="animate"
            >
            </motion.span>
          </motion.div>
          <div>
            <img
              className="w-full h-auto rounded-md"
              src="https://media-cdn.tripadvisor.com/media/photo-s/11/db/5e/d4/vidriera.jpg"
              alt=""
            />
          </div>
          <motion.div
            className="flex items-center justify-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
            variants={buttonVariants}
            whileHover="hover"
            onClick={() => navigate('/shops')}
          >
            <motion.span
              className="mr-2"
              variants={arrowVariants}
              initial="initial"
              animate="animate"
            >
            </motion.span>
            <span className="">Navigate Store</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserOption;
