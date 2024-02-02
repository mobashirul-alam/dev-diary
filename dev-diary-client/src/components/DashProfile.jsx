import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "../assets/utils/flowbiteExports";
import { app } from "../firebase";

const DashProfile = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] =
        useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const filePickerRef = useRef();
    const { currentUser } = useSelector((state) => state.user);

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
                        }
                    );
                }
            );
        }
    }, [imageFile]);

    // const uploadImage = () => {
    //     const storage = getStorage(app);
    //     const fileName = new Date().getTime() + imageFile.name;
    //     const storageRef = ref(storage, fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, imageFile);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             const progress =
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setImageFileUploadProgress(progress.toFixed(0));
    //         },
    //         (error) => {
    //             setImageFileUploadError(
    //                 "Could not upload image (File must be less than 2MB)"
    //             );
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 setImageFileUrl(downloadURL);
    //             });
    //         }
    //     );
    // };

    return (
        <div>
            <div className="max-w-lg mx-auto p-3">
                <h1 className="my-8 text-3xl font-semibold text-center">
                    My Profile
                </h1>
                <form className="flex flex-col gap-5">
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
                    />
                    <TextInput
                        type="email"
                        id="email"
                        placeholder="Email"
                        defaultValue={currentUser.email}
                    />
                    <TextInput
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                    <Button
                        type="submit"
                        gradientDuoTone="purpleToPink"
                        outline
                    >
                        Update
                    </Button>
                </form>
                <div className="flex justify-between items-center mt-5 text-red-500">
                    <span className="cursor-pointer">Delete Account</span>
                    <span className="cursor-pointer">Sign Out</span>
                </div>
            </div>
        </div>
    );
};

export default DashProfile;
