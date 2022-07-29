import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index';
import { toast } from 'react-toastify';

export const getDigimons = (filter, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.fetchDigimons(filter, setLoading);

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        return toast.error(error.response.data.message);
    }
}

export const createDigimon = (post, navigate, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.createDigimon(post);

        dispatch({ type: CREATE, payload: data });

        toast.success("Digimon successfully created!");

        setLoading(false);

        navigate('/');

    } catch (error) {
        setLoading(false);
        return toast.error(error.response.data.message);
    }
}

export const updateDigimon = (id, post, navigate, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.updateDigimon(id, post);

        dispatch({ type: UPDATE, payload: data});

        toast.success("Digimon successfully edited!");

        setLoading(false);
        
        navigate('/');

    } catch (error) {
        setLoading(false);
        return toast.error(error.response.data.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        let data;
        await api.deletePost(id).then((response) => data = response.data);

        dispatch( { type: DELETE, payload: id });

        toast.success(data.message);

        dispatch(getDigimons(api.filter));

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