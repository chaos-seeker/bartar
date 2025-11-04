import { ListProducts } from '@/containers/routes/dashboard/products/list-products';
import { ModalEditProduct } from '@/containers/routes/dashboard/products/modal-edit-product';
import { ModalAddProduct } from '@/containers/routes/dashboard/products/modal-add-product';

export default function Page() {
  return (
    <>
      <ListProducts />
      <ModalEditProduct />
      <ModalAddProduct />
    </>
  );
}
