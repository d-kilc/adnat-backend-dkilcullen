import { Navigate } from 'react-router'
import { useEffect, useState } from 'react'

import Dashboard from './Dashboard'
import JoinOrg from './JoinOrg'

export default function Home({ user, handleLogOut, handleCreateOrganisation, handleJoinOrganisation, handleLeaveOrganisation }) {
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [user])

    if (loading) {
        return (
            <div>Loading....</div>
        )
    }
    else {
        if (user && user.name === "unauthorized") {
            return <Navigate replace to="/login" />
        }

        return (
            <div>
                {user && user.organisation !== null ? <Dashboard user={user} handleLogOut={handleLogOut} handleLeaveOrganisation={handleLeaveOrganisation}/> : <JoinOrg user={user} handleLogOut={handleLogOut} handleCreateOrganisation={handleCreateOrganisation} handleJoinOrganisation={handleJoinOrganisation}/> }
            </div>
        )
    }

}