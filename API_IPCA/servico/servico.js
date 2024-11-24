import historicoInflacao from '../dados/dados.js';

export const procurarInf = () =>{
    return historicoInflacao;
}

export const procurarInfPorAno = (anoInf) => {
    return historicoInflacao.filter(inf => inf.ano == anoInf);
};

export const procurarInfPorId = (id) => {
    const idIPCA = parseInt(id);
    return historicoInflacao.find(i => i.id == idIPCA);
}

export const calcularReajuste = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
    const ipcaFiltrado = historicoInflacao.filter((item) => {
        const anoMes = item.ano * 12 + item.mes;
        const anoMesInicial = anoInicial * 12 + mesInicial;
        const anoMesFinal = anoFinal * 12 + mesFinal;
        return anoMes >= anoMesInicial && anoMes <= anoMesFinal;
    });

    if (ipcaFiltrado.length === 0) {
        throw new Error("Nenhum índice IPCA encontrado no período informado.");
    }

    let resultado = valor;
    ipcaFiltrado.forEach((item) => {
        resultado *= 1 + item.ipca / 100;
        console.log(resultado)
    });

    return resultado;
}