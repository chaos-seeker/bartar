import { useModal } from '@/hooks/modal';
import { cn } from '@/utils/cn';

export const ModalAddProduct = () => {
  const modalAddProduct = useModal('add-product');
  const handleClose = () => {
    modalAddProduct.hide();
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
          'fixed top-1/2 w-[350px] left-1/2 z-50 lg:w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center bg-white p-4 backdrop-blur-md transition-all',
          modalAddProduct.isShow
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-75 opacity-0',
        )}
      >
        <p>hello world</p>
      </div>
    </>
  );
};
