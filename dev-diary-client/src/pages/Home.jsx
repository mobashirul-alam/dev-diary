import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/post/getPosts");
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);
    return (
        <div className="">
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold lg:text-6xl ">
                    Welcome to Dev Diary
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                    Here you&apos;ll find a variety of articles and tutorials on
                    topics such as web development, software engineering and
                    programming languages.
                </p>
                <Link
                    to={"/search"}
                    className="text-sm sm:text-base text-teal-500 font-bold hover:underline"
                >
                    View all blogs
                </Link>
            </div>
            <div className="container mx-auto p-3 bg-amber-100 dark:bg-slate-700 rounded-tl-3xl rounded-br-3xl ">
                <CallToAction />
            </div>

            <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7">
                {posts && posts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center">
                            Recent Posts
                        </h2>

                        <div className="flex justify-center flex-wrap gap-5 py-5">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <Link
                                to={"/search"}
                                className="text-lg text-teal-500 hover:underline text-center"
                            >
                                View all posts
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
