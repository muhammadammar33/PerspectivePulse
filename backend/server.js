const express = require('express');
const connectDB = require('./database/index');
const {PORT} = require('./config/index');

const app = express();
connectDB();
app.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
});
app.listen(PORT, () => {
    console.log(`Backend is running at http://localhost:${PORT}`)
});