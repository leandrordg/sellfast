import Link from "next/link";

import { ProductType } from "@/types/globals";

import { ProductCard } from "@/components/product-card";

type Props = {
  products: ProductType[];
  children: React.ReactNode;
  href?: string;
};

export function ProductList({ products, children, href = "/" }: Props) {
  return (
    <section className="space-y-6">
      <Link href={href} className="text-xl font-semibold">
        {children}
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <p className="text-muted-foreground text-sm">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </section>
  );
}
