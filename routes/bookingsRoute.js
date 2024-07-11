const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");

router.post("/bookcar", async (req, res) => {
  req.body.transactionId = "1145255265262652653763";
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save();
    
    res.json({ success: true, message: "Your booking is successful" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Booking failed" });
  }
});



/*const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51OeKu9SH2Fp9YMMc5LQX2BY2G3Y7qr9IH1kTz7eW8Yr0iY3P7gUCuP6f8BWx7WnMDrBhjpJSb9R6QWFQ3JrV0tp800kZen11Jh"
);
router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
        
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});*/


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
      console.log(error)
        return res.status(400).json(error);
    }
  
});


module.exports = router;


