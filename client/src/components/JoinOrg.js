import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Typography, Grid, Card, Button, TextField } from '@mui/material'

export default function JoinOrg({ user, handleLogOut, handleCreateOrganisation, handleJoinOrganisation}) {
    const [loading, setLoading] = useState(true)
    const [organisations, setOrganisations] = useState([])
    const [newOrg, setNewOrg] = useState({name: "", hourly_rate: 0})
        
    useEffect(fetchOrganisations, [])

    useEffect(() => setLoading(false), [user])

    function handleSetNewOrg(e) {
        setNewOrg({...newOrg, [e.target.name]: e.target.value})
    }

    function fetchOrganisations() {
        fetch('/organisations')
        .then(res => res.json())
        .then(setOrganisations)
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <div className="container">
                <Typography m={2} textAlign="center" variant="h5">You aren't a member of any organisations. Join an existing one or create a new one to continue.</Typography>
                <Typography variant="h3" my={4} ml={2}>Organisations:</Typography>
                <Grid container spacing={2} xs={12} flexDirection="row" mx="auto">
                    {organisations.map(org => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={org.id} className="dashboard-headline">
                                <Card variant="outlined">
                                    <Typography my={1} ml={1} mb={3} variant="h5">{org.name}</Typography>
                                    <Grid container justifyContent="space-between">
                                        <Grid item m={1}>
                                            <Button variant="contained" ml="10px">
                                                <Link className="unstyled-link" to={"/edit"} state={{organisation: org}}>Edit</Link>
                                            </Button>
                                        </Grid>
                                        <Grid item m={1}>
                                            <Button variant="contained">
                                                <Link className="unstyled-link" to={"/"} onClick={() => handleJoinOrganisation(org)}>Join</Link>
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                <Typography textAlign="center" variant="h4" mx="auto" my={4}>Create Organisation</Typography>
                <Grid container xs={12} flexDirection="column">
                    <Grid item xs={12} my={1} mx="auto">
                        <TextField sx={{width: '100%'}} label="Org. Name" type="text" name="name" onChange={handleSetNewOrg}/>
                    </Grid>
                    <Grid item xs={12} my={1} mx="auto">
                        <TextField label="Hourly Wage" type="number" name="hourly_rate" onChange={handleSetNewOrg}/>
                    </Grid>
                    <Grid item xs={12} my={1} mx="auto">
                        <Button variant="contained" onClick={() => handleCreateOrganisation(newOrg)}>Create and Join</Button>        
                    </Grid>
                </Grid>
                
            </div>
        ) 
    }

}