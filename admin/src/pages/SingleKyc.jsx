import React from "react";
import { useParams } from "react-router";

function SingleKyc() {
    const params = useParams();
    return (
        <div>
            <h1>Single kyc page</h1>
            <div>{params.kycId}</div>
        </div>
    );
}

export default SingleKyc;
