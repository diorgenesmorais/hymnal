const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

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

function openBrowser(url) {
    const start =
      process.platform == 'darwin' ? 'open' :
      process.platform == 'win32' ? 'start' :
      'xdg-open';
    exec(`${start} ${url}`);
  }

app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
  console.log(`Server is running on ${url}`);
  
  // Abre o navegador
  openBrowser(url);
});
