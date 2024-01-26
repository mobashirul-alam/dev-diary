import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export const SignUp = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <div className="flex flex-col md:flex-row p-3 mx-auto gap-5 md:items-center md:w-11/12 lg:w-4/5 xl:w-3/5 2xl:w-1/2">
                {/* Left */}
                <div className="flex-1">
                    <Link to="/" className="text-xl font-bold">
                        Dev Diary
                    </Link>
                    <p className="text-sm md:pt-2">
                        You can sign up with your email and password. Or, with
                        Google
                    </p>
                </div>
                {/* Right */}
                <div className="flex-1">
                    <form className="space-y-5">
                        <div>
                            <Label value="Your User Name" />
                            <TextInput
                                type="text"
                                placeholder="User name"
                                id="username"
                            />
                        </div>
                        <div>
                            <Label value="Your Email" />
                            <TextInput
                                type="email"
                                placeholder="Email"
                                id="email"
                            />
                        </div>
                        <div>
                            <Label value="Your Password" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                            />
                        </div>

                        <Button
                            gradientDuoTone="purpleToPink"
                            type="submit"
                            className="w-full"
                        >
                            Sign Up
                        </Button>
                    </form>
                    <div className="flex items-center gap-x-2 mt-5 text-sm">
                        <span>Have an account?</span>
                        <Link to="/sign-in" className="text-blue-500">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
