import backgroundImage from '../assets/wallpaper.jpg'
import { useLocation, useNavigate } from 'react-router-dom';


const Home = () => {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const handleLogin = async () => {
    await navigate('/choice');
  }
  return (
    <div className="bg-cover bg-no-repeat bg-center h-screen relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-row items-center justify-between h-full mx-20">
        <div className='text-white'>
          Lorem ipsum dolor sit.
          <div>
          <button onClick={handleLogin}>Get Started -&gt; </button>

          </div>
          </div>
        
        <div className='w-60'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima repudiandae accusantium tenetur perspiciatis neque voluptatem deserunt ratione architecto eligendi dolorum!</div>
      </div>
    </div>
  );
}

export default Home;
