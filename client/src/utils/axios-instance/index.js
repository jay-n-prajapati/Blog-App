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
  (response) => {
    return {
      success: true,
      data: response.data,
      error: null
    };
  },
  (error) => {
    console.error("Global error interceptor:", error);
    return Promise.reject({
      success: false,
      data: [],
      error: error.message
    });
  }
);




export const findUser = (endpoint,email) => instance.get(`${endpoint}?email=${email}`);
export const getUsers = async () => await instance.get('/users')
export const addUser = async (payload) => await instance.post('/users',payload)

export const getSubAdmin = async () => await instance.get('/subAdmins')
export const addSubAdmin = async (payload) => await instance.post('/subAdmins',payload)

export const getCategories = async () => await instance.get('/categories')
export const getSingleCategories = async (parentCategory) => await instance.get(`/categories?parentCategory=${parentCategory}`)

export const addPublishedBlog = async (id,endpoint,savedBlogs) => await instance.patch(`/${endpoint}/${id}`,savedBlogs)

export const getBlogs = async () => await instance.get('/blogs')
export const postBlog = async (payload) => await instance.post('/blogs',payload)