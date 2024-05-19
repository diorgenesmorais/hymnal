import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, onClose }) => {
    return (
        <div className="video-player-overlay" onClick={onClose}>
            <div className="video-player">
                <video src={`/videos/${video}`} controls autoPlay />
            </div>
        </div>
    );
};

export default VideoPlayer;
