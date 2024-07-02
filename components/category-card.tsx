import Image from "next/image";
import Link from "next/link";

import { Category } from "@prisma/client";

import { ExternalLinkIcon } from "lucide-react";

type Props = {
  category: Category;
};

export function CategoryCard({ category }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-lg bg-muted/50"
      />

      <Link
        href={`/categories/${category.slug}`}
        className="text-lg font-semibold"
      >
        {category.name} <ExternalLinkIcon className="size-3 inline-block" />
      </Link>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {category.description}
      </p>
    </div>
  );
}
