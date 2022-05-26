import {React, useState} from 'react';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import { Link, useNavigate } from "react-router-dom"

import './Post.scss';

const Post = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    return (
        <>
            <Link to={'/digimon/' + post._id}>
                <div className="digimon">
                    <img className="image" loading="lazy" src={post.iconSource} alt={post.name}/>
                    <span>{post.name}</span>
                </div>
            </Link>
            
            {user?.result?.user && (
                <>
                    <Link to={'/editDigimon/' + post._id}>
                        <Tooltip title="Edit" placement="top">
                            <IconButton style={{position: 'absolute', margin: 'auto', top: 0, left: 0,}} color="primary" aria-label="update">
                                <EditIcon sx={{fontSize: "large"}}/>
                            </IconButton>
                        </Tooltip>
                    </Link>

                    <Tooltip title="Delete" placement="top">
                        <IconButton style={{position: 'absolute', margin: 'auto', top: 0, right: 0,}} aria-label="update" onClick={() => {{dispatch(deletePost(post._id)); console.log(post._id)}}}>
                            <DeleteForeverIcon sx={{fontSize: "large", color: "red"}}/>
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </>
    );
}

export default Post;