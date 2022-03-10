import { Link, Navigate } from 'react-router-dom'
import { Grid, TextField, Button, Typography } from '@mui/material'
import { useState } from 'react'

export default function Login({handleLogIn, loggedIn}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    if (loggedIn) return <Navigate replace to="/"/> 

    return (
        <Grid container flexDirection="column">
            <Typography variant="h3" mx="auto" my={4}>Log In</Typography>
            <Grid item xs={12} mx='auto' my={2}>
                <Grid container alignItems="center">
                    <Grid item xs={12} my={2}>
                        <TextField sx={{width: '100%'}} type="text" name="email" label="Email" value={formData.email} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField sx={{width: '100%'}} type="password" name="password" label="Password" value={formData.password} onChange={handleInputChange} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} mx="auto" my={1}>
                <Button variant="contained" mx="auto" sx={{width: '90px'}} onClick={() => handleLogIn(formData)}>Log in</Button>
            </Grid>
            <Grid item xs={12} mx="auto">
                <Link mx="auto" className="submit-button" to="/signup">Sign Up</Link>
            </Grid>
            <Grid item xs={12} mx="auto">
                <Link to="/forgot-password">Forgot your password?</Link>
            </Grid>
        </Grid>
    )
}