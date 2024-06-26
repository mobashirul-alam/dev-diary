import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashComments from "../components/DashComments";
import DashPosts from "../components/DashPosts";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashboardComponent from "../components/DashboardComponent";

export const Dashboard = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-56">
                {/* Sidebar */}
                <DashSidebar />
            </div>
            {/* Other tabs ... */}
            <div className="w-full">
                {/* Profile */}
                {tab === "profile" && <DashProfile />}
                {/* Posts */}
                {tab === "posts" && <DashPosts />}
                {/* Users */}
                {tab === "users" && <DashUsers />}
                {/* Comments */}
                {tab === "comments" && <DashComments />}
                {/* dashboard component */}
                {tab === "dashboard" && <DashboardComponent />}
            </div>
        </div>
    );
};
