import { AUTH } from '../constants/actionTypes';
import * as api from '../api';
import { toast } from 'react-toastify';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
        navigate(0);
    } catch (error) {
        return toast.error(error.response.data.message);
    }
}

export const signUp = (formData, formElement) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        formElement.target.reset();

        // open modal

    } catch (error) {
        return toast.error(error.response.data.message);
    }
}