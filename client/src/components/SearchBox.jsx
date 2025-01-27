import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const SearchBox = ({ type, className }) => {
    const isClient = type === "client";

    const placeholderText = isClient
        ? "Search freelancers by skills or name..."
        : "Search jobs by title or keywords...";

    const heroText = isClient
        ? "Find Top Talent for Your Projects"
        : "Discover Your Next Opportunity";

    return (
        <div className={`bg-primary rounded-xl px-4 py-8 ${className}`}>
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {heroText}
                </h1>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    <div className="w-full max-w-2xl relative">
                        <div className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <input
                                type="text"
                                placeholder={placeholderText}
                                className="w-full py-3 pl-4 pr-12 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none"
                            />
                            <FaSearch className="absolute right-4 text-xl text-gray-400" />
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-lg transition-all">
                        <HiOutlineAdjustmentsHorizontal className="text-xl" />
                        <span className="hidden md:inline">Filters</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
