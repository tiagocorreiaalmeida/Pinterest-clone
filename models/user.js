const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    oauthID:{
        type:String
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    socialNetwork:{
        type: String,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    }
});

const User = mongoose.model("User",UserSchema);
module.exports = User; 