import mongoose, { Schema, mongo } from "mongoose";
const FaqSchema = new Schema(
  {
    question: String,
    answer: String,

  },
  { timestamps: true }
);
const Faq = mongoose.models.Faq || mongoose.model("Faq", FaqSchema);

export default Faq;
