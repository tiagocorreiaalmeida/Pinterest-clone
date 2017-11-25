const express = require("express"),
    router = express.Router(),
    passport = require("passport");

router.get("/github",passport.authenticate("github"));
router.get("/github/callback",passport.authenticate("github",{failureRedirect:"/"}),(req,res)=>{
    res.redirect("/");
});

router.get("/twitter",passport.authenticate("twitter"));
router.get("/twitter/callback",passport.authenticate("twitter",{failureRedirect:"/"}),(req,res)=>{
    res.redirect("/");
});

router.get("/logout",(req,res)=>{
    req.logOut();
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;