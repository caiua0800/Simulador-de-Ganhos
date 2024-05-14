// Formulario.js
import React, { useState } from "react";
import ConfirmarProduto from "./ConfirmarProduto";
import PopUpMessage from './PopUpMessage';

export default function Formulario() {
    const [showModal, setShowModal] = useState(false);
    const [nome, setNome] = useState("");
    const [precoDeFabrica, setPrecoDeFabrica] = useState("");
    const [IPI, setIPI] = useState("");
    const [ICMS, setICMS] = useState("");
    const [Largura, setLargura] = useState("");
    const [Comprimento, setComprimento] = useState("");
    const [Altura, setAltura] = useState("");
    const [Peso, setPeso] = useState("");

    const handleCreateProduct = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCancelar = () => {
        handleCloseModal();
        // Coloque outras ações que você quer executar quando o usuário cancelar aqui
    };

    return (
        <div className="FormularioProduto">
            <div className="form-inputs">
                <label>Nome do Produto</label>
                <input type="text" className="input" placeholder="*" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="form-inputs">
                <label>Preço de Fábrica</label>
                <input type="number" className="input" placeholder="*" value={precoDeFabrica} onChange={(e) => setPrecoDeFabrica(e.target.value)} />
            </div>

            <div className="form-inputs">
                <label>IPI%</label>
                <input type="number" className="input" placeholder="*" value={IPI} onChange={(e) => setIPI(e.target.value)} />
            </div>

            <div className="form-inputs">
                <label>ICMS</label>
                <input type="number" className="input" placeholder="*" value={ICMS} onChange={(e) => setICMS(e.target.value)} />
            </div>

            <div className="form-inputs">
                <label>Largura da Caixa</label>
                <input type="number" className="input" placeholder="cm" value={Largura} onChange={(e) => setLargura(e.target.value)} />
            </div>

            <div className="form-inputs">
                <label>Comprimento da Caixa</label>
                <input type="number" className="input" placeholder="cm" value={Comprimento} onChange={(e) => setComprimento(e.target.value)} />
            </div>

            <div className="form-inputs">
                <label>Altura da Caixa</label>
                <input type="number" className="input" placeholder="cm" value={Altura} onChange={(e) => setAltura(e.target.value)} />
            </div>

            <div className="form-inputs">
                <label>Peso</label>
                <input type="number" className="input" placeholder="Kg" value={Peso} onChange={(e) => setPeso(e.target.value)} />
            </div>

            <button onClick={handleCreateProduct} id="submit">Criar Produto</button>

            <ConfirmarProduto 
                show={showModal ? "modal" : "modal d-none"} 
                handleCloseModal={handleCloseModal} 
                handleCancelar={handleCancelar} 
                nome={nome} 
                precoDeFabrica={precoDeFabrica} 
                IPI={IPI} 
                ICMS={ICMS} 
                Largura={Largura} 
                Comprimento={Comprimento} 
                Altura={Altura}
                Peso={Peso}
            />

        </div>
    );
}
