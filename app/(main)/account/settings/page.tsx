"use client";

import { useUser } from "@clerk/nextjs";
import { PasswordForm } from "../_components/password-form";
import { PreferencesForm } from "../_components/preferences-form";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";

export default function Page() {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full md:py-6 lg:py-10 rounded-lg space-y-6">
      <CustomBreadcrumb />
      
      <h1 className="text-xl font-semibold">Configurações</h1>

      {!isLoaded ? (
        <div className="flex flex-col gap-6">
          <div className="p-6 bg-muted animate-pulse rounded-lg" />
          <div className="p-6 bg-muted animate-pulse rounded-lg" />
          <div className="p-6 bg-muted animate-pulse rounded-lg" />
        </div>
      ) : (
        <>
          {/* @ts-ignore */}
          <PasswordForm user={user} />
          {/* @ts-ignore */}
          <PreferencesForm user={user} />
        </>
      )}
    </div>
  );
}
