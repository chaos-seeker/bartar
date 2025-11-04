import { TOrder } from '@/types/order';
import { Schema, models, model } from 'mongoose';

const OrderSchema = new Schema<TOrder>(
  {
    username: { type: String, required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const Order = models.Order || model<TOrder>('Order', OrderSchema);

export default Order;
