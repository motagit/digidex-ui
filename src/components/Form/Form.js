import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography, Grow, Container , Grid, Divider, Button, Box, InputLabel, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { digimonModel } from '../Models/digimon.model';
import { getPosts } from '../../actions/posts';

const Form = () => {
    const [postData, setPostData] = useState(digimonModel);
    let digimonParams  = useParams();
    const post = useSelector((state) => digimonParams.id ? state.posts.find((p) => p._id === digimonParams.id) : null);
    const allPosts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [attack, setAttack] = useState(digimonModel.attacks);

        const handleAttackChange = (e, index) => {
            const value = e.target.value;
            const list = [...attack];

            if (e.target.name.includes("Name")) 
                list[index].name = value
            else 
                list[index].description = value
            setAttack(list);
            console.log(attack);

        };
        
        const handleAttackRemove = (index) => {
            const list = [...attack];
            list.splice(index, 1);
            setAttack(list);
            console.log(attack);

        };
        
        const handleAttackAdd = () => {
            setAttack([...attack, { name: '', description: '' }]);
        };
    
    const [nextForm, setNextForm] = useState(digimonModel.nextForms);
    
        const handleNextFormChange = (e, index) => {
            const value = e.target.value;
            const list = [...nextForm];
    
            list[index]._id = value

            setNextForm(list);
            console.log(nextForm);
    
        };
        
        const handleNextFormRemove = (index) => {
            const list = [...nextForm];
            list.splice(index, 1);
            setNextForm(list);
            console.log(nextForm);
    
        };
        
        const handleNextFormAdd = () => {
            setNextForm([...nextForm, { _id: ''}]);
        };


    useEffect(() => {
        if(post) setPostData(post);
        if(post) setAttack(post.attacks);
        if(post) setNextForm(post.nextForms);
    }, [post])

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(digimonParams.id) {
            postData.attacks = attack;
            postData.nextForms = nextForm;
            console.log(postData);
            dispatch(updatePost(digimonParams.id, postData));
        } else {
            postData.attacks = attack;
            postData.nextForms = nextForm;
            console.log(postData);
            dispatch(createPost(postData));
        }
        navigate("/", { replace: true });
        // loading
    }

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
                                <Typography variant="h5"><b>{digimonParams.id  ? 'Edit' : 'Insert'} a Digimon</b></Typography>
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
                                <TextField
                                    label="General Information"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    value={postData.information}
                                    onChange={(e) => setPostData({ ...postData, information: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} direction="row">
                                <TextField
                                    label="Design"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={postData.design}
                                    onChange={(e) => setPostData({ ...postData, design: e.target.value })}
                                />
                            </Grid>

                            
                            <Grid item xs={12} direction="row">
                                <Typography variant="h6" component="h6" style={{marginBottom: 20}}>
                                    <b>Attacks</b>
                                </Typography>
                                {attack.map((singleAttack, index) => (
                                    <div key={index} style={index > 0 ? {marginTop: 20} : null}>
                                        <TextField 
                                            label="Name" 
                                            name="Name" 
                                            style={{marginRight: 10, width: '38%'}}
                                            value={singleAttack.name}
                                            onChange={(e) => handleAttackChange(e, index)}
                                            multiline
                                            rows={3}
                                            required
                                        />

                                    
                                        <TextField 
                                            label="Description"
                                            name="Description" 
                                            style={{marginRight: 10, width: '40%'}}
                                            value={singleAttack.description}
                                            onChange={(e) => handleAttackChange(e, index)}
                                            multiline
                                            rows={3}
                                            required
                                        />

                                        {attack.length - 1 === index && attack.length < 4 && (
                                            <IconButton aria-label="add" size="large" onClick={handleAttackAdd}>
                                                <AddBox fontSize="medium" />
                                            </IconButton>
                                        )}
                                        {attack.length !== 1 && (
                                            <IconButton aria-label="remove" size="large" onClick={() => handleAttackRemove(index)}>
                                                <DisabledByDefaultIcon fontSize="medium" />
                                            </IconButton>
                                        )}
                                    </div>
                                ))}
                            </Grid>

                            <Grid item xs={12} direction="row">
                                <Typography variant="h6" component="h6" style={{marginBottom: 20}}>
                                    <b>Next forms</b>
                                    {nextForm.length < 1 && (
                                        <IconButton aria-label="add" size="small" onClick={handleNextFormAdd}>
                                            <AddBox fontSize="medium" />
                                        </IconButton>
                                    )}
                                </Typography>
                                
                                {nextForm.map((digimon, index) => (
                                    <div key={index} style={index > 0 ? {marginTop: 20} : null}>
                                        <FormControl style={{width: '67%'}}>
                                            <InputLabel>Digimon</InputLabel>
                                            <Select
                                                label="Digimon"
                                                value={digimon._id}
                                                onChange={(e) => handleNextFormChange(e, index)}
                                            >
                                                {allPosts.map((nextForm, index) => (
                                                    <MenuItem 
                                                        value={nextForm._id}
                                                        key={nextForm._id}
                                                    >
                                                        {nextForm.name}
                                                    </MenuItem>
                                                    
                                                ))} 
                                            </Select>
                                        </FormControl>
                                        {nextForm.length - 1 === index && nextForm.length < 4 && (
                                            <IconButton aria-label="add" size="small" onClick={handleNextFormAdd}>
                                                <AddBox fontSize="medium" />
                                            </IconButton>
                                        )}
                                        <IconButton aria-label="remove" size="small" onClick={() => handleNextFormRemove(index)}>
                                            <DisabledByDefaultIcon fontSize="medium" />
                                        </IconButton>
                                    </div>
                                ))}
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
                </Paper>
            </Grow>
        </Container>
    );
}

export default Form;