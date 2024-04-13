import React from 'react';
import { Navigate } from "react-router-dom";

export const Protected = ({ isLoggedIn, children }) => {
    
    if (isLoggedIn === false || isLoggedIn === null) {
        return <Navigate to="/" replace />;
    }
    return children;
};
