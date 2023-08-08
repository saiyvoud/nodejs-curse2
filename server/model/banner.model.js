import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    detail: {
      type: String,
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
  { timestapms: true }
);

const Banner = mongoose.model("banner", bannerSchema);
export default Banner;
