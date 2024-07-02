"use client";

import { useState } from "react";

import { useCartStore } from "@/lib/store";
import { Category, Color, Product } from "@prisma/client";
import { toast } from "sonner";

import { Button, ButtonProps } from "@/components/ui/button";
import { CheckIcon, LoaderIcon, ShoppingBasketIcon } from "lucide-react";

type Props = {
  product: Product;
  category: Category;
  colors: Color[];
  variant?: ButtonProps["variant"];
  iconMode?: boolean;
};

export function AddToCart({
  product,
  category,
  colors,
  variant = "default",
  iconMode,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { cart, addItem } = useCartStore();

  const alreadyInCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    // if (alreadyInCart) return;

    setIsLoading(true);

    setTimeout(() => {
      addItem({
        ...product,
        category,
        colors,
      });

      setIsLoading(false);

      toast.success("Produto adicionado ao carrinho");
    }, 1500);
  };

  if (iconMode) {
    return (
      <Button
        disabled={isLoading}
        onClick={handleClick}
        variant={alreadyInCart ? "default" : "outline"}
        size="icon"
        className="relative"
      >
        {isLoading ? (
          <LoaderIcon className="size-4 animate-spin" />
        ) : (
          <>
            <ShoppingBasketIcon className="size-4" />
            {alreadyInCart && (
              <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs inline-flex items-center justify-center size-4 rounded-full">
                <CheckIcon className="size-3" />
              </span>
            )}
          </>
        )}
      </Button>
    );
  }

  return (
    <Button disabled={isLoading} onClick={handleClick} variant={variant}>
      {isLoading ? (
        <LoaderIcon className="size-4 animate-spin" />
      ) : alreadyInCart ? (
        <>
          Adicionado ao carrinho
          <ShoppingBasketIcon className="size-4 ml-2" />
        </>
      ) : (
        <>
          Adicionar ao carrinho
          <ShoppingBasketIcon className="size-4 ml-2" />
        </>
      )}
    </Button>
  );
}
