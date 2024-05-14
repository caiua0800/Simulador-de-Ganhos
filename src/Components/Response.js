import React from "react";

export default function Response(props){
    const { children } = props;
    return (
        <div className="Response">
            { children }
        </div>
    )
}