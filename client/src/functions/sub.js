import axios from 'axios'

export const getSubs = async () => await axios.get(`http://localhost:8000/api/subs`);

// eslint-disable-next-line no-template-curly-in-string
export const getSub = async (slug) => await axios.get(`http://localhost:8000/api/sub/${slug}`);

// eslint-disable-next-line no-template-curly-in-string
export const removeSub = async (slug,authtoken) => await axios.delete(`http://localhost:8000/api/sub/${slug}`, {
    headers: {
        authtoken
    }
});

// eslint-disable-next-line no-template-curly-in-string
export const updateSub = async (slug,sub,authtoken) => await axios.put(`http://localhost:8000/api/sub/${slug}`, sub,{
    headers: {
        authtoken
    }
});

export const createSub = async (sub, authtoken) =>
  await axios.post(`http://localhost:8000/api/sub`, sub, {
    headers: {
      authtoken,
    },
  });



      
  