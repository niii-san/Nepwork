import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth, useUser } from "../stores";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../components";

function Login() {
    const navigate = useNavigate();
    const login = useAuth((state) => state.login);

    const setUserData = useUser((state) => state.setUserData); // Response message after clicking submiting, Like Invalid credentials

    const [resMsg, setResMsg] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const payload = {
            email: data.email,
            password: data.password,
        };

        axios
            .post(`${import.meta.env.VITE_API_ENDPOINT}/user/login`, payload)
            .then((res) => {
                /*
                 * If login success
                 * Handling tokens, keeping them at local storage
                 * */
                const accessToken = res.data.data.tokens.accessToken;
                const refreshToken = res.data.data.tokens.refreshToken;

                localStorage.setItem(
                    "accessToken",
                    JSON.stringify(accessToken),
                );

                localStorage.setItem(
                    "refreshToken",
                    JSON.stringify(refreshToken),
                );

                login(); // reset form values after logged in

                reset();

                navigate("/"); //set user data after successfull login

                setUserData(); //send notification after login

                toast.success(
                    res.data.message,
                ); /*if login success and there was resMsg ,

        * setting it to null
        * */
                if (resMsg) setResMsg(null);
            })
            .catch((err) => {
                console.log(err.message);
                setResMsg(err.response.data.message);
            });
    };

    return (
        <div className="bg-secondary min-h-[800px] flex items-start mt-20 justify-center">
            <div className="hidden w-[330px] shadow-md rounded-l-xl h-[500px] pc:flex justify-center items-center flex-col">
                <div className="bg-signUpPattern rounded-l-xl h-full min-h-full min-w-full bg-center bg-contain bg-no-repeat pc:flex justify-center items-center flex-col">
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
                        onClick={() => navigate("/signup")}
                    >
                        SIGN UP
                    </button>
                </div>
            </div>
            <div className="w-full max-w-md bg-white shadow-md min-w-[380px] rounded-lg pc:rounded-r-xl pc:rounded-l-none p-20 pc:min-h-[500px] pc:max-h-[500px] pc:max-w-[500px] pc:flex pc:justify-center pc:items-center">
                <div className="pc:w-full">
                    <div className="pc:hidden flex justify-center mb-4">
                        <img
                            src="src/assets/logo.svg"
                            alt="NepWork Logo"
                            className="pc:hidden w-40 mx-auto mb-4"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-greentext mb-4">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                {...register("email", {
                                    required: "Email address is required",
                                })}
                                className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <label
                            htmlFor="password"
                            className="block mt-4 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="mt-1 flex items-center flex-row w-full rounded-md bg-white border border-hover_button focus:shadow-md">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className="rounded-md p-2 w-[90%] bg-transparent outline-none px-4 text-base "
                            />
                            {showPassword ? (
                                <FaRegEye
                                    className="cursor-pointer"
                                    onClick={handleShowPassword}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    className="cursor-pointer"
                                    onClick={handleShowPassword}
                                />
                            )}
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}

                        {resMsg && (
                            <p className="text-sm text-red-500 mt-1">
                                {resMsg}
                            </p>
                        )}

                        <Button
                            type="submit"
                            style="filled"
                            className="mx-auto mt-4 w-full"
                        >
                            Login
                        </Button>
                    </form>
                    <p
                        onClick={() => navigate("/signup")}
                        className="text-center text-sm text-blue-500 mt-4 cursor-pointer hover:underline"
                    >
                        Don’t have an account? Signup here
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
