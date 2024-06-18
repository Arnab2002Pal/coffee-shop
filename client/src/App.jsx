import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import NavBar from './components/NavBar';
import RegisterStore from './pages/RegisterStore';
import Shops from './pages/Shops';
import ShopDetails from './pages/ShopDetails';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/register' element={<RegisterStore />} />
          <Route path='/' element={<Shops />} />
          <Route path="/shops/:id" element={<ShopDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
