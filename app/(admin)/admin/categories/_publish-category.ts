"use server";

import { db } from "@/lib/db";
import { checkRole } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  categoryId: z.string().min(1, { message: "Categoria obrigatória" }),
});

export const publishCategory = async (data: z.infer<typeof formSchema>) => {
  const { userId } = auth();

  const isAdmin = checkRole("owner" || "admin");

  if (!isAdmin || !userId) {
    return { error: "Você não tem permissão para isso!" };
  }

  try {
    await db.category.update({
      where: {
        id: data.categoryId,
      },
      data: {
        published: true,
      },
    });

    revalidatePath("/admin/categories");

    return { success: "Categoria publicada com sucesso" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao publicar essa categoria" };
  }
};
