// creating a new app instance
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.status(200).sendFile('dist/index.html');
})
// export it to be taken by the index.js server file
module.exports = app;