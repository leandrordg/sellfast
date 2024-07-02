"use client";

import Image from "next/image";
import Link from "next/link";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Category, Color, Product } from "@prisma/client";

import { AddToCart } from "@/components/cart/add-to-cart";
import { ColorSwitch } from "@/components/color-switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRightIcon,
  EyeIcon,
  StarHalfIcon,
  StarIcon,
} from "lucide-react";
import { Fragment } from "react";

type Props = {
  product: Product;
  colors: Color[];
  category: Category;
};

export function ProductPreviewModal({ product, colors, category }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <EyeIcon className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full md:max-w-lg lg:max-w-xl">
          <ProductPreview
            product={product}
            colors={colors}
            category={category}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <EyeIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-6 pb-6 gap-6">
        <ProductPreview product={product} colors={colors} category={category} />
      </DrawerContent>
    </Drawer>
  );
}

function ProductPreview({ product, colors, category }: Props) {
  return (
    <>
      {/* Image */}
      <Image
        src={product.images[0]}
        alt={product.name}
        width={256}
        height={256}
        loading="lazy"
        className="w-full max-h-72 md:max-h-96 object-cover rounded-lg bg-muted pointer-events-none select-none"
      />

      {/* Infos */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          {product.name}
        </h2>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          <StarIcon className="size-4 fill-black" />
          <StarIcon className="size-4 fill-black" />
          <StarIcon className="size-4 fill-black" />
          <StarIcon className="size-4 fill-black" />
          <StarHalfIcon className="size-4 fill-black" />
          <p className="text-sm text-muted-foreground">4.5 (44 avaliações).</p>
          <p className="text-sm text-muted-foreground">
            {product.stock} restantes.
          </p>
        </div>

        {/* Prices and Colors */}
        <div className="flex items-center flex-nowrap overflow-x-auto gap-2">
          <p className="text-xl font-semibold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <del className="text-sm text-muted-foreground">
            {product.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </del>

          <div className="flex items-center gap-1">
            {colors.map((color) => (
              <Badge
                key={color.id}
                style={{ backgroundColor: color.hex }}
                className="drop-shadow-sm"
              >
                {color.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Link href={`/products/${product.slug}`}>
          <Button variant="outline" className="w-full">
            Ver mais <ChevronRightIcon className="size-4 ml-2" />
          </Button>
        </Link>
        <AddToCart
          product={product}
          colors={colors}
          category={category}
          variant="default"
        />
      </div>
    </>
  );
}
