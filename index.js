const express = require("express");
const {connection}= require("./config/db")
const {userRoute}=require("./routes/User.routes")
const {authMiddleware}=require("./middleware/auth");
const { tambolaRoutes } = require("./routes/ticket.routes");
const app = express()

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Tambola Ticket Server");
});

app.use("/api", userRoute);

app.use(authMiddleware)

app.use("/api",tambolaRoutes)




app.listen(4500, async () => {
  try {
    await connection;
    console.log("Db connected");
  } catch (err) {
    console.log(err.message);
  }
  console.log("http://localhost:4500/");
});
