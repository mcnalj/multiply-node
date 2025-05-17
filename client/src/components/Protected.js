import React from 'react'
import { Navigate, useLocation, createRoutesFromChildren} from 'react-router-dom'
// function Protected ( {isSignedIn, children}) {
//     if (!isSignedIn) {
//         return <Navigate to="/" replace />
//     }
//     return children
// }
function Protected( {isAuthenticated, authChecked, children}) {
    const location = useLocation()
    if (!authChecked) {
        return <div>Loading...</div>
    }
    if (!isAuthenticated) {
        return <Navigate to="/loginWithGoogle" replace state={{ from: location.pathname }} />
    }
    return children
}

export default Protected


