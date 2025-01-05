import { Tables } from '@datatypes.types';
import React from 'react';

type Imageprops = {
  url: string | undefined;
} & Tables<'generated_images'>;

interface GalleryProps {
  images: Imageprops[];
}

const GalleryComponent = ({ images }: GalleryProps) => {
  console.log(images);
  return <div>GalleryComponent</div>;
};

export default GalleryComponent;
