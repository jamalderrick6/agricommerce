const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user");
const stripeRouter = require("./routers/stripe");
// const cartRouter = require("./routers/cart");
require("./db/mongoose");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(stripeRouter);

// app.use(cartRouter);

app.listen(port, () => {
  console.log("server listening on port " + port);
});
