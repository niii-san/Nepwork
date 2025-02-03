import React from 'react'
import { useParams } from 'react-router'

function Pay() {
    const {jobId} = useParams()
  return (
    <div>Pay: {jobId}</div>
  )
}

export default Pay
