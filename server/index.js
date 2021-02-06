require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");
const socket = require("socket.io");

const authCtrl = require("./controllers/authController");
const mainCtrl = require("./controllers/mainController");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

//Auth endpoints

app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.post("/api/payment", authCtrl.subscribePayment);
app.get("/api/logout", authCtrl.logout);

//Content endpoints

app.get("/api/articles", mainCtrl.getArticle);
app.get("/api/search/:topic_name", mainCtrl.searchArticle);
app.get("/api/search/", mainCtrl.getTopics);

//User endpoints
app.put("/api/update/:id", mainCtrl.updateUser); //TBD
app.delete("/api/user/:id", mainCtrl.deleteUser); //TBD

//User connection
const io = socket(
  app.listen(SERVER_PORT, () =>
    console.log(`Socket listening on port ${SERVER_PORT}`)
  )
);

io.on("connection", (socket) => {
  console.log("User connected");

  //Chat room

  socket.on("join room", (data) => {
    console.log("Room joined", data.room);
    socket.join(data.room);
    io.to(data.room).emit("room joined");
  });
  socket.on("message sent", (data) => {
    io.to(data.room).emit("message dispatched", data.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// app.listen(SERVER_PORT, () => console.log(`Listening on port ${ SERVER_PORT }`))
