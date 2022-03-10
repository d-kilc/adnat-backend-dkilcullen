import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Grid, Typography, TextField, Button } from '@mui/material'

export default function Signup({ handleCreateUser, loggedIn }) {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    function handleUpdateForm(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    if (loggedIn) {
        return <Navigate replace to="/" />
    }

    return (
        <Grid container xs={12} flexDirection="column">
            <Typography xs={12} mx="auto" my={4} variant="h3">Sign up</Typography>
            <Grid item xs={12} my={1} mx="auto">
                <TextField sx={{width: '100%'}} name="name" label="Name" value={formData.name} onChange={handleUpdateForm}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">    
                <TextField sx={{width: '100%'}} name="email" label="Email" value={formData.email} onChange={handleUpdateForm}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">                  
                <TextField sx={{width: '100%'}} type="password" label="Password" name="password" value={formData.password} onChange={handleUpdateForm}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">  
                <TextField sx={{width: '100%'}} type="password" label="Confirm Password" name="password_confirmation" value={formData.password_confirmation} onChange={handleUpdateForm}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">  
                <Button variant="contained" mx="auto" sx={{width: '100px'}} onClick={() => {
                        handleCreateUser(formData)
                }}>Sign Up</Button>
            </Grid>
            <Grid item xs={12} mx="auto">  
                <Link to="/login">Log In</Link>
            </Grid>
            <Grid item xs={12} mx="auto">  
                <Link to="/forgot-password">Forgot Password</Link>
            </Grid>
        </Grid>
    )
}