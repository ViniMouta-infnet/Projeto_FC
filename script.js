function validacaoTipo(tipo) {
    if (tipo === null) {
        return "Selecione um tipo para prosseguir!!!"
    }
    else if (descricao === null) {
        return "Descreva a entrada ou saída!!!"
    } else if (valor === null || valor === 0) {
        return "Digite um valor válido!!!"
    }
}


