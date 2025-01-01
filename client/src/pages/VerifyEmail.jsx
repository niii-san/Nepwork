import React, { useState } from "react";
import { Button, Loader, EnterEmailOtp } from "../components";
import { useUser } from "../stores";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import toast from "react-hot-toast";

function VerifyEmail() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setSending(true);
        const payload = {
            email: data.email,
        };
        api.post("/user/request-otp", payload)
            .then((_) => {
                toast.success("OTP was sent");
                setShowOtpModal(true);
                setResErrMsg(null);
            })
            .catch((err) => {
                setResErrMsg(err.response.data.message);
            })
            .finally(() => setSending(false));
    };

    const userData = useUser((state) => state.data);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [sending, setSending] = useState(false);
    const [resErrMsg, setResErrMsg] = useState(null);

    if (!userData) {
        return <Loader />;
    }

    if (userData.emailVerified) {
        return (
            <>
                <div>Your email is already verified!</div>
            </>
        );
    }

    return (
        <>
            {showOtpModal && (
                <EnterEmailOtp
                    email={userData?.email}
                    setShowOtpModal={setShowOtpModal}
                />
            )}
            <div className="bg-secondary min-h-[800px]">
                This is verify email page
                <div>Enter your email address to receive OTP</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        {...register("email", {
                            required: "Email address is required",
                        })}
                    />

                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}

                    {resErrMsg && <p className="text-red-500">{resErrMsg} </p>}

                    <Button
                        style="filled"
                        type="submit"
                        className="block"
                        disabled={sending}
                    >
                        {sending ? "Sending..." : "Send OTP"}
                    </Button>
                    <Button onClick={() => setShowOtpModal(true)}>
                        Enter OTP
                    </Button>
                </form>
            </div>
        </>
    );
}

export default VerifyEmail;
