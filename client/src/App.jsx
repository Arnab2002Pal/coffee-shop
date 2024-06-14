import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [image, setImage] = useState({});
  const [display, setDisplay] = useState();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      console.log(Reader.result);
      setImage(Reader.result);
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/666c3e7598a21436b710b701"
        );
        const data = response.data;
        console.log(data);
        setDisplay(data.data.image.url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <button
        onClick={async () => {
          const response = await axios.get("http://localhost:3000/api/v1");
          console.log(response.data);
        }}
      >
        clickME
      </button>
      <input type="file" onChange={(e) => handleImage(e)} accept="image/*" />

      <button
        onClick={async () => {
          const response = await axios.post(
            "http://localhost:3000/api/v1/registerShop",
            {
              name: " New Coffee",
              description: "enjoy coffee with Sung Jin Woo",
              address: {
                street: "123 Coffee St",
                city: "Coffeetown",
                state: "CA",
                zipcode: "90001",
              },
              location: {
                coordinates: [-118.2437, 34.0522],
              },
              image: image,
              ratings: 4.5,
              products: [],
            }
          );
          console.log(response.data);
        }}
      >
        Submit
      </button>
      <img src={display} />
    </>
  );
}

export default App;
