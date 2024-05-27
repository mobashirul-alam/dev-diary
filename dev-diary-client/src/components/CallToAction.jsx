import { Button } from "flowbite-react";

const CallToAction = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex-1 justify-center flex flex-col p-8">
                <h2 className="text-2xl">
                    Want to learn more about JavaScript?
                </h2>
                <p className="text-gray-500 my-2">
                    Checkout the resources with in w3schools{" "}
                </p>
                <Button gradientDuoTone="purpleToPink">
                    <a
                        href="https://www.w3schools.com/js/default.asp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit w3schools
                    </a>
                </Button>
            </div>
            <div className="p-8 flex-1">
                <img
                    className="rounded-tr-3xl rounded-bl-3xl "
                    src="https://miro.medium.com/v2/resize:fit:1200/1*LyZcwuLWv2FArOumCxobpA.png"
                />
            </div>
        </div>
    );
};

export default CallToAction;
