import api from "../../utils/api";

export const fetchPostedJobs = async () => {
       return await api.get("/jobs/get-jobs-posted-by-current-user");
};
