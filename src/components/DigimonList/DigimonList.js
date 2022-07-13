import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import DigimonItem from './DigimonItem/DigimonItem';

const DigimonList = () => {
    const posts = useSelector((state) => state.posts);

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '90vh' }}
        >
        {!posts.length ? <CircularProgress /> : (
            <Grid item>
                <ul style={{padding: 0, textAlign: 'center'}}>
                    {posts.map((post) => (
                        <li style={{display: 'inline-flex'}}>
                            <DigimonItem post={post} />
                        </li>
                    ))}
                </ul>
            </Grid>
        )}
        </Grid>
    )
}

export default DigimonList;