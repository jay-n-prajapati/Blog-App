import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_DB_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const errRes = error.response;
    if (errRes) {
      console.log(errRes);
    }
  },
);

export const getUsers = async () => await instance.get('/users')
export const addUser = async (payload) => await instance.post('/users',payload)