let valorAcumulado = { entradas: [], saidas: [] };
let dataAtual = new Date().toLocaleDateString();
let indiceEdicao = null;

document.addEventListener('DOMContentLoaded', function() {
    saldoInicial();
});

document.getElementById('botao').addEventListener('click', function() {
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = parseFloat(document.getElementById('valor').value);
    let data = new Date().toLocaleDateString();

    let mensagemErro = validacaoCampos(tipo, descricao, valor);
    if (mensagemErro) {
        alert(mensagemErro);
        return;
    }

    if (indiceEdicao !== null) {
        salvarAlteracoes(indiceEdicao, tipo, descricao, valor, data);
    } else {
        inserirDados(tipo, descricao, valor, data);
    }

    document.getElementById('form-fluxo').reset();
});

function validacaoCampos(tipo, descricao, valor) {
    if (!tipo) {
        return "Selecione um tipo para prosseguir!!!";
    } else if (!descricao) {
        return "Descreva a entrada ou saída!!!";
    } else if (isNaN(valor) || valor <= 0) {
        return "Digite um valor válido!!!";
    }
    return null;
}

function inserirDados(tipo, descricao, valor, data) {
    let linha = `<tr>
                    <td>${data}</td>
                    <td>${descricao}</td>
                    <td>${valor.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-center btn-sm" onclick="editarLinha(this, '${tipo}')">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                    </td>
                 </tr>`;

    if (tipo === 'Entrada') {
        document.getElementById('tabela-entradas').innerHTML += linha;
        valorAcumulado.entradas.push(valor);
        atualizarTotal('entradas', valor);
    } else if (tipo === 'Saída') {
        document.getElementById('tabela-saidas').innerHTML += linha;
        valorAcumulado.saidas.push(valor);
        atualizarTotal('saidas', valor);
    }
}

function editarLinha(botao, tipo) {
    let linha = botao.parentNode.parentNode;
    let colunas = linha.getElementsByTagName('td');

    let data = colunas[0].innerText;
    let descricao = colunas[1].innerText;
    let valor = parseFloat(colunas[2].innerText);

    document.getElementById('tipo').value = tipo;
    document.getElementById('descricao').value = descricao;
    document.getElementById('valor').value = valor;
    document.getElementById('botao').innerText = "Salvar Alterações";

    indiceEdicao = { linha, tipo, valorAntigo: valor };
}

function salvarAlteracoes(indiceEdicao, tipo, descricao, valorNovo, data) {
    let linha = indiceEdicao.linha;
    let valorAntigo = indiceEdicao.valorAntigo;

    let colunas = linha.getElementsByTagName('td');

    //Atualiza a linha com novos valores
    colunas[1].innerText = descricao;
    colunas[2].innerText = valorNovo.toFixed(2);

    //Atualiza os totais
    atualizarTotalEdicao(tipo, valorAntigo, valorNovo);

    //Reseta o formulário e botão
    document.getElementById('form-fluxo').reset();
    document.getElementById('botao').innerText = "Cadastrar";
    document.getElementById('botao').onclick = function() {
        let tipo = document.getElementById('tipo').value;
        let descricao = document.getElementById('descricao').value;
        let valor = parseFloat(document.getElementById('valor').value);
        let data = new Date().toLocaleDateString();

        let mensagemErro = validacaoCampos(tipo, descricao, valor);
        if (mensagemErro) {
            alert(mensagemErro);
            return;
        }

        inserirDados(tipo, descricao, valor, data);
        document.getElementById('form-fluxo').reset();
    };

    indiceEdicao = null; //Reseta o índice de edição
}

function atualizarTotalEdicao(tipo, valorAntigo, valorNovo) {
    let totalTipo = tipo === 'Entrada' ? document.getElementById('total-entradas') : document.getElementById('total-saidas');
    let total = parseFloat(totalTipo.innerHTML) || 0;
    total = total - valorAntigo + valorNovo;
    totalTipo.innerHTML = total.toFixed(2);
}

function saldoInicial() {
    let campoSaldoInicial = document.getElementById('inicial');
    let saldoAbertura = 1000;
    campoSaldoInicial.value = saldoAbertura.toFixed(2);

    let campoSaldoFinal = document.getElementById('final');
    campoSaldoFinal.value = saldoAbertura.toFixed(2);
}

function atualizarTotal(tipo, valor) {
    let totalTipo = tipo === 'entradas' ? document.getElementById('total-entradas') : document.getElementById('total-saidas');
    let total = parseFloat(totalTipo.innerHTML) || 0;
    total += valor;
    totalTipo.innerHTML = total.toFixed(2);

    //Atualiza saldo o final
    let saldoFinal = parseFloat(document.getElementById('final').value);
    saldoFinal = tipo === 'entradas' ? saldoFinal + valor : saldoFinal - valor;
    document.getElementById('final').value = saldoFinal.toFixed(2);
}
