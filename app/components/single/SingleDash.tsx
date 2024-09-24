import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const SingleDash = () => {
    const router = useRouter(); // Initialize the router

    const handleStartGame = () => {
        router.push("/singleplayer"); // Redirect to the singleplayer route
    };

    return (
        <div className="flex flex-col  w-full">
            <h2 className="text-lg font-bold">Singleplayer Setup</h2>
            {/* Other setup UI components */}
            <button onClick={handleStartGame} className="mt-4 bg-blue-500 text-white p-2 rounded">
                Start Game
            </button>
        </div>
    );
};

export default SingleDash;