import React, { useEffect, useState } from 'react';
import { Container, Grow, Button } from '@material-ui/core';
import { useDispatch } from  'react-redux';

import { getPosts } from '../../../actions/posts';
import Posts from '../../Posts/Posts';
import Form from '../../Form/Form';
import Drawer from '../../Drawer/Drawer'

const Home = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <>
        <Drawer />
        <Container maxwidth="lg" open={open}>
            <Button variant="contained" color="primary" onClick={() => {handleOpen(); setCurrentId(null)}}>ADD</Button>
            <Grow in>
                <Container>
                    <Form isOpen={open} onClose={handleClose} currentId={currentId} setCurrentId={setCurrentId} />
                    <Posts openModal={handleOpen} setCurrentId={setCurrentId} />
                </Container>
            </Grow>
        </Container>
        </>
    );
}

export default Home;