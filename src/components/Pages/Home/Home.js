import React, { useEffect, useState } from 'react';
import { Container, Grow, Button } from '@mui/material';
import { useDispatch } from  'react-redux';
import { getPosts } from '../../../actions/posts';
import Posts from '../../Posts/Posts';
import Form from '../../Form/Form';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <>
        <Container maxwidth="lg">
            {/* <Button variant="contained" color="primary" onClick={() => {handleOpen(); setCurrentId(null)}}>ADD</Button> */}
            <Grow in>
                <Container>
                    <Posts/>
                </Container>
            </Grow>
        </Container>
        </>
    );
}

export default Home;