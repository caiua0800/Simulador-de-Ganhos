import React, { useState } from "react";
import { getFirestore, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';

export default function Produtos({ produtos }) {
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [nomeEditado, setNomeEditado] = useState("");
    const [precoEditado, setPrecoEditado] = useState("");
    const [ipiEditado, setIpiEditado] = useState("");
    const [icmsEditado, setIcmsEditado] = useState("");
    const [larguraEditada, setLarguraEditada] = useState("");
    const [comprimentoEditado, setComprimentoEditado] = useState("");
    const [alturaEditada, setAlturaEditada] = useState("");
    const [pesoEditado, setPesoEditado] = useState("");

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const editarProduto = async () => {
        try {
            const produtoRef = doc(db, 'produtos', produtoSelecionado.id);
            await updateDoc(produtoRef, {
                Nome: nomeEditado,
                Preco_de_Fabrica: precoEditado,
                IPI: ipiEditado,
                ICMS: icmsEditado,
                Largura: larguraEditada,
                Comprimento: comprimentoEditado,
                Altura: alturaEditada,
                m3: alturaEditada * comprimentoEditado * larguraEditada,
                Peso: pesoEditado
            });
            console.log("Produto editado com sucesso!");
            setModalEditOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao editar o produto:", error);
        }
    };

    const excluirProduto = async () => {
        try {
            const produtoRef = doc(db, 'produtos', produtoSelecionado.id);
            await deleteDoc(produtoRef);
            console.log("Produto excluído com sucesso!");
            setModalDeleteOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);
        }
    };

    const handleEditClick = (produto) => {
        setProdutoSelecionado(produto);
        setNomeEditado(produto.Nome);
        setPrecoEditado(produto.Preco_de_Fabrica);
        setIpiEditado(produto.IPI);
        setIcmsEditado(produto.ICMS);
        setLarguraEditada(produto.Largura);
        setComprimentoEditado(produto.Comprimento);
        setAlturaEditada(produto.Altura);
        setPesoEditado(produto.Peso);
        setModalEditOpen(true);
    };

    const handleDeleteClick = (produto) => {
        setProdutoSelecionado(produto);
        setModalDeleteOpen(true);
    };

    return (
        <div className="Produtos">
            <div className="tabela-de-produtos">
                <p className="coluna">Nome</p>
                <p className="coluna">Preço de Fábrica</p>
                <p className="coluna">IPI</p>
                <p className="coluna">Preço + IPI</p>
                <p className="coluna">ICMS</p>
                <p className="coluna">Preço + ICMS</p>
                <p className="coluna">Preço Final</p>
                <p className="coluna">LARGURA</p>
                <p className="coluna">COMPRIMENTO</p>
                <p className="coluna">ALTURA</p>
                <p className="coluna">m³</p>
                <p className="coluna">Peso</p>
                <p className="coluna">Buttons</p>
            </div>
            <div className="container-produtos">
                {produtos.map(produto => (
                    <div className="produto" key={produto.id}>
                        <p className="coluna">{produto.Nome}</p>
                        <p className="coluna">R${parseFloat(produto.Preco_de_Fabrica).toFixed(2)}</p>
                        <p className="coluna">{produto.IPI}%</p>
                        <p className="coluna">R${parseFloat(produto.PRECO_IPI).toFixed(2)}</p>
                        <p className="coluna">{produto.ICMS}%</p>
                        <p className="coluna">R${parseFloat(produto.PRECO_ICMS).toFixed(2)}</p>
                        <p className="coluna">R${parseFloat(produto.PRECO_FINAL).toFixed(2)}</p>
                        <p className="coluna">{parseFloat(produto.Largura).toFixed(2)}m</p>
                        <p className="coluna">{parseFloat(produto.Comprimento).toFixed(2)}m</p>
                        <p className="coluna">{parseFloat(produto.Altura).toFixed(2)}m</p>
                        <p className="coluna">{parseFloat(produto.m3).toFixed(4)}m³</p>
                        <p className="coluna">{parseFloat(produto.Peso).toFixed(2)}Kg</p>

                        <p className="coluna">
                            <div className="productButtons">
                                <button onClick={() => handleEditClick(produto)} className="editBtn" data-id={produto.id}>Editar</button>
                                <button onClick={() => handleDeleteClick(produto)} className="deleteBtn" data-id={produto.id}>X</button>
                            </div>
                        </p>
                    </div>
                ))}
            </div>
            {modalDeleteOpen && (
                <div className="modal modalExclude">
                    <div className="modal-content">
                        <p>{`Tem certeza que deseja excluir o Produto ${produtoSelecionado?.Nome}?`}</p>
                        <div className="modal-btns">
                            <button className="yes-button" onClick={excluirProduto}>Sim</button>
                            <button className="no-button" onClick={() => setModalDeleteOpen(false)}>Não</button>
                        </div>
                    </div>
                </div>
            )}
            {modalEditOpen && (
                <div className="modal modalEdit">
                    <div className="modal-content">
                        <p>{`Editando Produto: ${produtoSelecionado?.Nome}`}</p>
                        <label htmlFor="nomeInput">Nome:</label>
                        <input id="nomeInput" type="text" value={nomeEditado} onChange={(e) => setNomeEditado(e.target.value)} />
                        <label htmlFor="precoInput">Preço de Fábrica:</label>
                        <input id="precoInput" type="text" value={precoEditado} onChange={(e) => setPrecoEditado(e.target.value)} />
                        <label htmlFor="ipiInput">IPI:</label>
                        <input id="ipiInput" type="text" value={ipiEditado} onChange={(e) => setIpiEditado(e.target.value)} />
                        <label htmlFor="icmsInput">ICMS:</label>
                        <input id="icmsInput" type="text" value={icmsEditado} onChange={(e) => setIcmsEditado(e.target.value)} />
                        <label htmlFor="larguraInput">Largura:</label>
                        <input id="larguraInput" type="text" value={larguraEditada} onChange={(e) => setLarguraEditada(e.target.value)} />
                        <label htmlFor="comprimentoInput">Comprimento:</label>
                        <input id="comprimentoInput" type="text" value={comprimentoEditado} onChange={(e) => setComprimentoEditado(e.target.value)} />
                        <label htmlFor="alturaInput">Altura:</label>
                        <input id="alturaInput" type="text" value={alturaEditada} onChange={(e) => setAlturaEditada(e.target.value)} />
                        <label htmlFor="pesoInput">Peso:</label>
                        <input id="pesoInput" type="text" value={pesoEditado} onChange={(e) => setPesoEditado(e.target.value)} />
                        <div className="modal-btns">
                            <button className="save-button" onClick={editarProduto}>Salvar</button>
                            <button className="cancel-button" onClick={() => setModalEditOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
