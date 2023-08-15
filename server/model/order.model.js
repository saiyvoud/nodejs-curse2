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
        category_id: {
          type: mongoose.Types.ObjectId,
          ref: "category",
          require: true,
        },
        name: String,
        detail: String,
        amount: Number,
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
    payment: {
      bill: String,
      priceTotal: Number,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
    },
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
