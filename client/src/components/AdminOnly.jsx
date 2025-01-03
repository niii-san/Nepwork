import { useEffect } from "react";
import { useNavigate } from "react-router";

function AdminOnly({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Admin protected route runned");
        navigate("/settings");
    }, []);

    return <>{children}</>;
}

export default AdminOnly;
