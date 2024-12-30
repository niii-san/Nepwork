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

    const setUserData = useUser((state) => state.setUserData);

    // Response message after clicking submiting, Like Invalid credentials
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
                login();

                // reset form values after logged in
                reset();
                navigate("/");
                //set user data after successfull login

                setUserData();

                //send notification after login
                toast.success(res.data.message);

                /*if login success and  there was resMsg ,
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
        <div className="bg-secondary min-h-[800px] flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <img
                    src="src/assets/logo.svg"
                    alt="NepWork Logo"
                    className="w-40 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-center text-greentext mb-4">
                    Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email address is required",
                            })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="mt-1  p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {showPassword ? (
                            <FaRegEye
                                className="inline-block ml-4 text-2xl"
                                onClick={handleShowPassword}
                            />
                        ) : (
                            <FaRegEyeSlash
                                className="inline-block ml-4 text-2xl"
                                onClick={handleShowPassword}
                            />
                        )}
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
                    </div>
                    <Button
                        type="submit"
                        style="filled"
                        className="mx-auto w-full"
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
    );
}

export default Login;
