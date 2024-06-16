import axios from "axios";

export const registerShop = async(base_url,data)=>{
    try {
        const response = await axios.post(`${base_url}/registerShop`,data)
        return {
            data:response.data
        }       
    } catch (error) {
        console.log("ERROR: " + error)
        return {
            error:error
        }
    }
}


export const getAllShops = async (base_url, search) => {
    try {
        const response = await axios.get(`${base_url}?search=${search}`);
        console.log("----------------------",response.data.data);
        return {
            data: response.data.data
        };       
    } catch (error) {
        console.log("ERROR: " + error);
        return {
            error: error
        };
    }
};