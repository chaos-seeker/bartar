import { ListProducts } from '@/containers/dashboard/products/list-products';
import { ModalEditProduct } from '@/containers/dashboard/products/modal-edit-product';
import { ModalAddProduct } from '@/containers/dashboard/products/modal-add-product';

export default function Page() {
  return (
    <>
      <ListProducts />
      <ModalEditProduct />
      <ModalAddProduct />
    </>
  );
}
