import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";

function LottieAnimation({ animationPath, className }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const lottieInstance = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: animationPath, // Path to the Lottie JSON file
        });

        return () => {
            lottieInstance.destroy(); // Cleanup on unmount
        };
    }, [animationPath]);

    return <div ref={containerRef} className={className}></div>;
}

export default LottieAnimation;
