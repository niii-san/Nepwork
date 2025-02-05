import React, { useEffect, useState } from "react";
import { usePostedJobs } from "../../stores";
import NullLoader from "../NullLoader";
import Loader from "../Loader";
import { Link } from "react-router";
import Button from "../Button";

function PostedJobs({ showPostJobModalFn }) {
    const jobs = usePostedJobs((state) => state.jobs);
    console.log(jobs);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const fetchPostedJobs = usePostedJobs((state) => state.fetchPostedJobs);
    const loading = usePostedJobs((state) => state.loading);
    const error = usePostedJobs((state) => state.error);

    useEffect(() => {
        fetchPostedJobs();
    }, []);

    const filteredJobs = jobs.filter((job) =>
        selectedFilter === "all" ? true : job.status === selectedFilter,
    );

    const statusStyles = {
        open: "bg-green-100 text-green-800",
        in_progress: "bg-blue-100 text-blue-800",
        finished: "bg-yellow-100 text-yellow-800",
        closed: "bg-gray-100 text-gray-800",
    };
    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                    <h3 className="text-gray-500 text-sm">Total Jobs Posted</h3>
                    <p className="text-2xl font-bold mt-2">{jobs.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                    <h3 className="text-gray-500 text-sm">Avg. Spending /hr</h3>
                    <p className="text-2xl font-bold mt-2">
                        Rs. {getAvgSpending(filteredJobs)}
                    </p>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                    {["all", "open", "in_progress", "finished", "closed"].map(
                        (filter) => (
                            <button
                                key={filter}
                                onClick={() =>
                                    setSelectedFilter(
                                        filter === "all" ? "all" : filter,
                                    )
                                }
                                className={`px-4 py-2 rounded-full capitalize ${selectedFilter === filter
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    } transition-colors`}
                            >
                                {filter.replace("_", " ")}
                            </button>
                        ),
                    )}
                </div>

                <div className="grid gap-4 min-h-[200px] max-h-[600px] lg:w-[90%] lg:mx-auto overflow-y-scroll">
                    {filteredJobs.length === 0 ? (
                        <NullLoader message={"No jobs "} />
                    ) : (
                        filteredJobs.map((job) => (
                            <Link
                                to={`/jobs/${job._id}`}
                                key={job?._id}
                                className="p-4 border h-fit rounded-lg hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-6 flex-wrap">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">
                                            {job.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {job?.acceptedFreelancer
                                                ? `${job?.acceptedFreelancer?.name?.firstName} ${job?.acceptedFreelancer?.name?.lastName}`
                                                : "Not selected"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <span className="font-medium">
                                            Rs {job.hourlyRate}/hr
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${statusStyles[job.status]}`}
                                        >
                                            {job.status.replace("_", " ")}
                                        </span>
                                        <span className="text-gray-500 text-sm capitalize w-[60px] ">
                                            {job.payment.done
                                                ? "Paid"
                                                : "Not Paid"}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                <Button
                    variant="filled"
                    onClick={() => showPostJobModalFn(true)}
                    className="mt-6 w-full"
                >
                    Post a Job
                </Button>
            </div>
        </>
    );
}
function getAvgSpending(jobs) {
    let total = 0;
    jobs.forEach((element) => {
        total += element.hourlyRate;
    });
    total = total / jobs.length;
    return total.toFixed(2);
}

// job object
// {
// acceptedApplication: "679f91ec53d16a08d2d1096c",
// acceptedFreelancer: {name: {firstName:"xx",lastName:"yy"}, _id: '679f07f218dc7102ad4b0f2a', avatar: null},
// applications:(2) ['679f91c453d16a08d2d108cc', '679f91ec53d16a08d2d1096c'],
// createdAt:"2025-02-02T15:39:11.997Z",
// description:
// "This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job This is first job",
// hasFinished:true,
// hourlyRate:2000,
// payment:{done: false, amount: 38930},
// postedBy:"679f097c18dc7102ad4b1007",
// status:"finished",
// tags:(8) ['frontend', 'backend', 'fullstack', 'javascript', 'typescript', 'react', 'nextjs', 'html'],
// title:"This is first job",
// transaction:"67a0e44bf867b062aaa14f0c",
// updatedAt:"2025-02-03T15:44:11.346Z",
// __v:2,
// _id:"679f919f53d16a08d2d108a3"}

export default PostedJobs;
