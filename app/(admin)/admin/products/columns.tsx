"use client";

import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/utils";
import { ProductType } from "@/types/globals";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { publishProduct } from "./_publish-product";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  PenIcon,
  RssIcon,
  TrashIcon,
} from "lucide-react";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: ({ row }) => {
      const { images, name } = row.original;

      return (
        <div className="flex items-center justify-center">
          <Image
            src={images[0]}
            alt={name}
            width={64}
            height={64}
            className="size-8 object-cover rounded-full bg-muted"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "colors",
    header: "Cores",
    cell: ({ row }) => {
      const { colors } = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          {colors.map((color) => (
            <div
              key={color.id}
              className="size-4 rounded-full border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const { name } = row.original;

      return <span className="line-clamp-2">{name}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const { price } = row.original;

      return formatPrice(price);
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
    cell: ({ row }) => {
      const { stock } = row.original;

      return <div className="text-center">{stock}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      const date = new Date(createdAt).toLocaleDateString("pt-BR", {
        dateStyle: "medium",
      });

      return date;
    },
  },
  {
    accessorKey: "published",
    header: "Status",
    cell: ({ row }) => {
      const { published } = row.original;

      return !published ? (
        <span className="text-blue-600 font-semibold">Rascunho</span>
      ) : (
        <span className="text-primary font-semibold">Publicado</span>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const { id, slug, published } = row.original;

      return (
        <div className="flex items-center justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Ações disponíveis</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(id);
                  toast.success("ID copiado para a área de transferência");
                }}
              >
                Copiar ID
                <ClipboardIcon className="size-3 ml-auto" />
              </DropdownMenuItem>

              {published ? (
                <Link href={`/products/${slug}`}>
                  <DropdownMenuItem>
                    Ver produto <ExternalLinkIcon className="size-3 ml-auto" />
                  </DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    const res = await publishProduct({ productId: id });

                    if (res.success) {
                      return toast.success(res.success);
                    }

                    toast.error(res.error);
                  }}
                >
                  Publicar produto <RssIcon className="size-3 ml-auto" />
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Editar <PenIcon className="size-3 ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuItem>
                Excluir
                <TrashIcon className="size-3 ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
