import mongoose from "mongoose";
const favoriteSchema = mongoose.Schema(
  {
    like: {
      type: Boolean,
      default: false,
    },
    share: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    book_id: {
      type: mongoose.Types.ObjectId,
      ref: "book",
      require: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Favorite = mongoose.model("favorite", favoriteSchema);
export default Favorite;
