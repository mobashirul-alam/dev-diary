import { BrowserRouter, Route, Routes } from "react-router-dom";
import FooterComp from "./components/Footer";
import { Header } from "./components/Header";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

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
            </Routes>
            <FooterComp />
        </BrowserRouter>
    );
}
