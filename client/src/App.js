import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import Signup from './components/Signup'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import Shifts from './components/Shifts'
import Create from './components/Create'
import EditOrganisation from './components/EditOrganisation'
import ForgotPassword from './components/ForgotPassword'

function App() {

  const [user, setUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(currentUser, [])

  function currentUser() {
    fetch('/me')
    .then((res) => { 
      if (res.ok) {
        res.json().then(setUser)
      }
      else {
        setUser({name: 'Unauthorized'})
      }
    })
  }

  function handleCreateUser(user) {
    fetch('/users', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(user)
    })
    .then(res => {
        if (res.ok) {
          res.json().then(data => {
              setUser(data)
              setLoggedIn(true)
              alert('Account created!')
          })
        } else {
          res.json().then(data => {
            alert('There was a problem creating the account: ' + data.errors)
          })
        }
    })
  }

  function handleUpdateUser(updatedUser) {
    fetch(`/users/${updatedUser.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json", Accept: 'application/json'},
      body: JSON.stringify(updatedUser)
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          alert('User details updated successfully.')
          currentUser()
        })
      } else {
        res.json().then(data => {
          alert('There was a problem updating the user: ' + data.errors)
        })
      }
    })
  }

  function handleLogIn(data) {
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', accept: 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUser(data)
          setLoggedIn(true)
        })
      } else {
        res.json().then(data => {
          alert("Incorrect credentials")
        })
      }
    })
}

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' })
    .then(res => {
      if (res.ok) {
        res.json().then(setUser)
        setLoggedIn(false)
      }
    })
  }

  function handlePasswordReset(user) {
    fetch('/password-reset', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(user)
      })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          alert('Password updated successfully.')
          handleLogIn({email: user.email, password: user.password})
        })
      } else {
        res.json().then(data => {
          alert(data.errors)
        })
      }
    })  
  }

  function handleCreateOrganisation(org) {
    fetch('/organisations', {
      method: 'POST',
      headers: { "Content-Type": "application/json", accept: 'application/json'},
      body: JSON.stringify(org)
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          handleJoinOrganisation(data)
        })
      } else {
        res.json().then(data => {
          alert('There was a problem creating the organisation: ' + data.errors)
        })
      }
    })
  }

  function handleJoinOrganisation(org) {
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json", accept: 'application/json'},
      body: JSON.stringify({organisation_id: org.id})
    })
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          alert('Organisation joined successfully.')
          currentUser()
        })
      } else {
        res.json().then(data => {
          alert('There was a problem joining the organisation: ' + data.errors)
        })
      }
    })
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
        res.json().then(data => {
          setUser({ ...user, organisation: org })
          alert('Organisation saved successfully.')
        })
      }
      else {
        res.json().then(data => {
          alert('There was a problem updating the organisation: ' + data.errors)
        })
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
      
      const startHours = newShift.startTime.split(':')
      const endHours = newShift.endTime.split(':')
      formattedShift.start.setHours(startHours[0], startHours[1])
      formattedShift.end.setHours(endHours[0], endHours[1])

      fetch('/shifts', {
        method: 'POST',
        headers: { "Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(formattedShift)
      })
      .then(res => {
        if (res.ok) {
          alert('Shift created!')
          currentUser()
        } else {
          res.json().then(data => alert('There was a problem saving the shift: ' + data.errors))
        }
      })
    }
  }

  function handleDeleteShift(shift) {
    fetch(`/shifts/${shift.id}`, {method: 'DELETE'})
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          alert('Shift deleted!')
          const shiftIndex = user.shifts.findIndex(s => s.id === shift.id)
          const userCopy = {...user}
          userCopy.shifts.splice(shiftIndex, 1)
          setUser(userCopy)
        })
      } else {
        res.json().then(data => {
          alert('There was a problem deleting the shift: ' + data.errors)
        })
      } 
    })
  }

  return (
    <>
    <Router>
      <Navbar handleLogOut={handleLogOut} user={user}/>
      <Routes>
        <Route path="/login" element={ <Login handleLogIn={handleLogIn} loggedIn={loggedIn}/> }/>
        <Route path="/signup" element={ <Signup handleCreateUser={handleCreateUser} loggedIn={loggedIn}/> }/>
        <Route path="/forgot-password" element={ <ForgotPassword handlePasswordReset={handlePasswordReset} loggedIn={loggedIn}/> }/>
        <Route path="/edit-profile" element={ <EditProfile user={user} handleUpdateUser={handleUpdateUser}/> }/>
        <Route path="/create" element={ <Create handleCreateOrganisation={handleCreateOrganisation} /> }/>
        <Route path="/edit" element={ <EditOrganisation handleSaveOrganisation={handleSaveOrganisation}/>} />
        <Route path="/shifts" element={ <Shifts user={user} handlePostShift={handlePostShift} handleDeleteShift={handleDeleteShift}/> }/> 
        <Route exact path="/" element={<Home user={user} handleLogOut={handleLogOut} handleCreateOrganisation={handleCreateOrganisation} handleJoinOrganisation={handleJoinOrganisation}
          handleLeaveOrganisation={handleLeaveOrganisation}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
