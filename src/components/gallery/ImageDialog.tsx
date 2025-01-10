import { Tables } from '@datatypes.types';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Download, Trash2 } from 'lucide-react';

interface ImageDialogProps {
  image: { url: string | undefined } & Tables<'generated_images'>;
  onClose: () => void;
}

const ImageDialog = ({ image, onClose }: ImageDialogProps) => {
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <div className="relative w-fit h-fit">
            <Image
              src={image.url || ''}
              alt={image.prompt || ''}
              width={image.width || 0}
              height={image.height || 0}
              className="w-full h-auto flex mb-3 rounded"
            />
            <div className="flex gap-4 absolute bottom-4 right-4">
              <Button className="w-fit">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button className="w-fit" variant={'destructive'}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ImageDialog;
