const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types ;


const postSchema = new mongoose.Schema({
    title: {type: String , required: true},
    description: {type: String},
    imageUrl: {type: String},
    userId: {type: ObjectId ,  ref: 'users'} /* FK user table refrence de rha hu */
} , {
    timestamps : true
});

const postModel =  mongoose.model('posts' , postSchema);

module.exports.Post = postModel;