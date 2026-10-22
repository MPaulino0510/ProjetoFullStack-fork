# Front-End – Sistema de Gestão de Pessoas

**Atividade 08 – Consumindo o Back-End no Front-End – CRUD**

**Professor:** Vitor Lima Santana  
**Aluno(a):** [Miguel Paulino Alves Pereira]  
**Disciplina:** Programação Back-End

## 1. Objetivo

Desenvolver uma aplicação Front-End utilizando HTML, CSS e JavaScript para consumir uma API REST desenvolvida em Node.js, Express e MySQL/MariaDB.

A atividade tem como foco implementar o cadastro de pessoas utilizando o método HTTP **POST**, a função `fetch()` e o tratamento de erros com `async/await` e `try/catch`.

## 2. Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Async/Await
- Try/Catch
- Node.js e Express (Back-End)
- MySQL/MariaDB (Banco de dados)

## 3. Estrutura do projeto

```text
frontend-gestao-pessoas/
│
├── index.html
├── cadastro.html
├── editar.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── listar.js
│   ├── cadastro.js
│   └── editar.js
│
└── README.md
```

## 4. Funcionalidades

O sistema possui as seguintes operações:

| Método | Rota | Funcionalidade |
|---|---|---|
| GET | /pessoas | Listar pessoas |
| GET | /pessoas/:id | Consultar pessoa |
| POST | /pessoas | Cadastrar pessoa |
| PUT | /pessoas/:id | Atualizar pessoa |
| DELETE | /pessoas/:id | Excluir pessoa |

## 5. Implementação do POST

O aluno deverá desenvolver o arquivo `js/cadastro.js`, responsável por capturar os dados do formulário HTML e enviá-los para a API.

A implementação deverá utilizar:

- `addEventListener("submit", ...)`
- `preventDefault()`
- `async/await`
- `try/catch`
- `fetch()`
- `method: "POST"`
- `JSON.stringify()`
- Verificação de `resposta.ok`

### Exemplo da estrutura de requisição

```javascript
const resposta = await fetch(
  "http://localhost:3000/pessoas",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome,
      idade
    })
  }
);
```

O código deverá estar dentro de uma função assíncrona, com tratamento de erros utilizando `try/catch`.

O aluno também deverá validar os campos nome e idade antes de enviar os dados.

## 6. Como executar

### Back-End

1. Realizar o Fork do repositório original disponibilizado pelo professor.
2. Clonar o repositório.
3. Instalar as dependências:

```bash
npm install
```

4. Configurar a conexão com o banco de dados.
5. Iniciar a API:

```bash
npm start
```

A API estará disponível em:

`http://localhost:3000`

### Front-End

1. Abrir o projeto no Visual Studio Code.
2. Verificar se o Back-End está funcionando.
3. Executar `index.html` com o Live Server.
4. Acessar a página de cadastro.
5. Cadastrar uma pessoa.
6. Verificar se os dados foram armazenados no banco de dados.

## 7. Evidências

Adicione capturas de tela demonstrando:

**Imagem 1 – Tela de listagem**

[Inserir imagem]

**Imagem 2 – Formulário de cadastro**

[Inserir imagem]

**Imagem 3 – Cadastro funcionando**

[Inserir imagem]

**Imagem 4 – Registro inserido no banco de dados**

[Inserir imagem]

## 8. Repositórios

**Back-End (Fork):** [Inserir link]

**Front-End:** [Inserir link]

## 9. Conclusão do aluno

Explique com suas palavras:

- Como funciona a comunicação entre o Front-End e o Back-End?
Para a conversa do front com o back ser efetuada, é necessário o front ter como base a mesma porta e rota que o back, após alguns comandos, e iniciando o back com o "node (nome.js)", é só ligar um outro arquivo "nomeAleatório.js" no front, que (pode ser atraves do cors também(middleware)) liga o back com o front.
- Qual é a finalidade do método POST?
O método POST serve para literalmente postar informações (enviar).
- Por que utilizamos `async/await` e `try/catch`?
Async/await são utilizados para deixar o servidor rodando, enquanto se é consultado o banco de dados. Isso serve para o servidor fazer outras coisas ou continuar rodando enquanto o back-end procura as informações no banco de dados. O Try/catch, é quase um "tipo" de "if/else", eles servem como condicionais para oque está acontecendo no site, e não travar (expliquei mal, basicamente isso).
- Quais dificuldades você encontrou durante a atividade?
Apenas a sintaxe, é diferente, e para ser memorizada, requer mais tempo de estudo. Na teorica, entendi tudo, só falta decorar a sintaxe exata.
[Escreva sua conclusão aqui.]
Com está ínfame aula do nosso ilustre Victor, foi possível desvendar os mistérios que englobam juntar o back-end com o front-end. O mais difícil foi (definitivamente ainda é), memorizar como se escreve (sintaxe) de todo o código, a lógica por trás, definitivamente é compreensivel. 
---

## Créditos

**Professor responsável:** Vitor Lima Santana

**Desenvolvido por:** [Miguel Paulino Alves Pereira]

**Atividade 08 – Desenvolvimento Web e Consumo de APIs REST**