const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    user_name:{
        type:String,
        required:true
    },
    image_url:{
        type: String,
        required: true,
        trim:true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    likes:{
        type: Number,
        default: 0
    },
    votedBy:{
        type: Array,
        default: []
    }
});

const Post = mongoose.model("Post",PostSchema);
module.exports = Post;