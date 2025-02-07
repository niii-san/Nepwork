import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Loader } from "../components";
import TransactionListItem from "../components/TransactionListItem";

function Transactions() {
    const [txns, setTxns] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchSetTxns = async () => {
        try {
            const response = await api.get("/user/transactions/all");
            setTxns(response.data.data);
            setFetching(false);
        } catch (error) {
            toast.error("Failed to load transactions");
            console.error(error);
        }
    };
    useEffect(() => {
        fetchSetTxns();
    }, []);
    if (fetching) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold text-center mt-10">
                All transactions
            </h1>
            <div className="px-6 mt-10">
                {txns.map((item) => (
                    <TransactionListItem transactionData={item} />
                ))}
            </div>
        </div>
    );
}

export default Transactions;
