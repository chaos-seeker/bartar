'use client';

import { Image } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FormImageProps {
  label?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  existingImage?: string;
}

export const FormImage = (props: FormImageProps) => {
  const [imagePreview, setImagePreview] = useState<string>('');
  useEffect(() => {
    if (props.value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(props.value);
    } else if (props.existingImage) {
      setImagePreview(props.existingImage);
    } else {
      setImagePreview('');
    }
  }, [props.value, props.existingImage]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    props.onChange?.(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <label className="text-sm font-semibold text-gray-900">
          {props.label}
        </label>
      )}
      <label className="cursor-pointer">
        <div className="hover:border-primary relative aspect-square w-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 transition-colors">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Image className="h-10 w-10 text-gray-400" />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
