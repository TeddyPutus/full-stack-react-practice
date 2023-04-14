//import our db, Model, DataTypes
const { db, DataTypes } = require('../db/db.js')

//Creating a User child class from the Model parent class
const Tag = db.define("tags", {
    name: DataTypes.STRING
});

//exports
module.exports = { Tag }