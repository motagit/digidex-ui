import axios from 'axios';

const name = 'digimons'
const url = 'http://localhost:5000/' + name;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const findById = (id) => axios.get(`${url}/${id}`);
