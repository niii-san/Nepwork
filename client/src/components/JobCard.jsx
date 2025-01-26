import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Tag from "./Tag";
import Button from "./Button";
import default_avatar from "../assets/default_avatar.svg";
import { Link } from "react-router";

function JobCard({ jobData }) {
    return (
        <div className="w-[324px] max-w-[324px] flex flex-col justify-center bg-white shadow-card_shadow rounded-md mt-5">
            <div className=" flex justify-between mx-[25px] mt-[30px] bg-gray-500">
                    <img
                        src={jobData.postedBy.avatar ?? default_avatar}
                        alt="Photo"
                        className="w-20 h-20 rounded-full shadow-card_shadow"
                    />
                <div className="flex bg-red-100">
                    <div className="mr-4">
                        <div>
                            <span
                                className="text-lg text-[20px] font-medium"
                            >
                                {jobData.title ?? "Title"}
                            </span>
                        </div>
                        <div className="mt-[-5px] mb-1">
                            <div
                                className="text-grey_text font-semibold text-[12px]"
                            >
                                Status:{" "}
                                <span className="text-primary">
                                    {jobData.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-[25px] flex flex-wrap gap-2 mb-[16px]">
                {renderTags(jobData.tags)}
            </div>

            <div className=" mx-[25px] mb-[30px] flex gap-2 justify-center items-center">
                <div className=" flex w-[50%] rounded-[3px] h-[40px] justify-between items-center  p-3 bg-[#F4F4F4]">
                    <div>
                        <span className="font-semibold text-[16px]" htmlFor="">
                            Rs. {jobData.hourlyRate} / hr
                        </span>
                    </div>
                </div>
                <Link to={`/jobs/${jobData._id}`} className="w-[50%]">
                    <Button className={"w-full rounded-sm py-1.5"}>
                        <AiOutlineLogin className=" text-black text-2xl w-[155px] " />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
function renderTags(tags) {
    const tagLength = tags.length;
    const toRender = 5; // change this as much tag you want to render
    const remaining = tagLength - toRender;
    const renderItems = tags.slice(0, toRender);
    return (
        <>
            {renderItems.map((item) => (
                <Tag key={item} title={item} />
            ))}
            <Tag title={`+${remaining}`} />
        </>
    );
}

export default JobCard;
