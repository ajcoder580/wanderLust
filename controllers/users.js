const User = require("../models/user");

module.exports.renderSignupForm  = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.userSingup = async (req, res, next)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WonderLust");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/login");
    }
    

};

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req, res)=>{
    req.flash("success","Welcome Back");
    res.redirect(res.locals.redirectUrl || "/listings");
 };

 module.exports.logout =  (req, res, next) =>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "You have been logged out");
        res.redirect("/listings");
    })
};