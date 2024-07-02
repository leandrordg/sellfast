"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { User } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  anonymous_rating: z.boolean(),
  marketing_emails: z.boolean(),
  security_emails: z.boolean(),
});

export function PreferencesForm({ user }: { user: User }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anonymous_rating:
        (user.publicMetadata.anonymous_rating as boolean) ?? false,
      marketing_emails:
        (user.publicMetadata.marketing_emails as boolean) ?? false,
      security_emails:
        (user.publicMetadata.security_emails as boolean) ?? false,
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
          name="marketing_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Emails de marketing</FormLabel>
                <FormDescription>
                  Receba emails sobre novos produtos e ofertas.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="security_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Emails de segurança</FormLabel>
                <FormDescription>
                  Receba emails sobre a segurança da sua conta.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anonymous_rating"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Avaliações como anônimo</FormLabel>
                <FormDescription>
                  Avalie os produtos sem revelar sua identidade.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="sm"
          variant="link"
          disabled={!isDirty || isSubmitting}
          className={cn("!opacity-0 transition-opacity", {
            "!opacity-100": isDirty,
          })}
        >
          {!isSubmitting ? (
            "Salvar alterações"
          ) : (
            <LoaderIcon className="size-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
}
