import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { FaTimesCircle } from "react-icons/fa";
import {
    FaCircleCheck,
    FaReceipt,
    FaShieldHeart,
    FaHouse,
} from "react-icons/fa6";
import { Loader } from "../components";
import api from "../utils/api";

const PaySuccess = () => {
    const navigate = useNavigate();
    const { tId } = useParams();

    const [search] = useSearchParams();
    const dataQuery = search.get("data");
    const [data, setData] = useState(null);
    console.log(data);
    const [loading, setLoading] = useState(true);
    const [resErr, setResErr] = useState(null);
    const [resData, setResData] = useState(null);

    useEffect(() => {
        if (!dataQuery) {
            setResErr("Missing transaction data.");
            setLoading(false);
            return;
        }
        try {
            const decoded = atob(dataQuery);
            const parsedData = JSON.parse(decoded);
            setData(parsedData);
        } catch (err) {
            setResErr("Invalid transaction data.");
            setLoading(false);
        }
    }, [dataQuery]);

    useEffect(() => {
        if (data) {
            hitServer();
            setLoading(false);
        }
    }, [data]);

    async function hitServer() {
        if (data) {
            try {
                const response = await api.post(
                    `/jobs/transaction/${tId}/pay`,
                    {
                        amount: data.total_amount,
                        transactionCode: data.transaction_code,
                        transactionUUID: data.transaction_uuid,
                    },
                );
                setResData(response.data.data);
            } catch (error) {
                setResErr(error.response.data.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    if (loading) return <Loader />;

    if (resErr) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 animate-fade-in">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="p-4 bg-red-100 rounded-full animate-shake">
                            <FaTimesCircle className="text-6xl text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-red-600">
                            Transaction Failed
                        </h1>
                        <div className="bg-red-50 px-4 py-3 rounded-xl w-full">
                            <p className="text-red-600 font-medium">{resErr}</p>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl
                            transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <FaReceipt className="text-xl" />
                            Retry Transaction
                        </button>
                        <p className="text-sm text-gray-500 mt-4">
                            Need help? Contact our support team.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 animate-fade-in">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Success Icon */}
                    <div className="relative animate-pop-in">
                        <div className="absolute inset-0 bg-emerald-100/50 rounded-full blur-lg animate-pulse" />
                        <FaCircleCheck className="relative text-7xl text-emerald-500 z-10" />
                    </div>

                    {/* Header Section */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-emerald-700">
                            Payment Successful!
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Thank you for your transaction
                        </p>
                    </div>

                    {/* Transaction Details */}
                    <div className="w-full space-y-4">
                        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Amount:
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-emerald-600">
                                            NPR {resData?.amount}
                                        </span>
                                        <FaReceipt className="text-emerald-500" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="text-gray-500">
                                        {resData?.paidTime.toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <span className="text-gray-600">
                                        Transaction ID:
                                    </span>
                                    <p className="font-mono text-sm text-gray-500 break-all">
                                        {resData?.transactionUUID}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full space-y-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl
                            transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3"
                        >
                            <FaHouse className="text-xl" />
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/transactions")}
                            className="w-full border-2 border-emerald-200 hover:border-emerald-300 text-emerald-600 
                            font-semibold py-3 px-6 rounded-xl transition-all duration-300 bg-white hover:bg-emerald-50
                            flex items-center justify-center gap-3"
                        >
                            <FaReceipt className="text-lg" />
                            Transaction History
                        </button>
                    </div>

                    {/* Security Footer */}
                    <div className="pt-6 border-t border-emerald-100 w-full">
                        <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                            <FaShieldHeart className="text-emerald-500" />
                            <span>Secured by eSewa • PCI DSS Compliant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaySuccess;
