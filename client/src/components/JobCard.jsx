import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Tag from "./Tag";
import Button from "./Button";
import default_avatar from "../assets/default_avatar.svg";
import { Link } from "react-router";

function JobCard({ jobData }) {
    const statusStyles = {
        open: "text-green-600",
        closed: "text-red-600",
        finished: "text-green-600",
        in_progress: "text-blue-600",
    };
    return (
        <div className="w-[324px] flex flex-col justify-center bg-white shadow-card_shadow rounded-md mt-5">
            <div className="flex items-center px-5 pt-4">
                <img
                    src={jobData.postedBy.avatar ?? default_avatar}
                    alt="Photo"
                    className="w-20 h-20 rounded-2xl shadow-card_shadow"
                />
                <div className="flex flex-col ml-4">
                    <span className="max-h-12 font-lg font-bold overflow-y-scroll">
                        {jobData.title ?? "Job Title"}
                    </span>
                    <div className="text-[12px]">
                        <span className="text-gray-600">status: </span>
                        <span
                            className={`font-bold ${statusStyles[jobData.status] || "closed"}`}
                        >
                            {jobData.status}
                        </span>
                    </div>
                </div>

                <div className="flex"></div>
            </div>
            <div className="px-6 text-sm mt-1">
                <span>{jobData.postedBy.name.firstName}</span>
                <span className="ml-1.5">{jobData.postedBy.name.lastName}</span>
            </div>
            <div className="mx-[20px] mt-4 flex flex-wrap gap-2 mb-[16px]">
                {renderTags(jobData.tags)}
            </div>

            <div className=" mx-[25px] mb-[30px] flex gap-2 justify-center items-center">
                <div className=" flex w-[70%] rounded-[3px] h-[40px] justify-between items-center  p-3 bg-[#F4F4F4]">
                    <div>
                        <span className="font-semibold text-[16px]" htmlFor="">
                            Rs. {jobData.hourlyRate} / hr
                        </span>
                    </div>
                </div>
                <Link to={`/jobs/${jobData._id}`} className="w-[30%]">
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
