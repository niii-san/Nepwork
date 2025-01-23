import React, { useState } from "react";
import { useUser } from "../stores";
import {
    Loader,
    Button,
    PostJobModal,
    AllPostedJobs,
} from "../components";

function Dashboard() {
    const userData = useUser((state) => state.data);

    if (!userData) return <Loader />;

    return (
        <div className="min-h-[800px] bg-secondary">
            {userData.role === "client" ? (
                <ClientDashBoard />
            ) : userData.role === "freelancer" ? (
                <FreelancerDashboard />
            ) : (
                <div className="bg-red-500 w-full h-full">
                    Something went wrong
                </div>
            )}
        </div>
    );

    // Client Dashboard
    function ClientDashBoard() {
        const [showPostJobModal, setShowPostJobModal] = useState(false);

        return (
            <>
                {showPostJobModal && (
                    <PostJobModal setShowPostJobModal={setShowPostJobModal} />
                )}
                <div className="bg-red">
                    <h1 className="text-center">Client Dashboard</h1>

                    <Button
                        className={`ml-4`}
                        onClick={() => setShowPostJobModal(true)}
                    >
                        Post Job
                    </Button>
                </div>
                <AllPostedJobs />
            </>
        );
    }

    // Freelancer Dashboard
    function FreelancerDashboard() {
        return <div className="bg-red">this is freelancer dashboard</div>;
    }
}

export default Dashboard;
