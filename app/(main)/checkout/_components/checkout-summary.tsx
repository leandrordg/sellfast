"use client";

import { useState } from "react";

import { useCartStore } from "@/lib/store";
import { User } from "@clerk/nextjs/server";
import { createCheckout } from "../_create-checkout";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { LoaderIcon, WalletCardsIcon } from "lucide-react";

type Props = {
  user: User;
};

export function CheckoutSummary({ user }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { cart, subtotalPrice, totalPrice, removeAll } = useCartStore();

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) return;

    setIsLoading(true);

    await createCheckout(cart).then(() => {
      setIsLoading(false);
      removeAll();
    });
  };

  return (
    <div className="md:min-w-72 lg:min-w-96 h-fit py-6 p-6 flex flex-col gap-6 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">Resumo do pedido</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <p>
            {subtotalPrice().toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <div className="flex items-center justify-between font-medium">
          <p>Total</p>
          <p>
            {totalPrice().toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      {!user ? (
        <SignInButton mode="modal">
          <Button size="sm">
            <WalletCardsIcon className="size-4 mr-2" />
            Ir para o pagamento
          </Button>
        </SignInButton>
      ) : (
        <Button disabled={isLoading} onClick={handleCheckout} size="sm">
          {isLoading ? (
            <LoaderIcon className="size-4 animate-spin" />
          ) : (
            <>
              <WalletCardsIcon className="size-4 mr-2" />
              Ir para o pagamento
            </>
          )}
        </Button>
      )}
    </div>
  );
}
