import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import {
    FaCircleCheck,
    FaHouseMedical,
    FaReceipt,
    FaShieldHeart,
    FaRegCircleCheck,
} from "react-icons/fa6";

const PaySuccess = () => {
    const navigate = useNavigate();
    const { tId } = useParams();

    const [search] = useSearchParams();
    const dataQuery = search.get("data");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const resData = atob(dataQuery);
        const resObj = JSON.parse(resData);
        setData(resObj);
    }, [search]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 transform transition-all duration-300 hover:shadow-2xl animate-scale-in">
                <div className="flex flex-col items-center text-center">
                    {/* Animated Success Icon */}
                    <div className="mb-6 animate-bounce">
                        <FaCircleCheck className="text-6xl text-green-500" />
                    </div>

                    {/* Success Text */}
                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Your transaction has been completed successfully. A
                        receipt will be sent to your registered email.
                    </p>

                    {/* Transaction Details */}
                    <div className="bg-green-50 rounded-lg p-4 w-full mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">Amount Paid:</span>
                            <div className="flex items-center gap-1">
                                <FaReceipt className="text-green-500" />
                                <span className="font-semibold">
                                    NPR 1,500.00
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">
                                Transaction ID:
                            </span>
                            <span className="font-mono text-sm text-gray-500">
                                TXID-6789-4567
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg
                        transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <FaHouseMedical className="text-xl" />
                            Return to Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/transactions")}
                            className="w-full text-green-600 hover:text-green-700 font-medium py-2 px-4
                        flex items-center justify-center gap-2"
                        >
                            <FaReceipt className="text-lg" />
                            View Transaction History
                        </button>
                    </div>

                    {/* Security Assurance */}
                    <div className="mt-8 pt-6 border-t w-full">
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                            <FaShieldHeart className="text-green-500" />
                            <span className="text-sm">
                                Secured & Processed by eSewa Payments
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaySuccess;
