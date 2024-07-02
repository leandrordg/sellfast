"use client";

import { useUser } from "@clerk/nextjs";
import { AccountForm } from "./_components/account-form";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { ImageChangeForm } from "./_components/image-change-form";

export default function Page() {
  const { user, isLoaded } = useUser();

  return (
    <div className="h-full md:py-6 lg:py-10 rounded-lg space-y-6">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Meus dados</h1>

      {!isLoaded ? (
        <div className="flex flex-col gap-6">
          <div className="py-16 bg-muted animate-pulse rounded-lg w-64" />
          <div className="p-6 bg-muted animate-pulse rounded-lg" />
          <div className="p-6 bg-muted animate-pulse rounded-lg" />
          <div className="p-6 bg-muted animate-pulse rounded-lg" />
        </div>
      ) : (
        <>
          {/* @ts-ignore */}
          <ImageChangeForm user={user} />
          {/* @ts-ignore */}
          <AccountForm user={user} />
        </>
      )}
    </div>
  );
}
