import { login, signup } from "./user/user.controller.js";
import refreshAccessToken from "./refreshAccessToken.controller.js";
import { requestOtp } from "./requestOtp.controller.js";
import { verifyEmail } from "./user/verifyEmail.controller.js";
import { verifyUserToken } from "./user/verifyUserToken.controller.js";
import { currentUserInfo } from "./user/currentUserInfo.controller.js";
import { uploadKyc, upload } from "./kyc/uploadKyc.controller.js";
import { adminLogin } from "./admin/adminLogin.controller.js";
import { addAdmin } from "./admin/addAdmin.controller.js";
import { getAllKyc } from "./kyc/getAllKyc.controller.js";
import { verifyAdminToken } from "./admin/verifyAdminToken.controller.js";
import { getKycById } from "./kyc/getKycById.controller.js";
import { updateKycStatus } from "./kyc/updateKycStatus.controller.js";
import { switchRole } from "./user/switchRole.controller.js";
import { createJob } from "./job/createJob.controller.js";
import {
    getAllJobs,
    getJobsPostedByCurrentUser,
    getSingleJob,
} from "./job/getJobs.controller.js";
import { updateJob } from "./job/updateJob.controller.js";
import { getHomePageJobs } from "./job/getHomePageJobs.controller.js";
import { getFreelancers } from "./user/getFreelancers.controller.js";
import {
    getProfileData,
    updateProfileTags,
    updateAbout,
    updateHourlyRate,
} from "./user/profile.controller.js";
import { updateAvatar } from "./user/updateAvatar.controller.js";
import { deleteJob } from "./job/deleteJob.controller.js";
import { applyJob } from "./job/applyJob.controller.js";
import { getApplicants } from "./job/getApplicants.controller.js";
import { acceptFreelancer } from "./job/acceptFreelancer.controller.js";
import {
    followUser,
    getFollowing,
    getFollowers,
    unFollowUser,
} from "./user/connection.controller.js";

export {
    login,
    signup,
    refreshAccessToken,
    requestOtp,
    verifyEmail,
    verifyUserToken,
    currentUserInfo,
    uploadKyc,
    upload,
    adminLogin,
    addAdmin,
    getAllKyc,
    getKycById,
    verifyAdminToken,
    updateKycStatus,
    switchRole,
    createJob,
    getAllJobs,
    updateJob,
    getJobsPostedByCurrentUser,
    getSingleJob,
    getHomePageJobs,
    getFreelancers,
    getProfileData,
    updateAvatar,
    updateProfileTags,
    updateAbout,
    updateHourlyRate,
    deleteJob,
    applyJob,
    getApplicants,
    acceptFreelancer,
    followUser,
    unFollowUser,
    getFollowers,
    getFollowing,
};
