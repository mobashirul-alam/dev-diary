import { useEffect, useState } from "react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiDocumentText,
    HiUser,
    HiUserGroup,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../assets/utils/flowbiteExports";
import { signOutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);

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

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    {currentUser.isAdmin && (
                        <Link to={"/dashboard?tab=dashboard"}>
                            <Sidebar.Item
                                active={tab === "dashboard" || !tab}
                                icon={HiChartPie}
                                labelColor="dark"
                                as="div"
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Link to={"/dashboard?tab=profile"}>
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={HiUser}
                            label={currentUser.isAdmin ? "Admin" : "User"}
                            labelColor="dark"
                            as="div"
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to={"/dashboard?tab=posts"}>
                            <Sidebar.Item
                                active={tab === "posts"}
                                icon={HiDocumentText}
                                labelColor="dark"
                                as="div"
                            >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && (
                        <Link to={"/dashboard?tab=users"}>
                            <Sidebar.Item
                                active={tab === "users"}
                                icon={HiUserGroup}
                                labelColor="dark"
                                as="div"
                            >
                                Users
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && (
                        <Link to={"/dashboard?tab=comments"}>
                            <Sidebar.Item
                                active={tab === "comments"}
                                icon={HiUserGroup}
                                labelColor="dark"
                                as="div"
                            >
                                Comments
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        className="cursor-pointer"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default DashSidebar;
