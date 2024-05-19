const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(process.cwd(), 'videos')));

app.get('/videos', (req, res) => {
    const videoDir = path.join(process.cwd(), 'videos');
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list videos' });
        }
        const videos = files.filter(file => file.endsWith('.mp4'));
        res.json(videos);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
