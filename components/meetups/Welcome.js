import React from 'react'
import { useRouter } from 'next/router'

import classes from './Welcome.module.css'

const Welcome = () => {
    const router = useRouter();

  return (
    <div className={classes.container}>
        <h1>Welcome</h1>
        <p>Create amazing networking opportunities with React Meetups!</p>
        <button className={classes.button} onClick={() => router.push('/meetups')}>Explore</button>
    </div>
  )
}

export default Welcome