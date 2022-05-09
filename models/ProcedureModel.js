const Sequelize = require ("sequelize");
const connection = require("../database/database");

const ProcedureModel = connection.define('procedures',{
    idProcedure:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    nameProcedure:{
        type: Sequelize.STRING,
        allowNull: false
    },

    versaoProcedure:{
        type: Sequelize.STRING,
        allowNull: false
    },

    bancoProcedure:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
});

ProcedureModel.sync({force:false});
module.exports = ProcedureModel;