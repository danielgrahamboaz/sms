import React from 'react'
import LoadingIcon from '../../base-components/LoadingIcon'

const index = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen items-center col-span-6 sm:col-span-3 xl:col-span-2 ">
            <LoadingIcon icon="circles" className="w-8 h-8" />
            <div className="mt-2 text-xs text-center">Loading...</div>
        </div>
    )
}

export default index