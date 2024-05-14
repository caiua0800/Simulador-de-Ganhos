import React from "react";

function Card(props) {
    const { title, preco, src} = props;
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-img">
                    <img src={src} alt={title}></img>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-preco">{preco}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
