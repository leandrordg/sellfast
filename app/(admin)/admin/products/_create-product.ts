"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { checkRole } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Obrigatório mínimo 3 caracteres",
    })
    .max(255),
  slug: z
    .string()
    .min(3, {
      message: "Obrigatório mínimo 3 caracteres",
    })
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug inválido" }),
  shortDescription: z
    .string()
    .min(3, {
      message: "Obrigatório mínimo 3 caracteres",
    })
    .max(255),
  description: z
    .string()
    .min(3, {
      message: "Obrigatório mínimo 3 caracteres",
    })
    .max(255),
  price: z.coerce
    .number({ message: "Preço inválido" })
    .min(0.99, "Mínimo 0.99"),
  stock: z
    .number({ message: "Estoque inválido" })
    .min(1, { message: "Mínimo 1" }),
  categoryId: z.string().min(1, { message: "Categoria obrigatória" }),
  color: z.object({
    id: z.string().min(1, { message: "Cor obrigatória" }),
    name: z.string().min(3, { message: "Nome obrigatório" }),
    hex: z
      .string()
      .min(4, { message: "Cor obrigatória" })
      .max(7, { message: "Cor inválida" }),
  }),
  images: z.array(z.string()).min(1, { message: "Imagem obrigatória" }),
});

export const createProduct = async (data: z.infer<typeof formSchema>) => {
  const { userId } = auth();

  const isAdmin = checkRole("owner" || "admin");

  if (!isAdmin || !userId) {
    return { error: "Você não tem permissão para isso!" };
  }

  try {
    // check if slug already exists
    const productSlugAlreadyExists = await db.product.findFirst({
      where: {
        slug: data.slug,
      },
    });

    if (productSlugAlreadyExists) {
      return { error: "Slug já existente!" };
    }

    const { color, ...rest } = data;

    await db.product.create({
      data: {
        ...rest,
        authorId: userId,
        colors: {
          connect: {
            id: color.id,
          },
        },
      },
    });

    revalidatePath("/admin/products/add");

    return { success: "Produto criado com sucesso!" };
  } catch (error) {
    console.log(error);
    return { error: "Erro ao criar o produto" };
  }
};
