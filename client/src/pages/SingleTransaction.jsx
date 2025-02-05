import React from 'react'
import { useParams } from 'react-router'

function SingleTransaction() {
    const {tId} = useParams()
  return (
    <div>SingleTransaction {tId}</div>
  )
}

export default SingleTransaction
