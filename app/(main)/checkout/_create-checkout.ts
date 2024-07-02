"use server";

import { redirect } from "next/navigation";

import {
  CartItem,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_PRICE,
  useCartStore,
} from "@/lib/store";
import { stripe } from "@/lib/stripe";
import { checkRole } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export const createCheckout = async (cart: CartItem[]) => {
  const { userId } = auth();

  const isAdmin = checkRole("owner" || "admin");

  if (!isAdmin || !userId) {
    return { error: "Você não tem permissão para isso!" };
  }

  if (cart.length === 0 || !cart) {
    return { error: "Seu carrinho está vazio!" };
  }

  const allPrices = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const shippingPrice =
    allPrices > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PRICE;

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
        unit_amount: (item.price + shippingPrice) * 100,
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
