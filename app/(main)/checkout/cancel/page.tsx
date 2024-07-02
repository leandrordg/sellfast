import Link from "next/link";

import { ShieldXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="px-6 py-24 max-w-screen-xl mx-auto flex flex-col gap-4 items-center justify-center text-center">
      <ShieldXIcon className="size-16 text-red-500" />

      <h1 className="text-lg font-semibold">Pagamento cancelado!</h1>

      <p className="text-sm text-muted-foreground">
        Se você deseja tentar novamente, clique no botão abaixo.
      </p>

      <Link href="/checkout">
        <Button variant="link" size="sm">
          Tentar novamente
        </Button>
      </Link>
    </main>
  );
}
