import React from 'react';

const VideoList = ({ videos, onSelectVideo }) => {
    return (
        <div className="video-list">
            {videos.map(video => (
                <div key={video} className="video-item" onClick={() => onSelectVideo(video)}>
                    {video}
                </div>
            ))}
        </div>
    );
};

export default VideoList;
