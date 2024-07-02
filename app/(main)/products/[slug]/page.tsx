import Link from "next/link";

import {
  getPublishedProductBySlug,
  getRelatedProducts,
} from "@/hooks/products";
import { formatPrice } from "@/lib/utils";

import { AddToCart } from "@/components/cart/add-to-cart";
import { ColorSwitch } from "@/components/color-switch";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { ImagesCarousel } from "@/components/images-carousel";
import { ProductList } from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeartIcon, SearchXIcon, StarHalfIcon, StarIcon } from "lucide-react";

export default async function Page({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    return (
      <div className="px-6 py-24 max-w-screen-xl mx-auto flex flex-col gap-4 items-center justify-center text-center">
        <SearchXIcon className="size-20 text-gray-400" />
        <h1 className="text-lg font-semibold">Produto não encontrado</h1>
        <p className="text-sm text-muted-foreground">
          O produto que você está procurando não foi encontrado. Tente
          novamente.
        </p>
        <Link href="/" className="text-sm text-primary hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const productsByCategory = await getRelatedProducts(
    product.categoryId,
    product.id
  );

  return (
    <div className="p-6 pb-24 space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>

      <section className="flex flex-col md:flex-row gap-6">
        <ImagesCarousel name={product.name} images={product.images} />

        <div className="flex flex-col gap-6 md:min-w-64 lg:min-w-96">
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 fill-black" />
            <StarIcon className="size-4 fill-black" />
            <StarIcon className="size-4 fill-black" />
            <StarIcon className="size-4 fill-black" />
            <StarHalfIcon className="size-4 fill-black" />
            <p className="text-sm text-muted-foreground">
              4.5 (44 avaliações).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-4xl font-semibold">
              {formatPrice(product.price)}
            </p>
            <del className="text-muted-foreground">
              {formatPrice(product.price * 1.5)}
            </del>
          </div>

          <p className="text-muted-foreground">{product.category.name}</p>

          <ColorSwitch colors={product.colors} />

          <div className="mt-6 flex flex-col gap-4">
            <Button variant="outline">
              Lista de desejos <HeartIcon className="size-3 ml-2" />
            </Button>
            <AddToCart
              product={product}
              category={product.category}
              colors={product.colors}
            />
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Ao comprar este produto, você ganha{" "}
              <span className="font-medium">
                {Math.round(product.price * 0.1)} moedas.
              </span>
            </p>
            <Link href="/coins" className="text-primary text-xs">
              Saiba mais sobre moedas.
            </Link>
          </div>

          {/* calculate shipping */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Calcule o frete e o prazo de entrega estimados para sua região.
            </p>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="CEP. ex: 00000-000"
                className="border border-gray-300 rounded-md w-full p-2 h-9"
              />
              <Button variant="outline" size="sm">
                Calcular
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 py-10">
        <h2 className="text-xl font-semibold">Descrição do produto</h2>
        <p className="text-muted-foreground">{product.description}</p>
      </section>

      {productsByCategory.length ? (
        <ProductList
          products={productsByCategory}
          href={`/categories/${product.category.slug}`}
        >
          Produtos relacionados
        </ProductList>
      ) : (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Produtos relacionados</h2>
          <p className="text-sm text-muted-foreground">
            Nenhum produto relacionado encontrado.
          </p>
        </section>
      )}
    </div>
  );
}
