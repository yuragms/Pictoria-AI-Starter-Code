import { Tables } from '@datatypes.types';
import Image from 'next/image';
import React from 'react';

type Imageprops = {
  url: string | undefined;
} & Tables<'generated_images'>;

interface GalleryProps {
  images: Imageprops[];
}

const GalleryComponent = ({ images }: GalleryProps) => {
  console.log(images);
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
        No Images found
      </div>
    );
  }
  return (
    <section className="container mx-auto py-8">
      <div className="columns-4 gap-4 space-y-4">
        {images.map((image, index) => {
          <div key={index}>
            <div className="relative overflow-hidden cursor-pointer transition-transform">
              <Image
                src={image.url}
                alt={image.promt}
                width={image.width}
                height={image.height}
                className="object-cover rounded"
              />
            </div>
          </div>;
        })}
      </div>
    </section>
  );
};

export default GalleryComponent;
