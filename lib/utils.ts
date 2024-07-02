import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  return price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatPath = (path: string) => {
  switch (path) {
    case "account":
      return "Minha conta";
    case "orders":
      return "Meus pedidos";
    case "track-order":
      return "Rastrear pedido";
    case "settings":
      return "Configurações";
    case "support":
      return "Suporte";
    case "checkout":
      return "Checkout";
    case "admin":
      return "Admin";
    case "add":
      return "Adicionar";
    case "edit":
      return "Editar";
    case "delete":
      return "Deletar";
    case "categories":
      return "Categorias";
    case "products":
      return "Produtos";
    default:
      return path;
  }
};

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { UploadThingRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<UploadThingRouter>();
export const UploadDropzone = generateUploadDropzone<UploadThingRouter>();

import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};

export const formatStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Pagamento pendente";
    case "complete":
      return "Pedido realizado";
    default:
      return status;
  }
};
