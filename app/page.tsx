import Image from "next/image";
import Link from "next/link";

import { ProductList } from "@/components/product-list";
import { getPublishedProducts } from "@/hooks/products";

export default async function Page() {
  const products = await getPublishedProducts();

  return (
    <main className="p-6 pb-24 lg:pt-10 space-y-12 lg:space-y-20 max-w-screen-xl mx-auto">
      <Link href={`/offers/1`}>
        <Image
          src="/images/banner.jpg"
          alt="Promo Banner"
          width={1200}
          height={425}
          className="rounded-lg shadow bg-muted w-full"
        />
      </Link>

      <ProductList products={products}>Todos os produtos</ProductList>
    </main>
  );
}
