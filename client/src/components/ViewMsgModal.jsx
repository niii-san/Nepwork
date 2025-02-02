import React from "react";
import Button from "./Button";

function ViewMsgModal({ message, setModalFn }) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setModalFn(false)}
        >
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <h1 className="text-center">Message from freelancer</h1>
                    <div className="text-black">
                        {message || "This applicant doesn't have any message"}
                    </div>
                </div>
                <Button
                    variant="filled"
                    onClick={() => setModalFn(false)}
                    className="w-full mt-5"
                >
                    Close
                </Button>
            </div>
        </div>
    );
}

export default ViewMsgModal;
