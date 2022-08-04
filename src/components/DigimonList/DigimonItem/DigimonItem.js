import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteDigimon } from '../../../actions/posts';
import DefaultModal from '../../Utils/Modal';

import './DigimonItem.scss';

const DigimonItem = ({ digimon }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

     const [open, setOpen] = useState(false);
     const closeModal = () => setOpen(false);
     const openModal = () => {
        setOpen(true);
    }

    const deleteDigimon = () => {
        dispatch(deleteDigimon(digimon._id));
    }

    return (
        <Box className='digimonItem' style={{position: 'relative'}} sx={{boxShadow: 2}}>
            <Link className='digimonLink' to={'/digimon/' + digimon._id}>
                <img className="image" loading="lazy" src={digimon.iconSource} alt={digimon.name}/>
                <span className="name">{digimon.name}</span>
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
                    textContent={"Do you really want to remove the digimon " + digimon.name + "?"} 
                />

                <Link to={'/editDigimon/' + digimon._id}>
                    <Tooltip title="Edit" placement="top">
                        <IconButton style={{position: 'absolute', margin: 'auto', top: 0, left: 0,}} color="primary" aria-label="update">
                            <EditIcon sx={{fontSize: "large"}}/>
                        </IconButton>
                    </Tooltip>
                </Link>

                <Tooltip title="Delete" placement="top">
                    <IconButton style={{position: 'absolute', margin: 'auto', top: 0, right: 0}} aria-label="update" onClick={openModal}>
                        <DeleteForeverIcon sx={{fontSize: "large", color: "red"}}/>
                    </IconButton>
                </Tooltip>
            </>
            )}
        </Box>
    );
}

export default DigimonItem;