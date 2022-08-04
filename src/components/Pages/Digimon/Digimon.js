import { Grid, Container, Grow, Paper, Typography, Box, Divider, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findDigimonById } from '../../../actions/posts';
import { digimonModel } from '../../Models/digimon.model';

const Digimon = () => {
    const [postData, setPostData] = useState(digimonModel);
    let digimonParams  = useParams();

    const getAnswer = async(id) => {
        const res = await findDigimonById(id);
        if (postData.name === '') setPostData(res);
        return res;
    }

    useEffect(() => {
        getAnswer(digimonParams.id);
    });


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
                    {postData.name === '' ? <LinearProgress /> : (
                        <>
                        <Grid container rowSpacing={3} sx={{padding: 3}}>
                            <Grid item xs={12} direction="row">
                                <Typography variant="h4" component="h4" align='center'>
                                    {postData.name}
                                </Typography>
                            </Grid>

                            <Grid item xs={8} direction="column">
                                <Typography variant="body2" component="div">
                                    <span>
                                        {postData.information}
                                    </span>
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={4} direction="column" style={{paddingLeft: '10px'}}>
                                <Box sx={{ height: 160, border: '1px dashed grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img className="image" loading="lazy" src={postData.iconSource} alt={postData.name}  />
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container rowSpacing={3} sx={{padding: 3}}>
                            <Grid item xs={12} direction="row">
                                <Typography variant="body2" component="div">
                                    <b>Level: </b>
                                    <span>
                                        {postData.level.name}
                                    </span>
                                </Typography>
                                <Typography variant="body2" component="div">
                                    <b>Attribute: </b>
                                    <span>{postData.attribute.name}</span>
                                </Typography>
                                
                                {postData.priorForms.length > 0 && postData.level !== 'Baby' ? (
                                <Typography variant="body2" component="div">
                                    <b>Prior forms: </b>
                                    {postData.priorForms ? (
                                        postData.priorForms.map((digimon, index) => (
                                            <span>
                                                <a href={'/digimon/' + digimon._id}>
                                                    {digimon.name}
                                                    
                                                </a>
                                                {index !== postData.priorForms.length - 1 ? (
                                                    <span>, </span>

                                                ) : null}
                                            </span>
                                        ))
                                    ) : null}
                                </Typography>
                                ) : null}

                                {postData.nextForms.length > 0 ? (
                                <Typography variant="body2" component="div">
                                    <b>Next forms: </b>
                                        {postData.nextForms.map((digimon, index) => (
                                            <span>
                                                <a href={"/digimon/" + digimon._id}>
                                                    {digimon.name}
                                                    
                                                </a>
                                                {index !== postData.nextForms.length - 1 ? (
                                                    <span>, </span>

                                                ) : null}
                                            </span>
                                        ))}
                                </Typography>
                                ): null}
                            </Grid>

                            <Divider />

                            {postData.attacks.length > 0 ? (                    
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
                            ) : null}

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
                        </>
                    )}    
                </Paper>
            </Grow>
        </Container>
    )

}

export default Digimon;