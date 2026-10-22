# Projeto Final — API de Cadastro de Pessoas

## 1. Objetivo

Desenvolver e executar uma API REST utilizando **Node.js, Express e MySQL/MariaDB**, implementando as quatro operações básicas de um CRUD:

- **CREATE (POST):** cadastrar uma pessoa.
- **READ (GET):** consultar as pessoas cadastradas.
- **UPDATE (PUT):** atualizar os dados de uma pessoa.
- **DELETE (DELETE):** excluir uma pessoa.

O projeto utiliza uma tabela chamada `pessoas`, contendo três colunas: `id`, `nome` e `idade`.

## 2. Tecnologias utilizadas

- Node.js — ambiente de execução JavaScript.
- Express — framework para criação de APIs.
- MySQL/MariaDB — banco de dados relacional.
- MySQL2 — biblioteca de conexão com o banco.
- CORS — permite requisições de outras aplicações.
- dotenv — gerenciamento de variáveis de ambiente.
- Postman ou Insomnia — ferramentas para testar a API.

## 3. Pré-requisitos

Antes de começar, instale os seguintes programas:

1. Node.js (versão LTS): https://nodejs.org/
2. MySQL ou MariaDB: https://mariadb.org/
3. Visual Studio Code: https://code.visualstudio.com/
4. Postman: https://www.postman.com/downloads/

Para verificar se o Node.js e o npm estão instalados, abra o terminal e execute:

```bash
node -v
npm -v
```

Se aparecerem os números das versões, a instalação foi realizada corretamente.

## 4. Estrutura do projeto

A organização dos arquivos deverá ser:

```text
projeto-final/
│
├── node_modules/
│
├── .env
├── db.js
├── db.sql
├── package-lock.json
├── package.json
├── readme.md
└── server.js
```

### Função de cada arquivo

| Arquivo | Responsabilidade |
|---|---|
| `node_modules/` | Armazena as dependências instaladas |
| `.env` | Configurações do banco e da porta |
| `db.js` | Realiza a conexão com o MySQL |
| `db.sql` | Contém os comandos SQL |
| `package.json` | Informações e dependências do projeto |
| `package-lock.json` | Registra as versões das dependências |
| `readme.md` | Instruções de instalação e utilização |
| `server.js` | Contém o servidor Express e as rotas CRUD |

## 5. Preparar o projeto

Se o projeto já foi disponibilizado pelo professor, abra a pasta no Visual Studio Code.

No terminal do VS Code, execute:

```bash
npm install
```

Esse comando instala as dependências registradas no `package.json`.

Caso esteja criando o projeto do zero, execute:

```bash
mkdir projeto-final
cd projeto-final
npm init -y
npm install express mysql2 cors dotenv
```

**Atenção:** não é necessário copiar a pasta `node_modules` de outro computador. Ela será criada automaticamente após a instalação.

## 6. Configurar o banco de dados

Abra o MySQL ou MariaDB utilizando DBeaver, HeidiSQL, MySQL Workbench ou outra ferramenta de sua preferência.

Execute os comandos abaixo ou utilize o arquivo `db.sql` disponibilizado no projeto.

```sql
CREATE DATABASE IF NOT EXISTS projeto_final;

USE projeto_final;

CREATE TABLE IF NOT EXISTS pessoas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL
);

INSERT INTO pessoas (nome, idade) VALUES
('João', 20),
('Maria', 25),
('Pedro', 30);
```

Para verificar os registros:

```sql
SELECT * FROM pessoas;
```

Resultado esperado:

| id | nome | idade |
|---|---|---|
| 1 | João | 20 |
| 2 | Maria | 25 |
| 3 | Pedro | 30 |

Os identificadores podem variar conforme os registros já existentes. Evite executar os comandos `INSERT` repetidamente, pois isso duplicará os dados.

## 7. Configurar o arquivo `.env`

Na raiz do projeto, configure o arquivo `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=projeto_final
PORT=3000
```

**Importante:** a senha `root` é apenas o exemplo utilizado neste projeto. Substitua `DB_PASSWORD` pela senha configurada no seu MySQL/MariaDB.

Se o usuário do banco não possuir senha, utilize:

```env
DB_PASSWORD=
```

Não publique o arquivo `.env` em repositórios públicos.

## 8. Entendendo o arquivo `db.js`

O arquivo `db.js` é responsável por estabelecer a conexão com o banco de dados.

```javascript
require("dotenv").config();

const mysql = require("mysql2");

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexao.connect((erro) => {
  if (erro) {
    console.log("Erro na conexão:", erro);
    return;
  }

  console.log("Banco conectado!");
});

module.exports = conexao;
```

O comando `module.exports` permite utilizar a conexão em outros arquivos do projeto.

## 9. Entendendo o arquivo `server.js`

O `server.js` é o arquivo principal da API.

Ele importa as bibliotecas necessárias e a conexão configurada em `db.js`:

```javascript
const express = require("express");
const cors = require("cors");
const conexao = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
```

As rotas CRUD são definidas nesse arquivo.

Ao final, o servidor é iniciado:

```javascript
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

## 10. Executar o servidor

Certifique-se de que o serviço do MySQL/MariaDB esteja iniciado.

Abra o terminal na pasta do projeto e execute:

```bash
node server.js
```

Resultado esperado:

```text
Banco conectado!
Servidor rodando na porta 3000
```

**Atenção:** mantenha o terminal aberto enquanto estiver utilizando a API.

Para interromper o servidor, pressione `Ctrl + C`.

## 11. Testar as rotas da API

Utilize o Postman ou Insomnia para realizar os testes.

Endereço base:

```text
http://localhost:3000
```

### GET — Listar pessoas

Método: `GET`

URL:

```text
http://localhost:3000/pessoas
```

Resultado esperado:

```json
[
  {
    "id": 1,
    "nome": "João",
    "idade": 20
  },
  {
    "id": 2,
    "nome": "Maria",
    "idade": 25
  },
  {
    "id": 3,
    "nome": "Pedro",
    "idade": 30
  }
]
```

### POST — Cadastrar pessoa

Método: `POST`

URL:

```text
http://localhost:3000/pessoas
```

No Postman, selecione **Body → raw → JSON**.

Envie:

```json
{
  "nome": "Carlos",
  "idade": 22
}
```

Resultado esperado:

```json
{
  "mensagem": "Pessoa cadastrada!",
  "id": 4
}
```

O valor do ID pode variar.

### PUT — Atualizar pessoa

Método: `PUT`

URL:

```text
http://localhost:3000/pessoas/1
```

Envie:

```json
{
  "nome": "João Silva",
  "idade": 21
}
```

Resultado esperado:

```json
{
  "mensagem": "Pessoa atualizada!"
}
```

### DELETE — Excluir pessoa

Método: `DELETE`

URL:

```text
http://localhost:3000/pessoas/1
```

Resultado esperado:

```json
{
  "mensagem": "Pessoa excluída!"
}
```

## 12. Resumo das rotas

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/pessoas` | Lista todas as pessoas |
| POST | `/pessoas` | Cadastra uma pessoa |
| PUT | `/pessoas/:id` | Atualiza uma pessoa |
| DELETE | `/pessoas/:id` | Exclui uma pessoa |

## 13. Possíveis erros e soluções

**Erro: `Cannot find module 'express'`**

As dependências não foram instaladas.

Solução:

```bash
npm install
```

**Erro: `ECONNREFUSED`**

O servidor MySQL/MariaDB pode estar desligado ou configurado em outra porta.

Solução: verifique se o serviço do banco de dados está iniciado.

**Erro: `Access denied for user 'root'`**

Usuário ou senha incorretos.

Solução: verifique as credenciais no arquivo `.env`.

**Erro: `Unknown database 'projeto_final'`**

O banco de dados ainda não foi criado.

Solução: execute o arquivo `db.sql`.

**Erro: `Table 'projeto_final.pessoas' doesn't exist`**

A tabela `pessoas` não existe.

Solução: execute o comando `CREATE TABLE` disponível no arquivo `db.sql`.

**Erro: `EADDRINUSE: address already in use :::3000`**

A porta 3000 já está sendo utilizada.

Solução: finalize o processo que está utilizando essa porta ou altere o valor de `PORT` no `.env`.

Após modificar o `.env`, reinicie o servidor.

## 14. Atividade prática para os alunos

Após executar o projeto, realize as seguintes tarefas:

1. Execute o banco de dados e verifique os registros existentes.
2. Inicie o servidor Node.js.
3. Utilize o GET para listar todas as pessoas.
4. Utilize o POST para cadastrar três novas pessoas.
5. Utilize o PUT para atualizar o nome e a idade de uma pessoa.
6. Utilize o DELETE para excluir uma pessoa.
7. Execute novamente o GET para conferir os resultados.

### Entrega

Organize um relatório em PDF contendo:

- Print do servidor em execução.
- Print do GET funcionando.
- Print do POST cadastrando uma pessoa.
- Print do PUT atualizando uma pessoa.
- Print do DELETE excluindo uma pessoa.
- Print da tabela atualizada no banco de dados.

## 15. Considerações finais

Ao concluir esta atividade, o aluno deverá compreender:

- A estrutura básica de um projeto Node.js.
- O funcionamento do framework Express.
- A conexão entre Node.js e MySQL/MariaDB.
- A utilização de variáveis de ambiente.
- A implementação das operações CRUD.
- O funcionamento dos métodos HTTP.
- A utilização do Postman ou Insomnia para testar uma API REST.

**Bom desenvolvimento e bons estudos!**