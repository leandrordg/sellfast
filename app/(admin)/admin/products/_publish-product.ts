"use server";

import { db } from "@/lib/db";
import { checkRole } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  productId: z.string().min(1, { message: "Produto obrigatório" }),
});

export const publishProduct = async (data: z.infer<typeof formSchema>) => {
  const { userId } = auth();

  const isAdmin = checkRole("owner" || "admin");

  if (!isAdmin || !userId) {
    return { error: "Você não tem permissão para isso!" };
  }

  try {
    await db.product.update({
      where: {
        id: data.productId,
      },
      data: {
        published: true,
      },
    });

    revalidatePath("/admin/products");

    return { success: "Produto publicado com sucesso" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao publicar o produto" };
  }
};
