import React from "react";

const UserCard = ({ userData }) => {
    const { email, emailVerified, kyc, kycStatus } = userData;
    const { name, dob, document, address } = kyc || {};

    // Status Badge Color Logic
    const statusColor =
        kycStatus === "pending"
            ? "bg-yellow-500"
            : kycStatus === "verified"
                ? "bg-green-500"
                : "bg-red-500";

    return (
        <div className="max-w-md rounded overflow-hidden shadow-lg border p-6 min-w-[400px] my-[60px]">
            <h2 className="text-xl font-bold mb-4">
                {name?.firstName} {name ? name.lastName : "User"} Kyc form
            </h2>

            <div className="mb-4">
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Email Verified:</strong>{" "}
                    {emailVerified ? "Yes" : "No"}
                </p>
            </div>

            <div className="mb-4">
                <p>
                    <strong>First Name:</strong> {name?.firstName || "N/A"}
                </p>
                {name.middleName && (
                    <p>
                        <strong>Middle Name:</strong> {name?.firstName || "N/A"}
                    </p>
                )}
                <p>
                    <strong>Last Name:</strong> {name?.lastName || "N/A"}
                </p>
            </div>

            <div className="mb-4">
                <p>
                    <strong>Date of Birth:</strong> {dob?.year}-{dob?.month}-
                    {dob?.day}
                </p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <div>
                    <p>
                        <strong>Temporary Address:</strong>{" "}
                        {address?.temporary?.country},{" "}
                        {address?.temporary?.state}, {address?.temporary?.city}
                    </p>
                    <p>
                        <strong>Permanent Address:</strong>{" "}
                        {address?.permanent?.country},{" "}
                        {address?.permanent?.state}, {address?.permanent?.city}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Document</h3>
                <p>
                    <strong>Document ID:</strong> {document?.id}
                </p>
                <p>
                    <strong>Document Type:</strong> {document?.type}
                </p>
                <p>
                    <strong>
                        User {document ? document.type : "document"}
                    </strong>
                </p>
                <img
                    src={document?.url}
                    alt="User document image"
                    className="h-[100px] w-[100px]"
                />
            </div>

            <div className="text-center mt-4">
                <span
                    className={`py-2 px-4 rounded-full text-white ${statusColor}`}
                >
                    {kycStatus === "pending"
                        ? "Pending"
                        : kycStatus === "verified"
                            ? "Approved"
                            : "Failed"}
                </span>
            </div>
        </div>
    );
};

export default UserCard;
