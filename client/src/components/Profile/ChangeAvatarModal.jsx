import React, { useState, useEffect } from "react";
import Button from "../Button";

function ChangeAvatarModal({ setModal, onSave }) {
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset previous state
        setError("");
        setSelectedFile(null);

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file (JPEG, PNG, JPG)");
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB");
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            setSelectedFile(file);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError("Please select a file first");
            return;
        }

        //TODO: handle upload
        console.log(setSelectedFile)
    };

    // Cleanup object URLs
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-tertiary rounded-xl shadow-lg p-6 w-full max-w-md transform transition-all"
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-primaryText">
                        Update Profile Photo
                    </h1>
                    <button
                        type="button"
                        onClick={() => setModal(false)}
                        className="text-secondaryText hover:text-primary transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border-2 border-dashed border-secondary rounded-xl p-8 text-center">
                        <label className="cursor-pointer">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                                />
                            ) : (
                                <div className="text-secondaryText mb-4">
                                    <svg
                                        className="w-16 h-16 mx-auto"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}

                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <div className="space-y-2">
                                <span className="bg-primary text-primaryText px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                                    Choose File
                                </span>
                                <p className="text-sm text-secondaryText mt-2">
                                    JPEG, PNG, JPG (max 5MB)
                                </p>
                            </div>
                        </label>
                        {error && (
                            <p className="text-danger text-sm mt-2">{error}</p>
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
                            disabled={!selectedFile}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ChangeAvatarModal;
