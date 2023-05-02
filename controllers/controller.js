const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.home_get = async (req,res) => {
    res.render("home")
}

module.exports.create_get = async (req,res) => {
    res.render("create")
}

module.exports.create_post = async (req,res) => {
    const {title, content, author} = req.body;

try {
    const product = await Blog.create({title, content, author});
    res.status(201);
    console.log("blog created");
}
catch(err){
    res.status(400)
}
}