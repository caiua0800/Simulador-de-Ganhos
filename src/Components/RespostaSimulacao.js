import React, { useState } from "react";

export default function RespostaSimulacao(props) {
  const { combinacoesUnitarias, combinations, frete } = props;
  const [mostrarValores, setMostrarValores] = useState(false);
  const [oculto, setOculto] = useState('VER')

  let combinacao_final = [];

  if (combinations[0] !== null && combinations[0] !== undefined) {
    for (let ix = 0; ix < combinations.length; ix++) {
      combinacao_final[ix] = {
        produtos: [],
        valor_total: [],
        custo_total: [],
        lucro_total: [],
        valor_unitario: [],
        custo_unitario: [],
        Qtdes: [],
        Volume: [],
        Peso: [],
        Peso_carga: 0,
        Volume_carga: 0,
        CustoLote: 0,
        VendaLote: 0,
        LucroLote: 0,
      };

      combinations[ix].forEach((e) => {
        if (e.nome) {
          combinacao_final[ix].produtos.push(e.nome);
          combinacao_final[ix].valor_total.push(e.valor_total);
          combinacao_final[ix].custo_total.push(e.custo_total);
          combinacao_final[ix].lucro_total.push(e.lucro_total);
          combinacao_final[ix].valor_unitario.push(e.valor_unitario);
          combinacao_final[ix].custo_unitario.push(e.custo_unitario);
          combinacao_final[ix].Qtdes.push(e.qtde);
          combinacao_final[ix].Volume.push(e.volume_total);
          combinacao_final[ix].Peso.push(e.peso_total);
          combinacao_final[ix].Peso_carga += e.peso_total;
          combinacao_final[ix].Volume_carga += e.volume_total;
          combinacao_final[ix].CustoLote += e.custo_total;
          combinacao_final[ix].VendaLote += e.valor_total;
          combinacao_final[ix].LucroLote += e.valor_total - e.custo_total;
        }
      });
    }
  }

  // Ordenar as combinações unitárias pelo menor custo total
  combinacoesUnitarias.sort(
    (a, b) => a.custoUnitario * a.qtde - b.custoUnitario * b.qtde
  );

  const toggleMostrarValores = () => {
    setMostrarValores((prevState) => !prevState);

    if(oculto === 'VER')
      setOculto('ESCONDER')
    else
      setOculto('VER')
  };

  return (
    <div className="RespostaSimulacao">
      <div className="RespostaSimulacaoHeader">
        <img
          className="moneyIcon"
          src="https://static.vecteezy.com/system/resources/previews/011/660/689/original/3d-money-icon-illustration-png.png"
          alt="Ícone de dinheiro"
        />
        <h1 className="SimulacoesTitle">SIMULAÇÕES</h1>
        <img
          className="moneyIcon"
          src="https://static.vecteezy.com/system/resources/previews/011/660/689/original/3d-money-icon-illustration-png.png"
          alt="Ícone de dinheiro"
        />
      </div>
      <span className="ver-valores-btn" onClick={toggleMostrarValores}>
        {oculto}
      </span>

      {combinacoesUnitarias.map((produto, produtoIndex) => (
        <div className="combinacao" key={produtoIndex}>
          <div className="produto-da-combinacao">
            <h3>
              {produto.nome} - {produto.qtde.toLocaleString()} unidades
            </h3>
            <h4>
              Valor Custo: R${produto.custoUnitario.toFixed(2).toLocaleString()}
            </h4>
            <h4 className={mostrarValores ? "" : "ocultar"}>
              Valor Venda: R${produto.vendaUnitario.toFixed(2).toLocaleString()}
            </h4>
            <h4>Volume: {produto.volume.toFixed(2).toLocaleString()}m³</h4>
            <div className="valores">
              <div className="div-flex">
                <h3 className="custo">
                  CUSTO TOTAL: R${(produto.custoUnitario * produto.qtde).toFixed(2).toLocaleString()}
                </h3>
                <h3 className={mostrarValores ? "" : "ocultar"}>
                  LUCRO TOTAL: R${(produto.lucroUnitario * produto.qtde).toFixed(2).toLocaleString()}
                </h3>
              </div>
              <div className="div-flex">
                <h4>VOLUME: {produto.volume.toFixed(2).toLocaleString()}m³</h4>
                <h4>PESO: {produto.peso.toFixed(2).toLocaleString()}Kg</h4>
              </div>
            </div>
          </div>
        </div>
      ))}

      {combinacao_final
        .sort((a, b) => a.CustoLote - b.CustoLote)
        .map((comb, index) => (
          <div className="combinacao-2" key={index}>
            <div className="produtos_das_combinacoes">
              <div className="nome-dos-produtos">
                <h4>PRODUTOS</h4>
                {comb.produtos.map((produto, produtoIndex) => (
                  <div className="prod-name" key={produtoIndex}>
                    <p>{produto}</p>
                  </div>
                ))}
              </div>
              <div className="qtde-dos-produtos">
                <h4>QTDE</h4>
                {comb.Qtdes.map((Qtdes, produtoIndex) => (
                  <div className="prod-name" key={produtoIndex}>
                    <p>{Qtdes}</p>
                  </div>
                ))}
              </div>
              <div className="valores-unitarios">
                <h4>CUSTO UNI.</h4>
                {comb.custo_unitario.map((valor, produtoIndex) => (
                  <div className="prod-name" key={produtoIndex}>
                    <p>{valor}</p>
                  </div>
                ))}
              </div>
              <div className="valores-unitarios">
                <h4>VENDA UNI.</h4>
                {comb.valor_unitario.map((valor, produtoIndex) => (
                  <div className={`prod-name ${mostrarValores ? "" : "ocultar"}`} key={produtoIndex}>
                    <p>{valor}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="valores_geral">
              <div className="div-valores-gerais lucro-geral">
                <p className="title-p">LUCRO:</p>
                <p className={mostrarValores ? "" : "ocultar"}>
                  R${(comb.VendaLote - comb.CustoLote).toFixed(2)}
                </p>
              </div>
              <div className="div-valores-gerais custo-geral">
                <p className="title-p">CUSTO:</p>
                <p>R${comb.CustoLote.toFixed(2)}</p>
              </div>
              <div className="div-valores-gerais venda-geral">
                <p className={`title-p ${mostrarValores ? "" : "ocultar"}`}>VENDA:</p>
                <p className={mostrarValores ? "" : "ocultar"}>
                  R${comb.VendaLote.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="estado-caminhao">
              <h2>PESO: {comb.Peso_carga.toFixed(2)}Kg</h2>
              <h2>Volume: {comb.Volume_carga.toFixed(2)}m³</h2>
            </div>
          </div>
        ))}
    </div>
  );
}
