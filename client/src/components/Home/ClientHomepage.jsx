import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

function ClientHomepage({ isLoggedIn, userData }) {
    return (
        <>
            <div className="bg-secondary text-center ">
                {/* You're not Logged in */}
            </div>
            <div className="mt-12 mb-[800px] flex max-w-full justify-center items-center flex-col">
                <div className="bg-primary w-[90%] rounded-xl max-w-[1200px]">
                    <h1 className="text-4xl font-semibold text-center text-whitetext mb-4 mt-12">
                        Work from anywhere, hire for <br /> anything!
                    </h1>
                    <div className="flex justify-center items-center mb-12">
                        <div className="w-[60%] max-w-[450px]">
                            <div className="mt-1 flex items-center flex-row w-full rounded-lg bg-white border border-hover_button focus:shadow-md">
                                <input
                                    id="search"
                                    placeholder="Search freelancers"
                                    className="rounded-md p-3 w-full bg-transparent outline-none px-4 text-base "
                                />
                                <button className="bg-primary text-whitetext p-3 rounded-lg mr-1">
                                    <FaArrowRightLong />
                                </button>
                            </div>
                        </div>
                        <div className="text-whitetext ml-2 text-3xl">
                            <HiOutlineAdjustmentsHorizontal />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-wrap gap-6">
                    Freelancers card listing here
                </div>
            </div>
        </>
    );
}

export default ClientHomepage;
