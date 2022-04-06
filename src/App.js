import React, { useEffect, useState } from 'react';
import { Container, Grow, Button } from '@material-ui/core';
import { useDispatch } from  'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

const App = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <Container maxwidth="lg">
            <Grow in>
                <Container>
                    <Button variant="contained" color="primary" onClick={handleOpen}>Insert Digimon</Button>
                    <Form isOpened={open} onClose={handleClose}/>
                    <Posts />
                </Container>
            </Grow>
        </Container>
    );
}

export default App;