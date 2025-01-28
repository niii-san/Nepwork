import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import api from "../../utils/api";

function ChangeAvatarModal({ setModal, refetchProfile }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) => {
        const payload = new FormData()
        payload.append("newAvatar",data.newAvatar[0])
        console.log(payload)
        
        try {
            await api.post("/user/update-avatar",payload)
            
        } catch (error) {
            console.error(error)
            
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-tertiary rounded-xl shadow-lg p-6 w-full max-w-md transform transition-all"
                encType="multipart/form-data"
            >
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="text-secondaryText hover:text-primary transition-colors"
                >
                    ✕
                </button>

                <div>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("newAvatar", {
                            required: "New image file is required",
                        })}
                    />

                    {errors.newAvatar && (
                        <p className="text-red-600">
                            {errors.newAvatar.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="filled"
                        onClick={() => setModal(false)}
                        className="bg-secondary text-secondaryText hover:bg-opacity-80"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primaryText disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ChangeAvatarModal;
