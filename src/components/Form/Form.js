import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography, Grow, Container , Grid, Divider, Button, Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { digimonModel } from '../Models/digimon.model';


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState(digimonModel);
    let digimonParams  = useParams();
    const post = useSelector((state) => digimonParams.id ? state.posts.find((p) => p._id === digimonParams.id) : null);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        // fazer validação antes de dar post

        if(digimonParams.id) {
            dispatch(updatePost(digimonParams.id, postData));
        } else {
            dispatch(createPost(postData));
        }
        navigate("/", { replace: true });
        // loading
    }

    console.log(post);

    return (
        <Container maxwidth="lg" sx={{marginTop: 5}}>
            <Grow in>
                <Paper elevation={3} sx={{
                    maxWidth: 600,
                    margin: '0 auto',
                }} style={{
                    overflowY: 'auto', 
                    position: 'absolute', 
                    top: 100, bottom: 10, left: 10, right: 10
                }}>
                    <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container rowSpacing={3} sx={{padding: 3}}>
                            <Grid item xs={12} direction="row">
                                <Typography variant="h6">{digimonParams.id  ? 'Edit' : 'Insert'} a Digimon</Typography>
                            </Grid>
                            

                            <Grid item xs={12} direction="row">
                                <TextField 
                                    className="inputField"
                                    name="number" 
                                    variant="outlined" 
                                    label="Number" 
                                    value={postData.number}
                                    onChange={(e) => setPostData({ ...postData, number: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={8} direction="row">
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

                            <Grid item xs={8} direction="row">
                                <FormControl fullWidth>
                                    <InputLabel>Level</InputLabel>
                                    <Select
                                        label="Level"
                                        value={postData.level}
                                        onChange={(e) => setPostData({ ...postData, level: e.target.value })}
                                    >
                                        <MenuItem value={'Baby'}>Baby</MenuItem>
                                        <MenuItem value={'In-Training'}>In-Training</MenuItem>
                                        <MenuItem value={'Rookie'}>Rookie</MenuItem>
                                        <MenuItem value={'Champion'}>Champion</MenuItem>
                                        <MenuItem value={'Ultimate'}>Ultimate</MenuItem>
                                        <MenuItem value={'Mega'}>Mega</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={8} direction="row">
                                <FormControl fullWidth>
                                    <InputLabel>Attribute</InputLabel>
                                    <Select
                                        label="Attribute"
                                        value={postData.attribute}
                                        onChange={(e) => setPostData({ ...postData, attribute: e.target.value })}
                                    >
                                        <MenuItem value={'Vaccine'}>Vaccine</MenuItem>
                                        <MenuItem value={'Data'}>Data</MenuItem>
                                        <MenuItem value={'Virus'}>Virus</MenuItem>
                                        <MenuItem value={'Free'}>Free</MenuItem>
                                        <MenuItem value={'Variable'}>Variable</MenuItem>
                                        <MenuItem value={'Unknown'}>Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>



                            <Grid item xs={12} direction="row">
                                <div className="fileInput">
                                    <FileBase 
                                        type="file"
                                        multiple={false}
                                        onDone={({base64}) => setPostData({ ...postData, iconSource: base64 })}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <Button sx={{width: 100}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                            </Grid>   
                        </Grid>
                    </form>

                    {/* <Box component="span" sx={{ 
                    pt: '60px', 
                    pb: '40px', 
                    pr:'48px', 
                    pl: '48px', 
                    border: '1px dashed grey'}}
                    style={{
                        position: 'absolute',
                        top: 60,
                        right: 25
                    }}
                    >
                        <img className="image" loading="lazy" src={postData ? postData.iconSource : null} alt="" />
                    </Box> */}
                </Paper>
            </Grow>
        </Container>
    );
}

export default Form;