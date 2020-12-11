import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// //compenent: Component ---> the 2nd Component was taken from the parent (app js)
// //and passed here

const ProtectedRoute = ({ component: Component, user, getMyUser, test, ...rest }) => {
 console.log({ component: Component, user, getMyUser, test, ...rest })
  return (
    <Route render={() => user ? <Component {...rest} /> : <Redirect to='/signup' />} />
  )
}

export default ProtectedRoute

//http://localhost:3000/profile/5fc54af47fee71add5d51b41