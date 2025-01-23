import React, { useState } from "react";
import { useUser } from "../stores";
import { Loader, Button, PostJobModal, AllPostedJobs } from "../components";
import { IoMdNotificationsOutline } from "react-icons/io";

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
                <div className="bg-red min-h-[800px]">
                    <div className="flex">
                        <AllPostedJobs />
                        <div className="flex flex-wrap items-center">
                            <div
                                id="btns"
                                className="w-[200px] h-[200px] flex flex-col justify-evenly bg-gray-300"
                            >
                                <Button
                                    className={` w-full`}
                                    onClick={() => setShowPostJobModal(true)}
                                >
                                    Post Job
                                </Button>

                                <Button className="w-full relative">
                                    <IoMdNotificationsOutline className="text-2xl" />
                                    <p className="absolute top-1 translate-x-3.5 text-[12px] font-bold text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                                        1
                                    </p>
                                </Button>
                            </div>
                            <div className="">
                                <div
                                    id="totalspendings"
                                    className="h-[300px] w-[500px] bg-green-500"
                                >
                                    Total Spendings
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full">
                                        View all transactions
                                    </Button>{" "}
                                </div>
                            </div>
                        </div>
                    </div>
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
