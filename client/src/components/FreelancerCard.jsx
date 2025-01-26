import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Tag from "./Tag";
import Button from "./Button";
import default_avatar from "../assets/default_avatar.svg";
import { GoVerified } from "react-icons/go";

function FreelancerCard({ userData }) {
    return (
        <div className="min-w-[290px] max-w-[290px] bg-white shadow-card_shadow rounded-md mt-5">
            <div className="flex justify-between mx-[25px] mt-[25px]">
                <div className="flex">
                    <img
                        src={userData.avatar ?? default_avatar}
                        alt="Photo"
                        className="w-20 rounded-xl h-20 shadow-card_shadow"
                    />
                    {userData.kycVerified && (
                        <span>
                            <GoVerified className="text-blue-600" />
                        </span>
                    )}
                </div>
                <div className="flex items-start">
                    <div className="flex items-center">
                        <CiStar className="text-4xl text-primary" />
                        <span className="text-lg font-semibold" htmlFor="">
                            {userData.rating}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-6">
                <span className="text-lg  mt-2">
                    {userData.name.firstName} {userData.name.lastName}
                </span>
                <div className="text-grey_text font-semibold text-[11px]">
                    <span>Available: </span>
                    <span
                        className={`${userData.available ? "text-primary" : "text-red-600"}`}
                    >
                        {userData.available ? "Yes" : "No"}
                    </span>
                </div>
            </div>
            <div className="mx-[25px] flex flex-wrap gap-2 mb-[16px]">
                {renderTags(userData.tags ?? [])}
            </div>
            <div className="mx-[25px] mb-[16px] flex rounded-[3px] justify-center items-center bg-[#F4F4F4] p-3">
                <span className="font-semibold">
                    Rs. {userData.hourlyRate} / hr
                </span>
            </div>
            <div className="mx-[25px] mb-[25px] flex  justify-between items-center">
                <Button className={"rounded-md w-full "}>
                    <AiOutlineLogin className=" text-black text-2xl " />
                </Button>
            </div>
        </div>
    );
}

export default FreelancerCard;

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
            {remaining > 0 && <Tag title={`+${remaining}`} />}
        </>
    );
}
