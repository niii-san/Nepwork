import React, { useState, useEffect } from "react";
import { useUser } from "../stores";
import { Loader, Button, PostJobModal, PostedJobs } from "../components";
import { IoMdNotificationsOutline } from "react-icons/io";
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
        const [totalSpent] = useState(254600);
        const [transactions] = useState([
            {
                date: "2023-07-15",
                desc: "Web Development Project",
                amount: 120000,
            },
            { date: "2023-07-10", desc: "Mobile App Design", amount: 84600 },
            { date: "2023-07-05", desc: "SEO Services", amount: 50000 },
        ]);

        return (
            <>
                {showPostJobModal && (
                    <PostJobModal setShowPostJobModal={setShowPostJobModal} />
                )}
                <div className="min-h-screen bg-gray-50 p-6">
                    {/* Total Spendings Section */}
                    <div className="bg-gradient-to-r from-primary/60 to-primary/90 text-white p-6 rounded-xl mb-8 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Total Spendings
                        </h2>
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold">
                                Rs {totalSpent.toLocaleString()}
                            </span>
                            <button className="ml-auto bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                                View All Transactions
                            </button>
                        </div>
                    </div>

                    {/* Jobs Section */}
                    <PostedJobs showPostJobModalFn={setShowPostJobModal} />

                    {/* Recent Transactions */}
                    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Recent Transactions
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b">
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Description</th>
                                        <th className="pb-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-3">{txn.date}</td>
                                            <td className="py-3">{txn.desc}</td>
                                            <td className="py-3 font-medium">
                                                Rs {txn.amount.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
