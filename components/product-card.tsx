import Image from "next/image";
import Link from "next/link";

import { Category, Color, Product } from "@prisma/client";

import { AddToCart } from "@/components/cart/add-to-cart";
import { ProductPreviewModal } from "@/components/modals/product-preview";
import { ExternalLinkIcon } from "lucide-react";

type Props = {
  product: Product;
  colors: Color[];
  category: Category;
};

export function ProductCard({ product, colors, category }: Props) {
  return (
    <div key={product.id} className="flex flex-col gap-2">
      <div className="relative group">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg bg-muted/50"
        />
        <div className="absolute top-0 left-0 p-6 w-full h-full rounded-lg md:hover:backdrop-brightness-90 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-end gap-2 h-full">
            <ProductPreviewModal
              product={product}
              colors={colors}
              category={category}
            />
            <AddToCart
              product={product}
              colors={colors}
              category={category}
              iconMode
            />
          </div>
        </div>
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="text-lg font-semibold"
      >
        {product.name} <ExternalLinkIcon className="size-3 inline-block" />
      </Link>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {product.shortDescription}
      </p>
    </div>
  );
}
