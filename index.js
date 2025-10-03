import {NODE_ENV, PORT} from './config/envconfig.js'
import express from 'express';
import connectToDatabase from './database/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/',(req, res) => {
    res.send('Server is Running');
})

// Health Check API
app.get('/api/v1/health',(req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime()
    })
})

// HOME PAGE html file serving route
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

// 404 for unknown urls
app.use((req, res) => {
    res.status(404).json({error: 404, message: 'Not Found'});
})

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} on port ${PORT}`);
    connectToDatabase();
})

