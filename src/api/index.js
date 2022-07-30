import axios from 'axios';

// const API = axios.create({ baseURL:  'http://localhost:5000/'});
const API = axios.create({ baseURL:  'https://digidex-api.herokuapp.com/'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const filter = { name: '', level: null, page: 1, limit: 27 };
export const fetchDigimons = (filterData, setLoading) => API.post(`/digimons/list`, filterData).finally(() => setLoading != null ? setLoading(false) : null);
export const createDigimon = (newPost) => API.post('/digimons', newPost);
export const updateDigimon = (id, updatedPost) => API.patch(`/digimons/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/digimons/${id}`);
export const findById = (id) => API.get(`/digimons/${id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);