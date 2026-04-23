//Application Programming Interface
// Rest- regras para construção de APIs Escalaveis utilizando métodos
// JSON - Java Script Object Notation
import express from "express";
import Usuario from "./models/Usuario.js";
import { PrismaClient } from '@prisma/client'


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/user", async (req, res) => {
    try {
        const usuario = new Usuario(req.body.nome, req.body.email, req.body.senha);
        const novoUsuario = await prisma.Usuario.create({
            data: usuario
        });
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/user/", async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await prisma.usuario.findMany({
        });

        if (usuario.length === 0) {
            return res.status(404).json({
                messagem: "Usuários não encontrados"
            })
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json(err);
    }
});


app.get("/user/:id", async (req, res) => {

    try {
        const id = Number(req.params.id);
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });


        if (!usuario) {
            return res.status(404).json({
                messagem: "Usuário não encontrado"
            })
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json(err);
    }
});



app.listen(3000, () => console.log("O servidor está rodando!! porta: 3000"));
