import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, InputAdornment, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility } from '@mui/icons-material';
import { signin, signup } from '../../actions/auth';
import './Auth.scss';

const initialState = { 
    user:'', 
    email: '', 
    password: '', 
    confirmPassword: '' 
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
            dispatch(signUp(formData, navigate));
        } else {

        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    return (
        <Container className="auth" component="main" maxWidth="xs" style={{
            overflowY: 'auto', 
            position: 'absolute', 
            top: 100, bottom: 10, left: 10, right: 10
        }}>
            <Paper elevation={3} sx={{padding: 4}} className="paper ">
                <Avatar className="avatar">
                    <LockIcon />
                </Avatar>
                <Typography textAlign={'center'} variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Grid xs={12} md={12}>
                                    <TextField name="email" label="Email" variant="outlined" type={'email'} required
                                        onChange={handleChange} autoFocus fullWidth   xs={6}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid xs={12} md={12}>
                            <TextField name="user" label="Username" variant="outlined" type={'text'} required
                                onChange={handleChange} autoFocus fullWidth xs={6}
                            />
                        </Grid>
                        <Grid xs={12} md={12}>
                            <TextField name="password" label="Password" variant="outlined" type={showPassword ? 'text' : 'password'} required
                                onChange={handleChange} fullWidth xs={6}
                                inputProps={{
                                    endadornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                <Visibility />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        {isSignup && (
                            <Grid xs={12} md={12}>
                                <TextField name="confirmPassword" label="Repeat Password" variant="outlined" type={showPassword ? 'text' : 'password'} required
                                    onChange={handleChange} fullWidth xs={6}
                                    inputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowPassword}>
                                                    <Visibility />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;