import mongoose from "mongoose";
import { Status } from "../service/message.js";
const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    address_id: {
      type: mongoose.Types.ObjectId,
      ref: "address",
      require: true,
    },
    books: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          require: true,
        },
        category_id: {
          type: mongoose.Types.ObjectId,
          ref: "category",
          require: true,
        },
        name: {
          type: String,
          require: true,
        },
        detail: {
          type: String,
          require: true,
        },
        amount: {
          type: Number,
          require: true,
        },
        order_price: Number,
        sale_price: Number,
        image: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],

    bill: String,
    totalPrice: Number,

    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.process,
    },
  },
  { timestapms: true }
);
const Order = mongoose.model("order", orderSchema);
export default Order;
