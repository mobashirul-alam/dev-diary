export const About = () => {
    return (
        <div className="max-w-5xl p-8 mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">
                Welcome to Dev Diary
            </h1>
            <p className="text-lg mb-8 text-center md:text-left">
                Dev Diary is a MERN stack blog project that allows users to
                read, comment, and engage with my blog posts. As a practice
                project, I aim to continuously improve and refine the features
                and functionality of this website.
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                Features
            </h2>
            <ul className="list-disc list-inside mb-8 text-center md:text-left">
                <li>Read and comment on blog posts</li>
                <li>Search and filter blog posts by keyword or category</li>
                <li>
                    Update profile information in the dashboard profile page
                </li>
                <li>
                    Admin features: upload, edit, and delete blog posts, as well
                    as delete comments
                </li>
                <li>
                    Dedicated dashboard page for admins to view website summary,
                    users, blog posts, and comments
                </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                Goals
            </h2>
            <p className="text-lg mb-8 text-center md:text-left">
                The goal of Dev Diary is to provide a platform for me to share
                my thoughts, experiences, and knowledge with the developer
                community. I hope to create a space where users can engage with
                my content, provide feedback, and learn from each other.
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                Technologies Used
            </h2>
            <p className="text-lg mb-8 text-center md:text-left">
                Dev Diary is built using the MERN stack, which includes:
            </p>
            <ul className="list-disc list-inside mb-8 text-center md:text-left">
                <li>MongoDB for database management</li>
                <li>Express.js for server-side development</li>
                <li>React for client-side development</li>
                <li>Node.js for server-side runtime environment</li>
            </ul>
        </div>
    );
};
