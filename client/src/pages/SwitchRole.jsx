import React, { useState } from "react";
import { useUser } from "../stores";
import { Loader, Button } from "../components";

function SwitchRole() {
    const userData = useUser((state) => state.data);
    const [openModal, setOpenModal] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    if (!userData) return <Loader />;

    const handleRoleSwitch = async () => {
        const payload = {
            role: userData.role === "client" ? "freelancer" : "client",
        };
        console.log(payload)

        setOpenModal(false);
        //TODO: server interaction
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
                    <li>Can only switch once every 30 days.</li>
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
                        <h2 className="text-lg font-bold mb-4">
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
                        <div id="errmsg" className="bg-red-500 h-6 mt-2">
                            {errMsg && <p className="bg-red-500">{errMsg}</p>}
                        </div>

                        <div className="flex justify-evenly mt-8">
                            <Button
                                style="filled"
                                className="border-red-500 bg-red-400 text-black"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button style="filled" onClick={handleRoleSwitch}>
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
