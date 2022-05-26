import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', data });

        navigate('/');
        navigate(0);
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: 'AUTH', data });

    } catch (error) {
        console.log(error);
    }
}