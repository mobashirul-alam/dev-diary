import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    Alert,
    Button,
    Label,
    Spinner,
    TextInput,
} from "../assets/utils/flowbiteExports";
import OAuth from "../components/OAuth";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux/user/userSlice";

export const SignIn = () => {
    const [formData, setFormData] = useState();
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return dispatch(signInFailure("Please, Fill out all fields."));
        }

        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <div className="flex flex-col md:flex-row p-3 mx-auto gap-5 md:items-center md:w-11/12 lg:w-4/5 xl:w-3/5 2xl:w-1/2">
                {/* Left */}
                <div className="flex-1">
                    <Link to="/" className="text-xl font-bold">
                        Dev Diary
                    </Link>
                    <p className="text-sm md:pt-2">
                        You can sign in with your email and password. Or, with
                        Google
                    </p>
                </div>
                {/* Right */}
                <div className="flex-1">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <Label value="Your Email" />
                            <TextInput
                                type="email"
                                placeholder="Email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value="Your Password" />
                            <TextInput
                                type="password"
                                placeholder="********"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>

                        <Button
                            gradientDuoTone="purpleToPink"
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size={20} />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex items-center gap-x-2 mt-5 text-sm">
                        <span>Don&apos;t have an account?</span>
                        <Link to="/sign-up" className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className="mt-5" color="failure">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};
