const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database");
const app = express();

//Settings
app.set("port", process.env.PORT || 3000); //This means use the port that is provided and save it on the var port, if they dont provide the port then use the port 3000 by default

//Middlewares (Funciones que se ejecutan antes de que lleguen a las rutas)
app.use(morgan("dev"));
app.use(express.json()); //to be able to access json data

//Routes
app.use("/api/tasks", require("./routes/task.routes"));

//Static Files
//console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public"))); //I especify the route where my publics files are

//Starting the Server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
