const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");

const app = express();


var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Cơ sở dữ liệu
const db = require("./model");

db.sequelize.sync(); // Đồng bộ 

// Build database
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
// });
app.get("/", (req, res) => {
    res.json({ message: "Welcome to MyEnglish" });
});

// Các routes
require('./routes/auth.routes')(app);
require('./routes/category.routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
