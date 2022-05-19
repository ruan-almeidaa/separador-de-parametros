const express = require("express");
const router = express.Router();

const ProcedureModel = require("../models/ProcedureModel");
const ParamsModel = require("../models/ParamsModel");

router.get("/procedure/cadastrar", (req,res) =>{
    res.render("newProcedure");
});

router.get("/procedure/separar-parametros/:id", (req, res) =>{
    let idProcedure = req.params.id;

    if(isNaN(idProcedure)){
        res.redirect("/");
    }else{
        ProcedureModel.findByPk(idProcedure).then(procedure =>{
            if(procedure != undefined){
                res.render("separarParams", {procedure:procedure});
            }else{
                res.redirect("/");
            }
        })
    }
});

router.post("/procedure/exec", (req,res) =>{

    let idProcedure = parseInt(req.body.idProcedure);
    let params = new String(req.body.params);

    let paramsClear = params.trim();
    let paramsRecebidosArr = paramsClear.split(',');

    if(isNaN(idProcedure)){
        res.redirect("/");
    }else{
        ProcedureModel.findByPk(idProcedure).then(procedure =>{
            if(procedure != undefined){
                ParamsModel.findAll({
                    where:{
                        procedureIdProcedure: idProcedure
                    },
                    attributes:['param']
                }).then( paramsCadastradosObj =>{

                    let paramsCadastradosArr = JSON.parse(JSON.stringify(paramsCadastradosObj));

                    res.render("paramsSeparados",{procedure:procedure, paramsCadastradosArr:paramsCadastradosArr, paramsRecebidosArr:paramsRecebidosArr});
                })
            }else{
                res.redirect("/");
            }
        })
    }
});


router.post("/procedure/cadastrando", (req,res) =>{
    let nameProcedure = req.body.nameProcedure;
    let db = req.body.db;
    let versao = req.body.version;
    let params = req.body.params;

    let paramsClear = params.trim();
    let paramsArr = paramsClear.split(',');

    ProcedureModel.create({
        nameProcedure: nameProcedure,
        versaoProcedure: versao,
        bancoProcedure: db
    }).then( result =>{

        let idProcedureCriada = parseInt(result.idProcedure);

        for(var i = 0; i< paramsArr.length; i++){
            ParamsModel.create({
                param: paramsArr[i],
                procedureIdProcedure: idProcedureCriada

            })
        }

        res.redirect("/");
    })
});

module.exports = router;