import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../assets/utils/flowbiteExports";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        // Will ask each time for selecting gmail account
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            const googleResponse = await signInWithPopup(auth, provider);

            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: googleResponse.user.displayName,
                    email: googleResponse.user.email,
                    googlePhotoUrl: googleResponse.user.photoURL,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button
                type="button"
                gradientDuoTone="pinkToOrange"
                outline
                className="w-full"
                onClick={handleGoogleClick}
            >
                <AiFillGoogleCircle className="w-6 h-6 mr-2" />
                Continue With Google
            </Button>
        </div>
    );
};

export default OAuth;
