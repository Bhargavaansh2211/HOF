import { currentUser } from '@clerk/nextjs'
import React from 'react'

const page = async () => {
    const user = await currentUser();
    console.log(user)
  return (
    <div>
      onbaording
    </div>
  )
}

export default page
