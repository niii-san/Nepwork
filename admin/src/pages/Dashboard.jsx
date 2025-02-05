import React from "react";
import { Button } from "../components";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="mt-2 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-primary">Search For a User</h1>
      <div className="w-full flex items-center justify-center m-4 space-x-4">
        <Button className="w-[20%]" onClick={() => navigate("/kycs")}>
          Kycs
        </Button>
        <div className="flex w-[70%] items-center border border-gray-300 bg-white rounded-lg shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <FiSearch className="text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search for a user..."
            className="w-full rounded-lg pl-2 pr-4 py-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
