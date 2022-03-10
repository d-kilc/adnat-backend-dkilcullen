import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Typography, Button } from '@mui/material'

export default function Navbar({user, handleLogOut}) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [user])
    
    const navigate = useNavigate()

    function goBack() {
      navigate(-1)
    }

    if (user && !loading) return (
        <Grid container position="static" sx={{ height: '80px', backgroundColor: 'orange', boxShadow: 6}} justifyContent="space-between" alignItems="center">
            <Grid item>
                <Grid ml={1} container justifyContent="space-between">
                    {user.name !== "Unauthorized" ? <Button sx={{color: 'white'}} onClick={goBack} id="back">Back</Button> : <></> }
                    <Typography sx={{color: 'white'}} variant="h4" >Adnat</Typography>
                </Grid>
            </Grid>
            {user.name !== "Unauthorized" ? (
            <Grid item mr={1} xs={6} md={3} id="sub-menu">
                <Grid container justifyContent="space-evenly" alignItems="center">
                    <Link className="unstyled-link" to="/">
                        <Typography variant="body1">
                            {user.name}
                        </Typography>
                    </Link>
                    <Link className="unstyled-link" to="/edit-profile">
                        <Typography variant="body1">
                            Edit profile
                        </Typography>
                    </Link> 
                    <Link className="unstyled-link" to="/" onClick={handleLogOut}>
                        <Typography variant="body1">
                            Log out
                        </Typography>
                    </Link> 
                </Grid>
            </Grid>
            ) : (
                <></>
            )}
        </Grid>
    )
    else return <></>
}