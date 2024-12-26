import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../stores/Auth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function LoginPage() {
    const navigate = useNavigate();
    const login = useAuth((state) => state.login);

    // Response message after clicking submiting, Like Invalid credentials
    const [resMsg, setResMsg] = useState(null);

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
                navigate("/home");
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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    {...register("email", {
                        required: "Email address is required",
                    })}
                    className="border-2 border-black"
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}
                <br />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    id="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    className="border-2 border-black"
                />

                {/* This is form validation error message, like password is required*/}
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                {/*Error msg thats comming from server, like user not fount, invalid credentials*/}
                {resMsg && <p className="text-red-500">{resMsg}</p>}

                <br />
                <br />

                <button
                    type="submit"
                    className="border-2 border-black px-10 py-2"
                >
                    Login
                </button>
            </form>
        </>
    );
}

export default LoginPage;
