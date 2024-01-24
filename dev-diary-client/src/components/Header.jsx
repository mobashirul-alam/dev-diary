import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
    const path = useLocation().pathname;
    return (
        <Navbar className="border-b-2">
            <Link to="/" className="text-xl font-bold">
                Dev Diary
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
                <Link to="/sign-in">
                    <Button gradientDuoTone="purpleToBlue" outline>
                        Sign In
                    </Button>
                </Link>
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
