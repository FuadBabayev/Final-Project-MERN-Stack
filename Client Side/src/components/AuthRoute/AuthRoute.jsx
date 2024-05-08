import React from 'react'
import Login from '../Users/Forms/Login/Login';

const AuthRoute = ({ children }) => {
    
    // Get login user form localStorage
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const isLoggedIn = user?.token ? true : false;
    if (!isLoggedIn) return <Login />;
    return <>{children}</>;
}

export default AuthRoute
