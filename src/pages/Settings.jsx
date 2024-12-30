import { Link } from "react-router";
import { Button } from "../components";
import { TbLogout } from "react-icons/tb";

function Settings() {
    return (
        <div className="min-h-[800px] bg-secondary">
            <h1>This is Settings</h1>
            <div className="h-96 flex flex-col justify-evenly">
                <Link to={"/settings/verify-email"} className="w-fit">
                    <Button>Verify Email</Button>
                </Link>
                <Link to={"/settings/kyc"} className="w-fit">
                    <Button>Kyc</Button>
                </Link>

                <Link to="/logout" className="w-fit">
                    <Button
                        style="filled"
                        theme="danger"
                        className="flex justify-center items-center gap-1 bg-danger"
                    >
                        <TbLogout className="inline-block text-xl" /> Logout
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Settings;
