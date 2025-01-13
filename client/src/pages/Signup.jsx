import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Button } from "../components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Signup() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleConfirmShowPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const password = watch("password", ""); // create structured payload and hit endpoint

    const onSubmit = (data) => {
        const payload = {
            name: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        axios
            .post(`${import.meta.env.VITE_API_ENDPOINT}/user/signup`, payload)
            .then((res) => {
                toast.success(`${res.data.message}, Please proceed to Login`, {
                    duration: 3000,
                });
                reset();
                navigate("/login");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    return (
        <div className="bg-secondary mt-4 min-h-[800px] flex items-start pc:mt-16 justify-center">
            <div className="hidden w-[360px] shadow-md rounded-l-xl h-[600px] pc:flex justify-center items-center flex-col">
                <div className="bg-signUpPattern rounded-l-xl h-full min-h-full min-w-full bg-center bg-cover bg-no-repeat pc:flex justify-center items-center flex-col">
                    <img
                        src="src/assets/Logo(light).svg"
                        alt="NepWork Logo"
                        className="w-40"
                    />
                    <h1 className="text-3xl mt-4 font-semibold text-center text-whitetext mb-4">
                        Welcome Back !
                    </h1>
                    <p className="text-center text-whitetext p-4 mb-4">
                        To keep connected with us please login with your
                        personal info
                    </p>
                    <button
                        className="border border-tertiray px-14 py-2 rounded-3xl text-tertiray hover:bg-tertiray hover:bg-opacity-20 active:bg-opacity-50"
                        onClick={() => navigate("/login")}
                    >
                        SIGN IN
                    </button>
                </div>
            </div>
            <div className="w-full max-w-md bg-white shadow-md min-w-[380px] rounded-lg pc:rounded-r-xl pc:rounded-l-none p-10 pc:min-h-[600px] pc:max-h-[600px] pc:max-w-[580px] pc:flex pc:justify-center pc:items-center">
                <div className="pc:w-full">
                    <div className="pc:hidden flex justify-center mb-2">
                        <img
                            src="src/assets/logo.svg"
                            alt="NepWork Logo"
                            className="w-40"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-greentext pc:mb-0 mb-2">
                        Create Account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                {...register("firstName", {
                                    required: "First name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,

                                        message:
                                            "First name should only contain letters",
                                    },
                                })}
                                className="mt-1 p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700 mt-1"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                {...register("lastName", {
                                    required: "Last name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/,

                                        message:
                                            "Last name should only contain letters",
                                    },
                                })}
                                className="mt-1 p-2 w-full bg-transparent  outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                            />
                            {errors.lastName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="mt-1 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                {...register("email", {
                                    required: "Email address is required",
                                    pattern: {
                                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                                        message: "Invalid email address format",
                                    },
                                })}
                                className="mt-1 p-2 w-full bg-transparent  outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <label
                            htmlFor="password"
                            className="mt-1 text-sm block font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="flex  mt-1 items-center flex-row w-full rounded-md bg-white border border-hover_button focus:shadow-md">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,

                                        message:
                                            "Password must be at least 8 characters long",
                                    },
                                    maxLength: {
                                        value: 16,

                                        message:
                                            "Password must be below 16 characters",
                                    },
                                    validate: (value) =>
                                        value.trim() !== "" ||
                                        "Password cannot contain only spaces",
                                })}
                                className="p-2 w-[90%] bg-transparent outline-none px-4 text-base "
                            />
                            {showPassword ? (
                                <FaRegEye
                                    className="cursor-pointer"
                                    onClick={handleShowPassword}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    className="acursor-pointer"
                                    onClick={handleShowPassword}
                                />
                            )}
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                        <label
                            htmlFor="confirmPassword"
                            className="block mt-1  text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <div className="flex  mt-1 items-center flex-row w-full rounded-md bg-white border border-hover_button focus:shadow-md">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className="p-2 w-[90%] bg-transparent outline-none px-4 text-base "
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                            />
                            {showConfirmPassword ? (
                                <FaRegEye
                                    className="cursor-pointer"
                                    onClick={handleConfirmShowPassword}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    className="cursor-pointer"
                                    onClick={handleConfirmShowPassword}
                                />
                            )}
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                        <Button
                            type="submit"
                            variant="filled"
                            className="mt-4  w-full"
                        >
                            SIGN UP
                        </Button>
                    </form>
                    <p
                        onClick={() => navigate("/login")}
                        className="text-center  text-sm text-blue-500 mt-1 cursor-pointer hover:underline"
                    >
                        Already have an account? Login here
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
