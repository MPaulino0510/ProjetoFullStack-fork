
const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());

// GET - Listar pessoas
app.get("/pessoas", (req, res) => {
  conexao.query('SELECT * FROM pessoas', (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    res.json(resultado);
  });
});


 // GET - Buscar pessoa pelo ID
app.get("/pessoas/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM pessoas WHERE id = ?";

  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    if (resultado.length === 0) {
      return res.status(404).json({
        mensagem: "Pessoa não encontrada"
      });
    }

    res.json(resultado[0]);
  });
});


// POST - Cadastrar pessoa
app.post("/pessoas", (req, res) => {
  const { nome, idade } = req.body;

  const sql = "INSERT INTO pessoas (nome, idade) VALUES (?, ?)";

  conexao.query(sql, [nome, idade], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    res.status(201).json({
      mensagem: "Pessoa cadastrada!",
      id: resultado.insertId
    });
  });
});

// PUT - Atualizar pessoa
app.put("/pessoas/:id", (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;

  const sql = "UPDATE pessoas SET nome = ?, idade = ? WHERE id = ?";

  conexao.query(sql, [nome, idade, id], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Pessoa não encontrada"
      });
    }

    res.json({ mensagem: "Pessoa atualizada!" });
  });
});

// DELETE - Excluir pessoa
app.delete("/pessoas/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM pessoas WHERE id = ?";

  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Pessoa não encontrada"
      });
    }

    res.json({ mensagem: "Pessoa excluída!" });
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
