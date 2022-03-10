import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Grid, Button, TextField } from '@mui/material'

export default function Create({ handleCreateOrganisation }) {
    const [newOrg, setNewOrg] = useState({name: "", hourly_rate: 0})
    const navigate = useNavigate()

    function handleSetNewOrg(e) {
        setNewOrg({...newOrg, [e.target.name]: e.target.value})
    }

    return (
        <>
        <Typography textAlign="center" variant="h4" mx="auto" my={4}>Create Organisation</Typography>
        <Grid container xs={12} flexDirection="column">
            <Grid item xs={12} my={1} mx="auto">
                <TextField sx={{width: '100%'}} label="Org. Name" type="text" name="name" onChange={handleSetNewOrg}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">
                <TextField label="Hourly Wage" type="number" name="hourly_rate" onChange={handleSetNewOrg}/>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">
                <Button variant="contained" onClick={() => {
                    handleCreateOrganisation(newOrg)
                    navigate('/')
                }}>Create and Join</Button>        
            </Grid>
        </Grid>
        </>
    )
}