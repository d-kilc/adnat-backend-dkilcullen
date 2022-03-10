import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Typography, Grid, Card, Button, TextField } from '@mui/material'

export default function JoinOrg({ user, handleJoinOrganisation}) {
    const [loading, setLoading] = useState(true)
    const [organisations, setOrganisations] = useState([])
        
    useEffect(fetchOrganisations, [])

    useEffect(() => setLoading(false), [user])

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
            <>
                <Typography m={4} textAlign="center" variant="h5">You aren't a member of any organisations. Join or create a new one to continue.</Typography>
                <Typography variant="h4" my={4} ml={4}>Organisations:</Typography>
                <Grid container spacing={2} sx={{width: '90%'}}  flexDirection="row" mx="auto">
                    {organisations.map(org => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={org.id}>
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
                    <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined">
                            <Typography my={1} mb={3} textAlign="center" variant="h5">Create</Typography>
                            <Grid container justifyContent="space-between">
                                <Grid item m={1} xs={12} textAlign="center">
                                    <Link className="unstyled-link" to={"/create"}>
                                        <Button mx="auto" variant="contained" color="success">
                                            +
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </>
        ) 
    }

}