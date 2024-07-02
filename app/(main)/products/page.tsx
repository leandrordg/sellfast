import { getPublishedProducts } from "@/hooks/products";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { ProductCard } from "@/components/product-card";
import { CustomPagination } from "@/components/custom-pagination";

export default async function Page() {
  const products = await getPublishedProducts();

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h2 className="text-xl font-semibold">Todas os produtos</h2>
      <p className="text-sm text-muted-foreground">
        Confira todos os produtos disponíveis em nossa loja.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-6">
        {products.length ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={product.category}
              colors={product.colors}
            />
          ))
        ) : (
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        )}
      </div>

      <CustomPagination />
    </div>
  );
}
