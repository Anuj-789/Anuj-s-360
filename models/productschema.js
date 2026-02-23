import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: [
        "grocery",
        "fruits",
        "bakery",
        "electronics",
        "garments",
        "stationery"
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
