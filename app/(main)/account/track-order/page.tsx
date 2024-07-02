import { CustomBreadcrumb } from "@/components/custom-breadcrumb";

export default function page() {
  return (
    <div className="h-full md:py-6 lg:py-10 rounded-lg space-y-6">
      <CustomBreadcrumb />
      
      <h1 className="text-xl font-semibold">Rastrear pedido</h1>

      <p className="text-muted-foreground text-sm">
        Você não possui nenhum pedido para ser rastreado no momento!
      </p>
    </div>
  );
}
