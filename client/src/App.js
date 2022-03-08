import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import { Routes, Route, Link, Navigate } from 'react-router'
import { useState, useEffect } from 'react'

import Signup from './components/Signup'
import Home from './components/Home'
import Login from './components/Login'
import Shifts from './components/Shifts'
import Edit from './components/Edit'

function App() {

  const [user, setUser] = useState()

  useEffect(currentUser, [])

  function currentUser() {
    fetch('/me')
    .then((r) => { 
      if (r.ok) {
        r.json().then(setUser);
      }
      else {
        setUser({name: 'unauthorized'})
      }
    })
  }

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' })
    .then(res => {
      if (res.ok) {
        res.json().then(setUser)
      }
    })
  }

  function handleCreateOrganisation(org) {
    fetch('/organisations', {
      method: 'POST',
      headers: { "Content-Type": "application/json", accept: 'application/json'},
      body: JSON.stringify(org)
    })
    .then(res => res.json())
    .then(handleJoinOrganisation)
    .catch(err => alert(`There was a problem creating the organisation: ${err}`))

  }

  function handleJoinOrganisation(org) {
    setUser({...user, organisation: org})

    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json", accept: 'application/json'},
      body: JSON.stringify({organisation_id: org.id})
    })
    .then(() => alert('Organisation joined successfully.'))
    .catch(err => alert(`There was a problem joining the organisation: ${err}`))
  }

  function handleLeaveOrganisation() {
    setUser({...user, organisation: null, shifts: []})
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json", accept: 'application/json'},
      body: JSON.stringify({organisation_id: null})
    })
    .then(res => {
      if (res.ok) {
        alert('Success! You\'re no longer a part of the organisation.')
      }
      else {
        alert('There was a problem leaving the organisation.')
      }
    })
  }

  function handleSaveOrganisation(org) {
    fetch(`/organisations/${org.id}`, { 
        method: 'PATCH',
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(org)
    })
    .then(res => {
      if (res.ok) {
        alert('Organisation saved successfully.')
      }
      else {
        alert('There was a problem updating the organisation.')
      }
    })
  }

  function handleDeleteOrganisation(id) {
    fetch(`/organisations/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        alert('Organisation deleted.')
      }
      else {
        alert('There was a problem deleting the organisation.')
      }
    })
  }

  function handlePostShift(newShift) {
    
    if (!newShift.date || !newShift.breakLength || newShift.startTime === '' || newShift.endTime === '' ) {
      return alert('Please fill out all fields.')
    } else {

      const formattedShift = {
        start: new Date( newShift.date ),
        end: new Date( newShift.date ),
        break_length: parseInt(newShift.breakLength),
        user_id: parseInt(newShift.user_id),
      }

      formattedShift.start.setHours(newShift.startTime[0,1])
      formattedShift.start.setMinutes(newShift.startTime[3,4])
      formattedShift.end.setHours(newShift.endTime[0,1])
      formattedShift.end.setMinutes(newShift.endTime[3,4])

      fetch('/shifts', {
        method: 'POST',
        headers: { "Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(formattedShift)
      })
      // .then(res => res.json())
      .then(() => currentUser())
      .catch(err => alert("There was a problem saving the shift: " + err))
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login handleSetUser={setUser}/> }/>
        <Route path="/signup" element={ <Signup handleSetUser={setUser} /> }/>
        <Route path="/edit" element={ <Edit handleSaveOrganisation={handleSaveOrganisation} handleDeleteOrganisation={handleDeleteOrganisation}/>} />
        <Route path="/shifts" element={ <Shifts user={user} handlePostShift={handlePostShift}/> }/> 
        <Route exact path="/" element={<Home user={user} handleLogOut={handleLogOut} handleCreateOrganisation={handleCreateOrganisation} handleJoinOrganisation={handleJoinOrganisation}
          handleLeaveOrganisation={handleLeaveOrganisation}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
