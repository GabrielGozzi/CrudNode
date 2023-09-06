const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("../models/post")
const path = require("path");

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.set("views", path.join("C:/Users/Gabriel/OneDrive/Documentos/AtividadeNodeGabriel6/projeto-node/", "views"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("primeira_pagina")
})

app.get("/consulta", function (req, res) {
    post.findAll().then(function (post) {
        res.render("consulta", { post })
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})
    app.post("/cadastrar", function (req, res) {
        const nome = req.body.nome;
        const telefone = req.body.telefone;
        const origem = req.body.origem;
        const dataContato = req.body.data_contato;
        const endereco = req.body.endereco;
        const complemento = req.body.complemento;
        const observacao = req.body.observacao;

        // Validações

        if (!nome) {
            return res.status(400).send('O campo Nome é obrigatório.');
        }

        if (!/^\d+$/.test(telefone)) {
            return res.status(400).send('O campo Telefone deve conter apenas números.');
        }

        if (!origem || (origem !== 'celular' && origem !== 'whatsapp' && origem !== 'telefone_fixo')) {
            return res.status(400).send('Selecione uma opção válida para a Origem.');
        }

        if (!dataContato || !moment(dataContato, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).send('Preencha a Data do Contato no formato AAAA-MM-DD.');
        }

        if (!endereco) {
            return res.status(400).send('O campo Endereço é obrigatório.');
        }

        if (!complemento) {
            return res.status(400).send('O campo Complemento é obrigatório.');
        }

        if (!observacao) {
            return res.status(400).send('O campo Observação é obrigatório.');
        }

        post.create({
            nome: req.body.nome,
            telefone: req.body.telefone,
            origem: req.body.origem,
            data_contato: req.body.data_contato,
            endereco: req.body.endereco,
            complemento: req.body.complemento,
            observacao: req.body.observacao
        }).then(function () {
            res.redirect("/")
        }).catch(function (erro) {
            res.send("Falha ao cadastrar os dados: " + erro)
        })
    })

    app.post("/atualizar", function (req, res) {
        post.update({
            nome: req.body.nome,
            telefone: req.body.telefone,
            origem: req.body.origem,
            data_contato: req.body.data_contato,
            endereco: req.body.endereco,
            complemento: req.body.complemento,
            observacao: req.body.observacao
        }, {
            where: {
                id: req.body.id
            }
        }).then(function () {
            res.redirect("/consulta")
        })
    })

    app.get("/excluir/:id", function (req, res) {
        post.destroy({ where: { 'id': req.params.id } }).then(function () {
            res.render("primeira_pagina")
        }).catch(function (erro) {
            console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
        })
    })

    app.get("/editar/:id", function (req, res) {
            const nome = req.body.nome;
            const telefone = req.body.telefone;
            const origem = req.body.origem;
            const dataContato = req.body.data_contato;
            const endereco = req.body.endereco;
            const complemento = req.body.complemento;
            const observacao = req.body.observacao;
          
            // Validações
          
            if (!nome) {
              return res.status(400).send('O campo Nome é obrigatório.');
            }
          
            if (!/^\d+$/.test(telefone)) {
              return res.status(400).send('O campo Telefone deve conter apenas números.');
            }
          
            if (!origem || (origem !== 'celular' && origem !== 'whatsapp' && origem !== 'telefone_fixo')) {
              return res.status(400).send('Selecione uma opção válida para a Origem.');
            }
          
            if (!dataContato || !moment(dataContato, 'YYYY-MM-DD', true).isValid()) {
              return res.status(400).send('Preencha a Data do Contato no formato AAAA-MM-DD.');
            }
          
            if (!endereco) {
              return res.status(400).send('O campo Endereço é obrigatório.');
            }
          
            if (!complemento) {
              return res.status(400).send('O campo Complemento é obrigatório.');
            }
          
            if (!observacao) {
              return res.status(400).send('O campo Observação é obrigatório.');
            }




        post.findAll({ where: { 'id': req.params.id } }).then(function (post) {
            res.render("editar", { post })
        }).catch(function (erro) {
            console.log("Erro ao carregar dados do banco: " + erro)
        })
    })
    app.listen(8081, function () {
        console.log("Servidor ativo!")
    })

    

