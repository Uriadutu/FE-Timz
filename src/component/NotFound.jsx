import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <div className="flex  justify-center items-center w-full  h-[100vh]">
            <div className=''>

      <h1 className='text-3xl font-bold'>404 | Not Found</h1>
        <Link to={"/"} className='underline text-center flex justify-center'>Kembali</Link>
        </div>
    </div>
  )
}

export default NotFound
