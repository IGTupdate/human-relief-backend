import mongoose from 'mongoose';

const wishlistScema = mongoose.Schema({
    postId: { type: String, unique: true },
    userId: String,
    dateofCreation: String,
});

const Wishlist = mongoose.model('wishlist', wishlistScema);

export default Wishlist; 