import React, { Component } from 'react';
import Rotas from './Rotas';
import BarraNavegacao from './BarraNavegacao';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
   render(){
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
}

export default App;