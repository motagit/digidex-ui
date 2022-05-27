import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Portal } from 'react-portal';

const DefaultModal = ({ openState, closeModal, maxWidth, fullWidth, transitionDuration, title, textContent, agreeAction }) => {
    return (
        <Portal>
            <Dialog
                open={openState}
                onClose={closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                transitionDuration={transitionDuration}
                
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {textContent}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeModal}>
                        Close
                    </Button>
                    <Button onClick={agreeAction} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Portal>
    );
}

export default DefaultModal;