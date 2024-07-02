"use client";

import Link from "next/link";

import { useCartStore } from "@/lib/store";
import { useUser } from "@clerk/nextjs";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { ShoppingCartIcon } from "lucide-react";
import { CheckoutForm } from "./_components/checkout-form";
import { CheckoutSummary } from "./_components/checkout-summary";

export default function Page() {
  const { count } = useCartStore();

  const { user, isLoaded } = useUser();

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Finalizar compra</h1>

      {!isLoaded ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-6 w-full">
            <div className="p-10 bg-muted animate-pulse rounded-lg" />
            <div className="p-10 bg-muted animate-pulse rounded-lg" />
            <div className="p-10 bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="py-20 lg:p-10 bg-muted animate-pulse rounded-lg md:min-w-72 lg:min-w-96" />
        </div>
      ) : count() > 0 ? (
        <div className="flex flex-col md:flex-row gap-10">
          {/* @ts-ignore */}
          <CheckoutForm user={user} />
          {/* @ts-ignore */}
          <CheckoutSummary user={user} />
        </div>
      ) : (
        <div className="px-6 py-24 max-w-screen-xl mx-auto flex flex-col gap-4 items-center justify-center text-center">
          <ShoppingCartIcon className="size-16 text-gray-400" />

          <h1 className="text-lg font-semibold">Seu carrinho está vazio</h1>

          <p className="text-sm text-muted-foreground">
            Adicione produtos ao seu carrinho para continuar com a compra.
          </p>

          <Link href="/" className="text-sm text-primary hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      )}
    </div>
  );
}
