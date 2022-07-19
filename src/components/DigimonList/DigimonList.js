import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { CircularProgress, Grid } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import DigimonItem from './DigimonItem/DigimonItem';

const DigimonList = () => {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const handleChange = (event, value) => {
        setPage(value); debugger;
        dispatch(getPosts(value, limit));
        console.log(page);
    };

    useEffect(() => {
        dispatch(getPosts(page, limit));
    }, [dispatch])

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
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

            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{marginTop: 30}}
            >
                <Pagination count={10} siblingCount={0} defaultPage={6} variant="outlined" color="primary" page={page} onChange={handleChange} />
            </Grid>
        </>
    )
}

export default DigimonList;