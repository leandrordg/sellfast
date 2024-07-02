import { getCategories } from "@/hooks/categories";
import { getColors } from "@/hooks/colors";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { ProductForm } from "../../_components/product-form";

export default async function Page() {
  const [colors, categories] = await Promise.all([
    getColors("asc"),
    getCategories("asc"),
  ]);

  return (
    <div className="h-full py-6 lg:py-10 rounded-lg space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Adicionar produto</h1>

      <ProductForm categories={categories} colors={colors} />
    </div>
  );
}
