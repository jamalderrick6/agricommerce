const express = require("express");
const router = new express.Router();
const cors = require("cors");
const stripe = require("stripe")("sk_test_0iDvBKsmagSASseghtBCf5w900LZN7ziUp");

router.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "kes",
      description: "Payment",
      payment_method: id,
      confirm: true,
    });

    res.status(200).send({
      message: "Payment Successful",
      success: false,
    });
  } catch (error) {
    res.status(400).send({
      message: error.raw.message,
      success: false,
    });
  }
});

module.exports = router;
