import { useState, useEffect } from "react";
import api from "../utils/api";

export const useClientDashboard = () => {
    const endpoints = [
        {
            key: "allJobs",
            url: "/jobs/get-jobs-posted-by-current-user",
        },
    ];

    const [data, setData] = useState({
        allJobs: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    endpoints.map((eps) =>
                        api.get(eps.url).then((response) => ({
                            key: eps.key,
                            data: response.data,
                        })),
                    ),
                );

                const result = responses.reduce((acc, item) => {
                    console.log(acc);
                    acc[item.key] = item.data.data;
                    return acc;
                }, {});
                setData(result);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch dashboard data");
            } finally {
                // setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading, error };
};
