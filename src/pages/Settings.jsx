import { Link } from "react-router";

function Settings() {
    return (
        <>
            <div className="min-h-[800px]">This is Settings</div>
            <br />
            <Link to={"/settings/verify-email"}>Verify Email</Link>
            <br />
            <br />
            <Link to={"/settings/kyc"}>Kyc</Link>
            <br />
        </>
    );
}

export default Settings;
