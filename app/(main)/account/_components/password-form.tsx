"use client";

import { useState } from "react";

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
import { User } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(8).max(255),
  newPassword: z.string().min(8).max(255),
  confirmPassword: z.string().min(8).max(255),
});

export function PasswordForm({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  if (!isEditing) {
    return (
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Senha atual</p>
          <h3 className="text-xl font-medium">********</h3>
        </div>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          variant="link"
          size="sm"
          className="ml-auto"
        >
          Alterar senha
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digite sua senha antiga</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormDescription>Mínimo de 8 caracteres</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormDescription>Digite a sua nova senha</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setIsEditing((prev) => !prev);
              form.reset();
            }}
            type="button"
            variant="outline"
            size="sm"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            {!isSubmitting ? (
              "Salvar alterações"
            ) : (
              <LoaderIcon className="size-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
