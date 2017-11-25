const express = require("express"),
    router = express.Router();

const User = require("../models/user"),
      Post = require("../models/posts"),
      authenticated = require("../middleware/auth");

router.get("/posts",authenticated,(req,res)=>{
    Post.find({user_id:req.user.id}).then((posts)=>{
        res.render("posts",{posts});
    }).catch((e)=>{
        console.log(e);
    })
});

router.post("/addpost",authenticated,(req,res)=>{
    //validate image url missing
    let image_url = req.body.link.trim();
    let description = req.body.description.trim();
    if(image_url && description){
        Post.create({user_id:req.user.id,user_name:req.user.username,image_url,description}).then((doc)=>{
            if(doc){
                res.redirect("posts");
            }
        }).catch((e)=>{
            console.log(e);
        });
    }
});

module.exports = router;

