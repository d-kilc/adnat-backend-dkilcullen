import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, TextField, Typography } from '@mui/material'

export default function EditProfile({user, handleUpdateUser}) {

    const [userForm, setUserForm] = useState({name: '', email: ''})

    useEffect(() => {
        setUserForm({
            name: user && user.name,
            email: user && user.email,
            id: user && user.id
        })
    }, [user])

    const navigate = useNavigate()

    function handleUpdateUserForm(e) {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }
    
    if (!user) return <></>
    return (
        <Grid container flexDirection="column">
            <Typography variant="h4" mx="auto" my={4}>Edit Profile</Typography>
            <Grid item xs={12} my={1} mx="auto">
                <TextField name="name" label="Username" value={userForm.name} onChange={handleUpdateUserForm}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">
                <TextField name="email" label="Email" value={userForm.email} onChange={handleUpdateUserForm}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">
                <Button variant="contained" onClick={() => {
                    handleUpdateUser(userForm)
                    navigate('/')
                }}>
                    Save Profile    
                </Button>
            </Grid>
        </Grid>
    )
}