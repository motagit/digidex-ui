import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { CircularProgress, Grid, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import DigimonItem from './DigimonItem/DigimonItem';
import { levelOptions } from '../Models/digimon.model';
import { Button } from '@mui/material';

const DigimonList = () => {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);
    const [limit, setLimit] = useState(27);
    const [loading, setLoading] = useState(posts.length <= 0);
    const [filter, setFilter] = useState({ name: '', level: null, page: 1, limit: limit });

    const getDigimons = (pageValue, levelValue) => {
        let newFilter = filter;
        newFilter.page = pageValue;
        newFilter.level = levelValue;
        setLoading(true);
        dispatch(getPosts(newFilter, setLoading));
    }

    const clearFilters = () => {
        setFilter({ name: '', level: null, page: 1, limit: limit });
        getDigimons();
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(filter)
            getDigimons(filter.page, filter.level);
        }, 700)
    
        return () => clearTimeout(delayDebounceFn)
    }, [filter.name])

    return (
        <>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={10} md={5} lg={5} xl={5}>
                    <TextField
                        className="inputField"
                        name="name" 
                        variant="outlined" 
                        label="Search by name" 
                        fullWidth 
                        value={filter.name}
                        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                    />
                </Grid>

                <Grid item xs={6} md={2} lg={2} xl={2}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Level</InputLabel>
                        <Select
                            label="Level"
                            value={filter.level}
                            onChange={(e) => { setFilter({ ...filter, level: e.target.value }); getDigimons(filter.page, e.target.value) }}
                        >
                            <MenuItem value={null}>-</MenuItem>
                            {levelOptions.map((option, index) => (
                                <MenuItem value={index} key={index}>{option.name}</MenuItem> 
                            ))} 

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4} md={1} lg={1} xl={1}>
                    <Button sx={{width: 100}} 
                        onClick={clearFilters}
                        variant="contained" 
                        color="primary"
                        size="large" 
                        type="submit" 
                        fullWidth
                        disabled={loading || (filter.name === '' && filter.level === null)}>
                            Clear
                    </Button>
                </Grid>
            </Grid>
            
            <Grid container spacing={0} alignItems="center" justifyContent="center">
            {loading ? (
                <CircularProgress style={{marginTop: 30}}  />
            ) : (
                <Grid item>
                    <ul style={{padding: 0, textAlign: 'center'}}>
                        {posts.digimons && posts.digimons?.length != 0 ? posts.digimons.map((post) => (
                            <li style={{display: 'inline-flex'}}>
                                <DigimonItem post={post} />
                            </li>
                        )) : (
                            <p>There are no digimons.</p>
                        )}
                    </ul>
                </Grid>
            )}      
            </Grid>

            <Grid container alignItems="center" justifyContent="center" style={{marginTop: 30, marginBottom: 30}}>
                <Pagination count={posts?.pagination?.pageCount} siblingCount={0} defaultPage={6} disabled={loading}
                    variant="outlined" color="primary" page={filter.page} onChange={(e, v) => { setFilter({ ...filter, page: v }); getDigimons(v, filter.level) } } />
            </Grid>
            
        </>
    )
}

export default DigimonList;