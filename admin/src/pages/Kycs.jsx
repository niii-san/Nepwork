import React, { useEffect, useState } from "react";
import { api } from "../utils";
import { KycList } from "../components";

function Kycs() {
    const [loading, setLoading] = useState(true);
    const [kycs, setKycs] = useState([]);
    console.log(kycs);

    useEffect(() => {
        const fetchKycs = async () => {
            try {
                const response = await api.get("/kyc/get-all-kyc");
                setKycs(response.data.data);
            } catch (error) {}
        };
        fetchKycs();
    }, []);

    return (
        <div className="min-h-[800px] bg-secondary">
            <h1>View all kyc here</h1>
            <div>filter options view pending / approved </div>
            <div className="w-full minh-[200px]  flex justify-center my-10  ">
                {kycs.length < 0 ? (
                    <p>Loading.... </p>
                ) : (
                    kycs.map((elem) => <KycList data={elem} key={elem._id} />)
                )}
            </div>
        </div>
    );
}

export default Kycs;
