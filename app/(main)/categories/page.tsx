import { getPublishedCategories } from "@/hooks/categories";

import { CategoryCard } from "@/components/category-card";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { CustomPagination } from "@/components/custom-pagination";

export default async function Page() {
  const categories = await getPublishedCategories();

  return (
    <div className="p-6 pb-24 space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h2 className="text-xl font-semibold">Todas as categorias</h2>
      <p className="text-sm text-muted-foreground">
        Confira todas as categorias disponíveis em nossa loja.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 pb-6">
        {categories.length ? (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <p className="text-muted-foreground">Nenhuma categoria encontrada.</p>
        )}
      </div>

      <CustomPagination />
    </div>
  );
}
