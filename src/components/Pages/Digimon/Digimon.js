import { Container, Grow, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Digimon = () => {
    const [postData, setPostData] = useState({
        number: 0,
        name : '' ,
        iconSource: '',
    });
    let digimonParams  = useParams();
    const post = useSelector((state) => digimonParams.id ? state.posts.find((p) => p._id === digimonParams.id) : null);
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])
    console.log(digimonParams);

    return (
        <Container maxwidth="lg" sx={{marginTop: 5}}>
            <Grow in>
                <Container>
                        <Paper elevation={3} sx={{
                            maxWidth: 600,
                            height: 500,
                            margin: '0 auto',
                            overflow: 'auto'
                        }}>
                            <Typography variant="h4" component="h2">
                                {postData.name}
                            </Typography>
                            <img className="image" loading="lazy" src={postData.iconSource} alt={postData.name}/>
                        
                        </Paper>
                    
                </Container>
            </Grow>
        </Container>
    )

}

export default Digimon;