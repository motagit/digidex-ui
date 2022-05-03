import { Grid, Container, Grow, Paper, Typography, Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { digimonModel } from '../../Models/digimon.model';

const Digimon = () => {
    const [postData, setPostData] = useState(digimonModel);
    let digimonParams  = useParams();
    const post = useSelector((state) => digimonParams.id ? state.posts.find((p) => p._id === digimonParams.id) : null);
    const allPosts = useSelector((state) => state.posts);
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const findNameById = (id) => {
        let digimon = allPosts.find(element => element._id === id);
        if (typeof digimon != 'undefined') {
            console.log(digimon);
            return digimon.name;
        } 
    }

    console.log(digimonParams);

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
                    <Grid container rowSpacing={3} sx={{padding: 3}}>
                        <Grid item xs={12} direction="row">
                            <Typography variant="h4" component="h4" align='center'>
                                #{postData.number} - {postData.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={9} direction="column">
                            <Typography variant="body2" component="div">
                                <span>
                                    {postData.information}
                                </span>
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={3} direction="column" style={{textAlign: 'center'}}>
                            <Box component="span" sx={{ pt: '60px', pb: '40px', pr:'48px', pl: '48px', ml: '10px' ,border: '1px dashed grey' }}>
                                <img className="image" loading="lazy" src={postData.iconSource} alt={postData.name} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} direction="row">
                            <Typography variant="body2" component="div">
                                <b>Level: </b>
                                <span>{postData.level}</span>
                            </Typography>
                            <Typography variant="body2" component="div">
                                <b>Attribute: </b>
                                <span>{postData.attribute}</span>
                            </Typography>
                            <Typography variant="body2" component="div">
                                <b>Type: </b>
                                <span>
                                    0
                                </span>
                            </Typography>
                            <Typography variant="body2" component="div">
                                <b>Family: </b>
                                <span>
                                    0
                                </span>
                            </Typography>
                            <Typography variant="body2" component="div">
                                <b>Weight: </b>
                                <span>
                                    0
                                </span>
                            </Typography>
                            <Typography variant="body2" component="div">
                                <b>Prior forms: </b>
                                <span>
                                    0
                                </span>
                            </Typography>
                            <Typography variant="body2" component="div">
                                <b>Next forms: </b>
                                {postData.nextForms ? (
                                    postData.nextForms.map((digimon, index) => (
                                        <span>
                                            <Link to={'/digimon/' + digimon._id}>
                                                {findNameById(digimon._id)}
                                                
                                            </Link>
                                            {index !== postData.nextForms.length - 1 ? (
                                                <span>, </span>

                                            ) : <span>.</span>}
                                        </span>
                                    ))
                                   
                                ): null}
                            </Typography>

                            
                        </Grid>

                        <Divider />

                        <Grid item xs={12} direction="row">
                            <Typography variant="h6" component="h6">
                                <b>Attacks</b>
                            </Typography>
                            <ul>
                                {postData.attacks.map((singleAttack, index) => (
                                    <li key={index} style={{fontSize: 14}}>
                                        <b>{singleAttack.name}</b>: {singleAttack.description}
                                    </li>
                                ))}
                            </ul>
                        </Grid>

                        {postData.design ? (
                            <Grid item xs={12} direction="row">
                                <Typography variant="h6" component="h6">
                                    <b>Design</b>
                                </Typography>
                                <Typography variant="body2" component="div">
                                    {postData.design}
                                </Typography>
                            </Grid>
                        ) : null}

                    </Grid>
                </Paper>
            </Grow>
        </Container>
    )

}

export default Digimon;