const express = require("express"),
      router = express.Router(),
      {ObjectID} = require("mongodb");

const Post = require("../models/posts");

router.get("/",(req,res)=>{
    Post.find().then((posts)=>{
        res.render("index",{posts});
    }).catch((e)=>{
        console.log(e);
    });
});

/* router.get("/like/:id",(req,res)=>{
    let id = req.params.id;
    Post.findById(id).then((doc)=>{ 
        if(doc){
            return Post.findOneAndUpdate({_id:ObjectID(id),"votedBy.user_id":req.user.id},
            {$pull:{"votedBy.user_id":req.user.id},$inc:{likes:-1}});
        }else{
            return Post.findByIdAndUpdate(id,
                {$push:{"user_id":req.user.id},$inc:{likes:1}});
        }
    }).catch((e)=>{
        console.log(e);
    });
}); */

module.exports = router;