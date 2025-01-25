import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../utils/api";
import { Button, Loader } from "../components";
import default_avatar from "../assets/default_avatar.svg";
import { useUser } from "../stores";

function Jobs() {
    const { jobId } = useParams();
    const userData = useUser((state) => state.data);
    console.log(userData);
    const [currentJob, setCurrentJob] = useState(null);
    const [editJob, setEditJob] = useState(false);

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
        <div className="min-h-[800px]">
            {!currentJob ? (
                <Loader />
            ) : (
                <div id="jobDetailsContainer">
                    <div id="postedByDetails">
                        <img
                            src={currentJob.postedBy.avatar ?? default_avatar}
                            alt="Avatar"
                            className="w-[200px] h-[200px] rounded-full bg-red-500"
                        />
                        <p>
                            Name: {currentJob.postedBy.name.firstName}{" "}
                            {currentJob.postedBy.name.middleName}{" "}
                            {currentJob.postedBy.name.lastName}
                        </p>
                    </div>

                    <div id="jobDetails">
                        <p>Job Status: {currentJob.status}</p>
                        <p>
                            Job posted:{" "}
                            {getTimeSincePosted(currentJob.createdAt)}
                        </p>
                        <p>Job Title: {currentJob.title}</p>
                        <p>Job Description: {currentJob.description}</p>
                        <p>NRS {currentJob.hourlyRate}/hr</p>
                        <p>
                            Tags:
                            {currentJob.tags.map((item) => (
                                <span key={item}>{item}</span>
                            ))}
                        </p>
                        <p>
                            Accepted Freelancer:{" "}
                            {currentJob.acceptedFreelancer ?? "Not selected"}
                        </p>
                        <p>
                            Applied By: {currentJob.appliedBy.length}{" "}
                            Freelancers
                        </p>
                    </div>
                    {/*Edit button*/}
                    {!userData ? (
                        ""
                    ) : currentJob.postedBy._id == userData._id ? (
                        <Button>Edit Job</Button>
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
