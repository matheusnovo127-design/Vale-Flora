let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function addCarrinho(nome, preco) {
    let itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.qtd += 1;
    } else {
        carrinho.push({ nome, preco, qtd: 1 });
    }

    salvarCarrinho();
    alert("Adicionado ao carrinho!");
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    carregarCarrinho();
}

function alterarQtd(index, delta) {
    carrinho[index].qtd += delta;

    if (carrinho[index].qtd <= 0) {
        removerItem(index);
    } else {
        salvarCarrinho();
        carregarCarrinho();
    }
}

function carregarCarrinho() {
    let lista = document.getElementById("lista");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${item.nome} - R$ ${item.preco} x ${item.qtd}
            <button onclick="alterarQtd(${index}, 1)">+</button>
            <button onclick="alterarQtd(${index}, -1)">-</button>
            <button onclick="removerItem(${index})">Remover</button>
        `;

        lista.appendChild(li);
        total += item.preco * item.qtd;
    });

    document.getElementById("total").innerText = "Total: R$ " + total;
}

function finalizar() {
    let mensagem = "Olá, quero comprar:\n";

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (x${item.qtd})\n`;
    });

    window.open(`https://wa.me/551239525327?text=${encodeURIComponent(mensagem)}`);

    // limpar carrinho
    carrinho = [];
    localStorage.removeItem("carrinho");

    carregarCarrinho();
}

if (document.getElementById("lista")) {
    carregarCarrinho();
}