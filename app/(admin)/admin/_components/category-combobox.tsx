"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

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
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
};

export function CategoryCombobox({ categories, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between text-muted-foreground",
            value && "text-black"
          )}
        >
          {value
            ? categories.find((category) => category.id === value)?.name
            : "Nenhuma selecionada..."}
          <Link2Icon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Buscar categoria..." className="h-9" />
          <CommandList>
            <CommandEmpty>Sem resultados</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => {
                    onChange(category.id === value ? "" : category.id);
                    setOpen(false);
                  }}
                >
                  {category.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === category.id ? "opacity-100" : "opacity-0"
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
