    const mongoose=require('mongoose');

    const BlogPostSchema= new mongoose.Schema({
        title:{
            type: String,
        required:true
        },
        content:{
            type: String,
            required: true
        },
        pdate:{
            type: Date,
            required:true
        },
        author: {
            type: String,
            required: true
        }
    })


    module.exports = mongoose.model('Blog', BlogPostSchema)