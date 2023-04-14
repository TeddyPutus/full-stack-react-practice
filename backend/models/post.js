//import our db, Model, DataTypes
const { db, DataTypes } = require('../db/db.js')

//Creating a User child class from the Model parent class
const Post = db.define("posts", {
    content: DataTypes.STRING,
    author: DataTypes.STRING
});

//exports
module.exports = { Post }