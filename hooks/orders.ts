import { db } from "@/lib/db";

export const getOrdersByUserId = async (
  userId: string,
  orderBy: "asc" | "desc" = "desc"
) => {
  return await db.order.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: orderBy },
  });
};
