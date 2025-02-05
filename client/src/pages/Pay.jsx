import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import api from "../utils/api";
import { Button } from "../components";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import {
    FaEthereum,
    FaSpinner,
    FaMoneyCheckAlt,
    FaLock,
    FaCheck,
} from "react-icons/fa";

function Pay() {
    const { jobId } = useParams();
    const [transactionDetail, setTransactionDetail] = useState(null);
    const [fetchingDetail, setFetchingDetail] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        amount: 10,
        tax_amount: 0,
        total_amount: 10,
        product_delivery_charge: 0,
        product_service_charge: 0,
        product_code: "EPAYTEST",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "",
        transaction_uuid: uuidv4(),
        secret: "8gBm/:&EnhH.1/q",
        failure_url: "",
        success_url: "",
    });

    console.log(formData);

    const fetchSetTransactionDetail = async () => {
        try {
            const response = await api.get(`/jobs/transaction/${jobId}`);
            setTransactionDetail(response.data.data);
            setFetchingDetail(false);
        } catch (error) {
            toast.error("Failed to fetch transaction detail, try reloading");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSetTransactionDetail();
    }, []);

    const generateSignature = (
        total_amount,
        transaction_uuid,
        product_code,
        secret,
    ) => {
        const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
        const hash = CryptoJS.HmacSHA256(hashString, secret);
        return CryptoJS.enc.Base64.stringify(hash);
    };

    useEffect(() => {
        if (!fetchingDetail && transactionDetail) {
            const { total_amount, transaction_uuid, product_code, secret } =
                formData;
            const hashedSignature = generateSignature(
                total_amount,
                transaction_uuid,
                product_code,
                secret,
            );
            setFormData((prev) => ({
                ...prev,
                signature: hashedSignature,
                amount: transactionDetail.amount,
                total_amount: transactionDetail.amount,
                failure_url: `http://localhost:5173/jobs/transaction/${transactionDetail._id}/pay/failure`,
                success_url: `http://localhost:5173/jobs/transaction/${transactionDetail._id}/pay/success`,
            }));
        }
    }, [transactionDetail, formData.amount]);

    const handleSubmit = () => {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 2000);
    };

    if (fetchingDetail)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-center mb-6">
                    <FaMoneyCheckAlt className="text-4xl text-primary mr-3" />
                    <h1 className="text-3xl font-bold text-gray-800">
                        Payment Gateway
                    </h1>
                </div>

                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <FaEthereum className="text-2xl text-gray-600" />
                        <h2 className="text-4xl font-bold text-gray-800">
                            NPR {formData?.total_amount}
                        </h2>
                    </div>
                    <p className="text-gray-600 flex items-center justify-center gap-1">
                        <FaLock className="text-green-500" />
                        Secure payment processed by eSewa
                    </p>
                </div>

                <form
                    action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-4 mb-8">
                        <input
                            readOnly
                            type="hidden"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                        />
                        <input
                            type="hidden"
                            id="tax_amount"
                            name="tax_amount"
                            value={formData.tax_amount}
                            required
                        />
                        <input
                            type="hidden"
                            id="total_amount"
                            name="total_amount"
                            value={formData.total_amount}
                            required
                        />
                        <input
                            type="hidden"
                            id="transaction_uuid"
                            name="transaction_uuid"
                            value={formData.transaction_uuid}
                            required
                        />
                        <input
                            type="hidden"
                            id="product_code"
                            name="product_code"
                            value={formData.product_code}
                            required
                        />
                        <input
                            type="hidden"
                            id="product_service_charge"
                            name="product_service_charge"
                            value={formData.product_service_charge}
                            required
                        />
                        <input
                            type="hidden"
                            id="product_delivery_charge"
                            name="product_delivery_charge"
                            value={formData.product_delivery_charge}
                            required
                        />
                        <input
                            type="hidden"
                            id="success_url"
                            name="success_url"
                            value={formData.success_url}
                            required
                        />
                        <input
                            type="hidden"
                            id="failure_url"
                            name="failure_url"
                            value={formData.failure_url}
                            required
                        />
                        <input
                            type="hidden"
                            id="signed_field_names"
                            name="signed_field_names"
                            value={formData.signed_field_names}
                            required
                        />
                        <input
                            type="hidden"
                            id="signature"
                            name="signature"
                            value={formData.signature}
                            required
                        />{" "}
                    </div>

                    <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaCheck className="text-green-500" />
                            <span>Instant payment processing</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="filled"
                        className="w-full"
                        disabled={
                            isProcessing || transactionDetail?.status === "done"
                        }
                    >
                        {isProcessing ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <>
                                <FaEthereum className="text-xl" />
                                {transactionDetail?.status === "done"
                                    ? "Already done"
                                    : "Proceed to pay"}
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Pay;
