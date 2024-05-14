import React, { useEffect, useState } from 'react';
import SearchBar from './Components/SearchBar';
import Produtos from './Components/Produtos';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'; 
import firebaseConfig from './Components/firebaseConfig'; 

function Gerenciamento() {
    const [produtos, setProdutos] = useState([]);
    const [filteredProdutos, setFilteredProdutos] = useState([]);

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
                setFilteredProdutos(produtosData); // Inicialmente, produtos não filtrados são os mesmos que os produtos totais
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            }
        };

        fetchProdutos();
    }, []); 

    const handleSearch = (searchTerm) => {
        const filtered = produtos.filter(produto => produto.Nome.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredProdutos(filtered);
    };

    return (
        <div className='Gerenciamento'>
            <h1>Barra de Pesquisa</h1>
            <SearchBar placeholder='Digite o nome do item' onSearch={handleSearch} />
            <Produtos produtos={filteredProdutos} />
        </div>
    );
}

export default Gerenciamento;
