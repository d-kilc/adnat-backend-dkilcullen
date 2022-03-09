import { Link } from 'react-router-dom'

export default function Dashboard({ user, handleLogOut, handleLeaveOrganisation }) {

    return(
        <div className="container">

            <h1>Welcome, {user.name}</h1>
            <h2 className="subheader">Your organisation: </h2>
            <div className="dashboard-headline">
                <h2>{user.organisation.name}</h2>
                <Link className="submit-button" to={'/shifts'} state={{organisation_id: user.organisation.id}}>View Shifts</Link>
                <Link className="submit-button" to={'/edit'} state={{organisation: user.organisation}}>Edit</Link>
                <Link className="submit-button" to={'/'} onClick={handleLeaveOrganisation}>Leave</Link>
            </div>

        </div>
    )
}