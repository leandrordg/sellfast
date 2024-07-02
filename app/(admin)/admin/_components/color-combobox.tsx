"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Color } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, Link2Icon } from "lucide-react";

type Props = {
  colors: Color[];
  value: { id: string; name: string; hex: string };
  onChange: (color: Color) => void;
};

export function ColorCombobox({ colors, onChange, value }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("text-muted-foreground gap-2", value && "text-black")}
        >
          {value ? (
            <>
              <div
                className="rounded-full size-5 border"
                style={{
                  backgroundColor:
                    colors.find((color) => color.id === value?.id)?.hex ?? "",
                }}
              />
              <span>
                {colors.find((color) => color.id === value?.id)?.name}
              </span>
            </>
          ) : (
            "Nenhuma selecionada..."
          )}
          <Link2Icon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Buscar cor..." className="h-9" />
          <CommandList>
            <CommandEmpty>Sem resultados</CommandEmpty>
            <CommandGroup>
              {colors.map((color) => (
                <CommandItem
                  key={color.id}
                  value={color.name}
                  onSelect={() => {
                    onChange(
                      // if not equals send undefined
                      color.id === value?.id
                        ? (undefined as unknown as Color)
                        : (color as Color)
                    );
                    setOpen(false);
                  }}
                >
                  {color.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto size-4",
                      color.id == value?.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
