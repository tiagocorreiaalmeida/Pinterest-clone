"use strict"
const express = require("express"),
    router = express.Router(),
    { ObjectID } = require("mongodb");

const Post = require("../models/posts"),
    authenticated = require("../middleware/auth");

router.get("", (req, res) => {
    Post.find().then((posts) => {
        res.render("index", { posts });
    }).catch((e) => {
        console.log(e);
    });
});

router.get("/like/:id", authenticated, (req, res) => {
    let id = req.params.id;
    let change = 0;
    if (ObjectID.isValid(id)) {
        Post.findById(id).then((doc) => {
            if (doc) {
                return Post.findOne({ _id: ObjectID(id), "votedBy": req.user.id });
            }
        }).then((userAllreadyVoted) => {
            if (userAllreadyVoted) {
                return Post.findOneAndUpdate({ _id: ObjectID(id), "votedBy": req.user.id },
                    { $pull: { votedBy: req.user.id }, $inc: { likes: -1 } }, { new: true });
                change--;
            } else {
                change++;
                return Post.findByIdAndUpdate(id,
                    { $push: { votedBy: req.user.id }, $inc: { likes: 1 } }, { new: true });
            }
        }).then((postUpdated) => {
            if (postUpdated) {
                res.send(JSON.stringify({ change: postUpdated.likes }));
            }
        }).catch((e) => {
            console.log(e);
        });
    }
});

router.get("/user/:id", (req, res) => {
    let id = req.params.id;
    Post.find({ user_id: id }).then((posts) => {
        if (posts) {
            res.render("userposts", { posts });
        }else{
            res.redirect("/");
        }
    }).catch((e)=>{
        console.log(e);
    })
});

module.exports = router;