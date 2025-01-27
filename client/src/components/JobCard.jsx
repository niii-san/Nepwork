import React from "react";
import PropTypes from "prop-types";
import { AiOutlineArrowRight } from "react-icons/ai";
import Tag from "./Tag";
import Button from "./Button";
import default_avatar from "../assets/default_avatar.svg";
import { Link } from "react-router";

function JobCard({ jobData }) {
    const {
        title = "Job Title",
        status,
        postedBy,
        tags = [],
        hourlyRate,
        _id,
    } = jobData;

    const statusStyles = {
        open: "bg-green-100 text-green-800",
        closed: "bg-red-100 text-red-800",
        finished: "bg-blue-100 text-blue-800",
        in_progress: "bg-amber-100 text-amber-800",
    };

    return (
        <div className="w-80 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Header Section */}
            <div className="p-4 pb-2">
                <div className="flex items-start gap-4">
                    <img
                        src={postedBy.avatar || default_avatar}
                        alt={`${postedBy.name.firstName}'s profile`}
                        className="w-14 h-14 rounded-lg shadow-sm border-2 border-white"
                        loading="lazy"
                    />

                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || statusStyles.closed
                                    }`}
                            >
                                {status.replace(/_/g, " ").toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                    Posted by:
                    <span className="hover:text-black ml-1 font-bold">
                        <Link to={`/profile/${postedBy._id}`}>
                            {postedBy.name.firstName} {postedBy.name.lastName}
                        </Link>
                    </span>
                </div>
            </div>

            {/* Tags Section */}
            <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">{renderTags(tags)}</div>
            </div>

            {/* Footer Section */}
            <div className="px-4 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1 p-3 bg-indigo-50 rounded-lg">
                        <span className="text-sm font-bold text-indigo-700">
                            Rs. {hourlyRate.toLocaleString()}/hour
                        </span>
                    </div>

                    <Link to={`/jobs/${_id}`} className="flex-shrink-0">
                        <Button
                            variant="filled"
                            className="h-full px-4 py-3 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">
                                    View
                                </span>
                                <AiOutlineArrowRight className="text-lg" />
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

JobCard.propTypes = {
    jobData: PropTypes.shape({
        title: PropTypes.string,
        status: PropTypes.oneOf(["open", "closed", "finished", "in_progress"])
            .isRequired,
        postedBy: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.shape({
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        hourlyRate: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

function renderTags(tags) {
    const MAX_VISIBLE_TAGS = 3;
    const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
    const remainingCount = tags.length - MAX_VISIBLE_TAGS;

    return (
        <>
            {visibleTags.map((tag) => (
                <Tag
                    key={tag}
                    title={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1"
                />
            ))}
            {remainingCount > 0 && (
                <Tag
                    title={`+${remainingCount}`}
                    className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1"
                />
            )}
        </>
    );
}

export default JobCard;
