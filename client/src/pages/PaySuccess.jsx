import React from 'react'
import { useParams } from 'react-router'


const PaySuccess = () => {

    const {tId} = useParams()

  return (
    <div>PaySuccess of {tId}</div>
  )
}

export default PaySuccess
