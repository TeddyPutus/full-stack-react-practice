// imports
const { Sequelize, DataTypes } = require('sequelize')

//create an instance of the database call it db
const db = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'etc/db/notemaker.sqlite',//'./notemaker.sqlite',
    logging: false
})

db.sync({ force: true }); // clear out database + tables



//export
module.exports = { db, DataTypes }