import React, { useEffect, useState } from "react";
import TransactionListItem from "../TransactionListItem";
import toast from "react-hot-toast";
import api from "../../utils/api";
import Loader from "../Loader";
TransactionListItem;

function RecentTransactions() {
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchSetRecentTxns = async () => {
        setFetching(true);
        try {
            const response = await api.get("/user/transactions/recent");
            setData(response.data.data);
            setFetching(false);
        } catch (error) {
            toast.error("Failed to load recent transactions");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSetRecentTxns();
    }, []);



    return (
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            {fetching ? (
                <Loader />
            ) : (
                <>
                    <div className="overflow-x-auto">
                        {data.map((txn) => (
                            <TransactionListItem
                                key={txn._id}
                                transactionData={txn}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default RecentTransactions;
