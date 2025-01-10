'use client';
import { Tables } from '@datatypes.types';
import Image from 'next/image';
import React, { useState } from 'react';
import ImageDialog from './ImageDialog';

type ImageProps = {
  url: string | undefined;
} & Tables<'generated_images'>;

interface GalleryProps {
  images: ImageProps[];
}

const GalleryComponent = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
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
          return (
            <div key={index}>
              <div
                className="relative group overflow-hidden cursor-pointer transition-transform"
                onClick={() => setSelectedImage(image)}
              >
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70 rounded">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-primary-foreground text-lg font-semibold">
                      Viev Details
                    </p>
                  </div>
                </div>
                <Image
                  src={image.url || ''}
                  alt={image.prompt || ''}
                  width={image.width || 0}
                  height={image.height || 0}
                  className="object-cover rounded"
                />
              </div>
            </div>
          );
        })}
      </div>
      {selectedImage && (
        <ImageDialog
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GalleryComponent;
