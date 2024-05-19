import React, { useState, useEffect } from 'react';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import './App.css';

const App = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetch('/videos')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const filteredVideos = videos.filter(video =>
        video.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <input
                className='search-video'
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className='container'>
              <VideoList videos={filteredVideos} onSelectVideo={setSelectedVideo} />
              {selectedVideo && (
                  <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
              )}
            </div>
            <span className='made-by'>Made by Diorgenes Morais</span>
        </div>
    );
};

export default App;
