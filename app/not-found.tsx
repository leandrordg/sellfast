import Link from "next/link";

import { ShieldXIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="px-6 py-24 max-w-screen-xl mx-auto flex flex-col gap-4 items-center justify-center text-center">
      <ShieldXIcon className="size-16 text-gray-300" />

      <h1 className="text-lg font-semibold">Página não encontrada</h1>

      <p className="text-sm text-muted-foreground">
        A página que você está procurando não foi encontrada. Tente novamente
        mais tarde.
      </p>

      <Link href="/" className="text-sm text-primary hover:underline">
        Voltar para a página inicial
      </Link>
    </main>
  );
}
