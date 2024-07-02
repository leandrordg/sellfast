"use client";

import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

import { RemoveItemCart } from "@/components/cart/remove-item-cart";
import Link from "next/link";

export function CheckoutForm() {
  const { cart, incrementItem, decrementItem } = useCartStore();

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-sm text-muted-foreground">
        Items no carrinho ({cart.length})
      </h2>

      {cart.map((item) => (
        <div key={item.id} className="flex gap-4">
          <img
            src={item.images[0]}
            alt={item.name}
            className="size-16 sm:size-20 md:size-24 object-cover rounded-lg"
          />
          <div className="w-full space-y-1">
            <Link href={`/products/${item.slug}`} className="block lg:text-lg">
              {item.name}
            </Link>
            <div className="inline-flex items-center gap-2">
              <p className="text-xl font-semibold">{formatPrice(item.price)}</p>
              <del className="text-sm text-muted-foreground">
                {formatPrice(item.price * 1.5)}
              </del>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="size-4 rounded-full border"
                  style={{ backgroundColor: item.colors[0].hex }}
                />
                <span className="text-sm">Cor: {item.colors[0].name}</span>
              </div>
              <div className="inline-flex items-center gap-2 ml-2">
                <button
                  onClick={() => decrementItem(item.id)}
                  className="p-1 bg-muted hover:bg-muted-foreground/20 size-4 text-xs inline-flex items-center justify-center rounded"
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() => incrementItem(item.id)}
                  className="p-1 bg-muted hover:bg-muted-foreground/20 size-4 text-xs inline-flex items-center justify-center rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <RemoveItemCart product={item} />
        </div>
      ))}

      <RemoveItemCart type="all" />
    </div>
  );
}
