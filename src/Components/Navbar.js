// Navbar.js
import React from "react";

function Navbar(props) {
    const { brand, links, onLinkClick } = props; // Receber a função de clique como propriedade

    return (
        <div className="navbar">
            <div className="navbar-nav">
                <a className="nav-brand">SISTEMA DE SIMULAÇÃO</a>   
                <div className="nav-items">
                    {links.map((link, index) => (
                        <a
                          key={index}
                          className={`nav-link ${link.state}`}
                          onClick={() => onLinkClick(link.name)} // Chamar a função de clique ao clicar no link
                        >
                          {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
