import {React, useState} from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';

import './Post.scss';

const Post = ({ post, setCurrentId, openModal }) => {
    const dispatch = useDispatch();

    return (
        
        <div className="digimon">

            <Tooltip title={post.number + ' - ' + post.name}>
                <img className="image" loading="lazy" src={post.iconSource} alt={post.name}/>
            </Tooltip>
                
            <IconButton style={{padding: '0px'}} color="primary" aria-label="update" onClick={() => {{setCurrentId(post._id); openModal()}}}>
                <EditIcon sx={{fontSize: "large"}}/>
            </IconButton>

            <IconButton style={{padding: '0px', marginLeft: '28px'}} aria-label="update" onClick={() => {{dispatch(deletePost(post._id)); console.log(post._id)}}}>
                <DeleteForeverIcon sx={{fontSize: "large", color: "red"}}/>
            </IconButton>

        </div>
        
    );
}

export default Post;