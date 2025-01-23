import React from "react";
import { Link } from "react-router";

function JobListCard({ jobId, jobtitle, amount, freelancer, status }) {
    const statusStyles = {
        open: "bg-primary text-whitetext",
        closed: "bg-red-500 text-whitetext",
        finished: "bg-gray-500 text-black",
    };
    return (
        <Link
            to={`/jobs/${jobId}`}
            className="flex justify-between items-center w-full py-3 border-b border-[#eeeeee] cursor-pointer hover:bg-secondary rounded-lg px-6"
        >
            <div className="flex-1">
                <h2 className="text-blacktext text-sm font-medium">
                    {jobtitle}
                </h2>
            </div>
            <div className="flex-1">
                <h2 className="text-blacktext text-sm font-medium">
                    Rs.{amount}
                </h2>
            </div>
            <div className="flex-1">
                <h2 className="text-blacktext text-sm font-medium">
                    {freelancer ?? "Not accepted"}
                </h2>
            </div>
            <div className="">
                <h2
                    className={`text-sm font-medium px-3 py-1 rounded ${statusStyles[status] || "Error"}`}
                >
                    {status}
                </h2>
            </div>
        </Link>
    );
}

export default JobListCard;
