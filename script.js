// Elementos da página de Linguagens
let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector(".search-container input");

// Elementos da página Exemplos
const exemplosContainer = document.querySelector('.exemplos-container');

// Elementos de Navegação
const tabLinguagens = document.getElementById('tab-linguagens');
const tabExemplos = document.getElementById('tab-exemplos');
const pageLinguagens = document.getElementById('page-linguagens');
const pageExemplos = document.getElementById('page-exemplos');
const searchContainer = document.querySelector('.search-container');

let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
    renderizarExemplos();
}

function iniciarBusca() {
    if (!inputBusca) return;
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
    if (!cardContainer) return;
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar

    if (dadosParaRenderizar.length === 0 && inputBusca.value) {
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

function renderizarExemplos() {
    if (!exemplosContainer) return;
    exemplosContainer.innerHTML = '';

    for (const dado of dados) {
        const divExemplo = document.createElement('div');
        divExemplo.className = 'exemplo-codigo';
        divExemplo.innerHTML = `
            <h3>${dado.nome}</h3>
            <pre><code>${dado.helloWorld.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
        `;
        exemplosContainer.appendChild(divExemplo);
    }
}

function alternarAbas(abaAtiva) {
    if (abaAtiva === 'linguagens') {
        pageLinguagens.classList.add('active');
        pageExemplos.classList.remove('active');
        tabLinguagens.classList.add('active');
        tabExemplos.classList.remove('active');
        searchContainer.style.display = 'flex';
    } else {
        pageLinguagens.classList.remove('active');
        pageExemplos.classList.add('active');
        tabLinguagens.classList.remove('active');
        tabExemplos.classList.add('active');
        searchContainer.style.display = 'none';
    }
}

inputBusca?.addEventListener('input', iniciarBusca);
tabLinguagens?.addEventListener('click', () => alternarAbas('linguagens'));
tabExemplos?.addEventListener('click', () => alternarAbas('exemplos'));
document.addEventListener('DOMContentLoaded', carregarDados);