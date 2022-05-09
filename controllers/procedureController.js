const express = require("express");
const router = express.Router();

const ProcedureModel = require("../models/ProcedureModel");
const ParamsModel = require("../models/ParamsModel");

router.get("/procedure/cadastrar", (req,res) =>{
    res.render("newProcedure");
});







router.post("/procedure/cadastrando", (req,res) =>{
    let nameProcedure = req.body.nameProcedure;
    let db = req.body.db;
    let version = req.body.version;
    let params = req.body.params;
    let paramsStr = " ";

    
    
    params = params.replace(/(\r\n|\n|\r)/gm, "");
    let paramsTr = params.trim();
    
    paramsTr = paramsTr.split(',');
    res.send(paramsTr);
    
    paramsTr.forEach(param => {
        console.log(param);
        paramsStr = paramsStr + ',' + param.substring(0, param.indexOf(' '));
    });

    

})

module.exports = router;