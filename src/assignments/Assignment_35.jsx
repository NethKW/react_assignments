import React, { useRef, useEffect } from "react";
import "./Assignment_35.css";
import sampleVideo from "./video/scrolling_video.mp4";

export default function Assignment_35() {
    const videoRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    const handleScroll = () => {
        const container = scrollRef.current;
        const video = videoRef.current;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;

        const percent = scrollTop / scrollHeight;

        if (video.duration) {
            video.currentTime = video.duration * percent;
        }
    };

    return (
        <div className="main asg-35" ref={scrollRef} onScroll={handleScroll}>
            <video
                ref={videoRef}
                className="scrollVideo"
                src={sampleVideo}
                playsInline
                preload="metadata"
            />

            <div className="sections">
                <section className="subSection">Section 1 </section>
                <section className="subSection">Section 2 </section>
                <section className="subSection">Section 3 </section>
                <section className="subSection">Section 4 </section>
                <section className="subSection">Section 5 </section>
                <section className="subSection">Section 6 </section>
                <section className="subSection">Section 7 </section>
            </div>

        </div>
    );
}

