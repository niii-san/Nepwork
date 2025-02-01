import React from 'react'
import { useParams } from 'react-router'

function Followers() {
const {userId} = useParams()
  return (
    <div>Viewing Followers of {userId}</div>
  )
}

export default Followers
