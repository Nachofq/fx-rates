import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IRate {
  pair: string;
  base: string;
  target: string;
  rate: number;
  fee?: number;
  createdAt?: Date;
}

const rateSchema = new Schema<IRate>({
  pair: String,
  base: String,
  target: String,
  rate: Number,
  fee: Number,
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("Rate", rateSchema);
