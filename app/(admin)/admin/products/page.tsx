import { getProducts } from "@/hooks/products";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="h-full py-6 lg:py-10 rounded-lg space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Produtos</h1>

      <DataTable columns={columns} data={products} />
    </div>
  );
}