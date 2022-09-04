import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema({
    title:String,
    userId:String,
	  price:String,
    item:Array,
    status:String,
    dateOfCreation:String,
});
 
const Transaction = mongoose.model('transaction',TransactionSchema);

export default Transaction; 