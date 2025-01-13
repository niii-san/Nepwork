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
import {
    switchToClient,
    switchToFreelancer,
} from "./user/switchRole.controller.js";

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
    switchToClient,
    switchToFreelancer
};
