"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createColor } from "../products/_create-color";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Obrigatório no mínimo 3 caracteres",
    })
    .max(255),
  hex: z
    .string()
    .min(1, { message: "Obrigatório no mínimo 3 caracteres" })
    .max(7),
});

export function ColorsForm() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      hex: undefined,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createColor(values);

    if (res.success) {
      setIsEditing(false);
      toast.success(res.success);
      return form.reset();
    }

    return toast.error(res.error);
  }

  if (!isEditing) {
    return (
      <Button
        type="button"
        variant="link"
        onClick={() => setIsEditing(true)}
        className="p-0"
      >
        Criar nova cor
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Nome da cor</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome da cor"
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
          name="hex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <FormControl>
                <Input
                  type="color"
                  {...field}
                  disabled={isSubmitting}
                  className="min-w-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {form.watch("name") && (
        <Button
          type="button"
          variant="link"
          disabled={isSubmitting || !isValid || !isDirty}
          className={cn("p-0")}
          onClick={() => onSubmit(form.getValues())}
        >
          Criar cor
        </Button>
      )}
    </div>
  );
}
