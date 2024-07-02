"use client";

import { useState } from "react";

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
import { UploadButton } from "@/lib/utils";
import { User } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(1).max(255),
  email: z.string().email(),
});

export function AccountForm({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName!,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="John doe"
                  {...field}
                  disabled={!isEditing || isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="exemplo@provedor.com"
                  {...field}
                  disabled={!isEditing || isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing((prev) => !prev)}
              type="button"
              variant="outline"
              size="sm"
            >
              Editar informações
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
