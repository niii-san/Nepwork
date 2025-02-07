import React from "react";
import Button from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

function KycList({ data }) {
    const { name, status, createdAt, _id } = data;
    const navigate = useNavigate();

    const formatedDate = new Date(createdAt);

    return (
        <div className="min-w-[800px] bg-tertiary rounded-xl shadow-card_shadow hover:shadow-lg transition-shadow duration-200 border border-primary bg-white">
            <div className="flex items-center justify-between p-4">
                <div className="flex-1">
                    <strong className="text-lg text-blacktext">
                        {name.firstName} {name.middleName ?? " "} {name.lastName}
                    </strong>
                </div>
                <div className="flex-1 text-center text-grey_text border-x border-primary px-4">
                    Submitted at: {formatedDate.toLocaleDateString()}
                </div>
                <div className="flex-1 text-center">
                    <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                            status === "pending"
                                ? "bg-yellow-500"
                                : status === "verified"
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                        }`}
                    >
                        {status}
                    </span>
                </div>
                <div className="flex-1 text-right">
                    <Button
                        onClick={() => navigate(`/kycs/${_id}`)}
                        className="bg-primary text-white px-5 py-1 pb-2 rounded-lg hover:bg-hover_button hover:text-gray-600 transition-all duration-200 shadow-button_shadow"
                    >
                        <FaArrowRightLong className="inline-block" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default KycList;