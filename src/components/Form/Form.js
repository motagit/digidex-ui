import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography, Grow, Container , Grid, Button, InputLabel, Select, MenuItem, FormControl, IconButton, Autocomplete } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createDigimon, updateDigimon } from '../../actions/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { digimonModel, levelOptions, attributeOptions } from '../Models/digimon.model';
import { getDigimons } from '../../actions/posts';
import { CircularProgress } from '@material-ui/core';
import "./Form.scss"

const Form = () => {
    const [postData, setPostData] = useState(digimonModel);
    const [fileName, setFilename] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const [loading, setLoading] = useState(false);

    let digimonParams  = useParams();
    const allPosts = useSelector((state) => state.posts);
    const post = useSelector((state) => digimonParams.id && allPosts.digimons.find((p) => p._id === digimonParams.id));
    let nextFormPosts = allPosts.digimons.filter((post) => post._id !== digimonParams.id && post.level._id !== 0 && post.level._id !== postData.level._id);

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
            if (e != null) {
                const value = e;
                const list = [...nextForm];

                list[index] = {
                    _id: value._id,
                    name: value.name
                };
                setNextForm(list);   
                console.log(nextForm); 
            }
        };
        
        const handleNextFormRemove = (index) => {
            const list = [...nextForm];
            list.splice(index, 1);
            setNextForm(list);
    
        };
        
        const handleNextFormAdd = () => {
            setNextForm([...nextForm, { _id: '', name: ''}]);
        };

    useEffect(() => {
        if(post) setPostData(post);
        if(post) setAttack(post.attacks);
        if(post) setNextForm(post.nextForms);
    }, [post])

    useEffect(() => {
        dispatch(getDigimons());
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        postData.attacks = attack;
        postData.nextForms = nextForm;
        setLoading(true);

        if(digimonParams.id) {
            dispatch(updateDigimon(digimonParams.id, { ...postData, userCreator: user?.result?.user }, navigate, setLoading));
        } else {
            dispatch(createDigimon({ ...postData, userCreator: user?.result?.user }, navigate, setLoading));
        }
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
                                <div className="fileInput">
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<UploadFileIcon />}
                                        sx={{ marginRight: "1rem" }}
                                    >
                                        {fileName === "" ? (
                                            <span>Upload Digimon Image/GIF</span>
                                        ) : (
                                            <span>{fileName}</span>
                                        )}
                                        
                                        <FileBase 
                                            type="file"
                                            multiple={false}
                                            onDone={({base64, name}) => {setPostData({ ...postData, iconSource: base64 }); setFilename(name)}}
                                        />
                                    </Button>
                                </div>
                            </Grid>

                            <Grid item xs={8} direction="row">
                                <TextField 
                                    className="inputField"
                                    name="name" 
                                    variant="outlined" 
                                    label="Name" 
                                    fullWidth 
                                    value={postData.name}
                                    onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} direction="row">
                                <FormControl fullWidth>
                                    <InputLabel>Level</InputLabel>
                                    <Select
                                        label="Level"
                                        value={postData.level._id}
                                        onChange={(e) => setPostData({ ...postData, level: levelOptions[+e.target.value] })}
                                    >
                                        {levelOptions.map((option, index) => (
                                            <MenuItem value={index} key={index}>{option.name}</MenuItem>
                                        ))}
                                    
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={8} direction="row">
                                <FormControl fullWidth>
                                    <InputLabel>Attribute</InputLabel>
                                    <Select
                                        label="Attribute"
                                        value={postData.attribute._id}
                                        onChange={(e) => setPostData({ ...postData, attribute: attributeOptions[+e.target.value] })}
                                    >
                                        {attributeOptions.map((option, index) => (
                                            <MenuItem value={index} key={index}>{option.name}</MenuItem>
                                        ))}
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

                                    {attack.length < 1 && (
                                        <IconButton aria-label="add" size="small" onClick={handleAttackAdd}>
                                            <AddBox fontSize="medium" />
                                        </IconButton>
                                    )}
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
                                        <IconButton aria-label="remove" size="large" onClick={() => handleAttackRemove(index)}>
                                            <DisabledByDefaultIcon fontSize="medium" />
                                        </IconButton>
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
                                        <FormControl style={{width: '40%'}}>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={nextFormPosts}
                                                value={digimon.name}
                                                getOptionLabel={option => option.name || digimon.name}
                                                sx={{ width: 203.3 }}
                                                renderInput={(option) => (
                                                    <TextField {...option} value={option._id} key={option._id} label="Digimon"/>
                                                )}
                                                onChange={(event, value) => handleNextFormChange(value, index)}
                                            />
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

                            <Grid item xs={12}>
                                <Button sx={{width: 100}} 
                                    variant="contained" 
                                    color="primary"
                                    size="large" 
                                    type="submit" 
                                    fullWidth
                                    disabled={loading}>
                                        {loading ? <CircularProgress size={26} /> : "Submit" }
                                </Button>
                            </Grid>   
                        </Grid>
                    </form>
                </Paper>
            </Grow>
        </Container>
    );
}

export default Form;