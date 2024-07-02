import { db } from "@/lib/db";

const getColors = async (orderBy: "asc" | "desc" = "desc") => {
  return await db.color.findMany({
    orderBy: { name: orderBy },
  });
};

export { getColors };
