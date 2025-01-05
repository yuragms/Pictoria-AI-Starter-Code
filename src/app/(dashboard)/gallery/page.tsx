import { getImages } from '@/app/actions/image-actions';
import GalleryComponent from '@/components/gallery/GalleryComponent';
import React from 'react';

const Gallery = async () => {
  const { data: images } = await getImages();
  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-2">My images</h1>
      <p className="text-muted-foreground m-6">
        Here you can see all the images you have generated. Click on an imdge to
        view details.
      </p>
      <GalleryComponent images={images || []} />
    </section>
  );
};

export default Gallery;
