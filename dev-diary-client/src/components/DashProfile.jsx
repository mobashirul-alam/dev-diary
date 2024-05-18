import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, TextInput } from "../assets/utils/flowbiteExports";
import { app } from "../firebase";
import {
    deleteUserError,
    deleteUserStart,
    deleteUserSuccess,
    signOutSuccess,
    updateFailure,
    updateStart,
    updateSuccess,
} from "../redux/user/userSlice";

const DashProfile = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] =
        useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filePickerRef = useRef();
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            setImageFileUploadError(null);
            setImageFileUploading(true);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + imageFile.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                },
                // eslint-disable-next-line no-unused-vars
                (error) => {
                    setImageFileUploadError(
                        "Could not upload image (File must be less than 2MB)"
                    );
                    setImageFileUploadProgress(null);
                    setImageFile(null);
                    setImageFileUrl(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setImageFileUrl(downloadURL);
                            setFormData({
                                ...formData,
                                profilePicture: downloadURL,
                            });
                            setImageFileUploading(false);
                        }
                    );
                }
            );
        }
    }, [imageFile]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No changes made.");
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError("Please wait for the image to upload.");
            return;
        }

        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User info updated successfully.");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                dispatch(deleteUserError(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            dispatch(deleteUserError(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await fetch("/api/user/signOut", {
                method: "POST",
            });
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signOutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <div className="max-w-lg mx-auto p-3">
                <h1 className="my-8 text-3xl font-semibold text-center">
                    My Profile
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={filePickerRef}
                        hidden
                    />
                    <div
                        className="relative w-32 h-32 self-center shadow-md rounded-full cursor-pointer"
                        onClick={() => filePickerRef.current.click()}
                    >
                        {imageFileUploadProgress && (
                            <CircularProgressbar
                                value={imageFileUploadProgress || 0}
                                text={`${imageFileUploadProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                    },
                                    path: {
                                        stroke: `rgba(62, 152, 192, ${
                                            imageFileUploadProgress / 100
                                        })`,
                                    },
                                }}
                            />
                        )}
                        <img
                            src={imageFileUrl || currentUser.profilePicture}
                            alt="User"
                            className={` w-full h-full rounded-full border-8 border-[lightgray] object-cover ${
                                imageFileUploadProgress &&
                                imageFileUploadProgress < 100 &&
                                "opacity-60"
                            }`}
                        />
                    </div>
                    {imageFileUploadError && (
                        <Alert color={"failure"}>{imageFileUploadError}</Alert>
                    )}
                    <TextInput
                        type="text"
                        id="username"
                        placeholder="Username"
                        defaultValue={currentUser.username}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        type="email"
                        id="email"
                        placeholder="Email"
                        defaultValue={currentUser.email}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        gradientDuoTone="purpleToPink"
                        outline
                        disabled={loading || imageFileUploading}
                    >
                        {loading ? "Loading..." : "Update"}
                    </Button>

                    {currentUser.isAdmin && (
                        <Link to="/create-post">
                            <Button
                                type="button"
                                gradientDuoTone={"purpleToPink"}
                                className="w-full"
                            >
                                Create a post
                            </Button>
                        </Link>
                    )}
                </form>
                <div className="flex justify-between items-center mt-5 text-red-500">
                    <span
                        onClick={() => setShowModal(true)}
                        className="cursor-pointer"
                    >
                        Delete Account
                    </span>
                    <span onClick={handleSignOut} className="cursor-pointer">
                        Sign Out
                    </span>
                </div>
                {updateUserSuccess && (
                    <Alert color="success" className="mt-5">
                        {updateUserSuccess}
                    </Alert>
                )}
                {updateUserError && (
                    <Alert color="failure" className="mt-5">
                        {updateUserError}
                    </Alert>
                )}
                {error && (
                    <Alert color="failure" className="mt-5">
                        {error}
                    </Alert>
                )}

                <Modal
                    show={showModal}
                    size="md"
                    onClose={() => setShowModal(false)}
                    popup
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this product?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color="failure"
                                    onClick={() => handleDeleteUser()}
                                >
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={() => setShowModal(false)}
                                >
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default DashProfile;
