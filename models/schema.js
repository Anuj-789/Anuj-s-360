
import mongoose from "mongoose";


const shopSchema = new mongoose.Schema(
  {
    // ===== OLD FIELDS =====
    name: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    district: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["hyderabad", "rangareddy"]
    },

    area: {
      type: String,
      required: true,
      lowercase: true
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
    },

    address: {
      type: String,
      required: true
    },

    // ===== NEW FIELDS (REGISTRATION REQUIRED) =====
    shopkeeperName: {
      type: String,
      required: true,
      trim: true
    },

    whatsappNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Enter valid 10 digit WhatsApp number"]
    },

    contactNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Enter valid 10 digit contact number"]
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Enter valid email"]
    },

    password: {
      type: String,
      required: true
    },

    locationLink: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Shop", shopSchema);