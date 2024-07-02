"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { User } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, LockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  imageUrl: z.string().optional(),
});

export function ImageChangeForm({ user }: { user: User }) {
  const [newImage, setNewImage] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: user.imageUrl,
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="space-y-6">
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <div className="relative w-fit">
                  <Image
                    src={field.value!}
                    alt={user.fullName!}
                    width={128}
                    height={128}
                    className="size-20 md:size-24 rounded-full object-cover bg-muted"
                  />
                  <button className="absolute -bottom-1 -right-1 bg-muted p-1 rounded-full border text-muted-foreground">
                    <LockIcon className="size-4" />
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {newImage && (
          <div className="flex items-center gap-4">
            <Button
              type="button"
              size="sm"
              variant="link"
              className="text-muted-foreground"
              onClick={() => {
                form.reset();
                setNewImage(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm" variant="link">
              {!isSubmitting ? (
                "Salvar alterações"
              ) : (
                <LoaderIcon className="size-4 animate-spin" />
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

// {!newImage ? (
//     <div className="flex items-center gap-6">
//       <Image
//         src={user.imageUrl}
//         alt={user.fullName!}
//         width={128}
//         height={128}
//         className="size-20 md:size-24 rounded-full bg-muted"
//       />
//       <UploadButton
//         endpoint="profileImage"
//         onClientUploadComplete={(res) => {
//           setNewImage(res[0].url);
//           form.setValue("imageUrl", res[0].url, {
//             shouldDirty: true,
//             shouldValidate: true,
//           });
//         }}
//         onUploadError={(error: Error) => {
//           toast.error("Erro ao atualizar a imagem do perfil.");
//         }}
//       />
//     </div>
//   ) : (
//     <div className="flex flex-col gap-4">
//       <Image
//         src={newImage}
//         alt={user.fullName!}
//         width={128}
//         height={128}
//         className="size-20 md:size-24 rounded-full bg-muted"
//       />
//       <div className="flex items-center gap-4">
//         <Button
//           onClick={() => {
//             setNewImage(null);
//             form.reset();
//           }}
//           variant="link"
//           size="sm"
//           className="text-muted-foreground"
//         >
//           Cancelar
//         </Button>

//         <Button variant="link" size="sm">
//           Confirmar alteração
//         </Button>
//       </div>
//     </div>
//   )}
