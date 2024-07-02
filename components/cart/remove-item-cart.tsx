"use client";

import { useState } from "react";

import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";

import { LoaderIcon, TrashIcon } from "lucide-react";

type Props = {
  product?: Product;
  type?: "individual" | "all";
};

export function RemoveItemCart({ product, type = "individual" }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { removeItem, removeAll } = useCartStore();

  const handleRemove = () => {
    if (type === "individual" && !product) return;

    setIsLoading(true);

    setTimeout(() => {
      if (type === "all") {
        removeAll();
        setIsLoading(false);
        return;
      }

      removeItem(product!.id);
      setIsLoading(false);
    }, 1500);
  };

  if (type === "all") {
    return (
      <button
        disabled={isLoading}
        onClick={handleRemove}
        className={cn(
          "text-sm text-left w-fit transition-opacity flex items-center gap-2",
          isLoading && "opacity-50"
        )}
      >
        Remover tudo
        {isLoading && <LoaderIcon className="size-3 animate-spin" />}
      </button>
    );
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleRemove}
      className="ml-2 self-start p-2 hover:bg-muted rounded-md"
    >
      {isLoading ? (
        <LoaderIcon className="size-3 animate-spin" />
      ) : (
        <TrashIcon className="size-3" />
      )}
    </button>
  );
}
