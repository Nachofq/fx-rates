import mongoose from "mongoose";

const { Schema } = mongoose;

const rateSchema = new Schema({
  pair: String,
  base: String,
  target: String,
  rate: Number,
  fee: Number,
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("Rate", rateSchema);
