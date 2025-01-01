import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
function EnterEmailOtp({ email, setShowOtpModal }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.one);
    };

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputNames = ["one", "two", "three", "four", "five", "six"];

    const inputRefs = useRef([]);
    console.log(inputRefs);

    const handleInputChange = (e, i) => {
        const value = e.target.value.trim();
        if (!isNaN(value)) {
            const newOtp = [...otp];
            newOtp[i] = value.substring(value.length - 1);
            console.log(value);
            setOtp(newOtp);

            if (value && i < 5 && inputRefs.current[i]) {
                inputRefs.current[i + 1].focus();
            }
        }
    };

    const onInputClick = (i) => {
        inputRefs.current[i].setSelectionRange(1, 1);
    };

    const handleKeyDown = (e, i) => {
        if (
            e.key === "Backspace" &&
            !otp[i] &&
            i > 0 &&
            inputRefs.current[i - 1]
        ) {
            inputRefs.current[i - 1].focus();
        }
    };

    console.log(otp);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50  w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md shadow-md w-[320px] min-h-[200px] tablet:w-[450px]">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg tablet:text-2xl font-bold text-center">
                        Enter OTP sent to {email.slice(0, 2)}
                        *****
                        {email.slice(length - 4)}
                    </h2>
                    <div
                        id="otpInputs"
                        className="mt-6 w-full flex justify-evenly items-center"
                    >
                        {otp.map((value, i) => {
                            return (
                                <input
                                    type="text"
                                    ref={(field) =>
                                        (inputRefs.current[i] = field)
                                    }
                                    key={i}
                                    name={inputNames[i]}
                                    className="w-[40px] h-[40px] tablet:w-[60px] tablet:h-[60px] border border-primary rounded-lg text-xl text-center"
                                    value={value}
                                    onChange={(e) => handleInputChange(e, i)}
                                    onClick={() => onInputClick(i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-evenly mt-6 gap-x-2">
                        <Button style="filled" type="submit">
                            Submit
                        </Button>
                        <Button
                            onClick={() => setShowOtpModal(false)}
                            style="outline"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EnterEmailOtp;
