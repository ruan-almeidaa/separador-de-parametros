const Sequelize = require ("sequelize");
const connection = require("../database/database");

const ProcedureModel = require("../models/ProcedureModel");

const ParamsModel = connection.define('params',{
    idParam:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    param:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

ProcedureModel.hasMany(ParamsModel); //uma procedure tem vários parâmetros
ParamsModel.belongsTo(ProcedureModel); //um parâmetro pertence a uma procedure

ParamsModel.sync({force:false});
module.exports = ParamsModel;