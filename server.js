const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const employeeRoute = require('./routes/employeeRoute');


app.use('/api/employees/',employeeRoute);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node JS app listening on port ${port}!`));