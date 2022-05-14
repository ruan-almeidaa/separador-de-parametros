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
    let versao = req.body.version;
    let params = req.body.params;

    let paramsClear = params.trim();
    let paramsArr = paramsClear.split(',');
    let paramsJson = JSON.stringify(paramsArr);

    ProcedureModel.create({
        nameProcedure: nameProcedure,
        versaoProcedure: versao,
        bancoProcedure: db
    }).then(() =>{
        res.redirect("/");
    })

    

})

module.exports = router;