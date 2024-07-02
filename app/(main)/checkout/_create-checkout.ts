"use server";

import { redirect } from "next/navigation";

import { CartItem } from "@/lib/store";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";

export const createCheckout = async (cart: CartItem[]) => {
  const { userId } = auth();

  if (!userId) {
    return { error: "Você precisa estar logado para finalizar a compra!" };
  }

  if (cart.length === 0 || !cart) {
    return { error: "Seu carrinho está vazio!" };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cart.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          images: [item.images[0]],
          description: item.shortDescription,
          metadata: {
            productId: item.id,
            category: item.category.name,
            color: item.colors[0].name,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.count,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    locale: "pt-BR",
    metadata: {
      authorId: userId,
    },
  });

  return redirect(session.url as string);
};
