import React from "react";
import { useUser } from "../stores";
import { Loader, Button } from "../components";

function SwitchRole() {
    const userData = useUser((state) => state.data);

    if (!userData) return <Loader />;
    return (
        <div className="min-h-[800px]">
            <div id="Rules">
                <h1>
                    To make platform consistence some rules are made for
                    switching role
                </h1>
                <div>
                    <h2>Applies if currenlty Client</h2>
                    <ol>
                        <li>All your posted jobs should be closed</li>
                    </ol>
                </div>
                <div>
                    <h2>Applies if currently Freelancer</h2>
                    <ol>
                        <li>Must not be involved in any job</li>
                    </ol>
                </div>
                <div>
                    <h2>Applies for both</h2>
                    <ol>
                        <li>Can only switch once in 30 days</li>
                    </ol>
                </div>
            </div>

            <br />
            <br />
            <br />

            <div id="switching actions">
                <div> You're currently {userData.role.toUpperCase()}</div>
                <Button>
                    Switch to
                    <p className="ml-1 inline-block">
                        {userData.role === "client"
                            ? "FREELANCER"
                            : userData.role === "freelancer"
                              ? "CLIENT"
                              : "ERROR"}
                    </p>
                </Button>
            </div>
        </div>
    );
}

export default SwitchRole;
