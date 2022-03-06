import { Link } from 'react-router-dom'

export default function Dashboard({ user, handleLogOut, handleLeaveOrganisation }) {
console.log(user)
    return(
        <>
        <h1>Dashboard</h1>
        <p>{`Logged in as ${user.name}`}</p>
        <button onClick={handleLogOut}>Log Out</button>
        <h2>{user.organisation.name}</h2>
        <div>
            <Link to={'/shifts'} state={{organisation_id: user.organisation.id}}>View Shifts</Link>
            <br/>
            <Link to={'/edit'} state={{organisation: user.organisation}}>Edit</Link>
            <br/>
            <Link to={'/'} onClick={handleLeaveOrganisation}>Leave</Link>
        </div>

        </>
    )
}