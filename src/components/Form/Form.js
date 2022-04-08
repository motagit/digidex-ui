import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Modal, Box, Fade, Grid, IconButton } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import './Form.scss';

import CloseIcon from '@mui/icons-material/Close';

const Form = ({ isOpen, onClose, currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        number: 0,
        name : '' ,
        iconSource: '',
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
        if (!post) clear();
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
            clear();
        }
        onClose();

        // fazer esquema para fechar modal depois do post aqui
    }

    console.log(post);
    console.log(postData);

    const clear = () => {
        setCurrentId(null);
        setPostData({ number: 0, name: '', iconSource: ''});
    }

    return (
        <Modal
            className="modal"
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Fade in={isOpen}>
                <Box className="box">
                    <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container direction={"column"} spacing={3} >
                            <Grid container direction={"row"} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="h6">{currentId  ? 'Edit' : 'Insert'} a Digimon</Typography>
                                <IconButton style={{padding: '0px'}} onClick={onClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                            

                            <Grid item>
                                <TextField 
                                    className="inputField"
                                    name="Number" 
                                    variant="outlined" 
                                    label="Number" 
                                    value={postData.number}
                                    onChange={(e) => setPostData({ ...postData, number: e.target.value })}
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
                                    // fazer esquema para o valor ser sempre o proximo number
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
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
}

export default Form;