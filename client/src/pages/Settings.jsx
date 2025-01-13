import { Link } from "react-router";
import { Button, Loader } from "../components";
import { TbLogout } from "react-icons/tb";
import { useUser } from "../stores";

function Settings() {
    const userData = useUser((state) => state.data);

    if (!userData) return <Loader />;
    return (
        <div className="min-h-[800px] bg-secondary">
            <h1>This is Settings</h1>
            <div className="h-72 w-[400px] flex flex-col justify-evenly">
                <Link to={"/settings/verify-email"} className="">
                    <Button className="w-full">Verify Email</Button>
                </Link>
                <Link to={"/settings/kyc"} className="">
                    <Button className="w-full">Kyc</Button>
                </Link>

                <Link to="/logout" className="">
                    <Button
                        variant="filled"
                        theme="danger"
                        className="w-full flex justify-center items-center gap-1 bg-danger hover:bg-danger border-danger"
                    >
                        <TbLogout className="inline-block text-xl" /> Logout
                    </Button>
                </Link>
                <Link to={"/settings/switch-role"} className="">
                    <Button className="w-full">Switch Role</Button>
                </Link>
            </div>
        </div>
    );
}

export default Settings;
