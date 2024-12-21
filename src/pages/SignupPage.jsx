import axios from "axios";
import { useForm } from "react-hook-form";

function SignupPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

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
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
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
                    {...register("email", { required: "Email is required" })}
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
        </>
    );
}

export default SignupPage;
