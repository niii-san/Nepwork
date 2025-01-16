import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Tag from "./Tag";

function JobCard() {
    return (
        <div className="w-[324px] max-w-[324px] flex flex-col justify-center bg-white shadow-card_shadow rounded-md mt-5">
            <div className=" flex justify-between mb-[10px] mx-[25px] mt-[30px]">
                <div className="">
                    <img
                        src="src\assets\image.png"
                        alt="Photo"
                        className="w-20 h-20 rounded-full shadow-card_shadow"
                    />
                </div>
                <div className="flex  items-start">
                    <div className="mr-4">
                        <div>
                            <label
                                className="text-lg text-[20px] font-medium"
                                htmlFor=""
                            >
                                Graphic Designer
                            </label>
                        </div>
                        <div className="mt-[-5px] mb-1">
                            <label
                                className="text-grey_text font-semibold text-[12px]"
                                htmlFor=""
                            >
                                Status:{" "}
                                <span className="text-primary">Open</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-[25px] flex flex-wrap gap-2 mb-[16px]">
                <Tag>Design</Tag>
                <Tag>Brand</Tag>
                <Tag>Product</Tag>
                <Tag>Marketing</Tag>
                <Tag>Product</Tag>
                <Tag>+3</Tag>
            </div>

            <div className=" mx-[25px] mb-[30px] flex gap-2 justify-center items-center">
                <div className="flex  justify-center items-center bg-lightgreen rounded-[3px] min-w-[43px] h-[40px]">
                    <AiOutlineLogin className=" text-black text-2xl w-[22px]" />
                </div>
                <div>
                    <button className="bg-primary text-whitetext  h-[40px] w-[100px] rounded-[3px]">
                        Apply
                    </button>
                </div>
                <div className=" flex rounded-[3px] h-[40px] justify-between items-center  p-3 bg-[#F4F4F4]">
                    <div>
                        <label className="font-semibold text-[16px]" htmlFor="">
                            Rs.130 / hr
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobCard;
