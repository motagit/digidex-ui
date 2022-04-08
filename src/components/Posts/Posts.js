import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, ImageListItem, ImageList, Button } from '@material-ui/core';
import Post from './Post/Post';

const Posts = ({ currentId, setCurrentId, openModal }) => {
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
            <Grid item xs={12}>
                <ImageList cols={7} rowHeight={160}>
                    {posts.map((post) => (
                        <ImageListItem key={post._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Post post={post} setCurrentId={setCurrentId} openModal={openModal}/>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
        )}
        </Grid>
    )
}

export default Posts;