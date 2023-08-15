import mongoose from "mongoose";
const addressSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    phone: {
     type: Number,
     require: true,
    },
    village: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    latitude: {
      type: String,
      require: true,
    },
    longitude: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);
const Address = mongoose.model("address", addressSchema);
export default Address;
