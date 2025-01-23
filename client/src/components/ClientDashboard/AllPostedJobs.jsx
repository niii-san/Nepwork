import React, { useEffect, useState } from "react";
import JobListCard from "../JobListCard";
import { usePostedJobs } from "../../stores";
import NullLoader from "../NullLoader";

function AllPostedJobs() {
    const data = usePostedJobs((state) => state.jobs);
    const fetchPostedJobs = usePostedJobs((state) => state.fetchPostedJobs);
    const loading = usePostedJobs((state) => state.loading);
    const error = usePostedJobs((state) => state.error);

    useEffect(() => {
        fetchPostedJobs();
    }, []);

    return (
        <div className="w-[634px] h-[800px] bg-white shadow-card_shadow rounded-md mt-5 ml-4 p-[42px] flex  flex-col items-center">
            <h1 className="text-primary text-[22px] font-semibold text-center">
                All Posted Jobs
            </h1>

            <div className="flex justify-between items-center w-[90%] py-3">
                <div className="flex-1">
                    <h2 className="font-bold">Job Title</h2>
                </div>
                <div className="flex-1">
                    <h2 className="font-bold">NRS/hr</h2>
                </div>
                <div className="flex-1">
                    <h2 className="font-bold">Freelancer</h2>
                </div>
                <div className="font-bold">
                    <h2>Status</h2>
                </div>
            </div>

            <hr className="mt-[14px] border-[#eeeeee] w-full" />
            {error ? (
                <div>{error}</div>
            ) : loading ? (
                <div>Loading...</div>
            ) : data.length == 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                    <NullLoader message="No any jobs posted yet." />
                </div>
            ) : (
                <div className="w-full h-full overflow-y-scroll">
                    {data.map((item) => (
                        <JobListCard
                            key={item._id}
                            jobId={item._id}
                            jobtitle={item.title}
                            amount={item.hourlyRate}
                            freelancer={item.acceptedFreelancer}
                            status={item.status}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllPostedJobs;
