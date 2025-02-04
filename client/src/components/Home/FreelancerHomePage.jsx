import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import JobCard from "../JobCard";
import toast from "react-hot-toast";
import Loader from "../Loader";
import SearchBox from "../SearchBox";

function FreelancerHomePage({ isLoggedIn, userData }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSetJobs = async () => {
            try {
                const response = await api.get("/jobs/get-home-jobs");
                setJobs(response.data.data);
            } catch (error) {
                toast.error("failed loading home");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSetJobs();
    }, []);

    return (
        <div className="min-h-screen">
            <SearchBox type="freelancer" />
            <div className="mt-4 flex max-w-full justify-center items-center flex-col">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex mt-6 w-full px-8 flex-wrap gap-12">
                        {jobs.map((item) => (
                            <JobCard key={item._id} jobData={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FreelancerHomePage;
