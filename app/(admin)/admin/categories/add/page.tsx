import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { CategoryForm } from "../../_components/category-form";

export default function Page() {
  return (
    <div className="h-full py-6 lg:py-10 rounded-lg space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Adicionar categoria</h1>

      <CategoryForm />
    </div>
  );
}
