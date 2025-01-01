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
                        className="flex justify-center items-center gap-1 bg-danger hover:bg-danger border-danger"
                    >
                        <TbLogout className="inline-block text-xl" /> Logout
                    </Button>
                </Link>

                {userData.role === "admin" && (
                    <Link to={"/admin/login"}>
                        <Button>Admin</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Settings;
