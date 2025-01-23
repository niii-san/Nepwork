import React from "react";
import JobListCard from "../JobListCard";

function AllPostedJobs() {
    return (
        <div className="w-[634px] bg-white shadow-card_shadow rounded-md mt-5 ml-4 p-[42px] flex  flex-col items-center">
            <h1 className="text-primary text-[22px] font-semibold text-center">
                All Posted Jobs
            </h1>
            <div className="flex justify-between items-center w-full mt-[30px]">
                <div>
                    <h2 className="text-[#939393] text-sm font-medium">
                        Job Title
                    </h2>
                </div>
                <div>
                    <h2 className="text-[#939393] text-sm font-medium">
                        Nrs/Hr
                    </h2>
                </div>
                <div>
                    <h2 className="text-[#939393] text-sm font-medium">
                        Freelancer
                    </h2>
                </div>
                <div>
                    <h2 className="text-[#939393] text-sm font-medium">
                        Status
                    </h2>
                </div>
            </div>
            <hr className="mt-[14px] border-[#eeeeee] w-full" />
            <JobListCard
                jobtitle="Design a Logo"
                amount="50.00"
                freelancer="Jane Cooper"
                statustitle="Done"
                status="done"
            />
            <JobListCard
                jobtitle="Graphic Designer"
                amount="130.00"
                freelancer="Jane Cooper"
                statustitle="In Progress"
                status="inprogress"
            />
            <JobListCard
                jobtitle="Graphic Designer"
                amount="130.00"
                freelancer="Jane Cooper"
                statustitle="Cancelled"
                status="cancelled"
            />
            <JobListCard
                jobtitle="Design a Logo"
                amount="50.00"
                freelancer="Jane Cooper"
                statustitle="Done"
                status="done"
            />
            <JobListCard
                jobtitle="Graphic Designer"
                amount="130.00"
                freelancer="Jane Cooper"
                statustitle="In Progress"
                status="inprogress"
            />
            <JobListCard
                jobtitle="Graphic Designer"
                amount="130.00"
                freelancer="Jane Cooper"
                statustitle="In Progress"
                status="inprogress"
            />
        </div>
    );
}

export default AllPostedJobs;
