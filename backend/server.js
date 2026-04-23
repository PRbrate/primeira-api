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

app.get("/user", async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();

        res.status(201).json(usuarios);
    } catch (err) {
        res.status(500).json(err);
    }
})

app.listen(3000, () => console.log("O servidor está rodando!! porta: 3000"));
