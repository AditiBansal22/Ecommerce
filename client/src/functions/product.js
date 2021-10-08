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


export const removeProduct = async (slug,authtoken) => await axios.delete(`http://localhost:8000/api/product/${slug}`, {
    headers: {
        authtoken
    }
});


export const getProduct = async (slug) =>
  await axios.get(`http://localhost:8000/api/product/${slug}`);

  export const updateProduct = async (slug,product,authtoken) => await axios.put(`http://localhost:8000/api/product/${slug}`, product,{
    headers: {
        authtoken
    }
});

      
  