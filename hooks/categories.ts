import { db } from "@/lib/db";

const PRODUCTS_INCLUDE_OPTIONS = {
  category: true,
  colors: true,
};

const getCategories = async (orderBy: "asc" | "desc" = "desc") => {
  return await db.category.findMany({
    orderBy: { createdAt: orderBy },
    include: {
      products: {
        take: 10,
        orderBy: { createdAt: orderBy },
        include: PRODUCTS_INCLUDE_OPTIONS,
      },
    },
  });
};

const getPublishedCategories = async (orderBy: "asc" | "desc" = "desc") => {
  return await db.category.findMany({
    where: {
      published: true,
    },
    orderBy: { createdAt: orderBy },
    include: {
      products: {
        take: 10,
        orderBy: { createdAt: orderBy },
        include: PRODUCTS_INCLUDE_OPTIONS,
      },
    },
  });
};

const getRelatedCategories = async (
  categoryId: string,
  orderBy: "asc" | "desc" = "desc"
) => {
  return await db.category.findMany({
    where: {
      published: true,
      id: {
        not: categoryId,
      },
    },
    take: 10,
    orderBy: { createdAt: orderBy },
    include: {
      products: {
        take: 10,
        include: PRODUCTS_INCLUDE_OPTIONS,
        orderBy: { createdAt: orderBy },
      },
    },
  });
};

const getCategoryById = async (id: string) => {
  return await db.category.findFirst({
    where: { id },
    include: {
      products: {
        include: PRODUCTS_INCLUDE_OPTIONS,
      },
    },
  });
};

const getCategoryBySlug = async (slug: string) => {
  return await db.category.findFirst({
    where: { slug },
    include: {
      products: {
        include: PRODUCTS_INCLUDE_OPTIONS,
      },
    },
  });
};

const getPublishedCategoryById = async (id: string) => {
  return await db.category.findFirst({
    where: { id, published: true },
    include: {
      products: {
        include: PRODUCTS_INCLUDE_OPTIONS,
      },
    },
  });
};

const getPublishedCategoryBySlug = async (slug: string) => {
  return await db.category.findFirst({
    where: { slug, published: true },
    include: {
      products: {
        include: PRODUCTS_INCLUDE_OPTIONS,
      },
    },
  });
};

export {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  getPublishedCategories,
  getPublishedCategoryById,
  getPublishedCategoryBySlug,
  getRelatedCategories,
};
