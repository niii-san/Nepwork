import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../utils/api";
import { Button, Loader } from "../components";
import default_avatar from "../assets/default_avatar.svg";
import { useUser } from "../stores";
import Tag from "../components/Tag";

function Jobs() {
    const { jobId } = useParams();
    const userData = useUser((state) => state.data);
    console.log(userData);
    const [currentJob, setCurrentJob] = useState(null);
    const [editJob, setEditJob] = useState(false);

    const statusStyles = {
        open: "bg-primary text-whitetext",
        closed: "bg-red-500 text-whitetext",
        finished: "bg-gray-500 text-whitetext",
        in_progress: "bg-gray-500 text-whitetext",
    };

    useEffect(() => {
        const fetchSetCurrentJob = async () => {
            try {
                const response = await api.get(`/jobs/${jobId}`);
                setCurrentJob(response.data.data);
            } catch (error) {
                console.error(`failed to fetch job`, error);
            }
        };
        fetchSetCurrentJob();
    }, []);
    const getTimeSincePosted = (createdAt) => {
        const now = new Date();
        const createdTime = new Date(createdAt);
        const timeDifference = Math.floor((now - createdTime) / 1000);

        if (timeDifference < 60) {
            return `${timeDifference} seconds ago`;
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `${days} day${days > 1 ? "s" : ""} ago`;
        }
    };
    return (
        <div className="flex justify-center items-center">
            {!currentJob ? (
                <Loader />
            ) : (
                <div
                    className="flex w-[600px] items-center flex-col rounded-md mt-10"
                    id="jobDetailsContainer"
                >
                    <div className="flex justify-center items-center" id="postedByDetails">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                src={
                                    currentJob.postedBy.avatar ?? default_avatar
                                }
                                alt="Avatar"
                                className="w-[200px] h-[200px] rounded-3xl bg-green-600"
                            />
                        </div>
                        <div
                            className="ml-4 text-lg flex flex-col justify-center"
                            id="jobDetails"
                        >
                            <p className="text-lg">
                                <strong>Posted By:</strong>
                                <span className="font-semibold">
                                    {" "}
                                    {currentJob.postedBy.name.firstName}{" "}
                                    {currentJob.postedBy.name.middleName}{" "}
                                    {currentJob.postedBy.name.lastName}
                                </span>
                            </p>
                            <p>
                                <strong>Job Title:</strong>{" "}
                                <span className="font-semibold">
                                    {currentJob.title}
                                </span>
                            </p>
                            <p>
                                <strong>Job posted:</strong>{" "}
                                <span className="font-semibold">
                                    {" "}
                                    {getTimeSincePosted(currentJob.createdAt)}
                                </span>
                            </p>
                            <p>
                                <strong>Job Status:</strong>{" "}
                                <span
                                    className={`text-sm font-medium px-3 py-1 rounded ${statusStyles[currentJob.status] || "bg-gray-300 text-black"}`}
                                >
                                    {currentJob.status === "in_progress"
                                        ? "In Progress"
                                        : currentJob.status === "open"
                                          ? "Open"
                                          : currentJob.status === "closed"
                                            ? "Closed"
                                            : currentJob.status === "finished"
                                              ? "Finished"
                                              : currentJob.status}
                                </span>
                            </p>
                            <p>
                                <strong>NRS:</strong>{" "}
                                <span className="font-semibold">
                                    {currentJob.hourlyRate}/hr
                                </span>
                            </p>
                            <p>
                                <strong>Tags: </strong>
                                {currentJob.tags.map((item) => (
                                    <Tag
                                        className={"mr-1"}
                                        name={item}
                                        key={item}
                                    />
                                ))}
                            </p>
                            <p>
                                <strong>Applied By:</strong>
                                <span className="font-semibold">
                                    {" "}
                                    {currentJob.appliedBy.length} Freelancers
                                </span>
                            </p>
                            <p>
                                <strong>Accepted Freelancer:</strong>
                                <span className="font-semibold">
                                    {" "}
                                    {currentJob.acceptedFreelancer ??
                                        "Not selected"}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <p>
                            <strong className="text-lg">Job Description:</strong>
                            <span>
                                {" "}
                                {currentJob.description}
                            </span>
                        </p>
                    </div>
                    {/*Edit button*/}
                    {!userData ? (
                        ""
                    ) : currentJob.postedBy._id == userData._id ? (
                        <Button className={"mt-4 w-full font-semibold"}>
                            EDIT JOB
                        </Button>
                    ) : (
                        <Button>Request to work</Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Jobs;

/*
 {
        "_id": "67924dd7074e0e5b64154f6a",
        "title": "test",###
        "description": "testasdfadsf adf",###
        "postedBy": {###
            "name": {
                "firstName": "Nishan",
                "middleName": "",
                "lastName": "Bista"
            },
            avatar:"profile_picture_url" or null.###
            "_id": "67756cc5b2a720d137dee1c6"
        },
        "appliedBy": [],###
        "acceptedFreelancer": null,###
        "hourlyRate": 50,###
        "tags": [###
            "javascript",
            "django"
        ],
        "status": "open",###
        "createdAt": "2025-01-23T14:10:31.521Z",
        "updatedAt": "2025-01-23T14:10:31.521Z",
        "__v": 0
    }
 * */
