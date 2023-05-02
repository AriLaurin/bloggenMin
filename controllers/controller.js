const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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