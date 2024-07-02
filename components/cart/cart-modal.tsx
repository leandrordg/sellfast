"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

import { RemoveItemCart } from "@/components/cart/remove-item-cart";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRightIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";

export function CartModal() {
  const {
    cart,
    subtotalPrice,
    incrementItem,
    decrementItem,
    remainingForFreeShipping,
  } = useCartStore();

  const FREE_SHIPPING_THRESHOLD = 499.99;
  const freeShippingRemainingPercentage =
    (remainingForFreeShipping() / FREE_SHIPPING_THRESHOLD) * 100;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCartIcon className="size-4" />
          <span
            className={cn(
              "absolute -bottom-1 -right-1 bg-primary size-4 flex items-center justify-center rounded-full text-[10px] text-primary-foreground transition-opacity",
              cart.length === 0 ? "opacity-0" : "opacity-100"
            )}
          >
            {cart.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="h-dvh flex flex-col p-0">
        <SheetHeader className="pt-6 px-6">
          <SheetTitle>
            Meu carrinho {cart.length > 0 && `(${cart.length})`}
          </SheetTitle>
          <SheetDescription>
            {cart.length === 0
              ? "Seu carrinho está vazio. Continue buscando produtos para adicionar ao carrinho."
              : "Confira os produtos adicionados ao carrinho."}
          </SheetDescription>
        </SheetHeader>

        {cart.length > 0 && (
          <div className="px-6 text-primary text-sm flex flex-col gap-4">
            {remainingForFreeShipping() === 0 ? (
              <p>
                <TruckIcon className="inline-block mr-2 size-4" />
                Parabéns! Você ganhou FRETE GRÁTIS.
              </p>
            ) : (
              <p>
                <TruckIcon className="inline-block mr-2 size-4" />
                Adicione mais{" "}
                {remainingForFreeShipping().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                para FRETE GRÁTIS
              </p>
            )}

            <Progress value={100 - freeShippingRemainingPercentage} />
          </div>
        )}

        <div className="grow overflow-y-auto space-y-6 p-6">
          <div className="flex flex-col gap-4">
            {cart.map((product) => (
              <>
                <div key={product.id} className="flex gap-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-lg size-12 md:size-16"
                  />
                  <div className="flex flex-col gap-1 flex-1">
                    <SheetClose asChild>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-semibold"
                      >
                        {product.name}
                      </Link>
                    </SheetClose>
                    <div className="text-sm text-muted-foreground">
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                      <div className="inline-flex items-center gap-2 ml-2">
                        <button
                          onClick={() => decrementItem(product.id)}
                          className="p-1 bg-muted hover:bg-muted-foreground/20 size-4 text-xs inline-flex items-center justify-center rounded"
                        >
                          -
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() => incrementItem(product.id)}
                          className="p-1 bg-muted hover:bg-muted-foreground/20 size-4 text-xs inline-flex items-center justify-center rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <RemoveItemCart product={product} />
                </div>
              </>
            ))}

            {cart.length > 0 && <RemoveItemCart type="all" />}
          </div>
        </div>

        <SheetFooter className="pb-6 px-6">
          {cart.length > 0 ? (
            <div className="flex flex-col gap-6 w-full">
              <div>
                <p className="font-semibold">
                  Subtotal:{" "}
                  {subtotalPrice().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  Frete e impostos calculados no checkout.
                </p>
              </div>
              <SheetClose asChild>
                <Link href="/checkout">
                  <Button size="sm" className="w-full">
                    Ir para o checkout{" "}
                    <ChevronRightIcon className="size-4 ml-1" />
                  </Button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <SheetClose asChild>
              <Button variant="link" size="sm">
                Continuar buscando...
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
