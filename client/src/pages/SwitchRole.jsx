import React, { useState } from "react";
import { useUser } from "../stores";
import { Loader, Button } from "../components";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function SwitchRole() {
    const navigate = useNavigate();
    const userData = useUser((state) => state.data);
    const [openModal, setOpenModal] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!userData) return <Loader />;

    const handleRoleSwitch = async () => {
        setLoading(true);
        const payload = {
            role: userData.role === "client" ? "freelancer" : "client",
        };

        try {
            const response = await api.post("/user/switch-role", payload);
            toast.success(response.data.message);

            if (errMsg) setErrMsg("");
            setLoading(false);
            navigate("/settings");
        } catch (error) {
            setErrMsg(error.response.data.message);
            setLoading(false);
        }
    };

    const renderRules = () => {
        if (userData.role === "client") {
            return (
                <ol>
                    <li>All your posted jobs should be closed.</li>
                </ol>
            );
        } else if (userData.role === "freelancer") {
            return (
                <ol>
                    <li>Must not be involved in any job.</li>
                </ol>
            );
        }
        return null;
    };

    return (
        <div className="min-h-[800px] p-4">
            <div id="Rules">
                <h1>Rules for Switching Roles</h1>
                <h2>Applies if currently {userData.role.toUpperCase()}</h2>
                {renderRules()}
                <h2>Applies to All Users</h2>
                <ol>
                    <li>Email Address should be verified</li>
                    <li>Kyc should be verified</li>
                    <li>Can only switch once every 14 days.</li>
                </ol>
            </div>

            <div id="switching-actions" className="mt-8">
                <div>
                    You're currently:{" "}
                    <strong>{userData.role.toUpperCase()}</strong>
                </div>
                <Button onClick={() => setOpenModal(true)}>
                    Switch to{" "}
                    {userData.role === "client" ? "FREELANCER" : "CLIENT"}
                </Button>
            </div>

            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4 text-center">
                            Confirm Role Switch
                        </h2>
                        <div className="mb-6"></div>
                        <p>
                            Are you sure you want to switch from{" "}
                            <strong>{userData.role.toUpperCase()}</strong> to{" "}
                            <strong>
                                {userData.role === "client"
                                    ? "FREELANCER"
                                    : "CLIENT"}
                            </strong>
                            ?
                        </p>
                        {errMsg && (
                            <p className="text-red-600 text-center mt-2 text-sm">
                                {errMsg}
                            </p>
                        )}

                        <div className="flex justify-evenly mt-4 gap-x-4">
                            <Button
                                variant="filled"
                                className="border-red-500 bg-red-400 text-black"
                                onClick={() => {
                                    if (errMsg) setErrMsg("");
                                    setOpenModal(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={loading}
                                loading={loading}
                                variant="filled"
                                onClick={handleRoleSwitch}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SwitchRole;
