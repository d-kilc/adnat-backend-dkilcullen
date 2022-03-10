import { useState  } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Grid, Typography, TextField, Button } from '@mui/material'

export default function ForgotPassword({handlePasswordReset, loggedIn}) {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    })
    
    function handleUpdateForm(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    if (loggedIn) return <Navigate replace to="/" />

    return (
        <Grid container flexDirection="column">
            <Typography xs={12} mx="auto" my={4} variant="h4">Password Reset</Typography>
            <Grid my={1} mx="auto" item xs={12}>
                <TextField label="Email" name="email" value={formData.email} onChange={handleUpdateForm}/>
            </Grid>
            <Grid my={1} mx="auto" item xs={12}>
                <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleUpdateForm}/>
            </Grid>
            <Grid my={1} mx="auto" item xs={12}>
                <TextField label="Confirm Password" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleUpdateForm}/>
            </Grid>
            <Grid item my={1} mx="auto" xs={12}>
                <Button variant="contained" sx={{width: '100px'}} mx="auto" onClick={() => handlePasswordReset(formData)}>Reset</Button>
            </Grid>
            <Grid item xs={12} mx="auto">  
                <Link to="/login">Log In</Link>
            </Grid>
            <Grid item xs={12} mx="auto">  
                <Link to="/signup">Sign Up</Link>
            </Grid>
        </Grid>
    )
}