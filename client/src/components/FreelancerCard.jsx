import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { CiStar } from "react-icons/ci";

function FreelancerCard() {
    return (
        <div className="w-[290px] max-w-[290px] bg-white shadow-card_shadow rounded-md mt-5 border">
            <div className="flex justify-between mx-[25px] mt-[25px]">
                <div className="">
                    <img
                        src="src\assets\image.png"
                        alt="Photo"
                        className="w-16 rounded-full h-16 shadow-card_shadow"
                    />
                </div>
                <div className="flex items-start">
                    <div className="flex items-center">
                        <CiStar className="text-4xl text-primary" />
                        <label className="text-lg font-semibold" htmlFor="">
                            4.5
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col  mx-[25px]">
                <div>
                    <label className="text-lg text-[15px] font-medium" htmlFor="">
                        Jane Cooper
                    </label>
                </div>
                <div className="mt-[-12px] mb-1">
                    <label
                        className="text-grey_text font-semibold text-[9px]"
                        htmlFor=""
                    >
                        Status: Active
                    </label>
                </div>
            </div>
            <div className="mx-[25px] flex flex-wrap gap-2 mb-[16px]">
                <div>
                    <label
                        className="border-[0.5px] border-grey_border rounded-xl text-xs px-2 py-1"
                        htmlFor=""
                    >
                        Design
                    </label>
                </div>
                <div>
                    <label
                        className="border border-grey_border rounded-xl text-xs px-2 py-1"
                        htmlFor=""
                    >
                        Brand
                    </label>
                </div>
                <div>
                    <label
                        className="border border-grey_border rounded-xl text-xs px-2 py-1"
                        htmlFor=""
                    >
                        Product
                    </label>
                </div>
                <div>
                    <label
                        className="border border-grey_border rounded-xl text-xs px-2 py-1"
                        htmlFor=""
                    >
                        +3
                    </label>
                </div>
                <div>
                    <label
                        className="border border-grey_border rounded-xl text-xs px-2 py-1"
                        htmlFor=""
                    >
                        Product
                    </label>
                </div>
                <div>
                    <label
                        className="border border-grey_border rounded-xl text-xs px-2 py-1"
                        htmlFor=""
                    >
                        Product
                    </label>
                </div>
            </div>
            <div className="mx-[25px] mb-[16px] flex rounded-[3px] justify-between items-center bg-[#F4F4F4] p-3">
                <div>
                    <label className="font-semibold text-2xl" htmlFor="">
                        Rs.130 / hr
                    </label>
                </div>
                <div>
                    <label className="font-semibold text-sm" htmlFor="">
                        Hourly
                    </label>
                </div>
            </div>
            <div className="mx-[25px] mb-[25px] flex  justify-between items-center">
                <div className="flex justify-center items-center bg-lightgreen rounded-[3px] w-[43px] h-[40px]">
                    <AiOutlineLogin className=" text-black text-2xl w-[22px] " />
                </div>
                <div>
                    <button className="bg-primary text-whitetext h-[40px] w-[188px] rounded-[3px]">
                        Hire Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FreelancerCard;
