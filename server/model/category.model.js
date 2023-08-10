import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
},{timestamps: true});

const Category = mongoose.model("category",categorySchema);
export default Category;