import React, { useState } from "react";

export default function SearchBar({ placeholder, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value); // Chamada à função de pesquisa fornecida
    };

    return (
        <div className="searchBar">
            <input id="searchEngine" placeholder={placeholder} value={searchTerm} onChange={handleChange} />
        </div>
    ) 
}
