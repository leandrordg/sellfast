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
      message: "Obrigatório no mínimo 3 caracteres",
    })
    .max(255),
  description: z
    .string()
    .min(3, {
      message: "Obrigatório no mínimo 3 caracteres",
    })
    .max(255),
  slug: z
    .string()
    .min(3, {
      message: "Obrigatório no mínimo 3 caracteres",
    })
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug inválido" }),
  imageUrl: z.string().url({ message: "Imagem obrigatória" }),
});

export const createCategory = async (data: z.infer<typeof formSchema>) => {
  const { userId } = auth();

  const isAdmin = checkRole("owner" || "admin");

  if (!isAdmin || !userId) {
    return { error: "Você não tem permissão para isso!" };
  }

  try {
    // check if slug already exists
    const slugExists = await db.category.findFirst({
      where: { slug: data.slug },
    });

    if (slugExists) {
      return { error: "Slug já existente!" };
    }

    await db.category.create({
      data: {
        ...data,
        authorId: userId,
      },
    });

    revalidatePath("/admin/categories");

    return { success: "Categoria criada com sucesso" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao criar a categoria" };
  }
};
