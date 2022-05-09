const express = require('express');
const app = express();
const router = express.Router();
const connection = require('./database/database');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//definindo EJS como minha view engine
app.set('view engine','ejs');

//definindo que arquivos estáticos ficarão na pasta public
app.use(express.static('public'));

//conexao com banco de dados
connection
    .authenticate()
    .then(() =>{
        console.log("conexao feita");
    })
    .catch((error) => {
        console.log(error);
    });



const ProcedureModel = require("./models/ProcedureModel");
const ParamsModel = require("./models/ParamsModel");

const procedureController = require("./controllers/procedureController");

app.use("/", procedureController);

app.get("/", (req, res) =>{
    ProcedureModel.findAll().then(procedures =>{
        res.render("index", {procedures:procedures});
    })

});


app.listen(process.env.PORT || 8080);