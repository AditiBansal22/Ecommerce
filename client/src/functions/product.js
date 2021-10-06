import axios from 'axios'

export const createProduct = async (product, authtoken) => {
        await axios.post(`http://localhost:8000/api/product`, product,{
        headers: {
            authtoken
        }
    })
};



export const getProductsByCount = async (count) =>
  await axios.get(`http://localhost:8000/api/products/${count}`);

      
  