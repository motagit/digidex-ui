import {React, useState} from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import { Link, useNavigate } from "react-router-dom"

import './Post.scss';

const Post = ({ post, setCurrentId, openModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    return (
        <>
            <Link to={'/digimon/' + post._id}>
                <Tooltip title={post.number + ' - ' + post.name}>
                    <div className="digimon">
                        <img className="image" loading="lazy" src={post.iconSource} alt={post.name}/>

                        
                    </div>
                </Tooltip>
            </Link>
            <IconButton style={{position: 'absolute', margin: 'auto', top: 0, left: 0,}} color="primary" aria-label="update" onClick={() => {{setCurrentId(post._id); openModal()}}}>
                <EditIcon sx={{fontSize: "large"}}/>
            </IconButton>

            <IconButton style={{position: 'absolute', margin: 'auto', top: 0, right: 0,}} aria-label="update" onClick={() => {{dispatch(deletePost(post._id)); console.log(post._id)}}}>
                <DeleteForeverIcon sx={{fontSize: "large", color: "red"}}/>
            </IconButton>
        </>
    );
}

export default Post;