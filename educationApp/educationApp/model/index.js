const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        logging: true,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.account = require("./user.model.js")(sequelize, Sequelize);
db.categorys = require("./categorys.model.js")(sequelize, Sequelize);
db.childCategorys = require("./child.categorys.model.js")(sequelize, Sequelize);
db.grammar = require("./grammar.model.js")(sequelize, Sequelize);



db.categorys.hasMany(db.childCategorys, {
    foreignKey: "ParentId"
});

db.childCategorys.hasMany(db.grammar, {
    foreignKey: "ChildCategoryID"
});


module.exports = db;