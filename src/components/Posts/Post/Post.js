import {React, useState} from 'react';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import { Link } from "react-router-dom"

import DefaultModal from '../../Utils/Modal';

import './Post.scss';

const Post = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

     const [open, setOpen] = useState(false);
     const closeModal = () => setOpen(false);
     const openModal = () => {
        setOpen(true);
    }

    const deleteDigimon = () => {
        dispatch(deletePost(post._id));
    }

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
                    <DefaultModal 
                        openState={open} 
                        closeModal={closeModal} 
                        agreeAction={deleteDigimon}
                        maxWidth='sm' 
                        fullWidth={true}
                        
                        title="Remove Digimon" 
                        textContent={"Do you really want to remove the digimon " + post.name + "?"} 
                    />

                    <Link to={'/editDigimon/' + post._id}>
                        <Tooltip title="Edit" placement="top">
                            <IconButton style={{position: 'absolute', margin: 'auto', top: 0, left: 0,}} color="primary" aria-label="update">
                                <EditIcon sx={{fontSize: "large"}}/>
                            </IconButton>
                        </Tooltip>
                    </Link>

                    <Tooltip title="Delete" placement="top">
                        <IconButton style={{position: 'absolute', margin: 'auto', top: 0, right: 0,}} aria-label="update" onClick={openModal}>
                            <DeleteForeverIcon sx={{fontSize: "large", color: "red"}}/>
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </>
    );
}

export default Post;