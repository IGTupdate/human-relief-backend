import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    title:String,
    image:String,
    productId:String,
	userId:String,
    price:Number
});
 
const Cart = mongoose.model('cart',cartSchema);

export default Cart; 