import React from "react";
import { KycForm, Loader, UserCard } from "../components";
import { useUser } from "../stores";

function Kyc() {
    const userData = useUser((state) => state.data);

    if (!userData) {
        return <Loader />;
    }

    if (userData.kycStatus === "pending") {
        return (
            <>
                <div className="bg-secondary min-h-[800px] w-full flex flex-col justify-center items-center">
                    <h1 className="mx-auto text-3xl mt-12">
                        Your Kyc is pending, Please wait or contact officals
                    </h1>

                    {userData && <UserCard userData={userData} />}
                </div>
            </>
        );
    }

    if (userData.kycStatus === "verified") {
        return (
            <>
                <div className="bg-secondary min-h-[800px] w-full flex flex-col justify-center items-center">
                    <h1 className="mx-auto text-3xl mt-12 font-bold">
                        Your Kyc is verified
                    </h1>

                    {userData && <UserCard userData={userData} />}
                </div>
            </>
        );
    }

    // if kyc status is "not_uploaded"
    if (userData.kycStatus === "not_uploaded") {
        return <KycForm />;
    }
}

export default Kyc;
