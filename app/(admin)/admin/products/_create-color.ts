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
  hex: z
    .string()
    .min(3, { message: "Obrigatório no mínimo 3 caracteres" })
    .max(6),
});

export const createColor = async (data: z.infer<typeof formSchema>) => {
  const { userId } = auth();

  const isAdmin = checkRole("owner" || "admin");

  if (!isAdmin || !userId) {
    return { error: "Você não tem permissão para isso!" };
  }

  try {
    const hexColorAlreadyExists = await db.color.findFirst({
      where: {
        hex: data.hex,
      },
    });

    if (hexColorAlreadyExists) {
      return { error: "Cor já existente!" };
    }

    await db.color.create({
      data: {
        name: data.name,
        hex: data.hex,
      },
    });

    revalidatePath("/admin/products/add");

    return { success: "Cor criada com sucesso" };
  } catch (error) {
    console.error(error);
    return { error: "Erro ao criar a cor" };
  }
};
