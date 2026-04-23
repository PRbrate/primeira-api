//Application Programming Interface
// Rest- regras para construção de APIs Escalaveis utilizando métodos
// JSON - Java Script Object Notation
import express from "express";

const app = express();

app.use(express.json())


app.get('/', (req, res) => {

    res.json({ "Nome": "Paulo", "Sobrenome": "Teles" });
});

app.post('/', (req, res) => {
    const teste = req.body;
    res.json({
        sucesso: true,
        messagem: "Dados Recebidos",
        dados: teste,
    })
})

app.listen(3000, () => console.log("O servidor está rodando!! porta: 3000"));
