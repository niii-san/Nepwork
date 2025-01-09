import React from "react";
import Button from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

function KycList({ data }) {
    const { name, status, createdAt, _id } = data;
    const navigate = useNavigate();

    const formatedDate = new Date(createdAt);

    return (
        <div className=" min-w-[650px] h-[60px] flex ">
            <div className="bg-[#F0F3FF] flex w-[85%] border-2 border-primary rounded-l-xl">
                <div id="name" className="w-[40%] flex items-center px-3">
                    <strong>
                        {name.firstName} {name.middleName ?? " "} {"  "}
                        {name.lastName}
                    </strong>
                </div>
                <div
                    id="submitedAt"
                    className="w-[35%] flex items-center justify-center border-x-2 border-primary"
                >
                    Submitted at: {formatedDate.getFullYear()}-
                    {formatedDate.getMonth() + 1}-{formatedDate.getDay()}
                </div>
                <div
                    id="status"
                    className="flex w-[25%] justify-center items-center"
                >
                    <p
                        className={`rounded-lg px-5 py-2 ${status === "pending" ? "bg-[#FFD65A]" : status === "verified" ? "bg-green-500" : "bg-red-500"}`}
                    >
                        {status}
                    </p>
                </div>
            </div>
            <div className="w-[15%]">
                <Button
                    onClick={() => navigate(`/kycs/${_id}`)}
                    className="h-full border-r-2 border-y-2 border-l-none rounded-l-none rounded-r-xl bg-[#F0F3FF]"
                >
                    <FaArrowRightLong className="text-3xl" />
                </Button>
            </div>
        </div>
    );
}

export default KycList;
