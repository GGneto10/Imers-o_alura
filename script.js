let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("header input");

let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json"); 
    dados = await resposta.json();
    renderizarCards(dados);
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();

    if (!termoBusca) {
        renderizarCards(dados);
        return;
    }

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar

    if (dadosParaRenderizar.length === 0) {
        cardContainer.innerHTML = `<p>Nenhum resultado encontrado para a sua busca.</p>`;
        return;
    }

    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.anoCriacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

inputBusca.addEventListener('input', iniciarBusca);
document.addEventListener('DOMContentLoaded', carregarDados);