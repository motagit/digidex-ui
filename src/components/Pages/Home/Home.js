import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../../actions/posts';
import DigimonList from '../../DigimonList/DigimonList';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <Container style={{maxWidth: 'none'}}>
            <DigimonList/>
        </Container>
    );
}

export default Home;