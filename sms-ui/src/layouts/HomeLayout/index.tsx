import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const index = () => {

    const { user } = useAuth();

    if (user) {
        return <Navigate to='/portal/dashboard' />
    }

    return (
        <div className='bg-primary min-h-screen'>
            <Outlet />
        </div>
    )
}

export default index