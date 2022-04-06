import React, { useState } from 'react';
import { TextField, Button, Typography, Modal, Box, Fade, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';
import './Form.scss';

const Form = ({ isOpened, onClose}) => {
    const posts = useSelector((state) => state.posts);
    const [postData, setPostData] = useState({
        number: posts.length + 1,
        name : '' ,
        iconSource: '',
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData));
        // fazer esquema para fechar modal depois do post
    }

    const clear = () => {

    }

    return (
        <Modal
            className="modal"
            open={isOpened}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Fade in={isOpened}>
                <Box className="box">
                    <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container direction={"column"} spacing={3}>
                            <Typography variant="h6">Insert a Digimon</Typography>
                            <Grid item>
                                <TextField 
                                    className="inputField"
                                    name="Number" 
                                    variant="outlined" 
                                    label="Number" 
                                    value={postData.number}
                                    disabled
                                    onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField 
                                    className="inputField"
                                    name="name" 
                                    variant="outlined" 
                                    label="Name" 
                                    fullWidth 
                                    value={postData.name}
                                    onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                                />
                            </Grid>
                            
                            <Grid item>
                                <div className="fileInput">
                                    <FileBase 
                                        type="file"
                                        multiple={false}
                                        onDone={({base64}) => setPostData({ ...postData, iconSource: base64 })}
                                    />
                                </div>
                            </Grid>

                            <Grid item>
                                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default Form;