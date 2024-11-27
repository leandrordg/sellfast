import Stripe from "stripe";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error) {
    return new Response("[STRIPE] Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await db.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          authorId: session.metadata?.authorId as string,
        },
      });

      break;
    }
    default: {
      console.log(`[STRIPE] Unhandled event type: ${event.type}`);
      break;
    }
  }

  return new Response("[STRIPE] Webhook Received", { status: 200 });
}
