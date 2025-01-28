import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import api from "../../utils/api";
import toast from "react-hot-toast";

function ChangeAvatarModal({ setModal, refetchProfile }) {
    const [uploading, setUploading] = useState(false);
    const [resErr, setResErr] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setUploading(true);
        const payload = new FormData();
        payload.append("newAvatar", data.newAvatar[0]);

        try {
            await api.post("/user/update-avatar", payload);
            refetchProfile();
            setModal(false);
            toast.success("Profile changed")
        } catch (error) {
            console.error(error);
            setResErr(error.response.data.message);
        } finally {
            setUploading(false);
        }
    };

    const handleClose = () => {
        if (!uploading) {
            setModal(false);
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
                    disabled={uploading}
                    type="button"
                    onClick={handleClose}
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

                    {errors.resErr && <p className="text-red-600">{resErr}</p>}
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        disabled={uploading}
                        variant="filled"
                        onClick={handleClose}
                        className="bg-secondary text-secondaryText hover:bg-opacity-80"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={uploading}
                        loading={uploading}
                        type="submit"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primaryText disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? "Updating" : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ChangeAvatarModal;
