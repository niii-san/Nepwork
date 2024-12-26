import toast from "react-hot-toast";

const logout = () => {
    localStorage.clear();
    toast.success("Logged out");
    window.location.href = "/login";
};

export default logout;
