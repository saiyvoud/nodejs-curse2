import mongoose from "mongoose";
const bookSchema = mongoose.Schema(
  {
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
    qty: {
      type: Number,
      require: true,
    },
    order_price: {
      type: Number,
      require: true,
    },
    sale_price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Book = mongoose.model("book", bookSchema);
export default Book;
