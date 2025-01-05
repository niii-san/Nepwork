import { login, signup } from "./user/user.controller.js";
import refreshAccessToken from "./refreshAccessToken.controller.js";
import { requestOtp } from "./requestOtp.controller.js";
import { verifyEmail } from "./user/verifyEmail.controller.js";
import { verifyToken } from "./user/verifyToken.controller.js";
import { currentUserInfo } from "./user/currentUserInfo.controller.js";
import { uploadKyc, upload } from "./kyc/uploadKyc.controller.js";
import { adminLogin } from "./admin/adminLogin.controller.js";
import { addAdmin } from "./admin/addAdmin.controller.js";
import { getAllKyc } from "./kyc/getAllKyc.controller.js";

export {
    login,
    signup,
    refreshAccessToken,
    requestOtp,
    verifyEmail,
    verifyToken,
    currentUserInfo,
    uploadKyc,
    upload,
    adminLogin,
    addAdmin,
    getAllKyc,
};
