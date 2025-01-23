import React, { useEffect, useState } from "react";
import JobListCard from "../JobListCard";
import { fetchPostedJobs } from "./clientDashboardHelpers";

function AllPostedJobs() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchjobs = async () => {
            fetchPostedJobs();
            try {
                const response = await fetchPostedJobs();
                setData(response.data.data);
            } catch (error) {
                console.error(error);
                setErr("Failed to load posted jobs");
            } finally {
                setLoading(false);
            }
        };
        fetchjobs();
    }, []);

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
            {err ? (
                <div>{err}</div>
            ) : loading ? (
                <div>Loading...</div>
            ) : data.length == 0 ? (
                "No any jobs posted"
            ) : (
                data.map((item) => (
                    <JobListCard
                        key={item._id}
                        jobtitle={item.title}
                        amount={item.hourlyRate}
                        freelancer={item.acceptedFreelancer}
                        status={item.status}
                    />
                ))
            )}
        </div>
    );
}

export default AllPostedJobs;
