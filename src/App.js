// App.js
import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Formulario from './Components/Formulario';
import Gerenciamento from './Gerenciamento';
import Carousel from './Components/Carousel';
import Simulacao from './Simulacao';

function App() {
  const [activeComponent, setActiveComponent] = useState('Gerenciamento'); 

  const handleLinkClick = (name) => {
    setActiveComponent(name);
  };

  return (
    <div className="App">
      <Navbar
        brand="https://th.bing.com/th/id/OIP.w6ai5C7Jxo0_HZ-fe6wFyAHaEK?rs=1&pid=ImgDetMain"
        links={[
          { name: "Formulario" },
          { name: "Gerenciamento" },
          { name: "Simulacao" }
        ]}
        onLinkClick={handleLinkClick} // Passar a função de clique para o Navbar
      />

      <div className="container">
        {activeComponent === 'Formulario' && <Formulario />}
        {activeComponent === 'Gerenciamento' && <Gerenciamento />}
        {activeComponent === 'Simulacao' && <Simulacao />}
      </div>
    </div>
  );
}

export default App;
