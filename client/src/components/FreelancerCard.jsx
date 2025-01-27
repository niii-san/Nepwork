import React from "react";
import PropTypes from "prop-types";
import { AiOutlineLogin } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Tag from "./Tag";
import Button from "./Button";
import default_avatar from "../assets/default_avatar.svg";
import { GoVerified } from "react-icons/go";
import { Link } from "react-router";

function FreelancerCard({ userData }) {
  const {
    avatar,
    rating,
    name,
    kycVerified,
    available,
    tags = [],
    hourlyRate,
    _id
  } = userData;

  return (
    <div className="w-72 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="relative">
          <img
            src={avatar || default_avatar}
            alt={`${name.firstName} ${name.lastName}'s profile`}
            className="w-20 h-20 rounded-xl shadow-md border-2 border-white hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
          {kycVerified && (
            <GoVerified className="absolute -bottom-1 -right-1 text-blue-600 bg-white rounded-full p-0.5" />
          )}
        </div>
        
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
          <CiStar className="text-xl text-amber-400" />
          <span className="font-semibold text-gray-700">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-4 pt-2">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {name.firstName} {name.lastName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">
              Availability:
            </span>
            <span
              className={`text-xs font-semibold ${
                available ? "text-green-600" : "text-red-600"
              }`}
            >
              {available ? "Available Now" : "Not Available"}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {renderTags(tags)}
        </div>

        {/* Rate Section */}
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg text-center">
          <span className="text-sm font-bold text-indigo-700">
            ₹{hourlyRate.toLocaleString()}/hour
          </span>
        </div>

        {/* Action Button */}
        <Link to={`/profile/${_id}`} className="block">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors duration-200"
          >
            <AiOutlineLogin className="text-lg" />
            <span className="text-sm font-semibold">View Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

FreelancerCard.propTypes = {
  userData: PropTypes.shape({
    avatar: PropTypes.string,
    rating: PropTypes.number.isRequired,
    name: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }).isRequired,
    kycVerified: PropTypes.bool,
    available: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    hourlyRate: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};

function renderTags(tags) {
  const MAX_VISIBLE_TAGS = 4;
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const remainingCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <>
      {visibleTags.map((tag) => (
        <Tag key={tag} title={tag} className="text-xs uppercase" />
      ))}
      {remainingCount > 0 && (
        <Tag
          title={`+${remainingCount}`}
          className="text-xs bg-gray-100 text-gray-600"
        />
      )}
    </>
  );
}

export default FreelancerCard;
