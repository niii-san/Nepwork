import React from 'react'
import { useParams } from 'react-router'

function Following() {
    const {userId} = useParams()
  return (
    <div>Viewing Following of {userId}</div>
  )
}

export default Following
