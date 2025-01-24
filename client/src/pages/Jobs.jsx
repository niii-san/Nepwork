import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../utils/api";

function Jobs() {
    const { jobId } = useParams();
    const [currentJob, setCurrentJob] = useState(null);

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

    return (
        <div className="min-h-[800px]">
            <div>Viewing job page of {jobId}</div>
        </div>
    );
}

export default Jobs;

/*
 * currentJobStructure
 * {
    "statusCode": 200,
    "success": true,
    "isAuthenticated": false,
    "message": "Job fetched",
    "data": {
        "_id": "67924dd7074e0e5b64154f6a",
        "title": "test",
        "description": "testasdfadsf adf",
        "postedBy": {
            "name": {
                "firstName": "Nishan",
                "middleName": "",
                "lastName": "Bista"
            },
            avatar:"profile_picture_url" or null.
            "_id": "67756cc5b2a720d137dee1c6"
        },
        "appliedBy": [],
        "acceptedFreelancer": null,
        "hourlyRate": 50,
        "tags": [
            "javascript",
            "django"
        ],
        "status": "open",
        "createdAt": "2025-01-23T14:10:31.521Z",
        "updatedAt": "2025-01-23T14:10:31.521Z",
        "__v": 0
    }
}
 * */
