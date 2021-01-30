const sequelizeConfig = require("./dist/config/sequelize.js");

const sequelizeConfigEnv =
    sequelizeConfig[process.env.NODE_ENV] || sequelizeConfig.DEFAULT;
module.exports = sequelizeConfigEnv.sequelize();