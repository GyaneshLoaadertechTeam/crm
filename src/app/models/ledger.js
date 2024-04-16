import mongoose from 'mongoose';
const LedgerSchema = new mongoose.Schema({
    ledgerName: String,
    description: String,
    amount: String,
    transactionImage: String
});

const Ledger = mongoose.models.Ledger || mongoose.model('Ledger', LedgerSchema);
export default Ledger; // Ensure this line is there to export your model correctly
