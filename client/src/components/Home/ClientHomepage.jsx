import React, { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import api from "../../utils/api";
import toast from "react-hot-toast";
import Loader from "../Loader";
import FreelancerCard from "../FreelancerCard";

function ClientHomepage({ isLoggedIn, userData }) {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSetFreelancers = async () => {
            try {
                const response = await api.get("/user/get-freelancers");
                setFreelancers(response.data.data);
            } catch (error) {
                toast.error("Failed to get freelancers");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSetFreelancers();
    }, []);

    return (
        <div className="min-h-[800px]">
            <SearchBox type="client" />
            <div className="mt-4 flex max-w-full justify-center items-center flex-col">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex mt-6  w-full px-8 flex-wrap gap-12">
                        {freelancers.map((item) => (
                            <FreelancerCard key={item._id} userData={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClientHomepage;
