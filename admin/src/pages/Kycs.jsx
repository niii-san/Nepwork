import React, { useEffect, useState } from "react";
import { api } from "../utils";
import { KycList } from "../components";

function Kycs() {
    const [kycs, setKycs] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All");

    //OPTIM: need to optimize this code
    const filteredKycs =
        activeFilter.toLowerCase() === "pending"
            ? kycs.filter((elem) => elem.status === "pending")
            : activeFilter.toLowerCase() === "verified"
              ? kycs.filter((elem) => elem.status === "verified")
              : activeFilter.toLowerCase() === "failed"
                ? kycs.filter((elem) => elem.status === "failed")
                : kycs;

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
        <div className="min-h-[800px] bg-secondary p-6">
            <h1 className="text-3xl text-center font-semibold ">
                Viewing {activeFilter} KYC Forms
            </h1>
            <div className="w-full bg-tertiray rounded-lg flex justify-center items-center mt-10">
                <div className="w-[550px] border-x py-1 px-6 flex justify-evenly items-center   ">
                    {["All", "Pending", "Verified", "Failed"].map((filter) => (
                        <label
                            key={filter}
                            className={`relative cursor-pointer text-gray-700 ${
                                activeFilter === filter
                                    ? "bg-primary"
                                    : "bg-white"
                            } border border-primary rounded-lg px-4 py-2 flex items-center justify-center hover:bg-primary  text-black transition-all duration-200`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={activeFilter === filter}
                                readOnly
                            />
                            <span>{filter}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="w-full min-h-[200px] flex justify-center my-10">
                {kycs.length < 1 ? (
                    <p>Loading...</p>
                ) : (
                    filteredKycs.map((elem) => (
                        <KycList data={elem} key={elem._id} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Kycs;
