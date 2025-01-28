import { ApiResponse, asyncHandler } from "../../utils/index.js";


export const updateAvatar = asyncHandler(async(req,res)=>{

    const newAvatarPath = req.file.path
    console.log(newAvatarPath)


    return res.status(200).json(new ApiResponse(200,true,true,`avatar updated`,null))
})





