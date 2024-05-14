import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';


export default function ConfirmarProduto(props) {
    const { nome, precoDeFabrica, IPI, ICMS, Largura, Comprimento, Altura, Peso, show, handleCloseModal, handleCancelar } = props;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const handleConfirmar = async () => {

        try {
            // Adicione um novo documento à coleção 'produtos' com os dados do formulário
            await addDoc(collection(db, 'produtos'), {
                Nome: nome,
                Preco_de_Fabrica: precoDeFabrica,
                IPI: IPI,
                PRECO_IPI: parseFloat(precoDeFabrica) +  (parseFloat(IPI)/100) * parseFloat(precoDeFabrica),
                ICMS: ICMS,
                PRECO_ICMS: parseFloat(precoDeFabrica) +  (parseFloat(ICMS)/100) * parseFloat(precoDeFabrica),
                PRECO_FINAL: parseFloat(precoDeFabrica) +  (parseFloat(IPI)/100) * parseFloat(precoDeFabrica) +  (parseFloat(ICMS)/100) * parseFloat(precoDeFabrica),
                Largura: Largura,
                Comprimento: Comprimento,
                Altura: Altura,
                m3: parseFloat(Altura) * parseFloat(Largura) * parseFloat(Comprimento) ,
                Peso: Peso
            });

            // Feche o modal após o sucesso da criação do produto
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    return (
        <div className={show}>
            <div className="modal-confirmacao">
                <h2 className="modal-title">Dados do Produto:</h2>
                <div className="dados-produto">
                    <h4>Nome: {nome}</h4>
                    <h4>Preço de Fábrica: {precoDeFabrica}</h4>
                    <h4>IPI: {IPI}</h4>
                    <h4>ICMS: {ICMS}</h4>
                    <h4>Largura: {Largura}</h4>
                    <h4>Comprimento: {Comprimento}</h4>
                    <h4>Altura: {Altura}</h4>
                    <h4>Peso: {Peso}</h4>
                </div>

                <div className="modal-confirm">
                    <h1>As informações estão corretas?</h1>
                    <div className="modal-buttons">
                        <button className="no-button" onClick={handleCancelar}>Não</button>
                        <button className="yes-button" onClick={handleConfirmar}>Sim</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
