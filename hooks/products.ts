import { db } from "@/lib/db";

const PRODUCT_INCLUDE_OPTIONS = {
  category: true,
  colors: true,
};

const getProducts = async (orderBy: "asc" | "desc" = "desc") => {
  return await db.product.findMany({
    include: PRODUCT_INCLUDE_OPTIONS,
    orderBy: { createdAt: orderBy },
  });
};

const getPublishedProducts = async (orderBy: "asc" | "desc" = "desc") => {
  return await db.product.findMany({
    where: {
      published: true,
    },
    take: 10,
    include: PRODUCT_INCLUDE_OPTIONS,
    orderBy: { createdAt: orderBy },
  });
};

const getRelatedProducts = async (categoryId: string, productId: string) => {
  return await db.product.findMany({
    where: {
      published: true,
      categoryId: {
        equals: categoryId,
      },
      NOT: {
        id: {
          equals: productId,
        },
      },
    },
    take: 10,
    include: PRODUCT_INCLUDE_OPTIONS,
  });
};

const getProductById = async (id: string) => {
  return await db.product.findFirst({
    where: {
      id,
    },
    include: PRODUCT_INCLUDE_OPTIONS,
  });
};

const getProductBySlug = async (slug: string) => {
  return await db.product.findFirst({
    where: {
      slug,
    },
    include: PRODUCT_INCLUDE_OPTIONS,
  });
};

const getPublishedProductBySlug = async (slug: string) => {
  return await db.product.findFirst({
    where: {
      slug,
      published: true,
    },
    include: PRODUCT_INCLUDE_OPTIONS,
  });
};

export {
  getProductById,
  getProductBySlug,
  getProducts,
  getPublishedProductBySlug,
  getPublishedProducts,
  getRelatedProducts,
};
