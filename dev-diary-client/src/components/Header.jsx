import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoBlack from "../assets/logo/black-logo.png";
import logoWhite from "../assets/logo/white-logo.png";

export const Header = () => {
    const path = useLocation().pathname;
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);
    return (
        <Navbar className="border-b-2">
            <Link to="/">
                <img src={logoWhite} alt="" className="w-40 dark:hidden" />
                <img
                    src={logoBlack}
                    alt=""
                    className="w-40 hidden dark:inline"
                />
            </Link>

            <form>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button className="w-12 h-10 lg:hidden" color="gray" pill>
                <AiOutlineSearch />
            </Button>

            <div className="flex gap-2 order-2">
                <Button
                    className="hidden sm:inline w-12 h-10"
                    color="gray"
                    pill
                >
                    <FaMoon />
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="user"
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {currentUser.username}
                            </span>
                            <span className="block text-sm font-medium truncate">
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <Button gradientDuoTone="purpleToBlue" outline>
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>

            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};
