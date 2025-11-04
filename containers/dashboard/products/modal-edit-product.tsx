'use client';

import { useModal } from '@/hooks/modal';
import { cn } from '@/utils/cn';
import { FormInput } from '@/components/form-input';
import { FormImage } from '@/components/form-image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { updateProduct } from '@/actions/dashboard/products/update-product';
import { getProduct } from '@/actions/dashboard/products/get-product';
import { toast } from 'react-hot-toast';
import { Loading } from '@/components/loading';
import { useQueryState } from 'nuqs';
import { Edit } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const productSchema = z.object({
  image: z.instanceof(File).optional().or(z.string()),
  title: z.string().min(1, 'title is required'),
  price: z.string().min(1, 'price is required'),
  discount: z.string().optional(),
  stock: z.string().min(1, 'stock is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export const ModalEditProduct = () => {
  const modalEditProduct = useModal('edit-product');
  const [productId, setProductId] = useQueryState('productId');
  const queryClient = useQueryClient();
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: '',
      discount: '',
      stock: '',
    },
  });
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId!),
    enabled: !!productId && modalEditProduct.isShow,
  });
  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title || '',
        price: String(product.price || ''),
        discount: product.discount ? String(product.discount) : '',
        stock: String(product.stock || ''),
        image: product.image || '',
      });
    }
  }, [product, form]);
  const updateProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      let imageBase64: string | null = null;
      if (data.image instanceof File) {
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data.image as File);
        });
      } else if (typeof data.image === 'string') {
        imageBase64 = data.image;
      }
      return updateProduct(productId!, {
        title: data.title,
        price: data.price,
        discount: data.discount,
        stock: data.stock,
        image: imageBase64,
      });
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update product');
    },
  });
  const handleClose = () => {
    modalEditProduct.hide();
    form.reset();
    setProductId(null);
  };
  const handleImageChange = (file: File | null) => {
    if (file) {
      form.setValue('image', file);
    }
  };
  const onSubmit = async (data: ProductFormData) => {
    if (!productId) {
      toast.error('Product ID is missing');
      return;
    }
    updateProductMutation.mutate(data);
  };
  const currentImage = form.watch('image');

  return (
    <>
      <button
        type="button"
        className={cn(
          'fixed inset-0 z-40 cursor-default bg-black/10 backdrop-blur-xs transition-opacity',
          modalEditProduct.isShow
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        onClick={handleClose}
      />
      <div
        className={cn(
          'fixed top-1/2 left-1/2 z-50 max-h-[98vh] w-[350px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center overflow-y-auto bg-white p-4 backdrop-blur-md transition-all',
          modalEditProduct.isShow
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-75 opacity-0',
        )}
      >
        {isLoading ? (
          <div className={cn('flex items-center justify-center p-8')}>
            <Loading />
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('flex flex-col gap-4')}
          >
            <FormImage
              label="image"
              value={currentImage instanceof File ? currentImage : null}
              onChange={handleImageChange}
              existingImage={
                typeof currentImage === 'string' ? currentImage : undefined
              }
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
            <div className={cn('mt-4 flex gap-3')}>
              <button
                type="submit"
                disabled={updateProductMutation.isPending}
                className={cn(
                  'bg-primary hover:bg-primary/90 flex-1 px-4 py-3 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                )}
              >
                {updateProductMutation.isPending ? (
                  <Loading className={cn('[&_span]:bg-white')} />
                ) : (
                  'update product'
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={updateProductMutation.isPending}
                className={cn(
                  'text-error border-error hover:bg-error flex-1 border bg-white px-4 py-3 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50',
                )}
              >
                cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
