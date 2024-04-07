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
    return Promise.reject({
      success: false,
      data: [],
      error: error.message
    });
  }
);



export const findUser = (endpoint,email) => instance.get(`${endpoint}?email=${email}`);
export const getUsers = async () => await instance.get('/users')
export const getUser = async (id) => await instance.get(`/users/${id}`)
export const addUser = async (payload) => await instance.post('/users',payload)
export const updateUser = async (id,endpoint,payload) => await instance.patch(`/${endpoint}/${id}`,payload)


export const getSubAdmin = async () => await instance.get('/subAdmins')
export const addSubAdmin = async (payload) => await instance.post('/subAdmins',payload)

export const getCategories = async () => await instance.get('/categories')
export const getSingleCategories = async (parentCategory) => await instance.get(`/categories?parentCategory=${parentCategory}`)


export const getSingleBlogs = async (blogId) => await instance.get(`/blogs?id=${blogId}`)
export const getUsersBlogs = async (authorId) => await instance.get(`/blogs?authorId=${authorId}`)
export const getBlogs = async (authorId) => await instance.get(`/blogs?authorId_ne=${authorId}`)
export const postBlog = async (payload) => await instance.post('/blogs',payload)
export const updateBlog = async (blogId , payload) => await instance.patch(`/blogs/${blogId}`,payload)
export const deleteBlog = async (blogId) => await instance.delete(`/blogs/${blogId}`)