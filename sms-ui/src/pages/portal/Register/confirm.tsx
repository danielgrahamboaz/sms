import React from 'react'
import { useNavigate } from 'react-router-dom'

const confirm = () => {
    const navigate = useNavigate()

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <p>Confirmation Your Email plaase!</p>
            <button className='bg-primary py-1 px-2 rounded shadow text-[12px] text-white' onClick={() => navigate("/login")}>Next</button>
        </div>
    )
}

export default confirm