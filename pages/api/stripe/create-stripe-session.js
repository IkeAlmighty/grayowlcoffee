const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { order } = req.body;

  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://grayowl.coffee";

  const session = await stripe.checkout.sessions.create({
    success_url: redirectUrl + "?status=success",
    cancel_url: redirectUrl + "?status=cancel",
    line_items: [{ price: order.price_id, quantity: order.quantity }],
    payment_method_types: ["card"],
    mode: "payment",
  });

  res.json({ id: session.id });
};
