import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white rounded-lg shadow m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024. All Rights Reserved.
          </span>
          <span className="text-sm text-gray-500 sm:text-center flex items-center mt-2 md:mt-0">
            Developed by{" "}
            <a
              href="https://github.com/Arnab2002Pal"
              className="flex items-center ml-1 text-blue-500 hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Arnab2002Pal <FaGithub className="ml-1" />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
