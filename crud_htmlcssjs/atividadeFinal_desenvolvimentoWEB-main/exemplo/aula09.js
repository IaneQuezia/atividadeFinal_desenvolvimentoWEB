function clique(tipo) {
    if (tipo === 'aceitar') {
        alert(`O usuário clicou em aceitar`);
    } else if (tipo === 'recusar') {
        alert(`O usuário clicou em recusar`);
    } else {
        alert(`O usuário clicou em outra coisa`);
    }
}

function comprarPao() {
    const { dinheiro, quantidadeDePao } = recuperarDinheiroEQuantidadeDePao();
    const valorUnitarioDoPao = 1.99;
    const precoTotal = valorUnitarioDoPao * quantidadeDePao;
    const podeComprar = verificarSePodeComprar(dinheiro, precoTotal);
    document.getElementById('resultadoDaCompra').innerHTML = podeComprar;
}
function recuperarDinheiroEQuantidadeDePao() {
    const dinheiro = document.getElementById('dinheiro').value;
    const quantidadeDePao = document.getElementById('quantidadeDePao').value;
    return { dinheiro, quantidadeDePao };
}
function verificarSePodeComprar(dinheiro, precoTotal) {
    if (dinheiro >= precoTotal) {
        return 'Pode comprar';
    } else {
        return 'Não pode comprar';
    }
}