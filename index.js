const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const hbs = require("handlebars");
const currencies = require("currencies.json");
const socketio = require("socket.io");
const fetchbtc = require("./fetchbtc");


const connection = mongoose.createConnection("mongodb://localhost:27017/users");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

io.on("conn", (socket) => {
  console.log("connected");

  setInterval(async () => {
    socket.emit(
      "btc-prices",
      await fetchbtc.pushUpdates().catch((err) => {
        console.log(err);
      })
    );
  }, 5000);
  transport.sendMail({
    from: "admin@yoursite.com",
    to: user.email,
    subject: "order is placed",
    html: template({ name: "Chiranjit", message: "order is placed" }),
  });
});

server.listen(PORT, () => {
  console.log("server started");
});
