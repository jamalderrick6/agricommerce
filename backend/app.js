const express = require("express");
const cors = require("cors");
const stripeRouter = require("./routers/stripe");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use(stripeRouter);

// app.use(cartRouter);

app.listen(port, () => {
  console.log("server listening on port " + port);
});
