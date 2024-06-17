import axios from "axios";

export const registerShop = async (BASE_URL, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/registerShop`, data);
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const AddProduct = async(BASE_URL, newProduct)=>{
  try {
    const response = await axios.post(`${BASE_URL}/products`, newProduct);
    return {
      data: response,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

export const fetchProducts = async (BASE_URL, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/products`);
    return {
      data: response.data,
    }
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const getAllShops = async (BASE_URL, search) => {
  try {
    const response = await axios.get(`${BASE_URL}?search=${search}`);
    return {
      data: response.data.data,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const editShop = async (BASE_URL, id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const deleteShop = async (BASE_URL, id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};
