const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: "", password: ""};

    //incorrect email
    if(err.message === "incorrect email"){
        errors.email = "that email is not registered";
    }

        //incorrect password
        if(err.message === "incorrect password"){
            errors.password = "that password is not valid";
        }

    //duplicate error code
    if (err.code === 11000){
        errors.email = "that email is already registered";
        return errors;
    }

    //validation errors
    if(err.message.includes("user validation failed")){
                                        //destructuring the errors object, so we dont need to write .properties on error code
        Object.values(err.errors).forEach(({properties}) => {//errors object inside err value
            errors[properties.path] = properties.message; //upadting the error message with proper text
        });
    }

    return errors; 
}

const maxAge = 3 * 24 * 60 * 60; //three days in seconds

                    //id is the value we get from when we create a user, check the db where you can see that every user has an ID
const createToken = (id) => {
    return jwt.sign({id}, "gnome secret", { // first para is our id property which is our payload, second para is our secret, our key that we can never share, third para is options
        expiresIn: maxAge
    }); 
}

module.exports.signup_get = (req,res) => { //a function that renders our routes from AuthRoutes
    res.render("signup");
}

module.exports.signup_post = async(req,res) => { //a function that renders our routes from AuthRoutes
    const {email, password} = req.body;

    try { //try todo something
            //create a local user and save in database
        const user = await User.create({email, password}); //async task
                // turn this into async with await so user variable gets created with actual information
        const token = createToken(user._id); //creates a token and returns it so we can have it stored here
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000}); //value name, actual value and options
        res.status(201).json({user: user._id}); //success code, send back the user object

    } //if it fails, do this
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors }); //we send now the errors object that we wrote above in "handle errors" area
    }
}



module.exports.home_get = async (req,res) => {
    const getDB = await Blog.aggregate([
        {
          '$sort': {
            'createdAt': -1
          }
        }, {
            '$limit': 10
          }
      ]);
    res.render("home", {blogresult: getDB})
}

module.exports.create_get = async (req,res) => {

    res.render("create")
}

module.exports.create_post = async (req,res) => {
    const {title, content, author} = req.body;

try {
    const product = await Blog.create({title, content, author});
    res.status(201);
    console.log("blog created:", product);
}
catch(err){
    res.status(400)
}
}