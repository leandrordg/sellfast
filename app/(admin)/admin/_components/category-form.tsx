"use client";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
import { createCategory } from "../categories/_create-action";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/lib/utils";
import { LoaderIcon, RssIcon, SaveIcon } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Nome obrigatório",
    })
    .max(255),
  description: z.string().min(1, {
    message: "Descrição obrigatória",
  }),
  slug: z
    .string()
    .min(1, {
      message: "Slug obrigatório",
    })
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug inválido" }),
  imageUrl: z.string().min(1).url({ message: "Imagem obrigatória" }),
});

export function CategoryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      imageUrl: "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createCategory(values);

    if (res.success) {
      form.reset();
      return toast.success(res.success);
    }

    return toast.error(res.error);
  }

  function onSubmitAndPublish(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da categoria</FormLabel>
              <div className="flex flex-col gap-2 items-start">
                <FormControl>
                  <Input
                    placeholder="ex: Tênis Esportivo"
                    {...field}
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
                  placeholder="Digite o slug da categoria"
                  {...field}
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
                  placeholder="ex: Tênis esportivo para corrida"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da imagem</FormLabel>
              <div className="flex flex-col gap-4 items-start">
                {form.watch("imageUrl") ? (
                  <>
                    <Image
                      src={form.getValues("imageUrl")}
                      alt="Imagem da categoria"
                      width={768}
                      height={768}
                      className="w-full sm:w-48 md:w-64 lg:w-96 bg-muted rounded-lg object-cover"
                    />
                    <button
                      onClick={() =>
                        form.resetField("imageUrl", {
                          keepDirty: false,
                          keepTouched: false,
                        })
                      }
                      className="text-primary text-sm hover:underline"
                    >
                      Remover imagem
                    </button>
                  </>
                ) : (
                  <FormControl>
                    <UploadButton
                      endpoint="categoryImage"
                      onClientUploadComplete={(res) =>
                        field.onChange(res[0].url)
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
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            type="submit"
            size="sm"
            disabled={isSubmitting || !isValid || !isDirty}
          >
            {isSubmitting ? (
              <LoaderIcon className="size-4 animate-spin" />
            ) : (
              <>
                Salvar <SaveIcon className="ml-2 size-4" />
              </>
            )}
          </Button>
          <Button
            onClick={() => onSubmitAndPublish(form.getValues())}
            type="button"
            size="sm"
            disabled={isSubmitting || !isValid || !isDirty}
          >
            Salvar e Publicar <RssIcon className="ml-2 size-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
