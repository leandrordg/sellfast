"use client";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color } from "@prisma/client";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
import { createProduct } from "../products/_create-product";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { CategoryCombobox } from "./category-combobox";
import { ColorCombobox } from "./color-combobox";
import { ColorsForm } from "./colors-form";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Nome do produto obrigatório",
    })
    .max(255),
  slug: z
    .string()
    .min(1, {
      message: "Slug obrigatório",
    })
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug inválido" }),
  shortDescription: z
    .string()
    .min(1, {
      message: "Descrição curta obrigatória",
    })
    .max(255),
  description: z.string().min(1, {
    message: "Descrição obrigatória",
  }),
  price: z.coerce
    .number({ message: "Preço inválido" })
    .min(0.99, "Mínimo 0.99"),
  stock: z
    .number({ message: "Estoque inválido" })
    .min(1, { message: "Mínimo 1 produto em estoque" }),
  categoryId: z.string().min(1, { message: "Categoria obrigatória" }),
  color: z.object({
    id: z.string().min(1, { message: "Cor obrigatória" }),
    name: z.string().min(1, { message: "Nome obrigatório" }),
    hex: z
      .string()
      .min(4, { message: "Cor obrigatória" })
      .max(7, { message: "Cor inválida" }),
  }),
  images: z.array(z.string()).min(1, { message: "Imagem obrigatória" }),
});

type Props = {
  categories: Category[];
  colors: Color[];
};

export function ProductForm({ categories, colors }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      color: undefined,
      images: [],
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await createProduct(data);

    if (res.success) {
      form.reset();
      return toast.success("Produto criado com sucesso!");
    }

    return toast.error(res.error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <div className="flex flex-col gap-2 items-start">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ex: Tênis Esportivo"
                    disabled={isSubmitting}
                  />
                </FormControl>
                {form.watch("name") && (
                  <button
                    type="button"
                    onClick={() => {
                      form.setValue(
                        "slug",
                        slugify(form.getValues("name"), {
                          lower: true,
                          locale: "pt-BR",
                        }),
                        {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        }
                      );
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Gerar slug
                  </button>
                )}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite o slug do produto"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição pequena</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="ex: Tênis esportivo para corrida"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="ex: Tênis esportivo para corrida com tecnologia XPTO para melhor desempenho em corridas de longa distância."
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4 w-full">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="ex: 199.99" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Qtd. Estoque</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="ex: 10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Selecionar categoria</FormLabel>
              <FormControl>
                <CategoryCombobox
                  categories={categories}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Conecte o produto a uma categoria existente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Selecionar cor</FormLabel>
              <FormControl>
                <ColorCombobox
                  colors={colors}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Selecione ao menos uma cor para o produto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ColorsForm />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagens</FormLabel>
              <div className="flex flex-col gap-4 items-start">
                {form.watch("images").length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {form.watch("images").map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt={`Imagem ${idx + 1}`}
                          width={768}
                          height={768}
                          className="w-full h-full max-h-32 bg-muted rounded-lg object-contain"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        form.resetField("images", {
                          keepDirty: false,
                          keepTouched: false,
                        })
                      }
                      className="text-primary text-sm hover:underline"
                    >
                      Remover tudo
                    </button>
                  </>
                ) : (
                  <FormControl>
                    <UploadButton
                      endpoint="productImages"
                      onClientUploadComplete={(res) =>
                        field.onChange(res.map((img) => img.url))
                      }
                      disabled={isSubmitting}
                    />
                  </FormControl>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || !isValid || !isDirty}
        >
          {isSubmitting ? (
            <LoaderIcon className="size-4 animate-spin" />
          ) : (
            "Criar produto"
          )}
        </Button>
      </form>
    </Form>
  );
}
