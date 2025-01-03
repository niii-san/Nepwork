import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../components";

function AdminLogin() {
    const navigate = useNavigate();
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

        console.log(payload);
        //TODO: handle admin login
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
                    Admin Login
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
                            className="p-2 w-[90%] bg-transparent outline-none px-4 text-base "
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
                        <p className="text-sm text-red-500 mt-1">{resMsg}</p>
                    )}

                    <Button
                        type="submit"
                        style="filled"
                        className="mx-auto mt-4 w-full"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
