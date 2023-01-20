const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require("../config/db.config.js");

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["user", "admin", "moderator"];

db.url = dbConfig.URL;
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;
