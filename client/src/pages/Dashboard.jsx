import React, { useState, useEffect } from "react";
import { useUser } from "../stores";
import {
    Loader,
    PostJobModal,
    PostedJobs,
    RecentTransactions,
    TotalSpending,
} from "../components";
import { useNavigate } from "react-router";

function Dashboard() {
    const userData = useUser((state) => state.data);
    if (!userData) return <Loader />;

    return (
        <div className="min-h-[800px] bg-secondary">
            {userData.role === "client" ? (
                <ClientDashboard />
            ) : userData.role === "freelancer" ? (
                <FreelancerDashboard />
            ) : (
                <div className="bg-red-500 w-full h-full">
                    Something went wrong
                </div>
            )}
        </div>
    );

    function ClientDashboard() {
        const [showPostJobModal, setShowPostJobModal] = useState(false);

        return (
            <>
                {showPostJobModal && (
                    <PostJobModal setShowPostJobModal={setShowPostJobModal} />
                )}
                <div className="min-h-screen bg-gray-50 p-6">
                    {/*Total spending section*/}
                    <TotalSpending />

                    {/* Jobs Section */}
                    <PostedJobs showPostJobModalFn={setShowPostJobModal} />

                    {/*Recent Transactions*/}
                    <RecentTransactions />
                </div>
            </>
        );
    }

    // Freelancer Dashboard
    function FreelancerDashboard() {
        return <div className="bg-red">this is freelancer dashboard</div>;
    }
}

export default Dashboard;
