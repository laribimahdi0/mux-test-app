import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function POST() {
  try {
    const params = {
      submit_type: "pay",
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "abonment",
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.URL}/`,
      cancel_url: `${process.env.URL}/`,
    };


    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "something went wrong", ok: false },
      { status: 500 }
    );
  }
}
