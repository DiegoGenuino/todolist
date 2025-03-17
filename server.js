const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
// Middleware 
app.use(cors());
app.use(bodyParser.json());
// Rota para obter os usuários 
app.get("/tarefas", (req, res) => {
    fs.readFile("tarefas.json", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});
// Rota para adicionar um novo usuário 
app.post("/tarefas", (req, res) => {
    fs.readFile("tarefas.json", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            let users = JSON.parse(data);
            const novoUsuario = req.body;
            novoUsuario.id = users.length + 1;
            users.push(novoUsuario);
            fs.writeFile("tarefas.json", JSON.stringify(users, null, 2), err => {
                if (err) {
                    res.status(500).json({ error: "Erro ao salvar" });
                } else {
                    res.status(201).json(novoUsuario);
                }
            });
        }
    });
});

// Rota para excluir um usuário por ID 
app.delete("/tarefas/:id", (req, res) => { 
    fs.readFile("tarefas.json", (err, data) => { 
        if (err) { 
            res.status(500).json({ error: "Erro ao ler o arquivo" }); 
        } else { 
            let users = JSON.parse(data); 
            const userId = parseInt(req.params.id); 
 
            // Filtra os usuários para remover o que tem o ID informado 
            const newUsers = users.filter(user => user.id !== userId); 
 
            fs.writeFile("tarefas.json", JSON.stringify(newUsers, null, 2), err => { 
                if (err) { 
                    res.status(500).json({ error: "Erro ao salvar" }); 
                } else { 
                    res.json({ message: "Usuário removido com sucesso!" }); 
                } 
            }); 
        } 
    }); 
}); 

// Iniciar servidor 
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});