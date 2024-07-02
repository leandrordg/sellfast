"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Color } from "@prisma/client";

type Props = {
  colors: Color[];
};

export function ColorSwitch({ colors }: Props) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const onClick = (color: Color) => {
    if (color === selectedColor) return;

    setSelectedColor(color);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm text-muted-foreground">Selecione a cor</h3>

      <div className="flex gap-2">
        {colors.map((color, index) => (
          <button
            key={index}
            className={cn(
              "w-8 h-8 rounded-full border",
              selectedColor === color && "ring-2 ring-offset-2"
            )}
            onClick={() => onClick(color)}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}
