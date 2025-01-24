import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../utils/api";

function Jobs() {
    const { jobId } = useParams();
    const [currentJob, setCurrentJob] = useState(null);
    console.log(currentJob)


    useEffect(()=>{
        const fetchSetCurrentJob = async()=>{
            try {
                const response = api.get(`/`)
            
                
            } catch (error) {
                
            }

        }
        fetchSetCurrentJob()

    },[])

    return (
        <div className="min-h-[800px]">
            <div>Viewing job page of {jobId}</div>
        </div>
    );
}

export default Jobs;
