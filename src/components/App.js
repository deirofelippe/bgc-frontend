import React from 'react';
import Rotas from './Rotas';
import BarraNavegacao from './BarraNavegacao';
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {

   return (
      <Router>
         <nav>
            <BarraNavegacao />
         </nav>
         <section>
            <main>
               <Rotas />
            </main>
         </section>
      </Router>
   );
}

export default App;