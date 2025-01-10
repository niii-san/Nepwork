import React from "react";
import { Button } from "../components";
import { useNavigate } from "react-router";

function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="min-h-[800px] bg-secondary">
            This is dash board
            <Button onClick={()=>navigate("/kycs")}>
                    Kycs
            </Button>
        </div>
    );
}

export default Dashboard;
