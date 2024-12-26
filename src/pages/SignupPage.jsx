import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function SignupPage() {
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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                        required: "First name is required",
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "First name should only contain letters",
                        },
                    })}
                    className="border-2 border-black"
                />
                {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                )}
                <br />
                <br />
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Last name should only contain letters",
                        },
                        required: "Last name is required",
                    })}
                    className="border-2 border-black"
                />
                {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
                )}
                <br />
                <br />
                <label htmlFor="email">Email</label>
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
                        minLength: {
                            value: 8,
                            message: "Password must be 8 characters long",
                        },
                        maxLength: {
                            value: 16,
                            message: "Password must be below 16 characters",
                        },

                        validate: (value) =>
                            value.trim() !== "" ||
                            "Password cannot contain only spaces",
                    })}
                    className="border-2 border-black"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}
                <br />
                <br />
                <button
                    type="submit"
                    className=" border-2 border-green-400 px-10 py-2"
                >
                    Submit
                </button>
            </form>

            <p
                onClick={() => navigate("/login")}
                className="hover:underline cursor-pointer"
            >
                have an account? Login here
            </p>
        </>
    );
}

export default SignupPage;
