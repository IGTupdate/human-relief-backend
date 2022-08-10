import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    title:String,
    description:String,
    image:String,
    parent:String,
    dateofCreation:String
});

const Category = mongoose.model('category',categorySchema);

export default Category; 