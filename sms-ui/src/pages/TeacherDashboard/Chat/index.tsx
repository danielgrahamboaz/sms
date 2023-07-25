import React from 'react'
import { ChatEngine } from "react-chat-engine"
import { env } from '../../../constants'
import { useAuth } from '../../../contexts/AuthContext'

const index = () => {

    const { user, getS } = useAuth()

    return (
        <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Chats</h2>
            </div>
            <div className='p-5 mt-5 intro-y box'>
                <ChatEngine projectID={env.VITE_APP_CE_ID} userName={user.username} userSecret={getS()} />
            </div>
        </div>
    )
}

export default index