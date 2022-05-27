import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index';
import { toast } from 'react-toastify';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        return toast.error(error.response.data.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        toast.success("Digimon successfully created!");

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        return toast.error(error.response.data.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data});

        toast.success("Digimon successfully edited!");

    } catch (error) {
        return toast.error(error.response.data.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        let data;
        await api.deletePost(id).then((response) => data = response.data);

        dispatch( { type: DELETE, payload: id });

        toast.success(data.message);
    } catch (error) {
        return toast.error(error.response.data.message);
    }
}

export const findDigimonById = async(id) => {
    try {
        let data;
        await api.findById(id).then((response) => data = response.data);

        return data;
    } catch (error) {
        return toast.error(error.response.data.message);
    }
}