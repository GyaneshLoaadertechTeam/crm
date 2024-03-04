import mongoose, { Schema, mongo } from "mongoose";
const LedgerSchema = new Schema(
  {

    ledgerName: String,
    description: String,
    amount: String,
    transactionImage: File
  },
  { timestamps: true }
);

// const Topic = mongoose.models.Topic || mongoose.model("Topic", RoleSchema);
const Ledger = mongoose.models.Ledger || mongoose.model("Ledger", LedgerSchema);

export default Ledger;
