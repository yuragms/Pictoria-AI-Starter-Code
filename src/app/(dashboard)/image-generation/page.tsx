import Configurations from '@/components/image-generation/Configurations';
import React from 'react';

const ImageGeneration = () => {
  return (
    <section className="container mx-auto px-6 grid gap-4 grid-cols-3 overflow-hidden">
      <Configurations />
      <div className="col-span-2 rounded flex items-center justify-center">
        Output Images
      </div>
    </section>
  );
};

export default ImageGeneration;
