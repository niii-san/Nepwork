import React, { useEffect, useState } from "react";
import { api } from "../utils";
import { KycList } from "../components";

function Kycs() {
  const [kycs, setKycs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filterConditions = {
    pending: (kyc) => kyc.status === "pending",
    verified: (kyc) => kyc.status === "verified",
    failed: (kyc) => kyc.status === "failed",
    all: () => true,
  };

  const filteredKycs = kycs.filter(
    filterConditions[activeFilter.toLowerCase()] || filterConditions.all
  );

  useEffect(() => {
    const fetchKycs = async () => {
      try {
        const response = await api.get("/kyc/get-all-kyc");
        setKycs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchKycs();
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-secondary to-tertiary py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-10">
          Viewing <span className="text-primary">{activeFilter}</span> KYC Forms
        </h1>
        <div className="bg-tertiary rounded-lg bg-white shadow-lg py-4 px-6 mb-10">
          <div className="flex flex-wrap justify-center gap-4">
            {["All", "Pending", "Verified", "Failed"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full border transition-colors duration-200 ${
                  activeFilter === filter
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-black border-primary hover:bg-primary hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {kycs.length < 1 ? (
            <p className="text-center text-gray-600 text-lg">Loading...</p>
          ) : (
            filteredKycs.map((elem) => (
              <KycList data={elem} key={elem._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Kycs;
