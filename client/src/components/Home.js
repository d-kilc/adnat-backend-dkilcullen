import { Navigate } from 'react-router'
import { useEffect, useState } from 'react'

import Dashboard from './Dashboard'
import JoinOrg from './JoinOrg'

export default function Home({ user, handleLogOut, handleCreateOrganisation, handleJoinOrganisation, handleLeaveOrganisation }) {

    if (user && user.name === "unauthorized") {
        return <Navigate replace to="/login" />
    }

    if (user && user.organisation === null) {
        return <JoinOrg user={user} handleLogOut={handleLogOut} handleCreateOrganisation={handleCreateOrganisation} handleJoinOrganisation={handleJoinOrganisation}/>
    }

    return (
        <div>
            {user && user.organisation !== null ? <Dashboard user={user} handleLogOut={handleLogOut} handleLeaveOrganisation={handleLeaveOrganisation}/> : <div></div> }
        </div>
    )

}