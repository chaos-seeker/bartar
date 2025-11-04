'use client';

import { useModal } from '@/hooks/modal';
import { cn } from '@/utils/cn';
import { FormInput } from '@/components/form-input';
import { FormImage } from '@/components/form-image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.string().min(1, 'Price is required'),
  discount: z.string().optional(),
  stock: z.string().min(1, 'Stock is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export const ModalAddProduct = () => {
  const modalAddProduct = useModal('add-product');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: '',
      discount: '',
      stock: '',
    },
  });

  const handleClose = () => {
    modalAddProduct.hide();
    form.reset();
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  const onSubmit = (data: ProductFormData) => {
    // ...
  };

  return (
    <>
      <button
        type="button"
        className={cn(
          'fixed inset-0 z-40 cursor-default bg-black/10 backdrop-blur-xs transition-opacity',
          modalAddProduct.isShow
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        onClick={handleClose}
      />
      <div
        className={cn(
          'fixed top-1/2 left-1/2 z-50 max-h-[98vh] w-[350px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center overflow-y-auto bg-white p-4 backdrop-blur-md transition-all',
          modalAddProduct.isShow
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-75 opacity-0',
        )}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormImage
            label="image"
            value={selectedImage}
            onChange={handleImageChange}
          />
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormInput
                label="title"
                placeholder="Enter product title"
                {...field}
                error={form.formState.errors.title?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormInput
                label="price"
                type="number"
                placeholder="Enter price"
                {...field}
                error={form.formState.errors.price?.message}
              />
            )}
          />
          <Controller
            name="discount"
            control={form.control}
            render={({ field }) => (
              <FormInput
                label="discount"
                type="number"
                placeholder="Enter discount percentage"
                {...field}
                error={form.formState.errors.discount?.message}
              />
            )}
          />
          <Controller
            name="stock"
            control={form.control}
            render={({ field }) => (
              <FormInput
                label="stock"
                type="number"
                placeholder="Enter stock quantity"
                {...field}
                error={form.formState.errors.stock?.message}
              />
            )}
          />
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 flex-1 px-4 py-3 text-white transition-colors"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-error border-error hover:bg-error flex-1 border bg-white px-4 py-3 transition-colors hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
