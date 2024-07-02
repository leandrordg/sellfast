"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  name: string;
};

export function ImagesCarousel({ name, images }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const onClick = (image: string) => {
    if (image === selectedImage) return;

    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      <div className="grid grid-cols-6 lg:grid-cols-1 lg:max-w-20 gap-2 h-fit shrink-0">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => onClick(image)}
            className={cn(
              "relative w-full rounded-lg",
              selectedImage === image && "ring-2 ring-offset-2"
            )}
          >
            <img
              src={image}
              alt={name}
              width={256}
              height={256}
              className="w-full rounded-lg cursor-pointer bg-muted"
            />
          </div>
        ))}
      </div>
      <div className="w-full">
        <img
          src={selectedImage}
          alt={name}
          width={768}
          height={768}
          className="rounded-lg w-full bg-muted/50"
        />
      </div>
    </div>
  );
}
