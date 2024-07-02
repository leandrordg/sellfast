"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  BoxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
} from "lucide-react";

export default function Page() {
  return (
    <main className="px-6 py-24 max-w-screen-xl mx-auto flex flex-col gap-4 items-center justify-center text-center">
      <ShieldCheckIcon className="size-16 text-green-500" />

      <h1 className="text-lg font-semibold">Pagamento efetuado com sucesso</h1>

      <p className="text-sm text-muted-foreground">
        Seu pagamento foi efetuado com sucesso! Obrigado por comprar conosco!
      </p>

      <div className="flex flex-col gap-4">
        <Link href="/account/orders">
          <Button size="sm">
            Ver meus pedidos <BoxIcon className="size-4 ml-2" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="link" size="sm">
            <ChevronLeftIcon className="size-4 mr-1" /> Voltar para a loja
          </Button>
        </Link>
      </div>
    </main>
  );
}
