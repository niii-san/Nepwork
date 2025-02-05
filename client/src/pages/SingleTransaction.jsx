import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";

function SingleTransaction() {
    const { tId } = useParams();
    const [txnData, setTxnData] = useState(null);

    const fetchSetTxnData = async () => {
        try {
        } catch (error) {
            toast.error("Failed to load transaction");
        }
    };

    useEffect(() => { }, []);
    return <div>SingleTransaction {tId}</div>;
}

export default SingleTransaction;
