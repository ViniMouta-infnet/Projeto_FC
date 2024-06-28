let valorAcumulado = {entradas:[], saidas:[]}

document.getElementById('botao').addEventListener('click', function(){
        
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
    

    document.getElementById('form-fluxo').reset();
});


function validacaoCampos(tipo, descricao, valor) {
    if (!tipo) {
        return "Selecione um tipo para prosseguir!!!"
    }
    else if (!descricao) {
        return "Descreva a entrada ou saída!!!"
    } else if (isNaN(valor) || valor <= 0) {
        return "Digite um valor válido!!!"
    }
    return null;
}


function inserirDados(tipo, descricao, valor, data) {
    let linha = `<tr>
                    <td>${data}</td>
                    <td>${descricao}</td>
                    <td>${valor.toFixed(2)}</td>
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

function atualizarTotal(tipo, valor){
    let totalTipo = tipo === 'entradas' ? document.getElementById('total-entradas') : document.getElementById('total-saidas');
    let total = parseFloat(totalTipo.innerHTML) || 0;
        total += valor; 
        totalTipo.innerHTML = total.toFixed(2);
}


