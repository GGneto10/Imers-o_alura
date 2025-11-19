let dados = [];

async function iniciarBusca() {
    let resposta = awaitfetch("data.json"); 
    dados = await resposta.json();
    console.log(resposta);

}