import { redirect } from "next/navigation";

import { getOrdersByUserId } from "@/hooks/orders";
import { cn, formatStatus } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { Badge } from "@/components/ui/badge";

export default async function Page() {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const orders = await getOrdersByUserId(userId);

  return (
    <div className="h-full md:py-6 lg:py-10 rounded-lg space-y-6">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Meus pedidos ({orders.length})</h1>

      {orders.length ? (
        <div className="flex flex-col gap-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between text-muted-foreground text-sm p-4 hover:bg-muted/50 rounded-lg border"
            >
              <div className="flex lg:flex-row-reverse items-center justify-between gap-4">
                <p className="text-xs">{order.id}</p>
                <Badge
                  className={cn("rounded-md w-fit", {
                    "bg-cyan-600 text-white": order.status === "pending",
                    "bg-green-600 text-white": order.status === "complete",
                  })}
                >
                  {formatStatus(order.status)}
                </Badge>
              </div>

              <p>
                {order.createdAt.toLocaleDateString("pt-BR", {
                  dateStyle: "full",
                })}
              </p>
              <p className="text-black text-base">
                {/* Price below is 319,98, but comes in 31998, format then */}
                R$ {order.amount.toString().replace(/(\d{2})$/, ",$1")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Você não possui nenhum pedido no momento!
        </p>
      )}
    </div>
  );
}
