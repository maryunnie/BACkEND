import historicoInflacao from '../dados/dados.js';


export const buscarIPCAPorAno = (ano) => {
    const anoIPCA = parseInt(ano);
    return historicoInflacao.filter(ipca => ipca.ano === anoIPCA);
};

export const buscarIPCAPorid = (id) => {
    const idIPCA = parseInt(id);
    return historicoInflacao.find(i => i.id == idIPCA);
}


export const calcularReajuste = (valor, mesInicial, anoInicial, mesFinal, anoFinal, ipcaData) => {
    const gerarChavesPeriodo = (mesInicial, anoInicial, mesFinal, anoFinal) => {
        const periodo = [];
        let ano = parseInt(anoInicial);
        let mes = parseInt(mesInicial);

        while (ano < parseInt(anoFinal) || (ano === parseInt(anoFinal) && mes <= parseInt(mesFinal))) {
            periodo.push(`${ano}-${String(mes).padStart(2, '0')}`);
            mes++;
            if (mes > 12) {
                mes = 1;
                ano++;
            }
        }
        return periodo;
    };


    const periodoChaves = gerarChavesPeriodo(mesInicial, anoInicial, mesFinal, anoFinal);


    let resultado = parseFloat(valor);
    const ipcaAplicados = [];

    for (const chave of periodoChaves) {
        const ipca = ipcaData[chave];
        if (ipca === undefined) {
            throw new Error(`Dados de IPCA não encontrados para o período: ${chave}`);
        }
        resultado *= 1 + ipca / 100;
        ipcaAplicados.push({ chave, ipca });
    }

    return {
        valorInicial: parseFloat(valor),
        periodo: { mesInicial, anoInicial, mesFinal, anoFinal },
        ipcaAplicados,
        valorReajustado: resultado.toFixed(2),
    };
};