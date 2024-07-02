import Link from "next/link";

import { getCategoryBySlug } from "@/hooks/categories";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { ProductCard } from "@/components/product-card";
import { SearchXIcon } from "lucide-react";
import { CustomPagination } from "@/components/custom-pagination";

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const categories = await getCategoryBySlug(slug);

  if (!categories) {
    return (
      <div className="px-6 py-24 max-w-screen-xl mx-auto flex flex-col gap-4 items-center justify-center text-center">
        <SearchXIcon className="size-20 text-gray-400" />
        <h1 className="text-lg font-semibold">Categoria não encontrada</h1>
        <p className="text-sm text-muted-foreground">
          A categoria que você está procurando não foi encontrada. Tente
          novamente.
        </p>
        <Link href="/" className="text-sm text-primary hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const { products } = categories;

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h2 className="text-xl font-semibold">{categories.name}</h2>
      <p className="text-sm text-muted-foreground">{categories.description}</p>

      <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-6">
        {products.length ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              colors={product.colors}
              category={product.category}
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
