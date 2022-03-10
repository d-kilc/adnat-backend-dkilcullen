import { Link } from 'react-router-dom'
import { Typography, ButtonGroup, Button } from '@mui/material'

export default function Dashboard({ user, handleLeaveOrganisation }) {

    return(
        <div>

            <Typography variant="h4" ml={2} my={4} >Welcome, {user.name}!</Typography>
            <Typography variant="h5" ml={2}>Organisation: {user.organisation.name}</Typography>
            <ButtonGroup variant="contained" sx={{marginLeft: '16px;', marginTop: '24px'}}>
                <Button>
                <Link to={'/shifts'} state={{organisation_id: user.organisation.id}} className="unstyled-link">View Shifts</Link>
                </Button>
                <Button>
                    <Link to={'/edit'} state={{organisation: user.organisation}} className="unstyled-link">Edit</Link>
                </Button>
                <Button>
                    <Link to={'/'} onClick={handleLeaveOrganisation} className="unstyled-link">Leave</Link>
                </Button>
            </ButtonGroup >

        </div>
    )
}