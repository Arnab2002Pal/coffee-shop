import axios from 'axios';
const api_key = import.meta.env.VITE_GEOAPIFY_API_KEY

export const getGeocode = async (address) => {
  const { street, city, state, zipcode } = address;
  const formattedAddress = `${street}, ${city}, ${state}, ${zipcode}`;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(formattedAddress)}&format=json&apiKey=${api_key}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if(data.results[0]){
        const { lat, lon } = data.results[0];
        return { lat, long: lon };
    }
  } catch (error) {
    console.error('Error fetching geocode:', error);
    throw error;
  }
};
