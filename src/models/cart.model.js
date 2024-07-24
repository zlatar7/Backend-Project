import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema({
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    }
})

export const cartModel = model("carts", cartSchema);