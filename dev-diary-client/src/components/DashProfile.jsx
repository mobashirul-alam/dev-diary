import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div>
            <div className="max-w-lg mx-auto p-3">
                <h1 className="my-8 text-3xl font-semibold text-center">
                    My Profile
                </h1>
                <form className="flex flex-col gap-5">
                    <div className="w-32 h-32 self-center shadow-md rounded-full">
                        <img
                            src={currentUser.profilePicture}
                            alt="User"
                            className="w-full h-full rounded-full border-8 border-[lightgray] object-cover"
                        />
                    </div>
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
