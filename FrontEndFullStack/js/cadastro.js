console.log("cadastro.js funcionando");

const API = "http://localhost:3000/pessoas";
const formulario = document.getElementById("formCadastro");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);

    // Validação dos dados digitados
    if (!nome || !Number.isInteger(idade) || idade < 0 || idade >= 130) {
        mensagem.textContent = "Informe um nome e uma idade válida";
        return;
    }

    try {
        mensagem.textContent = "";

        // Envio do POST
        const resposta = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, idade })
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível cadastrar a pessoa");
        }

        // Redireciona para a lista após cadastrar com sucesso
        window.location.href = "index.html";
    } catch (error) {
        mensagem.textContent = error.message;
    }
});