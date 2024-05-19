const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/videos', (req, res) => {
    const videoDir = path.join(process.cwd(), 'public', 'videos');
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list videos' });
        }
        const videos = files.filter(file => file.endsWith('.mp4'));
        res.json(videos);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
