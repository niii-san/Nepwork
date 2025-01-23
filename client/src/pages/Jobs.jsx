import React from "react";
import { useParams } from "react-router";

function Jobs() {
    const { jobId } = useParams();
    return (
        <div className="min-h-[800px]">
            <div>Viewing job page of {jobId}</div>
        </div>
    );
}

export default Jobs;
