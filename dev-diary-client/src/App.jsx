import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterComp from "./components/Footer";
import { Header } from "./components/Header";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { About } from "./pages/About";
import CreatePost from "./pages/CreatePost.jsx";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import PostPage from "./pages/PostPage.jsx";
import { Projects } from "./pages/Projects";
import Search from "./pages/Search.jsx";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import UpdatePost from "./pages/UpdatePost.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/post/:postSlug" element={<PostPage />} />
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
