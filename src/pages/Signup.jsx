import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Signup() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // create structured payload and hit endpoint
    const onSubmit = (data) => {
        const payload = {
            name: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
            email: data.email,
            password: data.password,
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
        <div className="min-h-[600px] bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-center mb-4">
                    <img
                        src="src/assets/logo.svg"
                        alt="NepWork Logo"
                        className="w-40"
                    />
                </div>
                <h2 className="text-2xl font-bold text-center text-greentext mb-4">
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            className="peer mt-1 p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
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
                            className="block text-sm font-medium text-gray-700"
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
                            className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
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
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email address is required",
                                pattern: {
                                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                                    message: "Invalid email address format",
                                },
                            })}
                            className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
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
                            type="password"
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
                            className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green_button text-whitetext py-2 rounded-md hover:bg-hover_button"
                    >
                        SIGN UP
                    </button>
                </form>
                <p
                    onClick={() => navigate("/login")}
                    className="text-center text-sm text-blue-500 mt-4 cursor-pointer hover:underline"
                >
                    Already have an account? Login here
                </p>
            </div>
        </div>
    );
}

export default Signup;
