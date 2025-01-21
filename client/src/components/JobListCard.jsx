import React from "react";

function JobListCard({jobtitle,amount,freelancer,statustitle,status}) {
    const statusStyles = {
        done: "bg-primary text-whitetext",
        inprogress: "bg-[#BABABA] text-whitetext",
        cancelled: "bg-red-500 text-whitetext",
    };
    return (
        <div className="flex justify-between items-center w-full py-[20px] border-b border-[#eeeeee]">
            <div className="flex-1">
                <h2 className="text-blacktext text-sm font-medium">
                    {jobtitle}
                </h2>
            </div>
            <div className="flex-1">
                <h2 className="text-blacktext text-sm font-medium">Rs.{amount}</h2>
            </div>
            <div className="flex-1">
                <h2 className="text-blacktext text-sm font-medium">
                    {freelancer}
                </h2>
            </div>
            <div className="">
                <h2 className={`text-sm font-medium px-3 py-1 rounded ${statusStyles[status] || ""}`}>{statustitle}</h2>
            </div>
        </div>
    );
}

export default JobListCard;
