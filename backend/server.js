//Application Programming Interface
// Rest- regras para construção de APIs Escalaveis utilizando métodos
// JSON - Java Script Object Notation
import express from "express";
import Usuario from "./models/Usuario.js";
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/user", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const hash = await bcrypt.hash(senha, 10);
        const usuario = new Usuario(nome, email, hash);

        const novoUsuario = await prisma.Usuario.create({
            data: usuario
        });

        res.status(201).json(novoUsuario);

    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/user/", autenticar, async (req, res) => {
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


app.get("/user/:id", autenticar, async (req, res) => {

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


app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });



        if (!usuario) {
            return res.status(401).json({
                menssagem: "Credenciais inválidas"
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                menssagem: "Credenciais inválidas"
            });
        }

        const token = jwt.sign({
            id: usuario.id,
            email: usuario.email
        },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.json({ token });
    } catch (err) {
        return res.status(500).json(err)
    }
});

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            messagem: "Token não enviado"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = payload;

        next();
    } catch {
        return res.status(401).json({
            menssagem: "Token inválido"
        })
    }
}


app.listen(3000, () => console.log("O servidor está rodando!! porta: 3000"));
