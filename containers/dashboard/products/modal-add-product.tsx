'use client';

import { useModal } from '@/hooks/modal';
import { cn } from '@/utils/cn';
import { FormInput } from '@/components/form-input';
import { FormImage } from '@/components/form-image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { addProduct } from '@/actions/dashboard/products/add-product';
import { toast } from 'react-hot-toast';
import { Loading } from '@/components/loading';

const productSchema = z.object({
  image: z.instanceof(File, { message: 'image is required' }),
  title: z.string().min(1, 'title is required'),
  price: z.string().min(1, 'price is required'),
  discount: z.string().optional(),
  stock: z.string().min(1, 'stock is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export const ModalAddProduct = () => {
  const modalAddProduct = useModal('add-product');
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(false);
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  const handleClose = () => {
    modalAddProduct.hide();
    form.reset();
  };
  const handleImageChange = (file: File | null) => {
    if (!file) return;
    form.setValue('image', file!);
  };
  const onSubmit = async (data: ProductFormData) => {
    setIsDisabledSubmitBtn(true);
    try {
      let imageBase64: string | null = null;
      if (data.image) {
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data.image);
        });
      }
      const response = await addProduct({
        _id: '',
        title: data.title,
        price: data.price,
        discount: data.discount,
        stock: data.stock,
        image: imageBase64,
      });
      toast.success(response.message);
      handleClose();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsDisabledSubmitBtn(false);
    }
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormImage
            label="image"
            value={form.watch('image')}
            onChange={handleImageChange}
          />
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormInput
                label="title"
                placeholder="enter product title"
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
                placeholder="enter price"
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
                placeholder="enter discount percentage"
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
                placeholder="enter stock quantity"
                {...field}
                error={form.formState.errors.stock?.message}
              />
            )}
          />
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              disabled={isDisabledSubmitBtn}
              className="bg-primary hover:bg-primary/90 flex-1 px-4 py-3 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDisabledSubmitBtn ? (
                <Loading className="[&_span]:bg-white" />
              ) : (
                'add product'
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isDisabledSubmitBtn}
              className="text-error border-error hover:bg-error flex-1 border bg-white px-4 py-3 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
