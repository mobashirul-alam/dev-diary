import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterComp from "./components/Footer";
import { Header } from "./components/Header";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { About } from "./pages/About";
import CreatePost from "./pages/CreatePost.jsx";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import UpdatePost from "./pages/UpdatePost.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/projects" element={<Projects />} />
                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<OnlyAdminPrivateRoute />}>
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route
                        path="/update-post/:postId"
                        element={<UpdatePost />}
                    />
                </Route>
            </Routes>
            <FooterComp />
        </BrowserRouter>
    );
}
