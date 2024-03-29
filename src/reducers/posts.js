import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts.digimons, action.payload];
        case UPDATE:
            return posts.digimons.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.digimons.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}