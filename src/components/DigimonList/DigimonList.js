import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDigimons } from '../../actions/posts';
import { CircularProgress, Grid, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import DigimonItem from './DigimonItem/DigimonItem';
import { levelOptions } from '../Models/digimon.model';
import { Button } from '@mui/material';
import * as api from '../../api/index';

const DigimonList = () => {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);
    const [loading, setLoading] = useState(posts.length <= 0);
    const defaultFilterValue = { name: '', level: null, page: 1, limit: api.filter.limit };
    const [filter, setFilter] = useState(api.filter);

    const getDigimonsByFilter = (pageValue, levelValue, defaultNameValue) => {
        setLoading(true);
        let newFilter = filter;
        if (defaultNameValue)
            newFilter.name = '';

        dispatch(getDigimons({ ...newFilter, page: pageValue, level: levelValue }, setLoading));
    }

    const clearFilters = () => {
        setFilter(defaultFilterValue);
        getDigimonsByFilter(defaultFilterValue.page, defaultFilterValue.level, true);
    }

    useEffect(() => {
        if (posts.length == 0 || filter.name != '') {
            const delayDebounceFn = setTimeout(() => {
                getDigimonsByFilter(filter.page, filter.level);
            }, 500)
        
            return () => clearTimeout(delayDebounceFn)
        }
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
                            onChange={(e) => { setFilter({ ...filter, level: e.target.value }); getDigimonsByFilter(filter.page, e.target.value) }}
                        >
                            <MenuItem value={null}>-</MenuItem>
                            {levelOptions.map((option, index) => (
                                <MenuItem value={index} key={index}>{option.name}</MenuItem> 
                            ))} 

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4} md={1} lg={1} xl={1}>
                    <Button sx={{ width: 100, "&.MuiButtonBase-root": { padding: '8px 22px', borderRadius: '4px' } }} 
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
                            <li style={{display: 'inline-flex'}} key={post._id}>
                                <DigimonItem digimon={post} />
                            </li>
                        )) : (
                            <p>There are no digimons.</p>
                        )}
                    </ul>
                </Grid>
            )}      
            </Grid>

            <Grid container alignItems="center" justifyContent="center" style={{marginTop: 30, marginBottom: 30}}>
                <Pagination count={posts?.pagination?.pageCount} siblingCount={0} defaultPage={6} 
                    disabled={loading} variant="outlined" color="primary" 
                    page={filter.page} onChange={(e, v) => { setFilter({ ...filter, page: v }); getDigimonsByFilter(v, filter.level) } } 
                    sx={{ "&.MuiPagination-root .MuiPagination-ul .MuiButtonBase-root": 
                        { margin: '3px', padding: '0px 6px', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.23)' 
                    } }} />
            </Grid>
            
        </>
    )
}

export default DigimonList;