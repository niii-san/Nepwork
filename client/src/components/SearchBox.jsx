import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight } from "react-icons/fa6";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCloseSharp } from 'react-icons/io5';

const SearchBox = ({ type, className }) => {
  const [showFilters, setShowFilters] = useState(false);
  const isClient = type === 'client';
  const placeholder = isClient ? 'Search freelancers...' : 'Search jobs...';

  return (
    <div className={`bg-primary rounded-xl px-4 py-8 relative ${className}`}>
      {/* Main Search Area */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Work from anywhere, hire for <br className="hidden md:inline" /> anything!
        </h1>

        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 max-w-2xl">
            <div className="relative flex items-center bg-white rounded-lg shadow-md group hover:shadow-lg transition-shadow">
              <input
                type="text"
                placeholder={placeholder}
                className="w-full py-3 pl-6 pr-14 text-gray-800 placeholder-gray-500 bg-transparent rounded-lg focus:outline-none"
              />
              <button className="absolute right-2 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                <FaArrowRight className="text-xl" />
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setShowFilters(true)}
            className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <HiAdjustmentsHorizontal className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilters && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
          onClick={() => setShowFilters(false)}
        >
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IoCloseSharp className="text-2xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="text-sm font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 border rounded-md"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="relative pt-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      className="w-full range-slider"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Filter */}
              <div>
                <h3 className="text-sm font-medium mb-4">
                  {isClient ? 'Required Skills' : 'Job Categories'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 border rounded-md">
                      <input 
                        type="checkbox" 
                        className="cursor-pointer" 
                      />
                      <span className="text-sm">Skill {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-primary text-white hover:bg-primary-dark rounded-md transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SearchBox.propTypes = {
  type: PropTypes.oneOf(['client', 'freelancer']),
  className: PropTypes.string
};


export default SearchBox;
