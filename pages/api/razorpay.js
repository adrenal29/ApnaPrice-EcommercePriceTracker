//razorpay.js
import Razorpay from 'razorpay'
import shortid from "shortid";

export default async function handler(req, res) {
  console.log("check")
  console.log(req.body)
  const { taxAmt } = req.body;
  //console.log('taxAmt',taxAmt*100) 
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = taxAmt;
    const currency = "INR";
    const options = {
      amount: parseInt(amount * 100),
      currency:currency,
      receipt: shortid.generate(),
      payment_capture:payment_capture
    };

    try {
      const razorpay = new Razorpay({
        key_id: "rzp_test_b3VDdZqg6seeiK",
        key_secret: "PnHfJkX6L7GqCfs5xipibToc",
      });
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
      if (!response) res.staus(500).send('wrong')
      console.log(response)
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
};