import React from "react";
import { Link } from "react-router";
import capitalize from "../utils/capitalize";

function JobListCard({ jobId, jobtitle, amount, freelancer, status }) {
    const statusStyles = {
        open: "bg-primary text-whitetext",
        closed: "bg-red-500 text-whitetext",
        finished: "bg-gray-500 text-whitetext",
        in_progress: "bg-gray-500 text-whitetext",
    };
    return (
        <Link
            to={`/jobs/${jobId}`}
            className="flex justify-between items-center w-[740px] py-3 border-b border-[#eeeeee] cursor-pointer hover:bg-secondary rounded-lg"
        >
            <div className="flex justify-between items-center w-full mx-auto">
                <div className="flex w-[24%]">
                    <h2 className="text-blacktext text-sm font-medium">
                        {jobtitle}
                    </h2>
                </div>
                <div className="flex w-[24%]">
                    <h2 className="text-blacktext text-sm font-medium">
                        Rs.{amount}
                    </h2>
                </div>
                <div className="flex w-[24%]">
                    <h2 className="text-blacktext text-sm font-medium">
                        {!freelancer
                            ? "Not accepted"
                            : capitalize(freelancer.name.firstName)}
                    </h2>
                </div>
                <div className="flex w-[24%] justify-center">
                    <h2
                        className={`text-sm font-medium px-3 py-1 rounded ${statusStyles[status] || "Error"}`}
                    >
                        {status === "in_progress"
                            ? "In Progress"
                            : status === "open"
                              ? "Open"
                              : status === "closed"
                                ? "Closed"
                                : status === "finished"
                                  ? "Finished"
                                  : status}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default JobListCard;
