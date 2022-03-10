import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TextField, Grid, Button, Typography } from '@mui/material'

export default function EditOrganisation({handleSaveOrganisation}) {
    
    const { state } = useLocation()
    const [organisation, setOrganisation] = useState(state.organisation)
    const navigate = useNavigate()

    function handleUpdateOrganisation(e) {
        setOrganisation({...organisation, [e.target.name]: e.target.value})
    }

    return(
        <Grid container xs={12} flexDirection="column">
            <Grid item xs={12} mx="auto">
                <Typography variant="h4" xs={12} m={4}>Edit Organisation</Typography>
            </Grid>
            <Grid item xs={12} my={1} mx="auto">
                <TextField value={organisation.name} name="name" label="Org. name" onChange={handleUpdateOrganisation}/> 
            </Grid>
            <Grid item xs={12} my={1} mx="auto">
                <TextField value={organisation.hourly_rate} type="number" name="hourly_rate" label="Hourly Rate" onChange={handleUpdateOrganisation}/>
            </Grid>
            <Grid item xs={12} mx="auto">
                <Button variant="contained" className="submit-Button" onClick={() => {
                    handleSaveOrganisation(organisation)
                    navigate('/')
                }}>Update and Join</Button>
            </Grid>   
        </Grid>
    )
}