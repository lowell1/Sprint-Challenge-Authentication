const db = require("../database/dbConfig.js");

module.exports = {
    addUser: user => {
        return db("users").insert(user);
    },    
    getUser: username => {
        return db("users").select("*").where({username: username}).first();
    }
}
