import { model, Schema, Types } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    photo: { type: String, default: "https://i.postimg.cc/HxdvTwqJ/events.jpg"},
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 1 },
  },
);

export const productModel = model("products", productSchema);