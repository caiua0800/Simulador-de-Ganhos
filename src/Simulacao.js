
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'; 
import firebaseConfig from './Components/firebaseConfig'; 
import RespostaSimulacao from './Components/RespostaSimulacao';

function Simulacao() {
    const [produtos, setProdutos] = useState([]);
    const [lucroDesejado, setLucroDesejado] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [VolumeCaminhao, setVolumeCaminhao] = useState('');
    const [Frete, setFrete] = useState('');
    const [maximoLucroUni, setMaximoLucroUni] = useState(200);
    const [combinations, setCombinations] = useState([]);
    const [combinacaoUnica, setcombinacaoUnica] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);
                const produtosRef = collection(db, 'produtos');
                const produtosSnapshot = await getDocs(produtosRef);
                const produtosData = produtosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProdutos(produtosData);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            }
        };
        fetchProdutos();
    }, []); 

    const handleGerarPossibilidades = () => {
        const info_products = produtos.map(p => ({
            custo: parseFloat(p.PRECO_FINAL),
            nome: p.Nome,
            peso: parseFloat(p.Peso),
            volume: parseFloat(p.m3)
        }));


        let combsUnicas = []
        info_products.forEach(produto => {
            let qtde = parseInt(parseInt(VolumeCaminhao) / produto.volume);

            if ((qtde * produto.peso) < (parseInt(VolumeCaminhao) * parseInt(capacidade))) {

                let comb = {
                    nome: produto.nome,
                    qtde: qtde,
                    peso: parseInt((qtde * parseFloat(produto.peso)).toFixed(2)),
                    peso_unitario: produto.peso,
                    volume_unitario: parseFloat(produto.volume.toFixed(2)),
                    volume: parseFloat((produto.volume * qtde).toFixed(4)),
                    custoUnitario: produto.custo,
                    vendaUnitario: parseFloat(((lucroDesejado / ((produto.custo * qtde) + parseInt(Frete)) * produto.custo) + produto.custo).toFixed(2)),
                    lucroUnitario: parseFloat((lucroDesejado / ((produto.custo * qtde) + parseInt(Frete)) * produto.custo).toFixed(2)),
                    lucroTotal: parseFloat(((lucroDesejado / ((produto.custo * qtde) + parseInt(Frete)) * produto.custo) * qtde).toFixed(2)),
                };


                let lucroEmCima = (comb.vendaUnitario / comb.custoUnitario)*100

                if(lucroEmCima < parseInt(maximoLucroUni)){
                    combsUnicas.push(comb)
                }

                    
            }else{
                console.log(produto, qtde)

                while((qtde * produto.peso) > (parseInt(VolumeCaminhao) * parseInt(capacidade))){
                    qtde--;
                }

                console.log(produto, qtde)


                // console.log(qtde)
                let comb = {
                    nome: produto.nome,
                    qtde: qtde,
                    peso: parseInt((qtde * parseFloat(produto.peso)).toFixed(2)),
                    peso_unitario: produto.peso,
                    volume_unitario: parseFloat(produto.volume.toFixed(2)),
                    volume: parseFloat((produto.volume * qtde).toFixed(4)),
                    custoUnitario: produto.custo,
                    vendaUnitario: parseFloat(((lucroDesejado / ((produto.custo * qtde) + parseInt(Frete)) * produto.custo) + produto.custo).toFixed(2)),
                    lucroUnitario: parseFloat((lucroDesejado / ((produto.custo * qtde) + parseInt(Frete)) * produto.custo).toFixed(2)),
                    lucroTotal: parseFloat(((lucroDesejado / ((produto.custo * qtde) + parseInt(Frete)) * produto.custo) * qtde).toFixed(2)),
                };
                let lucroEmCima = (comb.vendaUnitario / comb.custoUnitario)*100

                if(lucroEmCima < parseInt(maximoLucroUni)){
                    combsUnicas.push(comb)
                }
            }
        });

        setcombinacaoUnica(combsUnicas);
        

        let indice = 0;
        let array = [];

        while(indice < info_products.length){
            if(encherCaminhao(info_products, indice)){
                let aux = encherCaminhao(info_products, indice)
                let pesoSoma = 0
                aux.forEach(a => {
                    pesoSoma += a.peso_total
                })
                if(pesoSoma >= (parseInt(VolumeCaminhao) * parseInt(capacidade)))
                    console.log(`combinacao ${aux} excluida por excesso de peso`)
                else array.push(aux)
            }
            indice++;
        }

        setCombinations(array);
    };

    function encherCaminhao(objects, i){

        function compararPorCusto(a, b) {
            return a.custo - b.custo;
        }

        function adicionarAoArray(array, i, n){
            for(let y = 0; y < n; y++){
                objects[i+y].custo = parseFloat(objects[i+y].custo.toFixed(2));
                objects[i+y].volume = parseFloat(objects[i+y].volume.toFixed(5));
                array[y] = objects[i+y];
            }

            array.sort(compararPorCusto);
        }

        function criarCombinacao(array_de_custo_ordenado, per_de_p){
            
            let combs = [];

            for(let r = 0; r < array_de_custo_ordenado.length; r++){
                let p = array_de_custo_ordenado[r];
                let qtde = parseInt((parseInt(VolumeCaminhao) / p.volume) * per_de_p[r])
                let valor_unitario = parseFloat((((parseInt(lucroDesejado)*per_de_p[r]/((p.custo*qtde) + (parseInt(Frete) / qtde))) * p.custo) + p.custo).toFixed(2))
                let valor_total = parseFloat((valor_unitario * qtde).toFixed(2))
                let custo_total = parseFloat((qtde * p.custo).toFixed(2))
                let lucro_por_produto = parseFloat((((valor_unitario - p.custo) / p.custo) * 100).toFixed(2));
                let lucro_total = parseFloat((valor_total - custo_total).toFixed(2));
                let volume_total = parseFloat((p.volume * qtde).toFixed(2));
                let peso_total = parseFloat((p.peso * qtde).toFixed(2));

                let comb = {
                    nome: p.nome,
                    custo_unitario: p.custo,
                    qtde: qtde,
                    custo_total: custo_total,
                    valor_unitario:  valor_unitario,
                    valor_total: valor_total,
                    lucro_por_produto: `${lucro_por_produto}%`,
                    lucro_total: `R$${lucro_total}`,
                    volume_unitario: p.volume,
                    volume_total: volume_total,
                    peso_unitario: p.peso,
                    peso_total: peso_total
                }
                combs.push(comb);
            }
            return combs;
        }

        let combs

        if(objects[i+5]){

            let array_de_custo_ordenado = []
            adicionarAoArray(array_de_custo_ordenado, i, 5);


            let per_de_p = [0.4, 0.1, 0.1, 0.1, 0.3]

            combs = criarCombinacao(array_de_custo_ordenado, per_de_p)

        }else if(objects[i+4]){

            let array_de_custo_ordenado = []
            adicionarAoArray(array_de_custo_ordenado, i, 4);

            let per_de_p = [0.3, 0.2, 0.2, 0.3]

            combs = criarCombinacao(array_de_custo_ordenado, per_de_p)

        }else if(objects[i+3]){

            let array_de_custo_ordenado = []
            adicionarAoArray(array_de_custo_ordenado, i, 3);

            let per_de_p = [0.4, 0.3, 0.3]

            combs = criarCombinacao(array_de_custo_ordenado, per_de_p)


        }else if(objects[i+2]){

            let array_de_custo_ordenado = []
            adicionarAoArray(array_de_custo_ordenado, i, 2);
            
            let per_de_p = [0.6, 0.4]

            combs = criarCombinacao(array_de_custo_ordenado, per_de_p)
            
        }else{
            return null;
        }
        return combs;
    }


    
    return (
        <div className='Simulacao'>
            <h1 className='custom-cursor Simulacao-title'>Simulação De Lucro</h1>
            <div className='PriceWannaWin'>
                <h2>Quanto de lucro deseja ganhar?</h2>
                <input 
                    type='number' 
                    placeholder='Informe o lucro desejado' 
                    value={lucroDesejado}
                    onChange={(e) => setLucroDesejado(e.target.value)}
                />
                <h3>Capacidade de peso por metros cubicos</h3>
                <input 
                    type='number' 
                    placeholder='Informe o peso máximo'
                    value={capacidade}
                    onChange={(e) => setCapacidade(e.target.value)} 
                />
                <h3>Capacidade em metros cubicos</h3>
                <input 
                    type='number' 
                    placeholder='Informe a capacidade do caminhão'
                    value={VolumeCaminhao}
                    onChange={(e) => setVolumeCaminhao(e.target.value)} 
                />
                <h3>Frete</h3>
                <input 
                    type='number' 
                    placeholder='Informe a capacidade do caminhão'
                    value={Frete}
                    onChange={(e) => setFrete(e.target.value)} 
                />

                <button onClick={handleGerarPossibilidades}>Gerar Possibilidades</button>
            </div>
            <RespostaSimulacao combinacoesUnitarias={combinacaoUnica} frete={Frete} combinations={combinations} />
        </div>
    );
}

export default Simulacao;

